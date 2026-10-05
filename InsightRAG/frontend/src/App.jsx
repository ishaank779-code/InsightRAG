import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Chat from './pages/Chat';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [docCount, setDocCount] = useState(0);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#070b14' }}>
      {/* Sidebar Navigation */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        docCount={docCount} 
      />

      {/* Main Content Viewport */}
      <main style={{ flex: 1, minWidth: 0, overflowY: 'auto', maxHeight: '100vh' }}>
        {activeTab === 'home' && <Home setActiveTab={setActiveTab} onDocUpdate={setDocCount} />}
        {activeTab === 'chat' && <Chat setActiveTab={setActiveTab} />}
      </main>
    </div>
  );
}
