"""Public landing-page content served by the profile service."""

from __future__ import annotations

from fastapi import APIRouter
from pydantic import BaseModel


router = APIRouter(prefix="/landing", tags=["landing"])


class Feature(BaseModel):
    title: str
    description: str
    icon: str


class LandingContent(BaseModel):
    hero_title: str
    hero_subtitle: str
    features: list[Feature]


_CONTENT = LandingContent(
    hero_title="Build faster with a modern stack",
    hero_subtitle="Angular on the front, FastAPI microservices on the back.",
    features=[
        Feature(
            title="Secure auth",
            description="Dedicated auth microservice with bcrypt-hashed passwords.",
            icon="shield",
        ),
        Feature(
            title="Independent services",
            description="Auth and profile scale independently behind a shared data layer.",
            icon="layers",
        ),
        Feature(
            title="Reactive UI",
            description="Signals-first Angular components with route guards and interceptors.",
            icon="sparkles",
        ),
    ],
)


@router.get("", response_model=LandingContent)
def get_landing_content() -> LandingContent:
    return _CONTENT
