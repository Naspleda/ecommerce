# Implementation Plan: Supabase Auth, Go Backend & Video Monetization

## Goal Description
Implement a secure system where users can:
1.  **Register/Login** using Supabase Auth (Gmail/Social).
2.  **Upload 3D Models (.stl)** with a price tag.
3.  **Purchase Models** (setup structure for payments).
4.  **Download Models** securely (only after purchase).

The backend will be built in **Go** to handle business logic, file processing performance, and permission checks.

## Architecture Overview
-   **Frontend (Nuxt/Vue)**: Handles UI, Authentication (Supabase Client), and file uploads/downloads interactions.
-   **Backend (Go)**:
    -   Validates Authentication (Supabase JWT).
    -   Manages Metadata (Database).
    -   Generates Secure Download Links (Signed URLs).
    -   Orchestrates Purchases.
-   **Supabase**:
    -   **Auth**: User management.
    -   **PostgreSQL**: Relational data (Users, Products, Purchases).
    -   **Storage**: Hosting the raw .stl files (Private Bucket).

---

## Phase 1: Complexity - Low (Setup & Configuration)

### 1.1 Supabase Configuration
-   [ ] **Database Schema**:
    -   `profiles` (synced with auth.users).
    -   `models` (id, title, description, price, file_path, owner_id, created_at).
    -   `purchases` (id, buyer_id, model_id, status, created_at).
-   [ ] **Storage Bucket**:
    -   Create a private bucket `stl-files`.
    -   Set RLS policies: No public access, only authenticated uploaders can upload.

### 1.2 Go Backend Boilerplate
-   [ ] Create `backend` directory.
-   [ ] Initialize Go module (`go mod init backend`).
-   [ ] Setup basic folder structure:
    ```
    backend/
    ├── cmd/api/main.go
    ├── internal/
    │   ├── database/ (Postgres connection)
    │   ├── middleware/ (Auth/JWT)
    │   ├── models/ (Structs)
    │   └── handlers/ (HTTP logic)
    └── .env
    ```
-   [ ] Install dependencies:
    -   Web Framework: `gofiber/fiber` or `gin-gonic/gin` (Recommend **Fiber** for performance).
    -   DB: `pgx` or `gorm` (Recommend **GORM** for speed of dev, or `sqlx`).
    -   Supabase: `supabase-community/supabase-go` or just REST/Client.

---

## Phase 2: Complexity - Medium (Authentication & Database)

### 2.1 Frontend Authentication
-   [ ] Implement Login/Register page in Nuxt using Supabase Auth UI or Custom.
-   [ ] Configure Google OAuth provider in Supabase Dashboard.
-   [ ] Store Session/JWT in frontend to send to Go Backend.

### 2.2 Backend Authentication Middleware
-   [ ] Create middleware to parse `Authorization: Bearer <token>` header.
-   [ ] Validate JWT against Supabase Secret.
-   [ ] Extract `user_id` from token and inject into request context.

### 2.3 Database Connectivity
-   [ ] Connect Go backend to Supabase PostgreSQL.
-   [ ] Define Go structs for `Model` and `Purchase`.

---

## Phase 3: Complexity - High (File Handling & Permissions)

### 3.1 Model Upload Flow
-   [ ] **Frontend**: Form to select `.stl` and set price.
    -   Option A: Upload direct to Supabase Storage -> Send metadata to Go. (Better for server load).
    -   Option B: Upload to Go -> Go streams to Supabase. (Better for validation/processing).
    -   *Decision*: **Option A** (Direct to Supabase) with RLS is standard, but user asked to optimize permissions/backend. **Option B (Upload to Go)** allows us to validation the STL file header/size before storing. Let's start with **Option B** for strict control, or **Signed Upload URLs** (Best of both).
    -   *Plan*: Endpoint `POST /api/models/upload-url` -> Returns a signed URL. Frontend uploads file. Then Frontend calls `POST /api/models` to save metadata.

### 3.2 Permissions & Purchase Logic
-   [ ] **Purchase Endpoint** (`POST /api/models/:id/purchase`):
    -   Check if already purchased.
    -   (Mock Payment for now) -> Insert record into `purchases` table.
-   [ ] **Download Endpoint** (`GET /api/models/:id/download`):
    -   Auth Check.
    -   DB Check: Does `user_id` accept `model_id` in `purchases` table? OR is `user_id` == `owner_id`?
    -   If valid: Generate a **Supabase Storage Signed URL** (valid for 5 mins).
    -   Redirect user to the signed URL.

---

## Phase 4: Complexity - Optimization (Performance)

### 4.1 Large File Optimization
-   [ ] Ensure DB doesn't store binary. Only paths.
-   [ ] Use Signed URLs so traffic goes `User <-> Supabase Storage`, bypassing the Go server for the heavy download transfer.
-   [ ] Add Indexing on `purchases(user_id, model_id)` for fast permission lookups.

---

## Next Steps
1.  Initialize the Go project.
2.  Set up the database tables in Supabase.
3.  Implement the Auth Middleware.
