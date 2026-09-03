# Frontend — Angular 18 User App

Standalone-components Angular 18 app that talks to the FastAPI backend at
`http://localhost:8000`. Uses Bootstrap 5 for styling and a cookie-stored
session token echoed via the `X-Session-Id` header.

## Screens

- `/` &mdash; Landing (public; shows welcome + Edit Profile when logged in).
- `/login` &mdash; Log in.
- `/register` &mdash; Create an account.
- `/profile` &mdash; Edit profile (protected by `authGuard`).

## Quick start

```powershell
cd frontend
npm install
npm start
```

Then open http://localhost:4200. The backend must be running on
`http://localhost:8000` (see `../backend/README.md`).

## Structure

```
src/
  environments/environment.ts     # API base URL, cookie name
  app/
    app.config.ts                  # providers (router + HttpClient + interceptor)
    app.routes.ts                  # lazy-loaded routes
    app.component.{ts,html}        # navbar + <router-outlet>
    core/
      models/user.model.ts
      services/auth.service.ts     # signal-based state + cookie mgmt
      interceptors/session.interceptor.ts
      guards/auth.guard.ts
    pages/
      landing/
      login/
      register/
      profile/
```
