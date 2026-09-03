"""Pydantic schemas exposed by the profile service."""

from __future__ import annotations

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field


class UserUpdate(BaseModel):
    full_name: Optional[str] = Field(default=None, min_length=1, max_length=120)
    phone: Optional[str] = Field(default=None, min_length=3, max_length=30)
    new_password: Optional[str] = Field(default=None, min_length=6, max_length=128)


class UserPublic(BaseModel):
    id: str
    email: EmailStr
    full_name: str
    phone: str
    created_at: datetime
    updated_at: datetime
