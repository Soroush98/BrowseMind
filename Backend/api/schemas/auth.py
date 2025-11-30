"""
Authentication schemas for request/response validation.
"""
from dataclasses import dataclass
from typing import Optional


@dataclass
class LoginRequest:
    email: str
    password: str

    @classmethod
    def from_dict(cls, data: dict) -> "LoginRequest":
        email = data.get("email")
        password = data.get("password")
        if not email or not password:
            raise ValueError("Email and password required")
        return cls(email=email, password=password)


@dataclass
class RegisterRequest:
    email: str
    password: str

    @classmethod
    def from_dict(cls, data: dict) -> "RegisterRequest":
        email = data.get("email")
        password = data.get("password")
        if not email or not password:
            raise ValueError("Email and password required")
        return cls(email=email, password=password)


@dataclass
class ConfirmEmailRequest:
    email: str
    token: str

    @classmethod
    def from_dict(cls, data: dict) -> "ConfirmEmailRequest":
        email = data.get("email")
        token = data.get("token")
        if not email or not token:
            raise ValueError("Email and token required")
        return cls(email=email, token=token)


@dataclass
class ResendConfirmationRequest:
    email: str

    @classmethod
    def from_dict(cls, data: dict) -> "ResendConfirmationRequest":
        email = data.get("email")
        if not email:
            raise ValueError("Email required")
        return cls(email=email)


@dataclass
class User:
    email: str
    password: str
    provider: Optional[str] = None
    confirmed: bool = False
    confirmation_token: Optional[str] = None
    created_at: Optional[str] = None
    expires_at: Optional[str] = None
