from typing import List
from app.models.schemas import Citation
from app.rag.embeddings import embedding_generator
from app.rag.vector_store import vector_store


class Retriever:
    @staticmethod
    def retrieve(query: str, top_k: int = 4, min_score: float = 0.05) -> List[Citation]:
        query_embedding = embedding_generator.embed_query(query)
        matches = vector_store.similarity_search(query_embedding, top_k=top_k)

        citations: List[Citation] = []
        for chunk, score in matches:
            if score >= min_score or len(citations) < 2:
                citations.append(
                    Citation(
                        doc_id=chunk.doc_id,
                        filename=chunk.filename,
                        content=chunk.content,
                        similarity_score=round(score, 4),
                    )
                )

        return citations
