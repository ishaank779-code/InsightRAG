import React, { useState, useEffect } from 'react';
import FileUpload from '../components/FileUpload';
import { api } from '../services/api';
import { 
  FileText, 
  Trash2, 
  ExternalLink, 
  GraduationCap, 
  Compass, 
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function Home({ setActiveTab, onDocUpdate }) {
  const [documents, setDocuments] = useState([]);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const docs = await api.listDocuments();
      setDocuments(docs || []);
      const st = await api.getSystemStatus();
      setStatus(st);
      if (onDocUpdate) onDocUpdate(docs.length);
    } catch (err) {
      console.error('Failed to load documents:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (docId) => {
    if (!confirm('Are you sure you want to remove this document and evict its vectors?')) return;
    try {
      await api.deleteDocument(docId);
      await loadData();
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete document.');
    }
  };

  return (
    <div style={{ padding: '32px 40px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#f8fafc', letterSpacing: '-0.02em' }}>
            Enterprise Knowledge Base & Vector Hub
          </h1>
          <p style={{ fontSize: '14px', color: '#94a3b8', marginTop: '4px' }}>
            Upload documentation, review vector chunk partitioning, and query your enterprise data.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('chat')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)',
            border: 'none',
            color: '#ffffff',
            fontWeight: '700',
            fontSize: '13px',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(14, 165, 233, 0.3)',
          }}
        >
          <Sparkles size={16} />
          Launch RAG Assistant &rarr;
        </button>
      </div>

      {/* 🎓 FEATURED RAG ENGINEERING TRAINING BANNER (DELHI & NOIDA INNERLINKS) */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)',
        border: '1px solid rgba(56, 189, 248, 0.3)',
        borderRadius: '16px',
        padding: '22px 28px',
        marginBottom: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 8px 30px rgba(56, 189, 248, 0.08)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', maxWidth: '65%' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: 'rgba(56, 189, 248, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#38bdf8',
            flexShrink: 0,
          }}>
            <GraduationCap size={26} />
          </div>
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#f8fafc', marginBottom: '4px' }}>
              Advanced RAG Engineering & AI Training
            </h2>
            <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.4' }}>
              Master enterprise vector embeddings, dense retrieval architectures, multi-tenant indexing, and automated evaluation metrics.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexShrink: 0 }}>
          <a
            href="https://uncodemy.com/course/rag-engineering-course-training-course-in-delhi"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 16px',
              borderRadius: '8px',
              backgroundColor: 'rgba(56, 189, 248, 0.12)',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              color: '#38bdf8',
              fontSize: '12px',
              fontWeight: '700',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
          >
            <span>RAG Training in Delhi</span>
            <ExternalLink size={14} />
          </a>

          <a
            href="https://uncodemy.com/course/rag-engineering-course-training-course-in-noida"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 16px',
              borderRadius: '8px',
              backgroundColor: 'rgba(167, 139, 250, 0.12)',
              border: '1px solid rgba(167, 139, 250, 0.4)',
              color: '#c084fc',
              fontSize: '12px',
              fontWeight: '700',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
          >
            <span>RAG Training in Noida</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px', marginBottom: '28px' }}>
        <div style={{
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '14px',
          padding: '20px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#94a3b8', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>Indexed Documents</span>
            <FileText size={18} color="#38bdf8" />
          </div>
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#f8fafc' }}>
            {documents.length}
          </div>
          <span style={{ fontSize: '11px', color: '#38bdf8', marginTop: '4px', display: 'block' }}>
            Multi-format corpora
          </span>
        </div>

        <div style={{
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '14px',
          padding: '20px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#94a3b8', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>Vector Chunks</span>
            <Layers size={18} color="#34d399" />
          </div>
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#34d399' }}>
            {status?.total_chunks ?? 10}
          </div>
          <span style={{ fontSize: '11px', color: '#6ee7b7', marginTop: '4px', display: 'block' }}>
            High-dimensional embeddings indexed
          </span>
        </div>

        <div style={{
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '14px',
          padding: '20px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#94a3b8', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>Vector Store Status</span>
            <Compass size={18} color="#a855f7" />
          </div>
          <div style={{ fontSize: '24px', fontWeight: '800', color: '#a855f7' }}>
            Online & Ready
          </div>
          <span style={{ fontSize: '11px', color: '#c084fc', marginTop: '4px', display: 'block' }}>
            Cosine similarity search active
          </span>
        </div>
      </div>

      {/* Document Uploader */}
      <div style={{ marginBottom: '32px' }}>
        <FileUpload onUploadSuccess={loadData} />
      </div>

      {/* Indexed Documents Table */}
      <div style={{
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        padding: '24px',
      }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#f8fafc', marginBottom: '16px' }}>
          Document Repository ({documents.length} Files Indexed)
        </h3>

        {documents.length === 0 ? (
          <p style={{ color: '#94a3b8', fontSize: '13px' }}>No documents uploaded yet. Upload your first document above!</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', color: '#64748b' }}>
                  <th style={{ padding: '12px 14px', fontWeight: '600' }}>Document Name</th>
                  <th style={{ padding: '12px 14px', fontWeight: '600' }}>Format</th>
                  <th style={{ padding: '12px 14px', fontWeight: '600' }}>File Size</th>
                  <th style={{ padding: '12px 14px', fontWeight: '600' }}>Chunks</th>
                  <th style={{ padding: '12px 14px', fontWeight: '600' }}>Uploaded At</th>
                  <th style={{ padding: '12px 14px', fontWeight: '600', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr key={doc.doc_id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)', color: '#e2e8f0' }}>
                    <td style={{ padding: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FileText size={16} color="#38bdf8" />
                      <span>{doc.filename}</span>
                    </td>
                    <td style={{ padding: '14px', color: '#94a3b8', textTransform: 'uppercase', fontSize: '11px', fontFamily: 'monospace' }}>
                      {doc.file_type}
                    </td>
                    <td style={{ padding: '14px', color: '#94a3b8' }}>
                      {(doc.size_bytes / 1024).toFixed(1)} KB
                    </td>
                    <td style={{ padding: '14px' }}>
                      <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '4px', backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', fontWeight: '600' }}>
                        {doc.chunk_count} chunks
                      </span>
                    </td>
                    <td style={{ padding: '14px', color: '#64748b', fontSize: '12px' }}>
                      {new Date(doc.upload_timestamp).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '14px', textAlign: 'right' }}>
                      <button
                        onClick={() => handleDelete(doc.doc_id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#ef4444',
                          cursor: 'pointer',
                          padding: '4px',
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
