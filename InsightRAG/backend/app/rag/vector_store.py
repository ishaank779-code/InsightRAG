import json
import math
from pathlib import Path
from typing import List, Dict, Any, Tuple
from app.core.config import settings
from app.models.schemas import DocumentChunk


class VectorStore:
    def __init__(self):
        self.store_file = settings.VECTOR_STORE_DIR / "index.json"
        self.chunks: List[DocumentChunk] = []
        self._load()

    def _load(self):
        if self.store_file.exists():
            try:
                with open(self.store_file, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    self.chunks = [DocumentChunk(**item) for item in data]
            except Exception:
                self.chunks = []
        else:
            self.chunks = []

    def _save(self):
        data = [chunk.dict() for chunk in self.chunks]
        with open(self.store_file, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)

    def add_chunks(self, chunks: List[DocumentChunk]):
        self.chunks.extend(chunks)
        self._save()

    def delete_document(self, doc_id: str):
        self.chunks = [c for c in self.chunks if c.doc_id != doc_id]
        self._save()

    def clear(self):
        self.chunks = []
        self._save()

    @staticmethod
    def _cosine_similarity(vec1: List[float], vec2: List[float]) -> float:
        if not vec1 or not vec2 or len(vec1) != len(vec2):
            return 0.0
        dot = sum(a * b for a, b in zip(vec1, vec2))
        norm1 = math.sqrt(sum(a * a for a in vec1))
        norm2 = math.sqrt(sum(b * b for b in vec2))
        if norm1 == 0 or norm2 == 0:
            return 0.0
        return dot / (norm1 * norm2)

    def similarity_search(self, query_embedding: List[float], top_k: int = 4) -> List[Tuple[DocumentChunk, float]]:
        if not self.chunks:
            return []

        scored: List[Tuple[DocumentChunk, float]] = []
        for chunk in self.chunks:
            if chunk.embedding:
                score = self._cosine_similarity(query_embedding, chunk.embedding)
            else:
                score = 0.0
            scored.append((chunk, score))

        scored.sort(key=lambda x: x[1], reverse=True)
        return scored[:top_k]

    def count(self) -> int:
        return len(self.chunks)


vector_store = VectorStore()
