"""FastAPI entry point for the profile / landing microservice."""

from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import landing as landing_router
from app.api import users as users_router
from app.core.config import settings


def create_app() -> FastAPI:
    app = FastAPI(title="Profile Service", version="1.0.0")

    app.add_middleware(
        CORSMiddleware,
        allow_origins=list(settings.cors_origins),
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*", settings.session_header],
        expose_headers=[settings.session_header],
    )

    app.include_router(users_router.router, prefix="/api")
    app.include_router(landing_router.router, prefix="/api")

    @app.get("/health", tags=["meta"])
    def health() -> dict[str, str]:
        return {"status": "ok", "service": "profile"}

    return app


app = create_app()
