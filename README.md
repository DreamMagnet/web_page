# User Auth Demo — FastAPI + Angular

A small end-to-end web app with:

- **Backend**: two FastAPI microservices on Python 3.11 (auth + profile),
  sharing a single JSON user store.
- **Frontend**: Angular 18 standalone components + Bootstrap 5.

Screens: **Landing**, **Register**, **Login**, **Edit Profile**.

Auth is a simple session token (uuid4/hex) — no JWT. The server returns the
token on register/login; the browser stores it in a cookie and sends it back
via the `X-Session-Id` header on every request.

## Repo layout

```
backend/                 # FastAPI microservices (see backend/README.md)
  auth-service/          #   port 8001 — register / login / logout
  profile-service/       #   port 8002 — profile CRUD + landing content
  data/users.json        #   shared user store
frontend/                # Angular app (see frontend/README.md)
```

## Run it (Windows PowerShell)

The backend is two independent services that share one virtualenv. Open
**three terminals**.

First, create the shared venv and install dependencies once:

```powershell
cd backend
py -3.11 -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r auth-service\requirements.txt
```

> Behind a corporate proxy that breaks TLS, add
> `--trusted-host pypi.org --trusted-host files.pythonhosted.org` to `pip install`.

### Terminal 1 — auth-service (port 8001)

```powershell
cd backend\auth-service
..\.venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --port 8001
```

Swagger UI: http://localhost:8001/docs

### Terminal 2 — profile-service (port 8002)

```powershell
cd backend\profile-service
..\.venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --port 8002
```

Swagger UI: http://localhost:8002/docs

### Terminal 3 — frontend

```powershell
cd frontend
npm install
npm start
```

App: http://localhost:4200

## End-to-end smoke test

1. Open http://localhost:4200 → landing page shows Login/Register buttons.
2. Click **Register**, fill in the form, submit → you're logged in and redirected to `/`.
3. Navbar now shows "Hi, &lt;name&gt;" and a Profile link.
4. Click **Profile**, change your name/phone, save → success alert and navbar updates.
5. Refresh the page → still logged in (session cookie restored via `/users/me`).
6. Click **Log out** → cookie cleared; `/profile` redirects to `/login`.

Users are stored in `backend/data/users.json`. Passwords are hashed with bcrypt
(hash starts with `$2b$`); plaintext is never persisted.

## Notes

- The frontend talks to the auth-service at `http://localhost:8001/api` and the
  profile-service at `http://localhost:8002/api` (see
  `frontend/src/environments/environment.ts`).
- CORS on both services is configured for `http://localhost:4200` and allows the
  custom `X-Session-Id` header.
- To reset all users, stop both services, delete `backend/data/users.json`, then
  restart.
