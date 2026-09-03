"""Password hashing and session token utilities."""

from __future__ import annotations

import secrets

import bcrypt


_BCRYPT_MAX_BYTES = 72


def _to_bcrypt_input(plain: str) -> bytes:
    return plain.encode("utf-8")[:_BCRYPT_MAX_BYTES]


def hash_password(plain: str) -> str:
    return bcrypt.hashpw(_to_bcrypt_input(plain), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(_to_bcrypt_input(plain), hashed.encode("utf-8"))
    except (ValueError, TypeError):
        return False


def new_session_token() -> str:
    return secrets.token_hex(32)
