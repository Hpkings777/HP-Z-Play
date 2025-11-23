
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Cpu, Trophy, PlayCircle, Box, ChevronLeft, ChevronRight, Twitter, Twitch, Youtube } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const heroCardContainerRef = useRef<HTMLDivElement>(null);
  const heroCardRef = useRef<HTMLDivElement>(null);

  // State for cursor logic
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const cursorX = useRef(0);
  const cursorY = useRef(0);

  useEffect(() => {
    // --- CURSOR LOGIC ---
    const onMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = e.clientX + 'px';
        cursorDotRef.current.style.top = e.clientY + 'px';
      }
    };

    const animateCursor = () => {
      const dx = mouseX.current - cursorX.current;
      const dy = mouseY.current - cursorY.current;

      cursorX.current += dx * 0.15;
      cursorY.current += dy * 0.15;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.left = cursorX.current + 'px';
        cursorRingRef.current.style.top = cursorY.current + 'px';
      }

      requestAnimationFrame(animateCursor);
    };

    window.addEventListener('mousemove', onMouseMove);
    const cursorAnimId = requestAnimationFrame(animateCursor);

    // --- INTERACTIVE HOVER ---
    const interactables = document.querySelectorAll('.interactable');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });

    // --- MAGNETIC BUTTONS ---
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        const button = btn as HTMLElement;
        button.addEventListener('mousemove', (e: MouseEvent) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });

    // --- SPOTLIGHT CARDS ---
    const spotlightCards = document.querySelectorAll('.spotlight-card');
    spotlightCards.forEach(card => {
        const cardEl = card as HTMLElement;
        cardEl.addEventListener('mousemove', (e: MouseEvent) => {
            const rect = cardEl.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            cardEl.style.setProperty('--mouse-x', `${x}px`);
            cardEl.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // --- HERO 3D TILT ---
    const cardContainer = heroCardContainerRef.current;
    const card = heroCardRef.current;

    if(cardContainer && card) {
        cardContainer.addEventListener('mousemove', (e: MouseEvent) => {
            const rect = cardContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const xRot = ((y / rect.height) - 0.5) * -20;
            const yRot = ((x / rect.width) - 0.5) * 20;

            card.style.transform = `rotateX(${xRot}deg) rotateY(${yRot}deg) scale(1.02)`;
        });

        cardContainer.addEventListener('mouseleave', () => {
            card.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    }

    // --- WARP GRID CANVAS ---
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    let animationFrameId: number;

    if (canvas && ctx) {
      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      window.addEventListener('resize', resizeCanvas);
      resizeCanvas();

      const gridSize = 40;

      const drawGrid = () => {
        if (!ctx || !canvas) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.15)';
        ctx.lineWidth = 1;

        for(let x = 0; x <= canvas.width; x += gridSize) {
            ctx.beginPath();
            for(let y = 0; y <= canvas.height; y += 10) {
                const dx = x - mouseX.current;
                const dy = y - mouseY.current;
                const dist = Math.sqrt(dx*dx + dy*dy);

                let warpX = x;
                if(dist < 200) {
                    const force = (200 - dist) / 200;
                    warpX -= (dx * force * 0.2);
                }

                if(y === 0) ctx.moveTo(warpX, y);
                else ctx.lineTo(warpX, y);
            }
            ctx.stroke();
        }

        for(let y = 0; y <= canvas.height; y += gridSize) {
            ctx.beginPath();
            for(let x = 0; x <= canvas.width; x += 10) {
                const dx = x - mouseX.current;
                const dy = y - mouseY.current;
                const dist = Math.sqrt(dx*dx + dy*dy);

                let warpY = y;
                if(dist < 200) {
                    const force = (200 - dist) / 200;
                    warpY -= (dy * force * 0.2);
                }

                if(x === 0) ctx.moveTo(x, warpY);
                else ctx.lineTo(x, warpY);
            }
            ctx.stroke();
        }
        animationFrameId = requestAnimationFrame(drawGrid);
      };
      drawGrid();
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(cursorAnimId);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', () => {});
    };
  }, []);

  const handleEnterDashboard = () => {
    navigate('/home');
  };

  // --- DRONE EASTER EGG LOGIC ---
  const handleDroneClick = (e: React.MouseEvent<HTMLDivElement>) => {
      const drone = e.currentTarget;
      const rect = drone.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      for(let i=0; i<12; i++) {
          const p = document.createElement('div');
          p.classList.add('particle');
          p.style.left = centerX + 'px';
          p.style.top = centerY + 'px';

          const angle = Math.random() * Math.PI * 2;
          const velocity = 50 + Math.random() * 100;
          const tx = Math.cos(angle) * velocity;
          const ty = Math.sin(angle) * velocity;

          p.style.setProperty('--tx', `${tx}px`);
          p.style.setProperty('--ty', `${ty}px`);

          document.body.appendChild(p);
          setTimeout(() => p.remove(), 800);
      }

      const xpText = document.createElement('div');
      xpText.textContent = '+500 XP';
      xpText.classList.add('xp-popup');
      xpText.style.left = centerX + 'px';
      xpText.style.top = centerY + 'px';
      document.body.appendChild(xpText);
      setTimeout(() => xpText.remove(), 1000);

      drone.style.display = 'none';
      setTimeout(() => {
          drone.style.display = 'block';
      }, 5000);
  };

  return (
    <div className="bg-z-black text-white font-sans antialiased selection:bg-indigo-500 selection:text-white overflow-x-hidden cursor-none min-h-screen">
        {/* Custom Cursor */}
        <div ref={cursorDotRef} className="cursor-dot fixed w-2 h-2 bg-z-neon rounded-full pointer-events-none z-[9999] mix-blend-difference transition-all duration-200 -translate-x-1/2 -translate-y-1/2" />
        <div ref={cursorRingRef} className="cursor-ring fixed w-10 h-10 border border-white/50 rounded-full pointer-events-none z-[9999] mix-blend-difference transition-all duration-200 -translate-x-1/2 -translate-y-1/2" />

        {/* Canvas Background */}
        <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-40" />

        {/* Navigation */}
        <nav className="fixed w-full z-50 transition-all duration-300 backdrop-blur-md border-b border-white/5 bg-black/80">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <a href="#" className="flex items-center gap-2 group interactable cursor-none">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-xl shadow-[0_0_15px_rgba(99,102,241,0.5)] group-hover:rotate-12 transition-transform">
                        Z
                    </div>
                    <span className="text-xl font-bold tracking-wide">HP <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Z-PLAY</span></span>
                </a>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
                    <a href="#features" className="hover:text-white transition-colors interactable cursor-none">Why Z-Play</a>
                    <a href="#games" className="hover:text-white transition-colors interactable cursor-none">Library</a>
                    <a href="#profile" className="hover:text-white transition-colors interactable cursor-none">Rewards</a>
                </div>

                <div className="flex items-center gap-4">
                    <button className="hidden md:block text-sm text-gray-300 hover:text-white font-medium interactable cursor-none">Log In</button>
                    <button onClick={handleEnterDashboard} className="magnetic-btn px-6 py-2.5 bg-white text-black font-bold text-sm rounded-full hover:bg-indigo-50 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)] interactable cursor-none">
                        Play Now
                    </button>
                </div>
            </div>
        </nav>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden z-10">
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative w-full">

                {/* Hero Text */}
                <div className="relative">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-indigo-300 mb-6 backdrop-blur-md hover:bg-white/10 transition-colors cursor-none interactable">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                        SYSTEM ONLINE: V.2.0
                    </div>
                    <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight leading-[1] mb-6 select-none">
                        Play <span className="glitch-wrapper interactable cursor-none text-z-neon" data-text="Instantly">Instantly</span>.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400">Level Up.</span>
                    </h1>
                    <p className="text-lg text-gray-400 mb-8 max-w-lg leading-relaxed">
                        The friction of downloads is gone. Welcome to the era of instant immersion. Warp into your next game in seconds.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button onClick={handleEnterDashboard} className="magnetic-btn px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-[0_0_30px_rgba(79,70,229,0.4)] flex items-center justify-center gap-2 group interactable cursor-none">
                            <PlayCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span>Start Engine</span>
                        </button>
                        <button onClick={handleEnterDashboard} className="magnetic-btn px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-semibold transition-all backdrop-blur-md flex items-center justify-center gap-2 interactable cursor-none">
                            Explore Library
                        </button>
                    </div>
                </div>

                {/* Hero Visual */}
                <div className="relative h-[500px] items-center justify-center perspective-1000 hidden lg:flex" id="hero-card-container" ref={heroCardContainerRef}>
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 blur-[100px] rounded-full animate-pulse"></div>

                    <div id="hero-card" ref={heroCardRef} className="relative w-[400px] h-[540px] bg-black/40 border border-white/10 rounded-2xl p-4 shadow-2xl backdrop-blur-xl group transition-transform duration-100 ease-out interactable hover:scale-105">
                        <div className="absolute inset-0 rounded-2xl overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1614726365345-422f2814b745?q=80&w=2574&auto=format&fit=crop" alt="Game Art" className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                        </div>

                        <div className="relative z-20 h-full flex flex-col justify-end p-6">
                            <div className="flex justify-between items-end mb-4">
                                <div>
                                    <h3 className="text-3xl font-bold text-white mb-1">Cyber Drift</h3>
                                    <div className="text-sm text-indigo-400 font-mono">RANKED SEASON 4</div>
                                </div>
                                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-black/50 backdrop-blur-md">
                                    <span className="text-xs font-bold">98</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-mono text-gray-400">
                                    <span>SERVER LOAD</span>
                                    <span>OPTIMAL</span>
                                </div>
                                <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 w-[75%] shadow-[0_0_10px_#22c55e]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 relative z-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { icon: Zap, color: "indigo", title: "Instant Access", desc: "No downloads. The grid streams assets dynamically. You play, we handle the heavy lifting." },
                        { icon: Cpu, color: "purple", title: "Cloud Compute", desc: "Running on Z-Core servers. Ray tracing enabled on any device with a screen." },
                        { icon: Trophy, color: "pink", title: "Universal XP", desc: "Your profile levels up across all games. Earn the 'Legend' badge to unlock beta features." },
                    ].map((feature, idx) => (
                        <div key={idx} className="spotlight-card p-8 rounded-2xl group interactable hover:bg-white/10 transition-colors cursor-none">
                            <div className={`w-14 h-14 bg-${feature.color}-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-${feature.color}-500/20`}>
                                <feature.icon className={`w-7 h-7 text-${feature.color}-400`} />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Games Section */}
        <section id="games" className="py-24 bg-z-dark relative z-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-4xl font-bold">Live Games</h2>
                    <div className="flex gap-2">
                        <button className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-white hover:text-black transition-colors interactable cursor-none">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-white hover:text-black transition-colors interactable cursor-none">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { title: "Neon City Raiders", desc: "Cyberpunk Action RPG", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop" },
                        { title: "Echo Protocol", desc: "Tactical Shooter", img: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2670&auto=format&fit=crop" },
                        { title: "Apex Racer", desc: "Simulation Racing", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop" }
                    ].map((game, idx) => (
                        <div key={idx} onClick={handleEnterDashboard} className="group relative rounded-xl overflow-hidden h-80 interactable cursor-none">
                            <img src={game.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1" alt="Game" />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-indigo-900/20 transition-colors"></div>
                            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black via-black/80 to-transparent translate-y-4 group-hover:translate-y-0 transition-transform">
                                <h3 class="text-xl font-bold">{game.title}</h3>
                                <p className="text-gray-400 text-sm mb-3 opacity-0 group-hover:opacity-100 transition-opacity">{game.desc}</p>
                                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 border-b border-indigo-400 pb-0.5">Play Now</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Easter Egg Drone */}
        <div onClick={handleDroneClick} id="loot-drone" className="fixed bottom-10 right-10 z-50 animate-float interactable cursor-none group" style={{animationDuration: '4s'}}>
            <div className="relative w-16 h-16 transition-transform transform group-hover:scale-110 active:scale-95 cursor-none">
                <div className="absolute inset-0 bg-gray-900 rounded-lg border border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.6)] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-indigo-500/20 animate-pulse"></div>
                    <Box className="w-8 h-8 text-white relative z-10" />
                </div>
                <div className="absolute -top-2 -left-2 w-6 h-1 bg-indigo-400 rounded-full animate-spin"></div>
                <div className="absolute -top-2 -right-2 w-6 h-1 bg-indigo-400 rounded-full animate-spin"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-1 bg-indigo-400 rounded-full animate-spin"></div>
                <div className="absolute -bottom-2 -right-2 w-6 h-1 bg-indigo-400 rounded-full animate-spin"></div>

                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/80 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/20">
                    CLICK TO LOOT
                </div>
            </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-white/5 bg-black pt-16 pb-8 relative z-10">
            <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-6">Start Your Saga</h2>
                <div className="flex gap-4 mb-8">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-colors interactable cursor-none"><Twitter className="w-4 h-4" /></div>
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-colors interactable cursor-none"><Twitch className="w-4 h-4" /></div>
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-colors interactable cursor-none"><Youtube className="w-4 h-4" /></div>
                </div>
                <p className="text-gray-600 text-xs">© 2025 HP Z-Play System.</p>
            </div>
        </footer>

        <style>{`
            .cursor-dot, .cursor-ring { pointer-events: none; z-index: 9999; mix-blend-mode: difference; position: fixed; transform: translate(-50%, -50%); border-radius: 50%; }
            .cursor-dot { width: 8px; height: 8px; background-color: #00f0ff; transition: width 0.2s, height 0.2s; }
            .cursor-ring { width: 40px; height: 40px; border: 1px solid rgba(255, 255, 255, 0.5); transition: width 0.2s, height 0.2s, background-color 0.2s; }
            body.hovering .cursor-ring { width: 60px; height: 60px; background-color: rgba(255, 255, 255, 0.1); border-color: #00f0ff; }

            .spotlight-card { background-color: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); position: relative; overflow: hidden; }
            .spotlight-card::before { content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(99, 102, 241, 0.15), transparent 40%); opacity: 0; transition: opacity 0.5s; pointer-events: none; z-index: 0; }
            .spotlight-card:hover::before { opacity: 1; }
            .spotlight-card > * { position: relative; z-index: 1; }

            .glitch-wrapper { position: relative; display: inline-block; }
            .glitch-wrapper:hover::before, .glitch-wrapper:hover::after { display: block; }
            .glitch-wrapper::before, .glitch-wrapper::after { display: none; content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0.8; }
            .glitch-wrapper::before { color: #00f0ff; z-index: -1; transform: translate(-2px, -2px); clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%); animation: glitch-anim-1 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite; }
            .glitch-wrapper::after { color: #ff00ff; z-index: -2; transform: translate(2px, 2px); clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%); animation: glitch-anim-2 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite; }
            @keyframes glitch-anim-1 { 0% { transform: translate(0); } 20% { transform: translate(-2px, 2px); } 40% { transform: translate(-2px, -2px); } 60% { transform: translate(2px, 2px); } 80% { transform: translate(2px, -2px); } 100% { transform: translate(0); } }
            @keyframes glitch-anim-2 { 0% { transform: translate(0); } 20% { transform: translate(2px, -2px); } 40% { transform: translate(2px, 2px); } 60% { transform: translate(-2px, 2px); } 80% { transform: translate(-2px, -2px); } 100% { transform: translate(0); } }

            .particle { position: absolute; width: 6px; height: 6px; background: #00f0ff; border-radius: 50%; pointer-events: none; animation: explode 0.8s ease-out forwards; }
            @keyframes explode { 0% { transform: translate(-50%, -50%) scale(1); opacity: 1; } 100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; } }
            .xp-popup { position: absolute; color: #ffd700; font-weight: bold; font-family: 'Space Grotesk', monospace; font-size: 1.5rem; pointer-events: none; animation: floatUp 1s ease-out forwards; text-shadow: 0 0 10px rgba(255, 215, 0, 0.5); z-index: 50; }
            @keyframes floatUp { 0% { transform: translateY(0) scale(0.8); opacity: 0; } 20% { transform: translateY(-20px) scale(1.2); opacity: 1; } 100% { transform: translateY(-100px) scale(1); opacity: 0; } }
        `}</style>
    </div>
  );
};

export default Landing;
