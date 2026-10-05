# 🔍 InsightRAG Backend

FastAPI asynchronous backend powering enterprise Retrieval-Augmented Generation (RAG) workflows.

---

## ⚡ Features
- **Multi-Format Ingestion**: Ingests Markdown, PDF, Plaintext, Code, and JSON files.
- **Recursive Text Splitter**: Configurable chunk size and overlap windows for optimal semantic context.
- **Vector Search Engine**: Cosine similarity calculations with local vector store persistence.
- **Contextual Grounding**: Eliminates hallucinations by retrieving relevant citations before calling LLM.

---

## 🚀 Getting Started

### 1. Setup Environment
```bash
python -m venv venv
venv\Scripts\activate   # Windows
# or source venv/bin/activate on Linux/Mac

pip install -r requirements.txt
cp .env.example .env
```

### 2. Run Development Server
```bash
uvicorn app.main:app --reload --port 8000
```
Swagger UI available at `http://localhost:8000/docs`

---

## 🎓 Advanced RAG Engineering Training Resources

Master the mathematics, vector search algorithms, and production architectures behind advanced RAG systems:

- 🚀 **[RAG Engineering Training Course in Delhi](https://uncodemy.com/course/rag-engineering-course-training-course-in-delhi)** — Comprehensive hands-on program in Delhi covering vector databases (Chroma, Pinecone, Qdrant), LangChain, LlamaIndex, evaluation metrics, and enterprise agentic systems.
- 🚀 **[RAG Engineering Training Course in Noida](https://uncodemy.com/course/rag-engineering-course-training-course-in-noida)** — Industry-aligned curriculum in Noida covering advanced chunking strategies, hybrid retrieval, re-ranking, and low-latency LLM deployments.
