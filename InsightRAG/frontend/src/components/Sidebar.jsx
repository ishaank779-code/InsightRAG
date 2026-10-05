import React from 'react';
import { 
  Compass, 
  MessageSquare, 
  BookOpen, 
  ExternalLink, 
  GraduationCap 
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, docCount = 0 }) {
  const navItems = [
    { id: 'home', label: 'Knowledge Base', icon: BookOpen },
    { id: 'chat', label: 'Conversational RAG', icon: MessageSquare },
  ];

  return (
    <aside style={{
      width: '280px',
      minWidth: '280px',
      backgroundColor: '#0b1220',
      borderRight: '1px solid rgba(255, 255, 255, 0.08)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '24px 16px',
      minHeight: '100vh',
    }}>
      <div>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 8px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px rgba(14, 165, 233, 0.4)',
          }}>
            <Compass size={24} color="#ffffff" />
          </div>
          <div>
            <h1 style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.02em', lineHeight: '1.1' }}>
              Insight<span style={{ color: '#38bdf8' }}>RAG</span>
            </h1>
            <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '3px' }}>
              Knowledge Intelligence Engine
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#475569', padding: '0 12px 6px', letterSpacing: '0.05em' }}>
            Workspaces
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: isActive ? '600' : '500',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                  backgroundColor: isActive ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                  color: isActive ? '#38bdf8' : '#94a3b8',
                  boxShadow: isActive ? 'inset 0 0 0 1px rgba(56, 189, 248, 0.3)' : 'none',
                }}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* RAG Training Resources Innerlinks */}
      <div>
        <div style={{
          padding: '16px',
          borderRadius: '12px',
          backgroundColor: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          marginBottom: '16px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <GraduationCap size={16} color="#38bdf8" />
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#e2e8f0' }}>RAG Engineering Hub</span>
          </div>
          <p style={{ fontSize: '11px', color: '#94a3b8', lineHeight: '1.4', marginBottom: '10px' }}>
            Learn production RAG pipelines, vector databases, and evaluation:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <a
              href="https://uncodemy.com/course/rag-engineering-course-training-course-in-delhi"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '11px',
                color: '#38bdf8',
                textDecoration: 'none',
                padding: '6px 8px',
                borderRadius: '6px',
                backgroundColor: 'rgba(56, 189, 248, 0.08)',
                fontWeight: '500',
              }}
            >
              <span>RAG Course (Delhi)</span>
              <ExternalLink size={12} />
            </a>
            <a
              href="https://uncodemy.com/course/rag-engineering-course-training-course-in-noida"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '11px',
                color: '#a78bfa',
                textDecoration: 'none',
                padding: '6px 8px',
                borderRadius: '6px',
                backgroundColor: 'rgba(167, 139, 250, 0.08)',
                fontWeight: '500',
              }}
            >
              <span>RAG Course (Noida)</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* Status */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 12px',
          borderRadius: '8px',
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e', boxShadow: '0 0 8px #22c55e' }} />
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>Vector Store Active</span>
          </div>
          <span style={{ fontSize: '10px', color: '#64748b' }}>{docCount} docs</span>
        </div>
      </div>
    </aside>
  );
}
