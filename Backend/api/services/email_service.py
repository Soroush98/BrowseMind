"""
Email service for sending emails.
"""
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from abc import ABC, abstractmethod


class EmailService(ABC):
    """Abstract base class for email services."""

    @abstractmethod
    def send_confirmation_email(self, email: str, confirmation_url: str) -> None:
        """Send a confirmation email."""
        pass


class SMTPEmailService(EmailService):
    """SMTP-based email service."""

    def __init__(
        self,
        smtp_host: str,
        smtp_port: int,
        smtp_user: str,
        smtp_password: str,
    ):
        self._host = smtp_host
        self._port = smtp_port
        self._user = smtp_user
        self._password = smtp_password

    def send_confirmation_email(self, email: str, confirmation_url: str) -> None:
        """Send confirmation email to user."""
        if not self._user or not self._password:
            print("SMTP credentials not configured, skipping email")
            return

        try:
            msg = MIMEMultipart()
            msg["From"] = self._user
            msg["To"] = email
            msg["Subject"] = "Confirm your BrowseMind account"

            body = f"""
        Welcome to BrowseMind!

        Please confirm your email address by clicking the link below:
        {confirmation_url}

        This link will expire in 24 hours.

        If you didn't create an account with BrowseMind, you can safely ignore this email.

        Best regards,
        The BrowseMind Team
        """

            msg.attach(MIMEText(body, "plain"))

            server = smtplib.SMTP(self._host, self._port)
            server.starttls()
            server.login(self._user, self._password)
            text = msg.as_string()
            server.sendmail(self._user, email, text)
            server.quit()

        except Exception as e:
            print(f"Error sending email: {e}")
            raise EmailSendError("Failed to send confirmation email")


class EmailSendError(Exception):
    """Exception raised when email sending fails."""

    pass


# Factory function to create email service from environment
def create_email_service() -> SMTPEmailService:
    """Create an email service from environment variables."""
    return SMTPEmailService(
        smtp_host=os.environ.get("SMTP_HOST", ""),
        smtp_port=int(os.environ.get("SMTP_PORT", 587)),
        smtp_user=os.environ.get("SMTP_USER", ""),
        smtp_password=os.environ.get("SMTP_PASSWORD", ""),
    )
