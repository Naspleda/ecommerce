from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.supabase import supabase

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:3000",  # Nuxt frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI + Supabase"}

@app.get("/test-supabase")
def test_supabase():
    try:
        # Simple test query - assumes you might have a 'users' or similar public table, 
        # or just checking the client triggers no immediate error.
        # For now, just returning connection info confirmation (not safe to return key)
        return {"status": "success", "url": supabase.supabase_url}
    except Exception as e:
        return {"status": "error", "detail": str(e)}
