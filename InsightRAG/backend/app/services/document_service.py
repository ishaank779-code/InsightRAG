import uuid
import json
from pathlib import Path
from typing import List, Dict, Any
from app.core.config import settings
from app.models.schemas import DocumentMetadata, DocumentChunk, DocumentUploadResponse
from app.rag.document_loader import DocumentLoader
from app.rag.text_splitter import RecursiveCharacterTextSplitter
from app.rag.embeddings import embedding_generator
from app.rag.vector_store import vector_store


class DocumentService:
    def __init__(self):
        self.meta_file = settings.DATA_DIR / "documents_meta.json"
        self.splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
        self.documents: Dict[str, DocumentMetadata] = {}
        self._load_meta()
        self._seed_default_docs_if_empty()

    def _load_meta(self):
        if self.meta_file.exists():
            try:
                with open(self.meta_file, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    self.documents = {k: DocumentMetadata(**v) for k, v in data.items()}
            except Exception:
                self.documents = {}

    def _save_meta(self):
        data = {k: v.dict() for k, v in self.documents.items()}
        with open(self.meta_file, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)

    def _seed_default_docs_if_empty(self):
        if not self.documents:
            sample_docs = [
                {
                    "filename": "Enterprise_Insight_RAG_Overview.md",
                    "content": """# Enterprise InsightRAG Overview

InsightRAG is an enterprise intelligent retrieval-augmented generation engine designed for complex knowledge synthesis.
It combines multi-format file parsing, semantic dense embedding vectors, and conversational prompt augmentation to produce accurate, hallucination-free answers.

Architecture Highlights:
1. Document Parsing: Extracts structured text from PDF, Markdown, and TXT files.
2. Recursive Text Chunking: Splits long-form text into overlapping chunks (500 chars with 50-char overlap).
3. Embedding Pipeline: Projects text into vector representations using high-dimensional embeddings.
4. Cosine Similarity Vector Index: Enables sub-second retrieval of pertinent knowledge fragments.
5. Grounded Generation: Integrates retrieved snippets with citations directly in the LLM response.
""",
                },
                {
                    "filename": "InsightRAG_Compliance_Security.txt",
                    "content": """InsightRAG Enterprise Compliance & Security Guidelines

Data in transit and at rest is secured using enterprise standards.
Multi-tenant document isolation ensures embeddings are partitioned per organization workspace.
Automated audit logs track all retrieval operations, user queries, and vector eviction lifecycles.
Citations provide verifiable proof and auditability for every generated response.
""",
                },
            ]

            for s in sample_docs:
                self.process_document(
                    filename=s["filename"],
                    content=s["content"].encode("utf-8"),
                )

    def process_document(self, filename: str, content: bytes) -> DocumentUploadResponse:
        doc_id = f"doc-{uuid.uuid4().hex[:8]}"
        text = DocumentLoader.load_from_bytes(content, filename)
        raw_chunks = self.splitter.split_text(text)

        chunks: List[DocumentChunk] = []
        for idx, chunk_text in enumerate(raw_chunks):
            chunk_id = f"chunk-{uuid.uuid4().hex[:8]}"
            emb = embedding_generator.embed_text(chunk_text)
            chunks.append(
                DocumentChunk(
                    chunk_id=chunk_id,
                    doc_id=doc_id,
                    filename=filename,
                    content=chunk_text,
                    chunk_index=idx,
                    embedding=emb,
                )
            )

        vector_store.add_chunks(chunks)

        meta = DocumentMetadata(
            doc_id=doc_id,
            filename=filename,
            file_type=Path(filename).suffix or ".txt",
            size_bytes=len(content),
            chunk_count=len(chunks),
        )
        self.documents[doc_id] = meta
        self._save_meta()

        save_path = settings.SAMPLE_DOCS_DIR / filename
        with open(save_path, "wb") as f:
            f.write(content)

        return DocumentUploadResponse(
            message="Document indexed successfully into InsightRAG vector store.",
            doc_id=doc_id,
            filename=filename,
            chunk_count=len(chunks),
        )

    def list_documents(self) -> List[DocumentMetadata]:
        return list(self.documents.values())

    def delete_document(self, doc_id: str) -> bool:
        if doc_id in self.documents:
            del self.documents[doc_id]
            self._save_meta()
            vector_store.delete_document(doc_id)
            return True
        return False


document_service = DocumentService()
