"""Password hashing utilities (only used when the user changes their password)."""

from __future__ import annotations

import bcrypt


_BCRYPT_MAX_BYTES = 72


def _to_bcrypt_input(plain: str) -> bytes:
    return plain.encode("utf-8")[:_BCRYPT_MAX_BYTES]


def hash_password(plain: str) -> str:
    return bcrypt.hashpw(_to_bcrypt_input(plain), bcrypt.gensalt()).decode("utf-8")
