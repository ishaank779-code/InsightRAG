from fastapi import APIRouter, UploadFile, File, HTTPException
from typing import List
from app.models.schemas import DocumentMetadata, DocumentUploadResponse, SystemStatusResponse
from app.services.document_service import document_service
from app.rag.vector_store import vector_store
from app.core.config import settings
from app.core.security import sanitize_filename

router = APIRouter(prefix="/api/documents", tags=["Document Management & Vector Ingestion"])


@router.post("/upload", response_model=DocumentUploadResponse)
async def upload_document(file: UploadFile = File(...)):
    """Upload and index a document into the InsightRAG vector database."""
    if not file.filename:
        raise HTTPException(status_code=400, detail="Missing file name.")
    
    clean_name = sanitize_filename(file.filename)
    content = await file.read()
    
    if len(content) == 0:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")

    return document_service.process_document(clean_name, content)


@router.get("", response_model=List[DocumentMetadata])
async def list_documents():
    """List all indexed documents in InsightRAG."""
    return document_service.list_documents()


@router.delete("/{doc_id}")
async def delete_document(doc_id: str):
    """Delete a document and its embeddings from the vector index."""
    success = document_service.delete_document(doc_id)
    if not success:
        raise HTTPException(status_code=404, detail="Document not found.")
    return {"message": f"Document {doc_id} deleted successfully."}


@router.get("/status", response_model=SystemStatusResponse)
async def get_system_status():
    """Retrieve system status and vector store indexing counts."""
    docs = document_service.list_documents()
    return SystemStatusResponse(
        status="healthy",
        total_documents=len(docs),
        total_chunks=vector_store.count(),
        vectorstore_ready=True,
        active_model=settings.GEMINI_MODEL,
    )
