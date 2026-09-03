"""Shared FastAPI dependencies for the profile service."""

from __future__ import annotations

from fastapi import Header, HTTPException, status

from app.core.config import settings
from app.models.user import UserPublic
from app.services import user_service


async def get_current_user(
    x_session_id: str | None = Header(default=None, alias="X-Session-Id"),
) -> UserPublic:
    if not x_session_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Missing {settings.session_header} header",
        )
    user = user_service.get_by_session(x_session_id)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired session",
        )
    return user


def get_session_token(
    x_session_id: str | None = Header(default=None, alias="X-Session-Id"),
) -> str:
    if not x_session_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Missing {settings.session_header} header",
        )
    return x_session_id
