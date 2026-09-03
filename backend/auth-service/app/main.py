"""FastAPI entry point for the auth microservice."""

from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import auth as auth_router
from app.core.config import settings


def create_app() -> FastAPI:
    app = FastAPI(title="Auth Service", version="1.0.0")

    app.add_middleware(
        CORSMiddleware,
        allow_origins=list(settings.cors_origins),
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*", settings.session_header],
        expose_headers=[settings.session_header],
    )

    app.include_router(auth_router.router, prefix="/api")

    @app.get("/health", tags=["meta"])
    def health() -> dict[str, str]:
        return {"status": "ok", "service": "auth"}

    return app


app = create_app()
