# Enterprise InsightRAG Overview

InsightRAG is an enterprise intelligent retrieval-augmented generation engine designed for complex knowledge synthesis.
It combines multi-format file parsing, semantic dense embedding vectors, and conversational prompt augmentation to produce accurate, hallucination-free answers.

Architecture Highlights:
1. Document Parsing: Extracts structured text from PDF, Markdown, and TXT files.
2. Recursive Text Chunking: Splits long-form text into overlapping chunks (500 chars with 50-char overlap).
3. Embedding Pipeline: Projects text into vector representations using high-dimensional embeddings.
4. Cosine Similarity Vector Index: Enables sub-second retrieval of pertinent knowledge fragments.
5. Grounded Generation: Integrates retrieved snippets with citations directly in the LLM response.
