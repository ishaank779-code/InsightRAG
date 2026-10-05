import React from 'react';
import ChatBox from '../components/ChatBox';
import { MessageSquare, Compass, BookOpen } from 'lucide-react';

export default function Chat({ setActiveTab }) {
  return (
    <div style={{ padding: '24px 32px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            padding: '10px',
            borderRadius: '10px',
            backgroundColor: 'rgba(56, 189, 248, 0.15)',
            color: '#38bdf8',
          }}>
            <MessageSquare size={22} />
          </div>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#f8fafc' }}>
              Conversational RAG Assistant
            </h1>
            <p style={{ fontSize: '12px', color: '#94a3b8' }}>
              Grounded answers with transparent document citations and similarity metrics
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 14px',
            borderRadius: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            color: '#cbd5e1',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          <BookOpen size={14} />
          <span>Manage Knowledge Base</span>
        </button>
      </div>

      {/* Main Chat Interface */}
      <ChatBox />
    </div>
  );
}
