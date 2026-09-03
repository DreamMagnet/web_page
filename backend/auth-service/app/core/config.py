"""Auth service settings loaded from environment variables."""

from __future__ import annotations

import os
from dataclasses import dataclass, field
from pathlib import Path


# Points at backend/ (two levels above app/core/): backend/auth-service/app/core/../../.. == backend/
BASE_DIR = Path(__file__).resolve().parent.parent.parent.parent


@dataclass(frozen=True)
class Settings:
    data_file: Path = field(
        default_factory=lambda: (BASE_DIR / os.getenv("DATA_FILE", "data/users.json")).resolve()
    )
    cors_origins: tuple[str, ...] = field(
        default_factory=lambda: tuple(
            origin.strip()
            for origin in os.getenv("CORS_ORIGINS", "http://localhost:4200").split(",")
            if origin.strip()
        )
    )
    profile_service_url: str = os.getenv("PROFILE_SERVICE_URL", "http://localhost:8002")
    session_header: str = "X-Session-Id"


settings = Settings()
