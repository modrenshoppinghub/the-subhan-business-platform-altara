import React, { useState } from 'react';

export default function App() {
  // 30 Trending Freelancing Skills grouped by categories
  const skillsData = [
    // 1. Development & Tech (10 Skills)
    { id: 1, name: "React.js / Next.js Developer", category: "Development", desc: "Building modern single-page web applications.", badge: "High Demand" },
    { id: 2, name: "Full-Stack Node.js Developer", category: "Development", desc: "Server-side development and API integrations.", badge: "Top Paid" },
    { id: 3, name: "Python & Django Engineer", category: "Development", desc: "Backend systems, automation scripts, and web apps.", badge: "Popular" },
    { id: 4, name: "Mobile App Developer (Flutter/RN)", category: "Development", desc: "Cross-platform iOS and Android applications.", badge: "High Demand" },
    { id: 5, name: "WordPress & Shopify Expert", category: "Development", desc: "E-commerce stores and custom business websites.", badge: "Easy to Start" },
    { id: 6, name: "Web3 & Blockchain Developer", category: "Development", desc: "Smart contracts and decentralized apps (dApps).", badge: "Premium" },
    { id: 7, name: "API Developer (GraphQL/REST)", category: "Development", desc: "Designing secure and scalable server endpoints.", badge: "Technical" },
    { id: 8, name: "DevOps & AWS Cloud Engineer", category: "Development", desc: "Cloud deployment, CI/CD pipelines, and hosting.", badge: "Top Paid" },
    { id: 9, name: "QA & Automation Tester", category: "Development", desc: "Software testing using Selenium and Cypress.", badge: "Steady" },
    { id: 10, name: "Cybersecurity Consultant", category: "Development", desc: "Penetration testing and securing web applications.", badge: "Premium" },

    // 2. AI & Data Science (10 Skills)
    { id: 11, name: "AI & Machine Learning Engineer", category: "AI & Data", desc: "Training custom models and neural networks.", badge: "Trending" },
    { id: 12, name: "Data Scientist / Analyst", category: "AI & Data", desc: "Data visualization and statistical analysis.", badge: "High Demand" },
    { id: 13, name: "Prompt Engineer", category: "AI & Data", desc: "Optimizing LLM outputs for businesses.", badge: "New" },
    { id: 14, name: "AI Integration Specialist", category: "AI & Data", desc: "Connecting OpenAI/Anthropic APIs into apps.", badge: "Hot" },
    { id: 15, name: "Chatbot Developer (Voiceflow/Rasa)", category: "AI & Data", desc: "Automating customer support with AI bots.", badge: "Fast Growth" },
    { id: 16, name: "Data Engineer (SQL/NoSQL)", category: "AI & Data", desc: "Managing big data pipelines and databases.", badge: "Technical" },
    { id: 17, name: "Computer Vision Expert", category: "AI & Data", desc: "Image processing and object detection systems.", badge: "Premium" },
    { id: 18, name: "NLP Specialist", category: "AI & Data", desc: "Text analysis and language processing models.", badge: "Trending" },
    { id: 19, name: "AI Content Auditor", category: "AI & Data", desc: "Fact-checking and refining AI generated output.", badge: "New" },
    { id: 20, name: "Business Intelligence Analyst", category: "AI & Data", desc: "Creating dashboards using PowerBI and Tableau.", badge: "Corporate" },

    // 3. Design & Marketing (10 Skills)
    { id: 21, name: "UI/UX Product Designer", category: "Design & Marketing", desc: "Creating app wireframes and beautiful user interfaces.", badge: "Creative" },
    { id: 22, name: "3D Motion & Graphics Artist", category: "Design & Marketing", desc: "Blender rendering, animations, and visual assets.", badge: "Trending" },
    { id: 23, name: "SEO Optimization Expert", category: "Design & Marketing", desc: "Ranking websites on the first page of Google.", badge: "High Demand" },
    { id: 24, name: "Social Media Growth Manager", category: "Design & Marketing", desc: "Managing and scaling brand pages on Instagram/TikTok.", badge: "Popular" },
    { id: 25, name: "Copywriter & Content Strategist", category: "Design & Marketing", desc: "Writing high-converting sales landing pages.", badge: "Creative" },
    { id: 26, name: "Video Editor (Premiere/After Effects)", category: "Design & Marketing", desc: "Editing high-retention YouTube and Reels content.", badge: "High Demand" },
    { id: 27, name: "SaaS Growth Marketer", category: "Design & Marketing", desc: "Running paid ad campaigns (Google/Meta) for startups.", badge: "Top Paid" },
    { id: 28, name: "Brand Identity Designer", category: "Design & Marketing", desc: "Creating unique logos, typography, and brand books.", badge: "Creative" },
    { id: 29, name: "Email Marketing Automator", category: "Design & Marketing", desc: "Setting up sales funnels in Klaviyo/Mailchimp.", badge: "High ROI" },
    { id: 30, name: "Technical Technical Writer", category: "Design & Marketing", desc: "Writing documentation and API guides for tech tools.", badge: "Steady" }
  ];

  // AI Assistant States
  const [command, setCommand] = useState('');
  const [currentCode, setCurrentCode] = useState('');
  const [status, setStatus] = useState('ASK_COMMAND'); 
  const [aiMessage, setAiMessage] = useState('');
  const [clientGuide, setClientGuide] = useState('');
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
        setLiveUI(data.newUI); 
      }
    } catch (err) {
      setAiMessage('Automation failed. Check if API is deployed.');
    }
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Segoe UI, Roboto, sans-serif', maxWidth: '1200px', margin: '0 auto', backgroundColor: '#fafafa', color: '#333' }}>
      
      {/* HEADER */}
      <header style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#0070f3', margin: '0 0 10px 0' }}>Freelance Marketplace Portal</h1>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>Explore the top trending skills in the freelancing market.</p>
      </header>

      {/* 30 TRENDING SKILLS WITH PREVIEW CARDS */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '1.8rem', borderBottom: '3px solid #0070f3', paddingBottom: '10px', color: '#111' }}>
          🔥 Top 30 Trending Freelance Skills
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '25px' }}>
          {skillsData.map((skill) => (
            <div key={skill.id} style={{ backgroundColor: '#fff', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #eee', display: 'flex', flexDirection: 'column', justifyContent: 'between', transition: 'transform 0.2s' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.8rem', backgroundColor: '#e1f5fe', color: '#0288d1', padding: '4px 8px', borderRadius: '12px', fontWeight: 'bold' }}>
                    {skill.category}
                  </span>
                  <span style={{ fontSize: '0.75rem', backgroundColor: '#fff3e0', color: '#f57c00', padding: '4px 8px', borderRadius: '12px', fontWeight: 'bold' }}>
                    {skill.badge}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.2rem', margin: '0 0 8px 0', color: '#0070f3' }}>
                  {skill.id}. {skill.name}
                </h3>
                <p style={{ color: '#666', fontSize: '0.9rem', margin: '0 0 15px 0', lineHeight: '1.4' }}>
                  {skill.desc}
                </p>
              </div>
              <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '12px', marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: '#999' }}>Skill Preview Card</span>
                <button style={{ backgroundColor: '#0070f3', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', fontSize: '0.8rem', cursor: 'pointer' }}>
                  View Gigs
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI AUTOMATION SECTION */}
      <section style={{ border: '2px dashed #0070f3', padding: '20px', borderRadius: '12px', backgroundColor: '#f0f7ff', boxShadow: '0 4px 12px rgba(0,112,243,0.05)' }}>
        <h2 style={{ margin: '0 0 15px 0' }}>🤖 AI Live Code Automation</h2>
        <p style={{ color: '#555', marginTop: '0' }}>Jab aap kuch tabdil karne ko kahenge, AI pehle code mangega aur phir live website update karega.</p>
        
        <form onSubmit={handleAutomation} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #d0e3ff' }}>
          {status === 'ASK_COMMAND' && (
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Web mein kya tabdili karni ha?</label>
              <input 
                type="text" 
                placeholder="e.g., Grid columns ko 4 kar do ya background color black kar do..." 
                value={command} 
                onChange={(e) => setCommand(e.target.value)}
                style={{ width: '100%', padding: '12px', boxSizing: 'border-box', marginBottom: '15px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1rem' }}
                required
              />
              <button type="submit" style={{ backgroundColor: '#0070f3', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                AI Analysis Shuru Karein
              </button>
            </div>
          )}

          {status === 'ASK_CODE' && (
            <div>
              <p style={{ color: '#d32f2f', fontWeight: 'bold', backgroundColor: '#ffebee', padding: '10px', borderRadius: '4px', marginTop: '0' }}>
                {aiMessage}
              </p>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Apna Current Source Code (`App.jsx`) Paste Karein:</label>
              <textarea 
                rows="8" 
                placeholder="// Pura code yahan paste karein..." 
                value={currentCode} 
                onChange={(e) => setCurrentCode(e.target.value)}
                style={{ width: '100%', padding: '12px', boxSizing: 'border-box', marginBottom: '15px', borderRadius: '6px', border: '1px solid #ccc', fontFamily: 'monospace', fontSize: '0.9rem' }}
                required
              />
              <button type="submit" style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                Automate Live Changes
              </button>
            </div>
          )}

          {status === 'LIVE' && (
            <div style={{ backgroundColor: '#e8f5e9', padding: '15px', borderRadius: '6px', border: '1px solid #c8e6c9' }}>
              <h4 style={{ color: '#2e7d32', margin: '0 0 10px 0' }}>✅ {aiMessage}</h4>
              <p style={{ color: '#388e3c', margin: '0 0 15px 0' }}><strong>{clientGuide}</strong></p>
              <button onClick={() => { setStatus('ASK_COMMAND'); setCommand(''); setCurrentCode(''); }} style={{ backgroundColor: '#6c757d', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>
                Nayi Automation Command Dein
              </button>
            </div>
          )}
        </form>
      </section>

      {/* LIVE VIEW TARGET FOR AI INJECTION */}
      <section style={{ marginTop: '40px', border: '3px solid #28a745', padding: '25px', borderRadius: '12px', backgroundColor: '#fff' }}>
        <h2 style={{ color: '#28a745', marginTop: '0' }}>🌐 Live Injected Features View</h2>
        <p style={{ color: '#777', fontSize: '0.9rem' }}>AI ki taraf se inject kiye gaye dynamic elements yahan real-time mein display honge:</p>
        
        {liveUI ? (
          <div dangerouslySetInnerHTML={{ __html: liveUI }} />
        ) : (
          <p style={{ color: '#aaa', fontStyle: 'italic' }}>Filhal koi extra live command execute nahi hui.</p>
        )}
      </section>

    </div>
  );
}
