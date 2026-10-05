import time
from typing import List
from app.models.schemas import ChatResponse, Citation
from app.rag.retriever import Retriever
from app.services.llm_service import llm_service


class RAGChain:
    @staticmethod
    async def ask(query: str, session_id: str = "default-session", top_k: int = 4) -> ChatResponse:
        start_time = time.perf_counter()

        # 1. Retrieve top-k context citations
        citations: List[Citation] = Retriever.retrieve(query, top_k=top_k)

        # 2. Build augmented prompt
        context_str = ""
        for i, c in enumerate(citations):
            context_str += f"\n--- Document [{i+1}]: {c.filename} ---\n{c.content}\n"

        prompt = f"""
You are InsightRAG AI, an enterprise-grade Retrieval-Augmented Generation (RAG) assistant.
Answer the user's question accurately using ONLY the provided document context.
If the context does not contain enough information, state clearly that the answer cannot be found in the current documents.

USER QUESTION:
{query}

RETRIEVED DOCUMENT CONTEXT:
{context_str}

Format your answer with clear bullet points, concise explanations, and cite the document names where relevant.
"""

        # 3. Generate answer
        answer = None
        if llm_service.is_available:
            answer = await llm_service.generate_response(prompt)

        # Grounded fallback generation if LLM is offline or unconfigured
        if not answer:
            if citations:
                top_citation = citations[0]
                answer = (
                    f"Based on **{top_citation.filename}**:\n\n"
                    f"{top_citation.content[:350]}...\n\n"
                    f"*Synthesized from {len(citations)} relevant knowledge chunk(s).*"
                )
            else:
                answer = "No matching documents found in InsightRAG. Please upload relevant files into the knowledge base to enable RAG answering."

        latency_ms = round((time.perf_counter() - start_time) * 1000.0, 2)

        return ChatResponse(
            answer=answer,
            session_id=session_id,
            citations=citations,
            latency_ms=latency_ms,
        )
