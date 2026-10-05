import React, { useState } from 'react';
import { User, Bot, FileText, ChevronDown, ChevronUp, Clock, BookMarked } from 'lucide-react';

export default function Message({ message }) {
  const [showCitations, setShowCitations] = useState(false);
  const isUser = message.role === 'user';

  return (
    <div style={{
      display: 'flex',
      gap: '14px',
      marginBottom: '20px',
      alignItems: 'flex-start',
    }}>
      {/* Avatar */}
      <div style={{
        width: '36px',
        height: '36px',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        backgroundColor: isUser ? '#1e293b' : 'rgba(56, 189, 248, 0.15)',
        color: isUser ? '#cbd5e1' : '#38bdf8',
        border: `1px solid ${isUser ? 'rgba(255,255,255,0.08)' : 'rgba(56, 189, 248, 0.3)'}`,
      }}>
        {isUser ? <User size={18} /> : <Bot size={20} />}
      </div>

      {/* Message Body */}
      <div style={{ flex: 1, maxWidth: '85%' }}>
        <div style={{
          backgroundColor: isUser ? '#131d31' : 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(16px)',
          border: `1px solid ${isUser ? 'rgba(255, 255, 255, 0.08)' : 'rgba(56, 189, 248, 0.2)'}`,
          borderRadius: '14px',
          padding: '16px 20px',
          color: '#f8fafc',
          boxShadow: isUser ? 'none' : '0 4px 20px rgba(0, 0, 0, 0.25)',
        }}>
          {/* Header info */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: isUser ? '#94a3b8' : '#38bdf8' }}>
              {isUser ? 'You' : 'InsightRAG AI'}
            </span>
            {message.latency_ms && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#64748b' }}>
                <Clock size={12} />
                <span>{message.latency_ms} ms</span>
              </div>
            )}
          </div>

          {/* Text Content */}
          <div style={{ fontSize: '14px', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
            {message.content}
          </div>

          {/* Source Citations Toggle */}
          {message.citations && message.citations.length > 0 && (
            <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <button
                onClick={() => setShowCitations(!showCitations)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'none',
                  border: 'none',
                  color: '#38bdf8',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  padding: '0',
                }}
              >
                <BookMarked size={14} />
                <span>{message.citations.length} Verified Document Citations</span>
                {showCitations ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>

              {/* Citations List */}
              {showCitations && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
                  {message.citations.map((cite, idx) => (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: '#070b14',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        borderRadius: '8px',
                        padding: '10px 12px',
                        fontSize: '12px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#e2e8f0', fontWeight: '600' }}>
                          <FileText size={12} color="#38bdf8" />
                          <span>{cite.filename}</span>
                        </div>
                        <span style={{ fontSize: '10px', color: '#34d399', fontFamily: 'monospace' }}>
                          {Math.round(cite.similarity_score * 100)}% match
                        </span>
                      </div>
                      <p style={{ color: '#94a3b8', fontSize: '11px', lineHeight: '1.4' }}>
                        {cite.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
