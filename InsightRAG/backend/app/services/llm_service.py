import os
import logging
from typing import Optional
from app.core.config import settings

logger = logging.getLogger(__name__)


class LLMService:
    def __init__(self):
        self.api_key = settings.GEMINI_API_KEY or os.environ.get("GEMINI_API_KEY", "")
        self.model_name = settings.GEMINI_MODEL
        self._model = None

        if self.api_key:
            try:
                import google.generativeai as genai
                genai.configure(api_key=self.api_key)
                self._model = genai.GenerativeModel(self.model_name)
                logger.info("Gemini LLM model initialized for InsightRAG.")
            except Exception as e:
                logger.warning(f"Could not initialize Gemini model: {e}")
                self._model = None

    @property
    def is_available(self) -> bool:
        return self._model is not None

    async def generate_response(self, prompt: str) -> Optional[str]:
        if not self.is_available:
            return None
        try:
            res = self._model.generate_content(prompt)
            return res.text
        except Exception as e:
            logger.error(f"Error calling Gemini in InsightRAG: {e}")
            return None


llm_service = LLMService()
