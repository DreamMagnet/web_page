# Backend — FastAPI microservices

The backend is split into two independent FastAPI services that share the same
JSON data file (`data/users.json`). No database, no JWT — a session token is
stored on each user record and echoed by the client via the `X-Session-Id`
header.

```
backend/
├── data/users.json         # shared user store (bcrypt-hashed passwords)
├── auth-service/           # port 8001 — registration / login / logout
└── profile-service/        # port 8002 — profile CRUD + landing content
```

## Services

### auth-service (port 8001)

| Method | Path                  | Auth | Purpose                    |
| ------ | --------------------- | ---- | -------------------------- |
| POST   | `/api/auth/register`  | —    | Create account + login     |
| POST   | `/api/auth/login`     | —    | Log in, get session token  |
| POST   | `/api/auth/logout`    | Yes  | Revoke current session     |
| GET    | `/api/auth/profile`   | Yes  | Fetch profile via profile-service |
| GET    | `/health`             | —    | Liveness probe             |

### profile-service (port 8002)

| Method | Path                  | Auth | Purpose                    |
| ------ | --------------------- | ---- | -------------------------- |
| GET    | `/api/users/me`       | Yes  | Get current profile        |
| PUT    | `/api/users/me`       | Yes  | Update name / phone / pwd  |
| GET    | `/api/landing`        | —    | Public landing content     |
| GET    | `/health`             | —    | Liveness probe             |

Authenticated endpoints require the header `X-Session-Id: <token>` returned
from `register` / `login`.

## Quick start (Windows PowerShell)

Both services share the same dependencies, so a single virtualenv works.

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r auth-service\requirements.txt
```

Run each service in its own terminal:

```powershell
# Terminal 1 — auth-service
cd backend\auth-service
..\.venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --port 8001
```

```powershell
# Terminal 2 — profile-service
cd backend\profile-service
..\.venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --port 8002
```

Swagger UIs: <http://localhost:8001/docs> and <http://localhost:8002/docs>.

## Configuration

Both services read the same environment variables:

| Variable       | Default                    | Meaning                                  |
| -------------- | -------------------------- | ---------------------------------------- |
| `DATA_FILE`    | `data/users.json`          | Path (relative to `backend/`) to the shared user store |
| `CORS_ORIGINS` | `http://localhost:4200`    | Comma-separated list of allowed origins  |
| `PROFILE_SERVICE_URL` | `http://localhost:8002` | Base URL used by auth-service when `/api/auth/profile` calls profile-service |

## Data

Users live in `data/users.json` (auto-created on first request). Passwords are
stored as bcrypt hashes; the plaintext is never persisted or returned. Both
services use the same thread-safe, atomic writer, so they can safely write to
the file concurrently on a single host.
