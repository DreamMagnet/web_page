"""Auth-service business logic: registration, login, session revocation."""

from __future__ import annotations

import uuid
from datetime import datetime, timezone
from typing import Optional

from app.core.security import hash_password, new_session_token, verify_password
from app.db import json_store
from app.models.user import UserCreate, UserPublic


class EmailAlreadyExistsError(Exception):
    pass


class InvalidCredentialsError(Exception):
    pass


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


def _to_public(record: dict) -> UserPublic:
    return UserPublic(
        id=record["id"],
        email=record["email"],
        full_name=record["full_name"],
        phone=record.get("phone"),
        created_at=record["created_at"],
        updated_at=record["updated_at"],
    )


def _find_by_email(users: list[dict], email: str) -> Optional[dict]:
    lowered = email.lower()
    for u in users:
        if u.get("email", "").lower() == lowered:
            return u
    return None


def _find_by_session(users: list[dict], token: str) -> Optional[dict]:
    if not token:
        return None
    for u in users:
        if u.get("session_token") and u["session_token"] == token:
            return u
    return None


def create_user(payload: UserCreate) -> tuple[UserPublic, str]:
    data = json_store.read_all()
    users: list[dict] = data["users"]
    if _find_by_email(users, payload.email) is not None:
        raise EmailAlreadyExistsError(payload.email)

    now = _now()
    token = new_session_token()
    record = {
        "id": str(uuid.uuid4()),
        "email": payload.email,
        "password_hash": hash_password(payload.password),
        "full_name": payload.full_name,
        "address": payload.address,
        "session_token": token,
        "created_at": now,
        "updated_at": now,
    }
    users.append(record)
    json_store.write_all(data)
    return _to_public(record), token


def authenticate(email: str, password: str) -> tuple[UserPublic, str]:
    data = json_store.read_all()
    users: list[dict] = data["users"]
    record = _find_by_email(users, email)
    if record is None or not verify_password(password, record["password_hash"]):
        raise InvalidCredentialsError()

    token = new_session_token()
    record["session_token"] = token
    record["updated_at"] = _now()
    json_store.write_all(data)
    return _to_public(record), token


def revoke_session(token: str) -> None:
    data = json_store.read_all()
    record = _find_by_session(data["users"], token)
    if record is None:
        return
    record["session_token"] = None
    record["updated_at"] = _now()
    json_store.write_all(data)
