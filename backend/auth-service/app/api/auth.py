"""Authentication endpoints: register, login, logout."""

from __future__ import annotations

import httpx
from fastapi import APIRouter, Header, HTTPException, Response, status

from app.core.config import settings
from app.models.user import LoginResponse, UserCreate, UserLogin
from app.services import user_service
from app.services.user_service import EmailAlreadyExistsError, InvalidCredentialsError


router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=LoginResponse, status_code=status.HTTP_201_CREATED)
def register(payload: UserCreate) -> LoginResponse:
    try:
        user, token = user_service.create_user(payload)
    except EmailAlreadyExistsError:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email is already registered",
        )
    return LoginResponse(user=user, session_token=token)


@router.post("/login", response_model=LoginResponse)
def login(payload: UserLogin) -> LoginResponse:
    try:
        user, token = user_service.authenticate(payload.email, payload.password)
    except InvalidCredentialsError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )
    return LoginResponse(user=user, session_token=token)


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT, response_class=Response)
def logout(
    x_session_id: str | None = Header(default=None, alias="X-Session-Id"),
) -> Response:
    if not x_session_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Missing {settings.session_header} header",
        )
    user_service.revoke_session(x_session_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.get("/profile")
def read_profile_from_profile_service(
    x_session_id: str | None = Header(default=None, alias="X-Session-Id"),
) -> dict:
    if not x_session_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Missing {settings.session_header} header",
        )

    profile_url = f"{settings.profile_service_url.rstrip('/')}/api/users/me"
    try:
        response = httpx.get(
            profile_url,
            headers={settings.session_header: x_session_id},
            timeout=5,
        )
    except httpx.RequestError:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Profile service is unavailable",
        )

    if response.status_code == status.HTTP_401_UNAUTHORIZED:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired session",
        )
    if response.status_code >= 400:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Profile service returned an error",
        )

    return response.json()
