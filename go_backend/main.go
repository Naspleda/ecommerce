package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

// Config holds application configuration
type Config struct {
	SupabaseURL string
	SupabaseKey string
	Port        string
}

var config Config

func init() {
	// Load .env file
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using environment variables")
	}

	config = Config{
		SupabaseURL: os.Getenv("SUPABASE_URL"),
		SupabaseKey: os.Getenv("SUPABASE_KEY"),
		Port:        os.Getenv("PORT"),
	}

	if config.Port == "" {
		config.Port = "8080"
	}
}

func main() {
	r := gin.Default()

	// Configure CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	// Routes
	r.GET("/", rootHandler)
	r.GET("/test-supabase", testSupabaseHandler)

	// Start server
	addr := fmt.Sprintf(":%s", config.Port)
	log.Printf("Server starting on %s", addr)
	if err := r.Run(addr); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}

func rootHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "Hello from Go + Gin + Supabase",
	})
}

func testSupabaseHandler(c *gin.Context) {
	if config.SupabaseURL == "" || config.SupabaseKey == "" {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status": "error",
			"detail": "Supabase credentials not configured",
		})
		return
	}

	// Make a simple request to Supabase REST API to verify connection
	url := fmt.Sprintf("%s/rest/v1/", config.SupabaseURL)
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status": "error",
			"detail": err.Error(),
		})
		return
	}

	req.Header.Set("apikey", config.SupabaseKey)
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", config.SupabaseKey))

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status": "error",
			"detail": err.Error(),
		})
		return
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)

	var result interface{}
	json.Unmarshal(body, &result)

	c.JSON(http.StatusOK, gin.H{
		"status":      "success",
		"url":         config.SupabaseURL,
		"http_status": resp.StatusCode,
	})
}
