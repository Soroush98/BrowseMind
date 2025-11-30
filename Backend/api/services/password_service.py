"""
Password hashing service.
"""
import hashlib
from abc import ABC, abstractmethod


class PasswordHasher(ABC):
    """Abstract base class for password hashing."""

    @abstractmethod
    def hash(self, password: str) -> str:
        """Hash a password."""
        pass

    @abstractmethod
    def verify(self, password: str, hashed: str) -> bool:
        """Verify a password against a hash."""
        pass


class SHA256PasswordHasher(PasswordHasher):
    """
    SHA256 password hasher.
    
    Note: For production, consider using bcrypt or argon2 instead.
    This maintains backward compatibility with existing passwords.
    """

    def hash(self, password: str) -> str:
        """Hash a password using SHA256."""
        return hashlib.sha256(password.encode("utf-8")).hexdigest()

    def verify(self, password: str, hashed: str) -> bool:
        """Verify a password against a SHA256 hash."""
        return self.hash(password) == hashed


# Default instance for convenience
password_hasher = SHA256PasswordHasher()
