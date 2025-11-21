import React, { useState, useEffect, useRef } from 'react';
import { X, Edit2, Sparkles } from 'lucide-react';

export default function App() {
  const [phase, setPhase] = useState('birth'); // birth, drifting, orbiting, intersecting, timeline
  const [showTimeline, setShowTimeline] = useState(false);
  const [backgroundStars, setBackgroundStars] = useState([]);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [editingLetter, setEditingLetter] = useState(false);
  const [letters, setLetters] = useState({});
  const [dustParticles, setDustParticles] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    // Generate background stars
    const stars = [...Array(300)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() < 0.9 ? Math.random() * 1.5 : Math.random() * 2.5,
      opacity: Math.random() * 0.6 + 0.1,
      twinkleSpeed: Math.random() * 4 + 2
    }));
    setBackgroundStars(stars);

    // Generate nebula dust for 'birth' phase
    const dust = [...Array(40)].map((_, i) => ({
      id: i,
      angle: Math.random() * 360,
      dist: Math.random() * 100 + 50,
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 4,
      size: Math.random() * 4 + 2
    }));
    setDustParticles(dust);

    // Initialize letters
    setLetters({
      0: 'The silence of the universe was broken by a single notification. It wasn\'t just a message; it was the beginning of an orbit I never knew I needed.',
      1: 'Do you remember the way the light hit your face? In that moment, the rest of the world blurred into background noise. Just gravity, pulling us close.',
      2: 'A shared glance, a burst of laughter that echoed like a pulsar. It\'s our secret language, a frequency only we can tune into.',
      3: 'Three words, heavy with gravity, soft as starlight. The moment the universe shifted on its axis.',
      4: 'Our sanctuary. Not defined by coordinates, but by the feeling of safety when we are there. A pocket universe just for two.',
      5: 'Five months is but a blink in cosmic time, yet it holds my entire world. Here is to the light-years ahead.'
    });

    // Cinematic Sequence
    const driftTimer = setTimeout(() => setPhase('drifting'), 6000);      // 0-6s: Birth
    const orbitTimer = setTimeout(() => setPhase('orbiting'), 12000);     // 6-12s: Drifting
    const intersectTimer = setTimeout(() => setPhase('intersecting'), 19000); // 12-19s: Orbiting
    const timelineTimer = setTimeout(() => {                              // 19-23s: Intersecting
      setPhase('timeline');
      setTimeout(() => setShowTimeline(true), 800);
    }, 23000);

    return () => {
      clearTimeout(driftTimer);
      clearTimeout(orbitTimer);
      clearTimeout(intersectTimer);
      clearTimeout(timelineTimer);
    };
  }, []);

  const memories = [
    {
      date: 'Month 1',
      title: 'First Contact',
      subtitle: 'The Spark',
      type: 'star',
      color: 'text-blue-200',
      glow: 'shadow-blue-500/20'
    },
    {
      date: 'Month 1.5',
      title: 'Velvet Night',
      subtitle: 'First Date',
      type: 'planet',
      color: 'text-purple-200',
      glow: 'shadow-purple-500/20'
    },
    {
      date: 'Month 2',
      title: 'Binary Systems',
      subtitle: 'Inside Joke',
      type: 'nebula',
      color: 'text-emerald-200',
      glow: 'shadow-emerald-500/20'
    },
    {
      date: 'Month 3',
      title: 'Event Horizon',
      subtitle: 'I Love You',
      type: 'supernova',
      color: 'text-rose-200',
      glow: 'shadow-rose-500/20'
    },
    {
      date: 'Month 4',
      title: 'Safe Harbor',
      subtitle: 'Our Place',
      type: 'moon',
      color: 'text-amber-100',
      glow: 'shadow-amber-500/20',
      special: true
    },
    {
      date: 'Month 5',
      title: 'The Infinite',
      subtitle: 'Future',
      type: 'galaxy',
      color: 'text-cyan-200',
      glow: 'shadow-cyan-500/20'
    }
  ];

  // Abstract geometry components for icons
  const CelestialIcon = ({ type, color }) => {
    if (type === 'star') return <div className={`w-2 h-2 rotate-45 ${color} bg-current shadow-[0_0_15px_currentColor]`} />;
    if (type === 'planet') return <div className={`w-3 h-3 rounded-full ${color} bg-current shadow-[inset_-2px_-2px_6px_rgba(0,0,0,0.5)]`} />;
    if (type === 'nebula') return <div className={`w-4 h-4 rounded-full ${color} bg-current opacity-60 blur-sm`} />;
    if (type === 'supernova') return (
      <div className="relative flex items-center justify-center">
         <div className={`absolute w-8 h-[1px] ${color} bg-current`} />
         <div className={`absolute w-[1px] h-8 ${color} bg-current`} />
         <div className={`w-1 h-1 rounded-full bg-white shadow-[0_0_10px_white]`} />
      </div>
    );
    if (type === 'moon') return <div className={`w-3 h-3 rounded-full border border-current ${color} shadow-[0_0_10px_currentColor]`} />;
    return <div className={`w-1 h-1 rounded-full ${color} bg-current shadow-[0_0_10px_currentColor] animate-pulse`} />;
  };

  // Intro Text Component
  const NarrativeText = ({ show, text }) => (
    <div className={`absolute bottom-20 left-0 right-0 text-center transition-opacity duration-1000 ${show ? 'opacity-100' : 'opacity-0'}`}>
      <p className="text-[10px] tracking-[0.4em] uppercase text-slate-500 font-light">{text}</p>
    </div>
  );

  return (
    <div className="relative w-full h-screen bg-[#050505] text-slate-300 font-serif overflow-hidden selection:bg-white/10">
      
      {/* Ambient Grain & Fog */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }} />
      <div className="fixed inset-0 bg-gradient-to-b from-black via-[#0a0a0c] to-[#050505] opacity-80 z-0" />

      {/* Background Stars */}
      <div className="fixed inset-0 z-0 perspective-1000">
        {backgroundStars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              width: star.size + 'px',
              height: star.size + 'px',
              left: star.x + '%',
              top: star.y + '%',
              opacity: star.opacity,
              animation: `twinkle ${star.twinkleSpeed}s ease-in-out infinite alternate`
            }}
          />
        ))}
      </div>

      {/* Main Animation Container */}
      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-[2000ms] ease-in-out z-10 ${phase === 'timeline' ? 'opacity-0 pointer-events-none scale-150' : 'opacity-100'}`}>
        
        <div className="relative w-[800px] h-[800px] flex items-center justify-center">
          
          {/* Phase 1: BIRTH - Stellar Nucleosynthesis */}
          {phase === 'birth' && (
            <div className="absolute inset-0">
               {/* Left Protostar Cloud */}
               <div className="absolute top-1/3 left-1/3 w-64 h-64 -translate-x-1/2 -translate-y-1/2">
                  <div className="absolute inset-0 bg-blue-900/20 rounded-full blur-[60px] animate-[pulse_4s_ease-in-out_infinite]" />
                  {dustParticles.slice(0, 20).map((p) => (
                    <div 
                      key={`l-${p.id}`}
                      className="absolute top-1/2 left-1/2 bg-blue-200/40 rounded-full animate-[implode_5s_ease-in_forwards]"
                      style={{
                        width: p.size + 'px',
                        height: p.size + 'px',
                        transform: `rotate(${p.angle}deg) translateX(${p.dist}px)`,
                        animationDelay: p.delay + 's',
                        animationDuration: p.duration + 's'
                      }}
                    />
                  ))}
                  <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_40px_10px_rgba(100,200,255,0.5)] animate-[birth-flash_6s_ease-in_forwards] opacity-0" />
               </div>

               {/* Right Protostar Cloud */}
               <div className="absolute bottom-1/3 right-1/3 w-64 h-64 translate-x-1/2 translate-y-1/2">
                  <div className="absolute inset-0 bg-rose-900/20 rounded-full blur-[60px] animate-[pulse_4s_ease-in-out_infinite_reverse]" />
                  {dustParticles.slice(20, 40).map((p) => (
                    <div 
                      key={`r-${p.id}`}
                      className="absolute top-1/2 left-1/2 bg-rose-200/40 rounded-full animate-[implode_5s_ease-in_forwards]"
                      style={{
                        width: p.size + 'px',
                        height: p.size + 'px',
                        transform: `rotate(${p.angle}deg) translateX(${p.dist}px)`,
                        animationDelay: p.delay + 's',
                        animationDuration: p.duration + 's'
                      }}
                    />
                  ))}
                  <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_40px_10px_rgba(255,180,200,0.5)] animate-[birth-flash_6s_ease-in_forwards] opacity-0" />
               </div>
            </div>
          )}

          {/* Phase 2: DRIFTING - Finding Each Other */}
          {phase === 'drifting' && (
            <div className="absolute inset-0">
              {/* Star 1 drifting from left */}
              <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_20px_2px_rgba(100,200,255,0.6)] animate-[drift-left_6s_ease-in-out_forwards]">
                 <div className="absolute inset-0 w-[100px] h-[1px] bg-gradient-to-r from-transparent via-blue-400/30 to-transparent -translate-x-1/2 rotate-45" />
              </div>
              
              {/* Star 2 drifting from right */}
              <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_20px_2px_rgba(255,180,200,0.6)] animate-[drift-right_6s_ease-in-out_forwards]">
                 <div className="absolute inset-0 w-[100px] h-[1px] bg-gradient-to-r from-transparent via-rose-400/30 to-transparent -translate-x-1/2 -rotate-45" />
              </div>
            </div>
          )}

          {/* Phase 3: ORBITING - The Dance */}
          {phase === 'orbiting' && (
            <div className="absolute inset-0 animate-[fade-in_2s_ease-in]">
              {/* Orbit Rings */}
              <div className="absolute top-[25%] left-[25%] right-[25%] bottom-[25%] rounded-full border border-white/[0.03] animate-[spin_60s_linear_infinite]" />
              <div className="absolute top-[30%] left-[30%] right-[30%] bottom-[30%] rounded-full border border-white/[0.02] animate-[spin_40s_linear_infinite_reverse]" />
              
              {/* Star 1 Orbit */}
              <div className="absolute inset-0 animate-[spin_8s_linear_infinite]">
                <div className="absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white shadow-[0_0_30px_4px_rgba(100,200,255,0.4)] rounded-full" />
                {/* Comet Tail */}
                <div className="absolute top-[25%] left-1/2 w-[120px] h-[1px] bg-gradient-to-l from-transparent via-blue-500/20 to-transparent origin-left rotate-[-15deg]" />
              </div>

              {/* Star 2 Orbit */}
              <div className="absolute inset-0 animate-[spin_8s_linear_infinite_reverse]">
                <div className="absolute bottom-[25%] left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 bg-white shadow-[0_0_30px_4px_rgba(255,180,200,0.4)] rounded-full" />
                 {/* Comet Tail */}
                 <div className="absolute bottom-[25%] left-1/2 w-[120px] h-[1px] bg-gradient-to-l from-transparent via-rose-500/20 to-transparent origin-left rotate-[-15deg]" />
              </div>
            </div>
          )}

          {/* Phase 4: INTERSECTING - The Merger */}
          {phase === 'intersecting' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                 <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_150px_60px_rgba(255,255,255,0.8)] animate-[ping_4s_ease-in-out]" />
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[1px] bg-white/40 blur-[1px] animate-[spin_3s_ease-in-out]" />
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[800px] bg-white/40 blur-[1px] animate-[spin_3s_ease-in-out_reverse]" />
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl animate-pulse" />
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-2xl animate-pulse delay-75" />
              </div>
            </div>
          )}
        </div>

        {/* Narrative Captions */}
        <NarrativeText show={phase === 'birth'} text="Stellar Genesis" />
        <NarrativeText show={phase === 'drifting'} text="Gravitational Pull" />
        <NarrativeText show={phase === 'orbiting'} text="Binary Resonance" />
        <NarrativeText show={phase === 'intersecting'} text="Convergence" />
      </div>

      {/* Timeline Phase (Main Content) */}
      {phase === 'timeline' && (
        <div className={`relative z-20 h-full w-full transition-opacity duration-[2000ms] ${showTimeline ? 'opacity-100' : 'opacity-0'}`}>
          <div 
            ref={scrollRef}
            className="h-full overflow-y-auto scrollbar-hide scroll-smooth"
          >
            <div className="min-h-screen flex flex-col items-center py-32 px-6">
              
              {/* Minimal Header */}
              <div className="mb-32 text-center animate-fade-in-up">
                <p className="text-[10px] tracking-[0.5em] uppercase text-slate-500 mb-4">The Chronicle</p>
                <h1 className="text-3xl md:text-4xl font-light text-white tracking-widest mb-2 font-display">
                  V • MONTHS
                </h1>
                <div className="w-px h-16 bg-gradient-to-b from-transparent via-slate-700 to-transparent mx-auto mt-8" />
              </div>

              {/* The Thread */}
              <div className="relative max-w-2xl w-full">
                {/* Central Line */}
                <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

                {memories.map((memory, index) => (
                  <div 
                    key={index}
                    className={`group relative flex items-center mb-24 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}
                  >
                    {/* The Node */}
                    <button 
                      onClick={() => { setSelectedMemory(index); setEditingLetter(false); }}
                      className="absolute left-0 md:left-1/2 -translate-x-[calc(50%-19.5px)] md:-translate-x-1/2 w-10 h-10 flex items-center justify-center z-10 transition-all duration-500 group-hover:scale-125 focus:outline-none"
                    >
                      <div className="relative w-full h-full flex items-center justify-center">
                        <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${memory.glow} shadow-[0_0_30px_currentColor]`} />
                        <div className="bg-[#050505] rounded-full p-2 border border-white/10 relative z-10">
                           <CelestialIcon type={memory.type} color={memory.color} />
                        </div>
                      </div>
                    </button>

                    {/* The Content */}
                    <div className={`ml-16 md:ml-0 w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'} opacity-0 animate-slide-up`} style={{ animationDelay: `${index * 0.15}s`, animationFillMode: 'forwards' }}>
                      <div 
                        className="cursor-pointer group-hover:translate-x-1 md:group-hover:translate-x-0 md:group-hover:-translate-y-1 transition-transform duration-500 ease-out"
                        onClick={() => { setSelectedMemory(index); setEditingLetter(false); }}
                      >
                        <span className="text-[9px] tracking-[0.3em] uppercase text-slate-500 block mb-2">{memory.date}</span>
                        <h3 className={`text-xl font-light text-slate-200 mb-1 tracking-wide transition-colors duration-300 group-hover:text-white ${memory.special ? 'text-amber-100' : ''}`}>
                          {memory.title}
                        </h3>
                        <p className="text-xs text-slate-500 font-light italic tracking-wider">{memory.subtitle}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* End Marker */}
                <div className="flex flex-col items-center mt-12 animate-fade-in opacity-0" style={{ animationDelay: '1.5s', animationFillMode: 'forwards' }}>
                  <div className="w-px h-16 bg-gradient-to-b from-white/10 to-transparent mb-8" />
                  <Sparkles className="w-4 h-4 text-slate-600 animate-pulse" />
                  <p className="mt-6 text-[9px] tracking-[0.4em] uppercase text-slate-600">Ad Infinitum</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Minimalist Modal */}
      {selectedMemory !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 md:p-12">
          <div className="absolute inset-0 bg-[#050505]/90 backdrop-blur-md transition-opacity duration-500" onClick={() => setSelectedMemory(null)} />
          
          <div className="relative w-full max-w-lg bg-black/40 border border-white/10 p-8 md:p-16 shadow-2xl animate-modal-rise backdrop-blur-xl">
            <button
              onClick={() => setSelectedMemory(null)}
              className="absolute top-6 right-6 text-slate-600 hover:text-white transition-colors duration-300"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center mb-10">
              <div className="flex justify-center mb-6">
                <div className="p-3 border border-white/5 rounded-full bg-white/[0.02]">
                   <CelestialIcon type={memories[selectedMemory].type} color={memories[selectedMemory].color} />
                </div>
              </div>
              <span className="text-[9px] tracking-[0.4em] uppercase text-slate-500">{memories[selectedMemory].date}</span>
              <h2 className="text-2xl text-white font-light mt-3 tracking-widest">{memories[selectedMemory].title}</h2>
              <div className="w-8 h-px bg-white/20 mx-auto mt-6" />
            </div>

            <div className="relative">
              {!editingLetter ? (
                <>
                  <div className="prose prose-invert mx-auto">
                    <p className="text-slate-300 text-sm leading-8 text-center font-light tracking-wide italic whitespace-pre-wrap">
                      "{letters[selectedMemory]}"
                    </p>
                  </div>
                  <button
                    onClick={() => setEditingLetter(true)}
                    className="absolute -bottom-12 right-0 text-slate-600 hover:text-slate-400 transition-colors p-2"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                </>
              ) : (
                <div className="animate-fade-in">
                  <textarea
                    className="w-full h-64 bg-transparent text-slate-300 text-sm leading-8 font-light tracking-wide italic text-center border-none focus:ring-0 resize-none p-0 placeholder-slate-700"
                    value={letters[selectedMemory]}
                    onChange={(e) => setLetters({ ...letters, [selectedMemory]: e.target.value })}
                    autoFocus
                  />
                  <div className="flex justify-center gap-6 mt-8 border-t border-white/5 pt-6">
                    <button
                      onClick={() => setEditingLetter(false)}
                      className="text-[10px] uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setEditingLetter(false)}
                      className="text-[10px] uppercase tracking-[0.2em] text-white border border-white/20 px-6 py-2 hover:bg-white/5 transition-colors"
                    >
                      Save Entry
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@200;300;400&display=swap');
        
        * {
          font-family: 'Cormorant Garamond', serif;
        }

        .font-display {
          font-family: 'Montserrat', sans-serif;
        }

        @keyframes twinkle {
          0% { opacity: 0.3; transform: scale(1); }
          100% { opacity: 1; transform: scale(1.2); }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes modal-rise {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        @keyframes implode {
          0% { transform: rotate(0deg) translateX(100px) scale(1); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: rotate(720deg) translateX(0) scale(0.1); opacity: 0; }
        }

        @keyframes birth-flash {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
          80% { transform: translate(-50%, -50%) scale(0.1); opacity: 0.2; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }

        @keyframes drift-left {
          0% { transform: translate(-300px, -200px); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translate(-100px, -100px); opacity: 1; }
        }

        @keyframes drift-right {
          0% { transform: translate(300px, 200px); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translate(100px, 100px); opacity: 1; }
        }

        .animate-slide-up {
          animation: slide-up 1s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1.5s ease-out forwards;
        }

        .animate-modal-rise {
          animation: modal-rise 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        /* Hide Scrollbar */
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}