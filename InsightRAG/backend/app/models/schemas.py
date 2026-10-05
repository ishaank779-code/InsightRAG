from datetime import datetime
from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field


class DocumentMetadata(BaseModel):
    doc_id: str
    filename: str
    file_type: str
    size_bytes: int
    chunk_count: int
    upload_timestamp: str = Field(default_factory=lambda: datetime.utcnow().isoformat())


class DocumentChunk(BaseModel):
    chunk_id: str
    doc_id: str
    filename: str
    content: str
    chunk_index: int
    embedding: Optional[List[float]] = None


class Citation(BaseModel):
    doc_id: str
    filename: str
    content: str
    similarity_score: float


class ChatMessage(BaseModel):
    role: str  # "user" or "assistant"
    content: str
    timestamp: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
    citations: Optional[List[Citation]] = None


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, description="User query message")
    session_id: Optional[str] = "default-session"
    top_k: int = 4


class ChatResponse(BaseModel):
    answer: str
    session_id: str
    citations: List[Citation] = Field(default_factory=list)
    latency_ms: float
    timestamp: str = Field(default_factory=lambda: datetime.utcnow().isoformat())


class DocumentUploadResponse(BaseModel):
    message: str
    doc_id: str
    filename: str
    chunk_count: int


class SystemStatusResponse(BaseModel):
    status: str
    total_documents: int
    total_chunks: int
    vectorstore_ready: bool
    active_model: str
