from fastapi import APIRouter, HTTPException
from app.models.schemas import ChatRequest, ChatResponse
from app.rag.rag_chain import RAGChain

router = APIRouter(prefix="/api/chat", tags=["Conversational RAG Chat"])


@router.post("/query", response_model=ChatResponse)
async def query_insight_rag(request: ChatRequest):
    """Query InsightRAG using semantic vector search and augmented generation."""
    if not request.message.strip():
        raise HTTPException(status_code=400, detail="Query message cannot be empty.")
    return await RAGChain.ask(
        query=request.message,
        session_id=request.session_id or "default-session",
        top_k=request.top_k or 4,
    )
