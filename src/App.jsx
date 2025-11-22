import React, { useState, useEffect, useRef } from 'react';

// --- THE "POLISHED" VERSION ---
// 1. Shooting stars range fixed (rain all over)
// 2. Shooting stars hidden initially (no static lines)
// 3. Timeline background stars are BRIGHTER and SHINIER

export default function App() {
  const [phase, setPhase] = useState('birth'); 
  const [showTimeline, setShowTimeline] = useState(false);
  const [backgroundStars, setBackgroundStars] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [dustParticles, setDustParticles] = useState([]);
  const scrollRef = useRef(null);

  // --- ✍️ WRITE YOUR LETTERS HERE ---
  const letters = {
    0: "The silence of the universe was broken by a single notification. It wasn't just a message; it was the beginning of an orbit I never knew I needed. \n\nI remember looking at my phone and feeling something shift.",
    
    1: "Do you remember the way the light hit your face on our first date? In that moment, the rest of the world blurred into background noise. Just gravity, pulling us close.",
    
    2: "A shared glance, a burst of laughter that echoed like a pulsar. It's our secret language, a frequency only we can tune into. That inside joke still makes me smile every time.",
    
    3: "Three words, heavy with gravity, soft as starlight. The moment you said it, the universe shifted on its axis. I knew then that I was home.",
    
    4: "Our sanctuary. Not defined by coordinates, but by the feeling of safety when we are there. A pocket universe just for two, away from the noise of the world.",
    
    5: "Five months is but a blink in cosmic time, yet it holds my entire world. I look forward to every sunrise and sunset with you. Here is to the light-years ahead."
  };

  // --- 📅 TIMELINE TITLES ---
  const memories = [
    { date: 'Month 1', title: 'First Contact', subtitle: 'The Spark', type: 'star', color: '#bfdbfe' },
    { date: 'Month 1.5', title: 'Velvet Night', subtitle: 'First Date', type: 'planet', color: '#e9d5ff' },
    { date: 'Month 2', title: 'Binary Systems', subtitle: 'Inside Joke', type: 'nebula', color: '#a7f3d0' },
    { date: 'Month 3', title: 'Event Horizon', subtitle: 'I Love You', type: 'supernova', color: '#fecdd3' },
    { date: 'Month 4', title: 'Safe Harbor', subtitle: 'Our Place', type: 'moon', color: '#fef3c7', special: true },
    { date: 'Month 5', title: 'The Infinite', subtitle: 'Future', type: 'galaxy', color: '#a5f3fc' }
  ];

  useEffect(() => {
    // 1. Generate Gliding Background Stars
    const stars = [...Array(150)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() < 0.9 ? Math.random() * 2 : Math.random() * 3,
      opacity: Math.random() * 0.6 + 0.2,
      animDuration: Math.random() * 20 + 10, // Slow drift
      delay: Math.random() * 5
    }));
    setBackgroundStars(stars);

    // 2. Generate Shooting Stars (Wider Range)
    const shooting = [...Array(8)].map((_, i) => ({
      id: i,
      top: Math.random() * 100 - 20, // Start slightly above or anywhere vertical
      left: Math.random() * 120 - 20, // Start slightly left or anywhere horizontal
      delay: Math.random() * 10,
      duration: Math.random() * 2 + 1.5
    }));
    setShootingStars(shooting);

    // 3. Generate Dust
    const dust = [...Array(40)].map((_, i) => ({
      id: i,
      angle: Math.random() * 360,
      dist: Math.random() * 100 + 50,
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 4,
      size: Math.random() * 4 + 2
    }));
    setDustParticles(dust);

    // 4. Animation Sequence
    const t1 = setTimeout(() => setPhase('drifting'), 6000);
    const t2 = setTimeout(() => setPhase('orbiting'), 12000);
    const t3 = setTimeout(() => setPhase('intersecting'), 19000);
    const t4 = setTimeout(() => {
      setPhase('timeline');
      setTimeout(() => setShowTimeline(true), 800);
    }, 23000);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4);
    };
  }, []);

  // --- Helper Styles ---
  const fullScreenStyle = {
    position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
    backgroundColor: '#050505', color: 'white', fontFamily: 'serif', overflow: 'hidden'
  };
  
  const centerStyle = {
    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
    display: 'flex', alignItems: 'center', justifyContent: 'center'
  };

  const modalOverlayStyle = {
    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
    backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 100,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    backdropFilter: 'blur(5px)'
  };

  return (
    <div style={fullScreenStyle}>
      
      <style>{`
        @keyframes twinkle { 0% { opacity: 0.3; } 100% { opacity: 1; } }
        @keyframes float { 0% { transform: translateY(0px) translateX(0px); } 50% { transform: translateY(-20px) translateX(10px); } 100% { transform: translateY(0px) translateX(0px); } }
        
        /* UPDATED: Shooting stars start invisible */
        @keyframes shooting {
          0% {
            transform: translateX(0) translateY(0) rotate(45deg) scale(0.5);
            opacity: 0; 
          }
          10% { opacity: 1; }
          70% { opacity: 1; }
          100% {
            transform: translateX(800px) translateY(800px) rotate(45deg) scale(0.1);
            opacity: 0;
          }
        }
        
        @keyframes nebulaPulse { 0% { opacity: 0.3; transform: scale(1) rotate(0deg); } 50% { opacity: 0.5; transform: scale(1.1) rotate(5deg); } 100% { opacity: 0.3; transform: scale(1) rotate(0deg); } }
        @keyframes implode { 0% { transform: rotate(0deg) translateX(100px) scale(1); opacity: 0; } 20% { opacity: 1; } 100% { transform: rotate(720deg) translateX(0) scale(0.1); opacity: 0; } }
        @keyframes birthFlash { 0% { transform: translate(-50%, -50%) scale(0); opacity: 0; } 80% { transform: translate(-50%, -50%) scale(0.1); opacity: 0.2; } 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; } }
        @keyframes driftLeft { 0% { transform: translate(-300px, -200px); opacity: 0; } 20% { opacity: 1; } 100% { transform: translate(-100px, -100px); opacity: 1; } }
        @keyframes driftRight { 0% { transform: translate(300px, 200px); opacity: 0; } 20% { opacity: 1; } 100% { transform: translate(100px, 100px); opacity: 1; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* --- DYNAMIC BACKGROUND --- */}
      
      {/* 1. Gliding Stars - Shinier in Timeline */}
      {backgroundStars.map((star) => (
        <div
          key={star.id}
          style={{
            position: 'absolute', left: `${star.x}%`, top: `${star.y}%`,
            width: `${star.size}px`, height: `${star.size}px`,
            backgroundColor: 'white', borderRadius: '50%', 
            // UPDATED: Brighter opacity and glow in timeline phase
            opacity: phase === 'timeline' ? Math.min(star.opacity + 0.4, 1) : star.opacity,
            boxShadow: phase === 'timeline' ? `0 0 ${star.size + 2}px rgba(255,255,255,0.8)` : 'none',
            transition: 'opacity 2s, box-shadow 2s',
            animation: `twinkle ${star.animDuration}s ease-in-out infinite alternate, float ${star.animDuration * 2}s ease-in-out infinite`
          }}
        />
      ))}

      {/* 2. Shooting Stars */}
      {shootingStars.map((star) => (
        <div key={`shoot-${star.id}`} style={{
          position: 'absolute', top: `${star.top}%`, left: `${star.left}%`,
          width: '150px', height: '2px',
          background: 'linear-gradient(90deg, rgba(255,255,255,1), rgba(255,255,255,0))',
          opacity: 0, // Start invisible so no static lines appear
          animation: `shooting ${star.duration}s cubic-bezier(0.4, 0.0, 0.2, 1) infinite ${star.delay}s`
        }} />
      ))}

      {/* 3. Nebula Background (Visible mostly in timeline) */}
      <div style={{
        position: 'fixed', inset: 0, 
        background: 'radial-gradient(circle at 50% 50%, rgba(76, 29, 149, 0.15), transparent 70%)',
        animation: 'nebulaPulse 10s ease-in-out infinite', pointerEvents: 'none', zIndex: 0
      }} />
      <div style={{
        position: 'fixed', inset: 0, 
        background: 'radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.1), transparent 50%)',
        animation: 'nebulaPulse 15s ease-in-out infinite reverse', pointerEvents: 'none', zIndex: 0
      }} />


      {/* --- MAIN ANIMATION STAGE --- */}
      <div style={{ ...centerStyle, transition: 'all 2s', opacity: phase === 'timeline' ? 0 : 1, transform: phase === 'timeline' ? 'scale(1.5)' : 'scale(1)', zIndex: 10 }}>
        <div style={{ position: 'relative', width: '80vmin', height: '80vmin' }}>
          
          {/* Phase 1: BIRTH */}
          {phase === 'birth' && (
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
               <div style={{ position: 'absolute', top: '33%', left: '33%', transform: 'translate(-50%, -50%)' }}>
                  {dustParticles.slice(0, 20).map((p) => (
                    <div key={p.id} style={{
                      position: 'absolute', backgroundColor: '#93c5fd', borderRadius: '50%',
                      top: '50%', left: '50%', width: p.size, height: p.size,
                      animation: `implode ${p.duration}s ease-in forwards ${p.delay}s`
                    }} />
                  ))}
                  <div style={{ position: 'absolute', top: '50%', left: '50%', width: '8px', height: '8px', backgroundColor: 'white', borderRadius: '50%', animation: 'birthFlash 6s ease-in forwards', boxShadow: '0 0 30px #60a5fa' }} />
               </div>

               <div style={{ position: 'absolute', bottom: '33%', right: '33%', transform: 'translate(50%, 50%)' }}>
                  {dustParticles.slice(20, 40).map((p) => (
                    <div key={p.id} style={{
                      position: 'absolute', backgroundColor: '#f9a8d4', borderRadius: '50%',
                      top: '50%', left: '50%', width: p.size, height: p.size,
                      animation: `implode ${p.duration}s ease-in forwards ${p.delay}s`
                    }} />
                  ))}
                  <div style={{ position: 'absolute', top: '50%', left: '50%', width: '8px', height: '8px', backgroundColor: 'white', borderRadius: '50%', animation: 'birthFlash 6s ease-in forwards', boxShadow: '0 0 30px #f472b6' }} />
               </div>
            </div>
          )}

          {/* Phase 2: DRIFTING */}
          {phase === 'drifting' && (
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
               <div style={{ position: 'absolute', top: '50%', left: '50%', width: '10px', height: '10px', backgroundColor: 'white', borderRadius: '50%', animation: 'driftLeft 6s ease-in-out forwards', boxShadow: '0 0 20px #60a5fa' }} />
               <div style={{ position: 'absolute', top: '50%', left: '50%', width: '10px', height: '10px', backgroundColor: 'white', borderRadius: '50%', animation: 'driftRight 6s ease-in-out forwards', boxShadow: '0 0 20px #f472b6' }} />
            </div>
          )}

          {/* Phase 3: ORBITING */}
          {phase === 'orbiting' && (
            <div style={{ width: '100%', height: '100%', position: 'relative', animation: 'fadeIn 2s ease-in' }}>
               <div style={{ position: 'absolute', top: '25%', left: '25%', right: '25%', bottom: '25%', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', animation: 'spin 60s linear infinite' }} />
               <div style={{ position: 'absolute', top: '30%', left: '30%', right: '30%', bottom: '30%', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)', animation: 'spin 40s linear infinite reverse' }} />
               
               <div style={{ position: 'absolute', inset: 0, animation: 'spin 8s linear infinite' }}>
                 <div style={{ position: 'absolute', top: '25%', left: '50%', width: '8px', height: '8px', backgroundColor: 'white', borderRadius: '50%', transform: 'translate(-50%, -50%)', boxShadow: '0 0 20px #60a5fa' }} />
               </div>

               <div style={{ position: 'absolute', inset: 0, animation: 'spin 8s linear infinite reverse' }}>
                 <div style={{ position: 'absolute', bottom: '25%', left: '50%', width: '8px', height: '8px', backgroundColor: 'white', borderRadius: '50%', transform: 'translate(-50%, 50%)', boxShadow: '0 0 20px #f472b6' }} />
               </div>
            </div>
          )}

          {/* Phase 4: INTERSECTING */}
          {phase === 'intersecting' && (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <div style={{ width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', position: 'relative', animation: 'ping 4s ease-in-out infinite', boxShadow: '0 0 50px white' }} />
            </div>
          )}
        </div>
      </div>

      {/* CAPTIONS */}
      <div style={{ position: 'fixed', bottom: '80px', width: '100%', textAlign: 'center', pointerEvents: 'none', zIndex: 20 }}>
        {phase === 'birth' && <p style={{ animation: 'fadeIn 1s', textTransform: 'uppercase', letterSpacing: '0.4em', color: '#9ca3af', fontSize: '12px' }}>Stellar Genesis</p>}
        {phase === 'drifting' && <p style={{ animation: 'fadeIn 1s', textTransform: 'uppercase', letterSpacing: '0.4em', color: '#9ca3af', fontSize: '12px' }}>Gravitational Pull</p>}
        {phase === 'orbiting' && <p style={{ animation: 'fadeIn 1s', textTransform: 'uppercase', letterSpacing: '0.4em', color: '#9ca3af', fontSize: '12px' }}>Binary Resonance</p>}
        {phase === 'intersecting' && <p style={{ animation: 'fadeIn 1s', textTransform: 'uppercase', letterSpacing: '0.4em', color: '#9ca3af', fontSize: '12px' }}>Convergence</p>}
      </div>

      {/* TIMELINE SCROLL AREA (Semi-Transparent) */}
      {showTimeline && (
        <div style={{ 
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(10,5,20,0.85))', // Transparent background
            overflowY: 'auto', zIndex: 30, animation: 'fadeIn 2s forwards' 
          }}>
           <div style={{ maxWidth: '600px', margin: '0 auto', padding: '80px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h1 style={{ fontSize: '36px', marginBottom: '10px', letterSpacing: '0.2em', textAlign: 'center', textShadow: '0 0 20px rgba(255,255,255,0.3)' }}>V • MONTHS</h1>
              <div style={{ width: '1px', height: '60px', backgroundColor: 'rgba(255,255,255,0.2)', margin: '40px 0' }} />
              
              {memories.map((mem, i) => (
                <div key={i} onClick={() => setSelectedMemory(i)} 
                     style={{ 
                       display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '100px', cursor: 'pointer', 
                       animation: `slideUp 1s ease-out forwards ${i * 0.2}s`, opacity: 0 
                     }}>
                  
                  <div style={{ 
                      width: '48px', height: '48px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', 
                      backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)'
                    }}>
                    <div style={{ width: '12px', height: '12px', backgroundColor: mem.color, borderRadius: mem.type === 'star' ? '0' : '50%', transform: mem.type === 'star' ? 'rotate(45deg)' : 'none', boxShadow: `0 0 10px ${mem.color}` }} />
                  </div>
                  
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#9ca3af', marginBottom: '4px' }}>{mem.date}</p>
                    <h2 style={{ fontSize: '24px', marginBottom: '4px' }}>{mem.title}</h2>
                    <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#d1d5db' }}>{mem.subtitle}</p>
                  </div>
                </div>
              ))}

              <div style={{ marginTop: '40px', textAlign: 'center', opacity: 0, animation: 'fadeIn 2s forwards 2s' }}>
                 <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5em', color: '#6b7280' }}>Ad Infinitum</p>
              </div>
           </div>
        </div>
      )}

      {/* MODAL POPUP */}
      {selectedMemory !== null && (
        <div style={modalOverlayStyle} onClick={() => setSelectedMemory(null)}>
          <div onClick={e => e.stopPropagation()} style={{ 
              backgroundColor: 'rgba(20,20,25,0.9)', border: '1px solid rgba(255,255,255,0.1)', 
              padding: '40px', maxWidth: '400px', width: '90%', textAlign: 'center',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)'
            }}>
             <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>{memories[selectedMemory].title}</h2>
             <p style={{ color: '#e5e7eb', fontStyle: 'italic', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>"{letters[selectedMemory]}"</p>
             
             <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
               <button onClick={() => setSelectedMemory(null)} style={{ background: 'none', border: 'none', color: '#9ca3af', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.2em', cursor: 'pointer' }}>
                 Close
               </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}