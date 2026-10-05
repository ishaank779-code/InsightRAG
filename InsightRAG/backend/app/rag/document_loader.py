import io
from pathlib import Path


class DocumentLoader:
    @staticmethod
    def load_from_bytes(content: bytes, filename: str) -> str:
        """Extract text from uploaded file bytes (txt, md, json, csv, pdf)."""
        ext = Path(filename).suffix.lower()

        if ext in [".txt", ".md", ".json", ".csv", ".py", ".js"]:
            try:
                return content.decode("utf-8")
            except UnicodeDecodeError:
                return content.decode("latin-1", errors="replace")

        elif ext == ".pdf":
            try:
                import pypdf
                pdf_reader = pypdf.PdfReader(io.BytesIO(content))
                extracted_pages = []
                for page in pdf_reader.pages:
                    text = page.extract_text()
                    if text:
                        extracted_pages.append(text)
                return "\n\n".join(extracted_pages)
            except Exception as e:
                return f"[PDF Parsing Error: {str(e)}]"

        else:
            return content.decode("utf-8", errors="replace")

    @staticmethod
    def load_from_file(file_path: Path) -> str:
        with open(file_path, "rb") as f:
            return DocumentLoader.load_from_bytes(f.read(), file_path.name)
