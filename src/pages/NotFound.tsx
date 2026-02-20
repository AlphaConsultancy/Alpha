import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

const NotFound = () => {
    const location = useLocation();
    const [mounted, setMounted] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        console.error("404 Error: User attempted to access non-existent route:", location.pathname);
        setMounted(true);
    }, [location.pathname]);

    // Particle globe effect matching the site's visual
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animId: number;
        let W = (canvas.width = canvas.offsetWidth);
        let H = (canvas.height = canvas.offsetHeight);

        const PARTICLE_COUNT = 300;
        let RADIUS = Math.min(W, H) * 0.28;
        let angle = 0;

        type Particle = {
            theta: number;
            phi: number;
            size: number;
            opacity: number;
            speed: number;
        };

        const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
            theta: Math.random() * Math.PI * 2,
            phi: Math.acos(2 * Math.random() - 1),
            size: Math.random() * 1.8 + 0.3,
            opacity: Math.random() * 0.75 + 0.2,
            speed: (Math.random() - 0.5) * 0.0018,
        }));

        const draw = () => {
            ctx.clearRect(0, 0, W, H);
            angle += 0.0025;

            // Outer glow
            const grd = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, RADIUS * 1.4);
            grd.addColorStop(0, "rgba(0, 160, 240, 0.09)");
            grd.addColorStop(0.6, "rgba(0, 100, 200, 0.04)");
            grd.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = grd;
            ctx.beginPath();
            ctx.arc(W / 2, H / 2, RADIUS * 1.4, 0, Math.PI * 2);
            ctx.fill();

            particles.forEach((p) => {
                p.theta += p.speed + 0.0025;

                const cosA = Math.cos(angle);
                const sinA = Math.sin(angle);
                const sinPhi = Math.sin(p.phi);
                const cosPhi = Math.cos(p.phi);
                const cosTheta = Math.cos(p.theta);
                const sinTheta = Math.sin(p.theta);

                const x3d = RADIUS * sinPhi * cosTheta;
                const y3d = RADIUS * cosPhi;
                const z3d = RADIUS * sinPhi * sinTheta;

                // Rotate around Y axis
                const x2d = x3d * cosA - z3d * sinA;
                const z2d = x3d * sinA + z3d * cosA;

                const perspective = (RADIUS + z2d) / (RADIUS * 2);
                const px = W / 2 + x2d * perspective;
                const py = H / 2 + y3d * perspective;
                const alpha = p.opacity * perspective;
                const sz = p.size * perspective * 1.6;

                // Vary color slightly for depth
                const blue = Math.floor(200 + z2d / RADIUS * 55);
                ctx.beginPath();
                ctx.arc(px, py, sz, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, ${blue}, 255, ${alpha})`;
                ctx.fill();
            });

            animId = requestAnimationFrame(draw);
        };

        draw();

        const onResize = () => {
            W = canvas.width = canvas.offsetWidth;
            H = canvas.height = canvas.offsetHeight;
            RADIUS = Math.min(W, H) * 0.28;
        };
        window.addEventListener("resize", onResize);
        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;600;700;800;900&family=Merriweather:wght@700;900&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .ac-404 {
          font-family: 'Raleway', sans-serif;
          min-height: 100vh;
          background-color: #090d18;
          background-image: radial-gradient(ellipse 80% 70% at 50% 50%, rgba(0, 100, 200, 0.08) 0%, transparent 65%);
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }

        /* Particle canvas */
        .ac-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        /* Ghost 404 */
        .ac-ghost {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -52%);
          font-family: 'Raleway', sans-serif;
          font-size: clamp(150px, 26vw, 300px);
          font-weight: 900;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(0, 180, 255, 0.1);
          letter-spacing: -0.05em;
          user-select: none;
          pointer-events: none;
          line-height: 1;
          z-index: 2;
        }

        /* Right blue accent bar — matches the site exactly */
        .ac-side-bar {
          position: fixed;
          right: 0; top: 0; bottom: 0;
          width: 4px;
          background: linear-gradient(to bottom, transparent 0%, #00a8e8 25%, #0068c0 75%, transparent 100%);
          z-index: 100;
        }

        /* ── Navbar ── */
        .ac-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 3rem;
          position: relative;
          z-index: 20;
        }
        .ac-logo {
          display: flex; align-items: center; gap: 12px;
          text-decoration: none;
        }
        .ac-logo-badge {
          width: 44px; height: 44px;
          background: rgba(255,255,255,0.04);
          border: 1.5px solid rgba(0, 180, 255, 0.35);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
        }
        .ac-logo-name {
          font-size: 1rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #fff;
        }
        .ac-logo-name em { font-style: normal; color: #00b4ff; }

        .ac-nav-links {
          display: flex; align-items: center; gap: 2.8rem;
        }
        .ac-nav-a {
          font-size: 0.76rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          transition: color 0.2s;
        }
        .ac-nav-a:hover { color: #fff; }
        .ac-nav-a.active { color: #00b4ff; border-bottom: 1px solid #00b4ff; padding-bottom: 2px; }

        .ac-nav-cta {
          font-size: 0.76rem; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: #fff; text-decoration: none;
          padding: 10px 22px;
          border: 1.5px solid rgba(255,255,255,0.28);
          border-radius: 5px;
          transition: all 0.25s;
        }
        .ac-nav-cta:hover { border-color: #00b4ff; color: #00b4ff; }

        /* ── Main ── */
        .ac-main {
          flex: 1;
          display: flex; align-items: center; justify-content: center;
          position: relative; z-index: 10;
          padding: 2rem 2rem 4rem;
          text-align: center;
        }

        .ac-box {
          max-width: 680px; width: 100%;
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.85s cubic-bezier(0.22,1,0.36,1),
                      transform 0.85s cubic-bezier(0.22,1,0.36,1);
        }
        .ac-box.in { opacity: 1; transform: translateY(0); }

        /* Badge pill */
        .ac-pill {
          display: inline-flex; align-items: center; gap: 9px;
          background: rgba(0, 180, 255, 0.07);
          border: 1px solid rgba(0, 180, 255, 0.22);
          border-radius: 100px;
          padding: 7px 22px;
          font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: #00b4ff;
          margin-bottom: 2.6rem;
        }
        .ac-pill-dot {
          width: 7px; height: 7px;
          background: #00b4ff;
          border-radius: 50%;
          animation: ac-blink 2s ease-in-out infinite;
        }
        @keyframes ac-blink {
          0%,100% { opacity:1; box-shadow: 0 0 8px #00b4ff; }
          50% { opacity:0.25; box-shadow: none; }
        }

        /* Headline */
        .ac-h1 {
          font-family: 'Merriweather', serif;
          font-size: clamp(2rem, 5.5vw, 3.6rem);
          font-weight: 900;
          color: #fff;
          line-height: 1.2;
          margin-bottom: 1.4rem;
          letter-spacing: -0.01em;
        }
        .ac-h1 .c-blue { color: #00b4ff; }

        /* Thin divider line */
        .ac-rule {
          width: 52px; height: 2px;
          background: linear-gradient(90deg, #00b4ff, transparent);
          margin: 0 auto 1.6rem;
          border-radius: 2px;
        }

        .ac-p {
          font-size: 0.98rem; font-weight: 300;
          color: rgba(255,255,255,0.48);
          line-height: 1.85;
          max-width: 420px;
          margin: 0 auto 3rem;
        }

        /* Buttons */
        .ac-btns {
          display: flex; gap: 1rem;
          justify-content: center; flex-wrap: wrap;
        }

        .ac-btn-p {
          display: inline-flex; align-items: center; gap: 10px;
          background: linear-gradient(135deg, #0088cc 0%, #00c2ff 100%);
          color: #fff;
          font-family: 'Raleway', sans-serif;
          font-size: 0.875rem; font-weight: 700;
          letter-spacing: 0.06em;
          text-decoration: none;
          padding: 15px 38px;
          border-radius: 6px;
          transition: all 0.25s;
          box-shadow: 0 4px 22px rgba(0, 180, 255, 0.28);
        }
        .ac-btn-p:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 36px rgba(0, 180, 255, 0.5);
        }
        .ac-btn-p svg { transition: transform 0.2s; }
        .ac-btn-p:hover svg { transform: translateX(5px); }

        .ac-btn-s {
          display: inline-flex; align-items: center; gap: 10px;
          background: transparent;
          color: rgba(255,255,255,0.65);
          font-family: 'Raleway', sans-serif;
          font-size: 0.875rem; font-weight: 600;
          letter-spacing: 0.06em;
          text-decoration: none;
          padding: 15px 38px;
          border-radius: 6px;
          border: 1.5px solid rgba(255,255,255,0.18);
          transition: all 0.25s;
        }
        .ac-btn-s:hover {
          border-color: #00b4ff;
          color: #00b4ff;
          background: rgba(0, 180, 255, 0.05);
        }

        /* Quick nav */
        .ac-qnav {
          margin-top: 4rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(0, 180, 255, 0.1);
          display: flex; align-items: center;
          gap: 6px; justify-content: center; flex-wrap: wrap;
        }
        .ac-qnav-lbl {
          font-size: 0.68rem; letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.22);
          margin-right: 10px;
        }
        .ac-qnav-a {
          font-size: 0.78rem; font-weight: 600;
          letter-spacing: 0.04em;
          color: rgba(255,255,255,0.36);
          text-decoration: none;
          padding: 5px 12px; border-radius: 3px;
          transition: color 0.2s, background 0.2s;
        }
        .ac-qnav-a:hover { color: #00b4ff; background: rgba(0,180,255,0.07); }
        .ac-qnav-sep { color: rgba(255,255,255,0.12); font-size: 0.6rem; }

        @media (max-width: 640px) {
          .ac-nav { padding: 1rem 1.4rem; }
          .ac-nav-links { display: none; }
          .ac-nav-cta { display: none; }
        }
      `}</style>

            <div className="ac-404">


                {/* Particle canvas */}
                <canvas ref={canvasRef} className="ac-canvas" />

                {/* Ghost number */}
                <div className="ac-ghost" aria-hidden="true">404</div>



                {/* Hero content */}
                <main className="ac-main">
                    <div className={`ac-box ${mounted ? "in" : ""}`}>

                        <div className="ac-pill">
                            <span className="ac-pill-dot" />
                            Error 404 — Page Not Found
                        </div>

                        <h1 className="ac-h1">
                            Lost Your <span className="c-blue">Career</span><br />
                            Path? Let's Fix That.
                        </h1>

                        <div className="ac-rule" />

                        <p className="ac-p">
                            The page you're looking for doesn't exist or may have been moved.
                            Our consultants are still here to guide your journey — head back and explore your opportunities.
                        </p>

                        <div className="ac-btns">
                            <a href="/" className="ac-btn-p">
                                Start Your Journey
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                            <a href="/#services" className="ac-btn-s">
                                Explore Services
                            </a>
                        </div>

                    </div>
                </main>
            </div>
        </>
    );
};

export default NotFound;