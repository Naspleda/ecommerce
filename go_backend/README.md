# Go Backend - Supabase + Gin

Backend alternativo en Go que replica la funcionalidad del backend FastAPI.

## Requisitos

- Go 1.21+

## Instalación

```bash
cd go_backend
go mod tidy
```

## Configuración

1. Copia `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edita `.env` con tus credenciales de Supabase.

## Ejecución

```bash
go run main.go
```

El servidor iniciará en `http://localhost:8080`.

## Endpoints

- `GET /` - Health check
- `GET /test-supabase` - Verificar conexión con Supabase
