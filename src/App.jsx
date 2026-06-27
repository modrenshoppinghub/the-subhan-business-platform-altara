import React, { useState } from 'react';

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('Loading...');

    try {
      // Vercel ke naye structure ke mutabiq direct /api/login par request bhej rahe hain
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (data.success) {
        setMessage('');
        setUser(username); // Login successful, user state update karein
      } else {
        setMessage(data.message || 'Login failed');
      }
    } catch (err) {
      setMessage('Server se connect nahi ho pa raha.');
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      {!user ? (
        <div style={{ maxWidth: '300px', margin: '0 auto', border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input 
              type="text" 
              placeholder="Username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
              required 
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
              required 
            />
            <button type="submit" style={{ width: '100%', padding: '10px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Sign In
            </button>
          </form>
          {message && <p style={{ color: 'red', marginTop: '10px' }}>{message}</p>}
        </div>
      ) : (
        <div>
          <h2>Welcome, {user}! 🎉</h2>
          <p>Aap Vercel par successfully login ho chuke hain.</p>
          <button onClick={() => setUser(null)} style={{ padding: '10px 20px', background: '#ff4d4d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
