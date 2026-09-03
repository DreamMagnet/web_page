# User Auth Demo — FastAPI + Angular

A small end-to-end web app with:

- **Backend**: FastAPI on Python 3.11, persisting users in a JSON file.
- **Frontend**: Angular 18 standalone components + Bootstrap 5.

Screens: **Landing**, **Register**, **Login**, **Edit Profile**.

Auth is a simple session token (uuid4/hex) — no JWT. The server returns the
token on register/login; the browser stores it in a cookie and sends it back
via the `X-Session-Id` header on every request.

## Repo layout

```
backend/     # FastAPI service (see backend/README.md)
frontend/    # Angular app     (see frontend/README.md)
```

## Run it (Windows PowerShell)

Open **two terminals**:

### Terminal 1 — backend

```powershell
cd backend
py -3.11 -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Swagger UI: http://localhost:8000/docs

### Terminal 2 — frontend

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

- CORS is configured for `http://localhost:4200` and allows the custom
  `X-Session-Id` header.
- To reset all users, stop the backend, delete `backend/data/users.json`, then
  restart.
