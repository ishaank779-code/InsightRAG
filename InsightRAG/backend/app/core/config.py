from pathlib import Path
from typing import List
from pydantic_settings import BaseSettings

BASE_DIR = Path(__file__).resolve().parent.parent.parent.parent
BACKEND_DIR = Path(__file__).resolve().parent.parent.parent


class Settings(BaseSettings):
    APP_NAME: str = "InsightRAG"
    APP_ENV: str = "development"
    API_HOST: str = "0.0.0.0"
    API_PORT: int = 8000
    DEBUG: bool = True

    # Google Gemini LLM
    GEMINI_API_KEY: str = ""
    GEMINI_MODEL: str = "gemini-1.5-flash"

    # CORS
    CORS_ORIGINS: str = "http://localhost:3000,http://localhost:5173,http://127.0.0.1:5173"

    # Storage Paths
    VECTOR_STORE_DIR: Path = BASE_DIR / "vectorstore"
    DATA_DIR: Path = BASE_DIR / "data"
    SAMPLE_DOCS_DIR: Path = BASE_DIR / "data" / "sample_documents"
    SCREENSHOTS_DIR: Path = BASE_DIR / "screenshots"

    @property
    def cors_origins_list(self) -> List[str]:
        return [o.strip() for o in self.CORS_ORIGINS.split(",") if o.strip()]

    class Config:
        env_file = str(BACKEND_DIR / ".env")
        env_file_encoding = "utf-8"
        extra = "ignore"


settings = Settings()

# Ensure directories
for d in [settings.VECTOR_STORE_DIR, settings.DATA_DIR, settings.SAMPLE_DOCS_DIR, settings.SCREENSHOTS_DIR]:
    d.mkdir(parents=True, exist_ok=True)
