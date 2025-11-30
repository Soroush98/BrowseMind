"""
Authentication service - core business logic for authentication.
"""
import os
from datetime import datetime, timedelta, timezone
from typing import Tuple

from ..schemas.auth import User, LoginRequest, RegisterRequest, ConfirmEmailRequest
from ..repositories.user_repository import UserRepository
from .password_service import PasswordHasher
from .token_service import TokenService, CONFIRMATION_TOKEN_EXPIRY_HOURS
from .email_service import EmailService


class AuthenticationError(Exception):
    """Base exception for authentication errors."""

    pass


class InvalidCredentialsError(AuthenticationError):
    """Raised when credentials are invalid."""

    pass


class EmailNotConfirmedError(AuthenticationError):
    """Raised when email is not confirmed."""

    def __init__(self, email: str):
        self.email = email
        super().__init__("Please confirm your email address before logging in")


class UserAlreadyExistsError(AuthenticationError):
    """Raised when user already exists."""

    pass


class PendingConfirmationError(AuthenticationError):
    """Raised when a confirmation is already pending."""

    pass


class InvalidConfirmationError(AuthenticationError):
    """Raised when confirmation link/token is invalid."""

    pass


class ConfirmationExpiredError(AuthenticationError):
    """Raised when confirmation link has expired."""

    pass


class NoPendingRegistrationError(AuthenticationError):
    """Raised when no pending registration is found."""

    pass


class AuthService:
    """Service for authentication operations."""

    def __init__(
        self,
        user_repository: UserRepository,
        password_hasher: PasswordHasher,
        token_service: TokenService,
        email_service: EmailService,
        domain: str,
    ):
        self._user_repo = user_repository
        self._hasher = password_hasher
        self._token_service = token_service
        self._email_service = email_service
        self._domain = domain

    def login(self, request: LoginRequest) -> str:
        """
        Authenticate a user and return a JWT token.
        
        Raises:
            InvalidCredentialsError: If email/password is invalid
            EmailNotConfirmedError: If email is not confirmed
        """
        user = self._user_repo.get_by_email(request.email)

        if not user:
            raise InvalidCredentialsError()

        if not self._hasher.verify(request.password, user.password):
            raise InvalidCredentialsError()

        if not user.confirmed:
            raise EmailNotConfirmedError(request.email)

        return self._token_service.create_access_token(request.email)

    def register(self, request: RegisterRequest) -> None:
        """
        Register a new user and send confirmation email.
        
        Raises:
            UserAlreadyExistsError: If user is already confirmed
            PendingConfirmationError: If confirmation is pending
        """
        existing_user = self._user_repo.get_by_email(request.email)

        if existing_user:
            if existing_user.confirmed:
                raise UserAlreadyExistsError()
            raise PendingConfirmationError()

        # Generate confirmation token
        confirmation_token = self._token_service.generate_confirmation_token()
        now = datetime.now(timezone.utc)

        # Create pending user
        user = User(
            email=request.email,
            password=self._hasher.hash(request.password),
            confirmation_token=confirmation_token,
            created_at=str(now),
            expires_at=str(now + timedelta(hours=CONFIRMATION_TOKEN_EXPIRY_HOURS)),
        )
        self._user_repo.create(user)

        # Send confirmation email
        confirmation_url = (
            f"{self._domain}/confirm-email?token={confirmation_token}&email={request.email}"
        )
        self._email_service.send_confirmation_email(request.email, confirmation_url)

    def confirm_email(self, request: ConfirmEmailRequest) -> None:
        """
        Confirm a user's email address.
        
        Raises:
            InvalidConfirmationError: If link/token is invalid
            ConfirmationExpiredError: If link has expired
        """
        user = self._user_repo.get_by_email(request.email)

        if not user:
            raise InvalidConfirmationError()

        if user.confirmation_token != request.token:
            raise InvalidConfirmationError()

        # Check if expired
        expires_at = datetime.fromisoformat(user.expires_at)
        if datetime.now(timezone.utc).replace(tzinfo=None) > expires_at:
            self._user_repo.delete(request.email)
            raise ConfirmationExpiredError()

        # Create confirmed user
        confirmed_user = User(
            email=request.email,
            password=user.password,
            provider="email",
            confirmed=True,
            created_at=str(datetime.now(timezone.utc)),
        )
        self._user_repo.create(confirmed_user)

    def resend_confirmation(self, email: str) -> None:
        """
        Resend confirmation email.
        
        Raises:
            UserAlreadyExistsError: If email is already confirmed
            NoPendingRegistrationError: If no pending registration exists
        """
        user = self._user_repo.get_by_email(email)

        if user and user.confirmed:
            raise UserAlreadyExistsError()

        if not user:
            raise NoPendingRegistrationError()

        # Generate new confirmation token
        confirmation_token = self._token_service.generate_confirmation_token()
        expires_at = str(
            datetime.now(timezone.utc) + timedelta(hours=CONFIRMATION_TOKEN_EXPIRY_HOURS)
        )

        self._user_repo.update_confirmation_token(email, confirmation_token, expires_at)

        # Send new confirmation email
        confirmation_url = (
            f"{self._domain}/confirm-email?token={confirmation_token}&email={email}"
        )
        self._email_service.send_confirmation_email(email, confirmation_url)
