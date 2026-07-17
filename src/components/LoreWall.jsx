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
    <div
      style={{
        backgroundColor: '#060b13',
        backgroundImage: 'linear-gradient(180deg, #091424 0%, #04080e 100%)',
        minHeight: '100vh',
        color: '#ffffff',
        fontFamily: '"Press Start 2P", "Courier New", monospace',
        padding: '50px 20px',
        overflowX: 'hidden',
        boxSizing: 'border-box'
      }}
    >
      {/* Global responsive rules for this component */}
      <style>{`
        .lore-wall * { box-sizing: border-box; }

        .lore-header-title {
          font-size: 2.5rem;
        }

        .lore-tabs {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        .lore-tab-btn {
          font-size: 0.75rem;
          padding: 12px 24px;
        }

        .lore-card {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }

        .lore-card-index {
          width: 46px;
          height: 46px;
          flex-shrink: 0;
        }

        .lore-card-avatar {
          width: 80px;
          height: 80px;
          flex-shrink: 0;
        }

        .lore-card-body {
          flex: 1 1 220px;
          min-width: 220px;
        }

        .lore-card-stats {
          text-align: right;
          min-width: 220px;
          border-left: 2px dashed #2d3748;
          padding-left: 20px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          justify-content: center;
        }

        /* Tablet and below: stack the stats under the body, keep avatar + index inline */
        @media (max-width: 768px) {
          .lore-header-title {
            font-size: 1.8rem;
          }

          .lore-card {
            gap: 16px;
          }

          .lore-card-stats {
            border-left: none;
            border-top: 2px dashed #2d3748;
            padding-left: 0;
            padding-top: 16px;
            text-align: left;
            min-width: 100%;
            width: 100%;
          }
        }

        /* Phones: stack everything vertically, full width */
        @media (max-width: 520px) {
          .lore-header-title {
            font-size: 1.4rem;
            line-height: 1.3;
          }

          .lore-subtitle {
            font-size: 0.75rem !important;
          }

          .lore-tab-btn {
            font-size: 0.65rem;
            padding: 10px 16px;
            flex: 1 1 auto;
          }

          .lore-card {
            flex-direction: column;
            align-items: flex-start;
            padding: 18px !important;
          }

          .lore-card-top {
            display: flex;
            align-items: center;
            gap: 16px;
            width: 100%;
          }

          .lore-card-body {
            width: 100%;
            min-width: 0;
          }

          .lore-card-body h3 {
            font-size: 0.85rem !important;
          }

          .lore-card-stats {
            min-width: 100%;
          }
        }
      `}</style>

      <div className="lore-wall">
        {/* Header Container */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1
            className="lore-header-title"
            style={{
              color: '#ffaa00',
              textShadow: '4px 4px #2a1a00, 0 0 15px rgba(255, 170, 0, 0.5)',
              margin: '0 0 15px 0',
              letterSpacing: '1px',
              wordBreak: 'break-word'
            }}
          >
            📜 THE LORE WALL
          </h1>
          <p
            className="lore-subtitle"
            style={{
              color: '#55ff55',
              fontSize: '0.9rem',
              fontFamily: '"Courier New", monospace',
              fontWeight: 'bold',
              letterSpacing: '2px'
            }}
          >
            [ CLAN MATRICES &amp; UNUSUAL PLAYER DATA ]
          </p>
        </div>

        {/* Retro Nav Bar */}
        <div className="lore-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="lore-tab-btn"
              style={{
                backgroundColor: activeTab === tab.id ? '#55ff55' : '#141f32',
                color: activeTab === tab.id ? '#000000' : '#ffffff',
                border: '3px solid #374151',
                borderTopColor: activeTab === tab.id ? '#ffffff' : '#4b5563',
                borderLeftColor: activeTab === tab.id ? '#ffffff' : '#4b5563',
                cursor: 'pointer',
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
        <div
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}
        >
          {filteredMembers.map((member, index) => (
            <div
              key={member.id}
              className="lore-card"
              style={{
                backgroundColor: '#101726',
                border: '4px solid #2d3748',
                borderTopColor: '#4a5568',
                borderLeftColor: '#4a5568',
                padding: '24px',
                position: 'relative',
                boxShadow: '6px 6px 0px #000000',
                transition:
                  'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-color 0.2s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.01)';
                e.currentTarget.style.borderColor = '#ffaa00';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.borderColor = '#2d3748';
              }}
            >
              <div className="lore-card-top">
                {/* Minecraft Slot Index Box */}
                <div
                  className="lore-card-index"
                  style={{
                    backgroundColor: '#090d16',
                    border: '3px solid #4a5568',
                    color: '#ffaa00',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '1rem',
                    fontWeight: 'bold'
                  }}
                >
                  {index + 1}
                </div>

                {/* Avatar block */}
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <img
                    src={member.avatar}
                    alt={member.name}
                    onError={e => {
                      e.target.src = 'https://via.placeholder.com/80/091424/ffffff?text=HERO';
                    }}
                    className="lore-card-avatar"
                    style={{
                      border: '4px solid #1a202c',
                      outline: '3px solid #55ff55',
                      objectFit: 'cover',
                      display: 'block',
                      imageRendering: 'pixelated'
                    }}
                  />
                </div>
              </div>

              {/* Identity & Funny Facts Info Body */}
              <div className="lore-card-body" style={{ fontFamily: '"Courier New", monospace' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
                  <h3
                    style={{
                      margin: 0,
                      color: '#ffffff',
                      fontFamily: '"Press Start 2P", monospace',
                      fontSize: '0.95rem',
                      wordBreak: 'break-word'
                    }}
                  >
                    {member.name}
                  </h3>
                  <span style={{ color: '#55ffbb', fontSize: '0.85rem' }}>
                    {member.github ? `[git:${member.github}]` : ''}
                  </span>
                </div>

                {/* Role/Class Badge */}
                <div
                  style={{
                    color: '#ffff55',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    marginTop: '4px',
                    textTransform: 'uppercase'
                  }}
                >
                  ✦ {member.class}
                </div>

                {/* Character Backstory Lore Section */}
                <p
                  style={{
                    margin: '12px 0 0 0',
                    color: '#e2e8f0',
                    fontSize: '0.95rem',
                    lineHeight: '1.5',
                    backgroundColor: '#090d16',
                    padding: '10px 14px',
                    borderLeft: '4px solid #ff5555',
                    borderRadius: '2px'
                  }}
                >
                  "{member.lore}"
                </p>
              </div>

              {/* Minecraft Attribute Container */}
              <div className="lore-card-stats" style={{ fontFamily: '"Courier New", monospace' }}>
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
    </div>
  );
}