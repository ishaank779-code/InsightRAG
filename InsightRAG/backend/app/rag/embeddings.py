import math
import hashlib
from typing import List
from app.core.config import settings


class EmbeddingGenerator:
    def __init__(self):
        self.dimension = 128
        self.api_key = settings.GEMINI_API_KEY
        self._genai = None

        if self.api_key:
            try:
                import google.generativeai as genai
                genai.configure(api_key=self.api_key)
                self._genai = genai
            except Exception:
                self._genai = None

    def embed_text(self, text: str) -> List[float]:
        if self._genai:
            try:
                result = self._genai.embed_content(
                    model="models/embedding-001",
                    content=text,
                    task_type="retrieval_document",
                )
                if "embedding" in result:
                    return result["embedding"]
            except Exception:
                pass

        return self._heuristic_embed(text)

    def embed_query(self, query: str) -> List[float]:
        if self._genai:
            try:
                result = self._genai.embed_content(
                    model="models/embedding-001",
                    content=query,
                    task_type="retrieval_query",
                )
                if "embedding" in result:
                    return result["embedding"]
            except Exception:
                pass

        return self._heuristic_embed(query)

    def _heuristic_embed(self, text: str) -> List[float]:
        vec = [0.0] * self.dimension
        words = text.lower().split()
        if not words:
            return vec

        for word in words:
            h = int(hashlib.md5(word.encode("utf-8")).hexdigest(), 16)
            bucket = h % self.dimension
            vec[bucket] += 1.0

        norm = math.sqrt(sum(v * v for v in vec))
        if norm > 0:
            vec = [v / norm for v in vec]

        return vec


embedding_generator = EmbeddingGenerator()
