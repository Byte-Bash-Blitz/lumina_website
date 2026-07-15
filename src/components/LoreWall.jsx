import React, { useState } from 'react';
import { members } from '../data/members';

export default function LoreWall() {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: '⚔️ ALL ELITE' },
    { id: 'devs', label: '🛠️ BUILDERS' },
    { id: 'intel', label: '🧠 SCHOLARS' }
  ];

  // Simple sorting logic into custom lore groups
  const filteredMembers = members.filter(m => {
    if (activeTab === 'all') return true;
    if (activeTab === 'devs') return m.github && m.books < 20;
    if (activeTab === 'intel') return m.books >= 20 || m.chess !== "";
    return true;
  });

  return (
    <div style={{
      backgroundColor: '#060b13',
      backgroundImage: 'linear-gradient(180deg, #091424 0%, #04080e 100%)',
      minHeight: '100vh',
      color: '#ffffff',
      fontFamily: '"Press Start 2P", "Courier New", monospace', // Use pixel font if available, fallback to code mono
      padding: '50px 20px',
      overflowX: 'hidden'
    }}>
      
      {/* Header Container */}
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{
          fontSize: '2.5rem',
          color: '#ffaa00',
          textShadow: '4px 4px #2a1a00, 0 0 15px rgba(255, 170, 0, 0.5)',
          margin: '0 0 15px 0',
          letterSpacing: '1px'
        }}>
          📜 THE LORE WALL
        </h1>
        <p style={{ 
          color: '#55ff55', 
          fontSize: '0.9rem', 
          fontFamily: '"Courier New", monospace',
          fontWeight: 'bold',
          letterSpacing: '2px'
        }}>
          [ CLAN MATRICES & UNUSUAL PLAYER DATA ]
        </p>
      </div>

      {/* Retro Nav Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '15px',
        marginBottom: '40px',
        flexWrap: 'wrap'
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              backgroundColor: activeTab === tab.id ? '#55ff55' : '#141f32',
              color: activeTab === tab.id ? '#000000' : '#ffffff',
              border: '3px solid #374151',
              borderTopColor: activeTab === tab.id ? '#ffffff' : '#4b5563',
              borderLeftColor: activeTab === tab.id ? '#ffffff' : '#4b5563',
              padding: '12px 24px',
              cursor: 'pointer',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              boxShadow: '4px 4px 0px #000000',
              transform: activeTab === tab.id ? 'translateY(2px)' : 'none',
              transition: 'all 0.1s ease'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Cards List Container */}
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}>
        {filteredMembers.map((member, index) => (
          <div
            key={member.id}
            style={{
              backgroundColor: '#101726',
              border: '4px solid #2d3748',
              borderTopColor: '#4a5568',
              borderLeftColor: '#4a5568',
              padding: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              position: 'relative',
              boxShadow: '6px 6px 0px #000000',
              transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px) scale(1.01)';
              e.currentTarget.style.borderColor = '#ffaa00';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.borderColor = '#2d3748';
            }}
          >
            
            {/* Minecraft Slot Index Box */}
            <div style={{
              backgroundColor: '#090d16',
              border: '3px solid #4a5568',
              color: '#ffaa00',
              width: '46px',
              height: '46px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '1rem',
              fontWeight: 'bold',
              flexShrink: 0
            }}>
              {index + 1}
            </div>

            {/* Avatar block */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <img 
                src={member.avatar} 
                alt={member.name}
                onError={(e) => { e.target.src = "https://via.placeholder.com/80/091424/ffffff?text=HERO"; }}
                style={{
                  width: '80px',
                  height: '80px',
                  border: '4px solid #1a202c',
                  outline: '3px solid #55ff55',
                  objectFit: 'cover',
                  display: 'block',
                  imageRendering: 'pixelated'
                }}
              />
            </div>

            {/* Identity & Funny Facts Info Body */}
            <div style={{ flexGrow: 1, fontFamily: '"Courier New", monospace' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
                <h3 style={{ 
                  margin: 0, 
                  fontSize: '1.5rem', 
                  color: '#ffffff',
                  fontFamily: '"Press Start 2P", monospace', 
                  fontSize: '0.95rem'
                }}>
                  {member.name}
                </h3>
                <span style={{ color: '#55ffbb', fontSize: '0.85rem' }}>
                  {member.github ? `[git:${member.github}]` : ''}
                </span>
              </div>
              
              {/* Role/Class Badge */}
              <div style={{ 
                color: '#ffff55', 
                fontSize: '0.9rem', 
                fontWeight: 'bold',
                marginTop: '4px',
                textTransform: 'uppercase'
              }}>
                ✦ {member.class}
              </div>

              {/* Character Backstory Lore Section */}
              <p style={{ 
                margin: '12px 0 0 0', 
                color: '#e2e8f0', 
                fontSize: '0.95rem',
                lineHeight: '1.5',
                backgroundColor: '#090d16',
                padding: '10px 14px',
                borderLeft: '4px solid #ff5555',
                borderRadius: '2px'
              }}>
                "{member.lore}"
              </p>
            </div>

            {/* Minecraft Attribute Container */}
            <div style={{
              textAlign: 'right',
              minWidth: '220px',
              fontFamily: '"Courier New", monospace',
              borderLeft: '2px dashed #2d3748',
              paddingLeft: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              justifyContent: 'center'
            }}>
              <div style={{ color: '#55ff55', fontWeight: 'bold', fontSize: '0.95rem' }}>
                ⚔️ {member.primaryStat}
              </div>
              <div style={{ color: '#ff55ff', fontWeight: 'bold', fontSize: '0.95rem' }}>
                🛡️ {member.secondaryStat}
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}