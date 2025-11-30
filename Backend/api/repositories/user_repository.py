"""
User repository for data access layer.
Handles all DynamoDB operations for users.
"""
from typing import Optional
from ..schemas.auth import User


class UserRepository:
    """Repository for user data access."""

    def __init__(self, users_table):
        self._table = users_table

    def get_by_email(self, email: str) -> Optional[User]:
        """Retrieve a user by email."""
        response = self._table.get_item(Key={"email": email})
        item = response.get("Item")
        if not item:
            return None
        return User(
            email=item.get("email"),
            password=item.get("password"),
            provider=item.get("provider"),
            confirmed=item.get("confirmed", False),
            confirmation_token=item.get("confirmation_token"),
            created_at=item.get("created_at"),
            expires_at=item.get("expires_at"),
        )

    def create(self, user: User) -> None:
        """Create a new user."""
        item = {
            "email": user.email,
            "password": user.password,
        }
        if user.provider:
            item["provider"] = user.provider
        if user.confirmed:
            item["confirmed"] = user.confirmed
        if user.confirmation_token:
            item["confirmation_token"] = user.confirmation_token
        if user.created_at:
            item["created_at"] = user.created_at
        if user.expires_at:
            item["expires_at"] = user.expires_at
        self._table.put_item(Item=item)

    def update_confirmation_token(
        self, email: str, token: str, expires_at: str
    ) -> None:
        """Update user's confirmation token and expiry."""
        self._table.update_item(
            Key={"email": email},
            UpdateExpression="SET confirmation_token = :token, expires_at = :expires",
            ExpressionAttributeValues={":token": token, ":expires": expires_at},
        )

    def delete(self, email: str) -> None:
        """Delete a user by email."""
        self._table.delete_item(Key={"email": email})

    def exists(self, email: str) -> bool:
        """Check if a user exists."""
        return self.get_by_email(email) is not None
