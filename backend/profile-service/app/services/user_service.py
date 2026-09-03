"""Profile-service business logic: read + update the current user."""

from __future__ import annotations

from datetime import datetime, timezone
from typing import Optional

from app.core.security import hash_password
from app.db import json_store
from app.models.user import UserPublic, UserUpdate


class UserNotFoundError(Exception):
    pass


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


def _to_public(record: dict) -> UserPublic:
    return UserPublic(
        id=record["id"],
        email=record["email"],
        full_name=record["full_name"],
        phone=record["phone"],
        created_at=record["created_at"],
        updated_at=record["updated_at"],
    )


def _find_by_session(users: list[dict], token: str) -> Optional[dict]:
    if not token:
        return None
    for u in users:
        if u.get("session_token") and u["session_token"] == token:
            return u
    return None


def get_by_session(token: str) -> Optional[UserPublic]:
    data = json_store.read_all()
    record = _find_by_session(data["users"], token)
    return _to_public(record) if record else None


def update_user(token: str, payload: UserUpdate) -> UserPublic:
    data = json_store.read_all()
    record = _find_by_session(data["users"], token)
    if record is None:
        raise UserNotFoundError()

    if payload.full_name is not None:
        record["full_name"] = payload.full_name
    if payload.phone is not None:
        record["phone"] = payload.phone
    if payload.new_password is not None:
        record["password_hash"] = hash_password(payload.new_password)
    record["updated_at"] = _now()

    json_store.write_all(data)
    return _to_public(record)
