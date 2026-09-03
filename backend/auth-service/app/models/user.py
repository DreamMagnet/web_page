"""Pydantic schemas exposed by the auth service."""

from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, EmailStr, Field


class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6, max_length=128)
    full_name: str = Field(min_length=1, max_length=120)
    phone: str = Field(min_length=3, max_length=30)
    address: str = Field(min_length=1, max_length=200)


class UserLogin(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=128)


class UserPublic(BaseModel):
    id: str
    email: EmailStr
    full_name: str
    phone: str
    created_at: datetime
    updated_at: datetime


class LoginResponse(BaseModel):
    user: UserPublic
    session_token: str
