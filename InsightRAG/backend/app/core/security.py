import hashlib
import secrets


def hash_token(token: str) -> str:
    """Generate SHA-256 hash for secure token comparison."""
    return hashlib.sha256(token.encode("utf-8")).hexdigest()


def generate_session_id() -> str:
    """Generate a secure cryptographic session token."""
    return secrets.token_hex(16)


def sanitize_filename(filename: str) -> str:
    """Strip dangerous characters to prevent path traversal."""
    cleaned = "".join(c for c in filename if c.isalnum() or c in (".", "_", "-")).strip()
    return cleaned or "document.txt"
