"""
JWT token service.
"""
import jwt
import secrets
from datetime import datetime, timedelta, timezone
from typing import Optional

# Constants
TOKEN_EXPIRY_DAYS = 7
CONFIRMATION_TOKEN_EXPIRY_HOURS = 24


class TokenService:
    """Service for JWT token operations."""

    def __init__(self, secret_key: str):
        self._secret_key = secret_key
        self._algorithm = "HS256"

    def create_access_token(self, email: str) -> str:
        """Create a JWT access token for a user."""
        payload = {
            "email": email,
            "exp": datetime.now(timezone.utc) + timedelta(days=TOKEN_EXPIRY_DAYS),
        }
        return jwt.encode(payload, self._secret_key, algorithm=self._algorithm)

    def decode_token(self, token: str) -> Optional[dict]:
        """Decode and validate a JWT token."""
        try:
            return jwt.decode(token, self._secret_key, algorithms=[self._algorithm])
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None

    def get_email_from_token(self, token: str) -> Optional[str]:
        """Extract email from a JWT token."""
        payload = self.decode_token(token)
        return payload.get("email") if payload else None

    @staticmethod
    def generate_confirmation_token() -> str:
        """Generate a secure random confirmation token."""
        return secrets.token_urlsafe(32)

    @staticmethod
    def get_token_expiry_seconds() -> int:
        """Get token expiry in seconds."""
        return TOKEN_EXPIRY_DAYS * 24 * 60 * 60
