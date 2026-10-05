import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { api } from '../services/api';

export default function FileUpload({ onUploadSuccess }) {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);
  const fileInputRef = useRef(null);

  const handleFiles = async (files) => {
    if (!files || files.length === 0) return;
    const file = files[0];

    try {
      setUploading(true);
      setStatusMsg(null);
      const res = await api.uploadDocument(file);
      setStatusMsg({ type: 'success', text: `Indexed "${res.filename}" into ${res.chunk_count} semantic vector chunks!` });
      if (onUploadSuccess) onUploadSuccess();
    } catch (err) {
      console.error('Upload failed:', err);
      setStatusMsg({ type: 'error', text: err.response?.data?.detail || 'Failed to upload document.' });
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  return (
    <div style={{
      backgroundColor: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(16px)',
      border: `2px dashed ${dragActive ? '#38bdf8' : 'rgba(255, 255, 255, 0.12)'}`,
      borderRadius: '16px',
      padding: '32px 24px',
      textAlign: 'center',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
    }}
    onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
    onDragLeave={() => setDragActive(false)}
    onDrop={handleDrop}
    onClick={() => fileInputRef.current?.click()}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.md,.txt,.json,.csv"
        style={{ display: 'none' }}
        onChange={(e) => handleFiles(e.target.files)}
      />

      <div style={{
        width: '54px',
        height: '54px',
        borderRadius: '50%',
        backgroundColor: 'rgba(56, 189, 248, 0.12)',
        color: '#38bdf8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 16px',
      }}>
        {uploading ? <Loader2 size={26} className="animate-spin" /> : <UploadCloud size={26} />}
      </div>

      <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#f8fafc', marginBottom: '6px' }}>
        {uploading ? 'Parsing & Indexing into Vector Store...' : 'Drop files here or click to upload'}
      </h3>
      <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '14px' }}>
        Supports PDF, Markdown (.md), Plaintext (.txt), Code, and JSON documentation
      </p>

      <span style={{
        display: 'inline-block',
        fontSize: '11px',
        padding: '4px 12px',
        borderRadius: '9999px',
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        color: '#cbd5e1',
        fontWeight: '500',
      }}>
        Automatic Recursive Chunking & Embedding Generation
      </span>

      {statusMsg && (
        <div style={{
          marginTop: '16px',
          padding: '10px 14px',
          borderRadius: '8px',
          fontSize: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          backgroundColor: statusMsg.type === 'success' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
          color: statusMsg.type === 'success' ? '#4ade80' : '#f87171',
          border: `1px solid ${statusMsg.type === 'success' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
        }}>
          {statusMsg.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
          <span>{statusMsg.text}</span>
        </div>
      )}
    </div>
  );
}
