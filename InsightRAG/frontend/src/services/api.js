import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 25000,
});

export const api = {
  // Query RAG Assistant
  queryChat: async (message, sessionId = 'default-session', topK = 4) => {
    const res = await client.post('/api/chat/query', {
      message,
      session_id: sessionId,
      top_k: topK,
    });
    return res.data;
  },

  // Document Management
  uploadDocument: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await client.post('/api/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },

  listDocuments: async () => {
    const res = await client.get('/api/documents');
    return res.data;
  },

  deleteDocument: async (docId) => {
    const res = await client.delete(`/api/documents/${docId}`);
    return res.data;
  },

  getSystemStatus: async () => {
    const res = await client.get('/api/documents/status');
    return res.data;
  },
};

export default api;
