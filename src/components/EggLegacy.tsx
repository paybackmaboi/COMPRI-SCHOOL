import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EggLegacy = () => {
  const [eggBoom, setEggBoom] = useState(false);
  const navigate = useNavigate();

  const handleEggClick = () => {
    setEggBoom(true);
    setTimeout(() => {
      setEggBoom(false);
      navigate('/team');
    }, 1200);
  };

  return (
    <>
      <div
        className={`fixed bottom-8 right-8 z-40 cursor-pointer transition-all duration-700 drop-shadow-2xl ${eggBoom ? 'animate-egg-boom' : 'animate-egg-float'}`}
        onClick={handleEggClick}
        title="Legacy Team"
        style={{ width: 90, height: 120 }}
      >
        {!eggBoom ? (
          <>
            <div style={{position: 'relative', width: '100%', height: '100%'}}>
              <svg width="90" height="120" viewBox="0 0 90 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="45" cy="60" rx="42" ry="56" fill="url(#eggGradient)" stroke="#fff" strokeWidth="4" />
                <ellipse cx="45" cy="60" rx="36" ry="48" fill="url(#eggGradient2)" opacity="0.7" />
                <ellipse cx="45" cy="60" rx="28" ry="38" fill="url(#eggGradient3)" opacity="0.5" />
                <circle cx="45" cy="60" r="18" fill="url(#eggGradient4)" opacity="0.4" />
                <defs>
                  <radialGradient id="eggGradient" cx="0.5" cy="0.5" r="0.7" fx="0.5" fy="0.5">
                    <stop offset="0%" stopColor="#ffb6f9" />
                    <stop offset="50%" stopColor="#ffe066" />
                    <stop offset="100%" stopColor="#5ee7df" />
                  </radialGradient>
                  <linearGradient id="eggGradient2" x1="0" y1="0" x2="90" y2="120" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#a0e9ff" />
                    <stop offset="1" stopColor="#f7b2ff" />
                  </linearGradient>
                  <linearGradient id="eggGradient3" x1="0" y1="0" x2="90" y2="120" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#f7b2ff" />
                    <stop offset="1" stopColor="#b2ffda" />
                  </linearGradient>
                  <radialGradient id="eggGradient4" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
                    <stop offset="0%" stopColor="#fff" />
                    <stop offset="100%" stopColor="#ffe066" />
                  </radialGradient>
                </defs>
              </svg>
              {/* 'Click me' text overlay */}
              <span style={{position: 'absolute', left: '50%', top: '60%', transform: 'translate(-50%, -50%)', color: '#222', fontWeight: 700, fontSize: '1rem', background: 'rgba(255,255,255,0.7)', borderRadius: '8px', padding: '2px 10px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}}>
                Click me
              </span>
              {/* Sparkle effects outside SVG */}
              <div style={{position: 'absolute', top: 8, left: 32}} className="w-3 h-3 bg-pink-300 rounded-full blur-md animate-pulse"></div>
              <div style={{position: 'absolute', bottom: 16, right: 24}} className="w-2 h-2 bg-yellow-300 rounded-full blur-sm animate-bounce"></div>
              <div style={{position: 'absolute', top: 40, right: 8}} className="w-2 h-2 bg-cyan-300 rounded-full blur-sm animate-ping"></div>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center animate-boom">
            <span className="text-6xl font-extrabold text-yellow-400 drop-shadow-lg">💥</span>
          </div>
        )}
      </div>
      <style>{`
        @keyframes egg-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-18px); }
        }
        .animate-egg-float {
          animation: egg-float 2.5s ease-in-out infinite;
        }
        @keyframes egg-boom {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.3) rotate(10deg); }
          100% { opacity: 0; transform: scale(0.7) rotate(-10deg); }
        }
        .animate-egg-boom {
          animation: egg-boom 1.2s cubic-bezier(.68,-0.55,.27,1.55) forwards;
        }
        .animate-boom {
          animation: egg-boom 1.2s cubic-bezier(.68,-0.55,.27,1.55) forwards;
        }
      `}</style>
    </>
  );
};

export default EggLegacy;
