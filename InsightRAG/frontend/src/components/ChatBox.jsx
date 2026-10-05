import React, { useState, useRef, useEffect } from 'react';
import Message from './Message';
import { Send, Loader2 } from 'lucide-react';
import { api } from '../services/api';

export default function ChatBox() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Welcome to InsightRAG! Ask any question about your indexed knowledge base, and I will retrieve grounded answers with direct document citations.',
      citations: [],
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestedQuestions = [
    'What are the architecture highlights of InsightRAG?',
    'What enterprise compliance and security guidelines are enforced?',
    'How does recursive chunking ensure complete knowledge coverage?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (queryText) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg = { role: 'user', content: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await api.queryChat(textToSend);
      const assistantMsg = {
        role: 'assistant',
        content: res.answer,
        citations: res.citations,
        latency_ms: res.latency_ms,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, encountered an error querying InsightRAG. Please ensure the backend is running.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 120px)',
      backgroundColor: '#070b14',
      borderRadius: '16px',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      overflow: 'hidden',
    }}>
      {/* Messages Viewport */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '24px',
      }}>
        {messages.map((m, idx) => (
          <Message key={idx} message={m} />
        ))}

        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#38bdf8', padding: '10px 16px', fontSize: '13px' }}>
            <Loader2 size={18} className="animate-spin" />
            <span>Searching vector database & synthesizing answer...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompt Pills */}
      {messages.length <= 2 && (
        <div style={{ padding: '0 24px 12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {suggestedQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              style={{
                fontSize: '12px',
                padding: '6px 12px',
                borderRadius: '8px',
                backgroundColor: 'rgba(56, 189, 248, 0.08)',
                border: '1px solid rgba(56, 189, 248, 0.2)',
                color: '#38bdf8',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input Form */}
      <div style={{
        padding: '16px 24px',
        backgroundColor: '#0b1220',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        gap: '12px',
      }}>
        <input
          type="text"
          placeholder="Ask InsightRAG anything about your documents..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          style={{
            flex: 1,
            padding: '12px 18px',
            borderRadius: '10px',
            backgroundColor: '#070b14',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            color: '#ffffff',
            fontSize: '14px',
            outline: 'none',
          }}
        />
        <button
          onClick={() => handleSend()}
          disabled={loading || !input.trim()}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
            border: 'none',
            color: '#ffffff',
            fontWeight: '700',
            fontSize: '14px',
            cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
            opacity: loading || !input.trim() ? 0.6 : 1,
            boxShadow: '0 4px 15px rgba(14, 165, 233, 0.3)',
          }}
        >
          <Send size={16} />
          <span>Ask</span>
        </button>
      </div>
    </div>
  );
}
