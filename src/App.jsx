import React, { useState } from 'react';

export default function App() {
  const [command, setCommand] = useState('');
  const [currentCode, setCurrentCode] = useState('');
  const [status, setStatus] = useState('ASK_COMMAND'); // ASK_COMMAND, ASK_CODE, LIVE
  const [aiMessage, setAiMessage] = useState('');
  const [clientGuide, setClientGuide] = useState('');
  
  // Is state mein live HTML inject hoga jo web ko bina deploy kiye live update karega
  const [liveUI, setLiveUI] = useState('');

  const handleAutomation = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/update-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command, currentCode })
      });
      const data = await res.json();

      if (data.status === "NEED_CODE") {
        setStatus('ASK_CODE');
        setAiMessage(data.message);
      } else if (data.status === "SUCCESS") {
        setStatus('LIVE');
        setAiMessage(data.message);
        setClientGuide(data.guide);
        setLiveUI(data.newUI); // Live update here!
      }
    } catch (err) {
      setAiMessage('Automation failed. Server issue.');
    }
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#0070f3' }}>Live AI Automation Portal</h1>

      {/* AI CONTROL PANEL */}
      <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
        <h2>🤖 AI Live Bot</h2>
        
        <form onSubmit={handleAutomation}>
          {status === 'ASK_COMMAND' && (
            <div>
              <p>Web mein kya tabdili karni ha?</p>
              <input 
                type="text" 
                placeholder="e.g., Contact us section banao" 
                value={command} 
                onChange={(e) => setCommand(e.target.value)}
                style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                required
              />
              <button type="submit" style={{ background: '#0070f3', color: 'white', padding: '10px' }}>AI ko batayein</button>
            </div>
          )}

          {status === 'ASK_CODE' && (
            <div>
              <p style={{ color: 'red', fontWeight: 'bold' }}>{aiMessage}</p>
              <textarea 
                rows="6" 
                placeholder="Apna current code yahan paste karein..." 
                value={currentCode} 
                onChange={(e) => setCurrentCode(e.target.value)}
                style={{ width: '100%', padding: '10px', marginBottom: '10px', fontFamily: 'monospace' }}
                required
              />
              <button type="submit" style={{ background: '#28a745', color: 'white', padding: '10px' }}>Automate Live</button>
            </div>
          )}

          {status === 'LIVE' && (
            <div style={{ background: '#e8f5e9', padding: '15px', borderRadius: '6px' }}>
              <p><strong>{aiMessage}</strong></p>
              <p style={{ color: '#555' }}><i>{clientGuide}</i></p>
              <button onClick={() => { setStatus('ASK_COMMAND'); setCommand(''); setCurrentCode(''); }} style={{ background: '#6c757d', color: 'white', padding: '5px 10px' }}>Nayi Tabdili Karein</button>
            </div>
          )}
        </form>
      </div>

      {/* DYNAMIC LIVE WEBSITE PREVIEW SECTION */}
      <div style={{ marginTop: '40px', border: '3px solid #28a745', padding: '20px', borderRadius: '8px' }}>
        <h2>🌐 Website Live View (Updated by AI)</h2>
        <p>Yeh aapki normal website chal rahi hai...</p>
        
        {/* Is jagah par AI live code inject kar ke page update kar deta hai bina refresh kiye */}
        <div dangerouslySetInnerHTML={{ __html: liveUI }} />
      </div>
    </div>
  );
}
