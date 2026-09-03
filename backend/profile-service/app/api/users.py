"""Current-user profile endpoints."""

from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status

from app.api.deps import get_current_user, get_session_token
from app.models.user import UserPublic, UserUpdate
from app.services import user_service
from app.services.user_service import UserNotFoundError


router = APIRouter(prefix="/users", tags=["users"])


@router.get("/me", response_model=UserPublic)
def read_me(current_user: UserPublic = Depends(get_current_user)) -> UserPublic:
    return current_user


@router.put("/me", response_model=UserPublic)
def update_me(
    payload: UserUpdate,
    token: str = Depends(get_session_token),
    _: UserPublic = Depends(get_current_user),
) -> UserPublic:
    try:
        return user_service.update_user(token, payload)
    except UserNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired session",
        )
