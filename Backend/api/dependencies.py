"""
Dependency injection container.
Creates and wires up all services with their dependencies.
"""
import os
from functools import lru_cache

from .helpers.jwt import users_table, SECRET_KEY
from .repositories.user_repository import UserRepository
from .services.password_service import SHA256PasswordHasher
from .services.token_service import TokenService
from .services.email_service import create_email_service
from .services.auth_service import AuthService


@lru_cache(maxsize=1)
def get_user_repository() -> UserRepository:
    """Get the user repository instance."""
    return UserRepository(users_table)


@lru_cache(maxsize=1)
def get_password_hasher() -> SHA256PasswordHasher:
    """Get the password hasher instance."""
    return SHA256PasswordHasher()


@lru_cache(maxsize=1)
def get_token_service() -> TokenService:
    """Get the token service instance."""
    return TokenService(SECRET_KEY)


@lru_cache(maxsize=1)
def get_email_service():
    """Get the email service instance."""
    return create_email_service()


@lru_cache(maxsize=1)
def get_auth_service() -> AuthService:
    """Get the auth service instance with all dependencies."""
    return AuthService(
        user_repository=get_user_repository(),
        password_hasher=get_password_hasher(),
        token_service=get_token_service(),
        email_service=get_email_service(),
        domain=os.environ.get("DOMAIN", ""),
    )


def get_email_from_request(request) -> str | None:
    """Extract email from JWT token in request cookies."""
    token = request.COOKIES.get("token")
    if not token:
        return None
    return get_token_service().get_email_from_token(token)
