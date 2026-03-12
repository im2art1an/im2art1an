import { useState, useEffect, useRef } from "react";

const PARTICLES = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 0.5,
  speed: Math.random() * 0.3 + 0.05,
  opacity: Math.random() * 0.6 + 0.1,
  drift: (Math.random() - 0.5) * 0.02,
}));

const GRID_LINES = Array.from({ length: 12 }, (_, i) => i);

function useTypingEffect(texts, speed = 60) {
  const [displayText, setDisplayText] = useState("");
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (pause) {
      const t = setTimeout(() => setPause(false), 1800);
      return () => clearTimeout(t);
    }
    const current = texts[textIdx];
    if (!deleting) {
      if (charIdx < current.length) {
        const t = setTimeout(() => {
          setDisplayText(current.slice(0, charIdx + 1));
          setCharIdx(c => c + 1);
        }, speed);
        return () => clearTimeout(t);
      } else {
        setPause(true);
        setDeleting(true);
      }
    } else {
      if (charIdx > 0) {
        const t = setTimeout(() => {
          setDisplayText(current.slice(0, charIdx - 1));
          setCharIdx(c => c - 1);
        }, speed / 2);
        return () => clearTimeout(t);
      } else {
        setDeleting(false);
        setTextIdx(i => (i + 1) % texts.length);
      }
    }
  }, [charIdx, deleting, pause, textIdx, texts, speed]);

  return displayText;
}

function ParticleField() {
  const [positions, setPositions] = useState(PARTICLES);
  const frameRef = useRef();

  useEffect(() => {
    let tick = 0;
    const animate = () => {
      tick++;
      if (tick % 3 === 0) {
        setPositions(prev =>
          prev.map(p => ({
            ...p,
            y: p.y - p.speed * 0.08 < 0 ? 100 : p.y - p.speed * 0.08,
            x: p.x + p.drift < 0 ? 100 : p.x + p.drift > 100 ? 0 : p.x + p.drift,
          }))
        );
      }
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {positions.map(p => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: "50%",
            background: p.id % 5 === 0 ? "#14F195" : p.id % 3 === 0 ? "#BA8CFF" : "#0EA5E9",
            opacity: p.opacity,
            boxShadow: `0 0 ${p.size * 3}px currentColor`,
            transition: "none",
          }}
        />
      ))}
    </div>
  );
}

function GridBackground() {
  return (
    <svg
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04, pointerEvents: "none" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#BA8CFF" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}

const skills = [
  { icon: "⬡", name: "Python", color: "#3B82F6" },
  { icon: "⬡", name: "Rust", color: "#F97316" },
  { icon: "⬡", name: "JavaScript", color: "#EAB308" },
  { icon: "⬡", name: "Node.js", color: "#22C55E" },
  { icon: "⬡", name: "Solana", color: "#14F195" },
  { icon: "⬡", name: "Tailwind", color: "#06B6D4" },
];

const principles = [
  { moon: "🌑", text: "Clarity > Cleverness" },
  { moon: "🌒", text: "Precision > Noise" },
  { moon: "🌓", text: "Consistency > Bursts" },
  { moon: "🌕", text: "Speed + Correctness = Leverage" },
  { moon: "🌖", text: "AI × Solana = Practical Power" },
  { moon: "🌗", text: "Complexity is a tax" },
];

const stack = [
  { label: "LLMs & Agents", items: ["OpenAI", "Claude", "Gemini", "Llama"], color: "#BA8CFF" },
  { label: "AI Systems", items: ["Embeddings", "RAG", "Vector DBs", "Local AI"], color: "#14F195" },
  { label: "Solana", items: ["RPC", "Anchor", "Rust Bots", "WASM"], color: "#0EA5E9" },
  { label: "Infrastructure", items: ["Automation", "On-chain Flows", "HFT Tools", "Pipelines"], color: "#F97316" },
];

const building = [
  "Lightweight Solana bots and executors",
  "AI assistants that do real work",
  "Microtools with disproportionate value",
  "Rust-based automation layers",
  "Browser AI tools with minimal overhead",
  "A refined library of reusable building blocks",
];

const philosophy = [
  { condition: "If it doesn't solve a real problem", action: "I don't build it." },
  { condition: "If it feels bloated", action: "I cut it." },
  { condition: "If it feels slow", action: "I optimize it or delete it." },
  { condition: "If it doesn't age well", action: "I rethink it." },
  { condition: "If it doesn't hold up in practice", action: "I replace it." },
];

export default function MartianPortfolio() {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [glitch, setGlitch] = useState(false);

  const typed = useTypingEffect([
    "AI × Solana Systems Builder",
    "Precision. Speed. Clarity.",
    "Tools Built For Real Use.",
    "Not For Show.",
  ], 55);

  useEffect(() => {
    setMounted(true);
    const glitchInterval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 4000);
    return () => clearInterval(glitchInterval);
  }, []);

  const styles = {
    root: {
      minHeight: "100vh",
      background: "#050508",
      color: "#E2E8F0",
      fontFamily: "'Courier New', 'Lucida Console', monospace",
      position: "relative",
      overflow: "hidden",
    },
    hero: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      padding: "2rem",
      textAlign: "center",
    },
    scanline: {
      position: "absolute",
      inset: 0,
      background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(186,140,255,0.015) 2px, rgba(186,140,255,0.015) 4px)",
      pointerEvents: "none",
      zIndex: 1,
    },
    vignette: {
      position: "absolute",
      inset: 0,
      background: "radial-gradient(ellipse at center, transparent 40%, rgba(5,5,8,0.85) 100%)",
      pointerEvents: "none",
      zIndex: 1,
    },
    logoRing: {
      width: "120px",
      height: "120px",
      borderRadius: "50%",
      border: "1px solid rgba(186,140,255,0.3)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      marginBottom: "2.5rem",
      animation: "spin 20s linear infinite",
    },
    logoInner: {
      width: "90px",
      height: "90px",
      borderRadius: "50%",
      border: "1px solid rgba(20,241,149,0.4)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      animation: "spinReverse 12s linear infinite",
      background: "radial-gradient(circle, rgba(186,140,255,0.08) 0%, transparent 70%)",
    },
    logoText: {
      fontSize: "2.2rem",
      fontWeight: "900",
      letterSpacing: "-0.02em",
      fontFamily: "serif",
      color: "#BA8CFF",
      textShadow: "0 0 20px rgba(186,140,255,0.6)",
    },
    name: {
      fontSize: "clamp(3rem, 8vw, 6.5rem)",
      fontWeight: "900",
      letterSpacing: "-0.03em",
      lineHeight: 1,
      marginBottom: "1rem",
      fontFamily: "'Courier New', monospace",
      textTransform: "uppercase",
      position: "relative",
      zIndex: 2,
      background: "linear-gradient(135deg, #ffffff 0%, #BA8CFF 50%, #14F195 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      filter: glitch ? "none" : undefined,
    },
    glitchA: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(135deg, #14F195 0%, #0EA5E9 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      transform: "translate(3px, -2px)",
      opacity: 0.6,
    },
    glitchB: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(135deg, #FF0080 0%, #BA8CFF 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      transform: "translate(-3px, 2px)",
      opacity: 0.5,
    },
    typingLine: {
      fontSize: "clamp(0.9rem, 2.5vw, 1.25rem)",
      color: "#14F195",
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      marginBottom: "3rem",
      zIndex: 2,
      position: "relative",
      minHeight: "2rem",
      display: "flex",
      alignItems: "center",
      gap: "2px",
    },
    cursor: {
      display: "inline-block",
      width: "10px",
      height: "1.2em",
      background: "#14F195",
      animation: "blink 1s step-end infinite",
      verticalAlign: "text-bottom",
      boxShadow: "0 0 8px #14F195",
    },
    badgeRow: {
      display: "flex",
      flexWrap: "wrap",
      gap: "0.6rem",
      justifyContent: "center",
      zIndex: 2,
      position: "relative",
      marginBottom: "2rem",
    },
    badge: (color) => ({
      padding: "0.35rem 0.9rem",
      border: `1px solid ${color}40`,
      borderRadius: "2px",
      fontSize: "0.65rem",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: color,
      background: `${color}0D`,
      fontFamily: "'Courier New', monospace",
      fontWeight: "700",
      boxShadow: `inset 0 0 12px ${color}10, 0 0 8px ${color}20`,
      transition: "all 0.2s",
    }),
    section: {
      maxWidth: "1100px",
      margin: "0 auto",
      padding: "5rem 2rem",
      position: "relative",
      zIndex: 2,
    },
    sectionLabel: {
      fontSize: "0.65rem",
      letterSpacing: "0.3em",
      textTransform: "uppercase",
      color: "#BA8CFF",
      marginBottom: "0.5rem",
      display: "flex",
      alignItems: "center",
      gap: "0.8rem",
    },
    sectionTitle: {
      fontSize: "clamp(1.8rem, 4vw, 3rem)",
      fontWeight: "900",
      letterSpacing: "-0.02em",
      marginBottom: "3rem",
      fontFamily: "'Courier New', monospace",
      textTransform: "uppercase",
      lineHeight: 1.1,
    },
    divider: {
      width: "100%",
      height: "1px",
      background: "linear-gradient(90deg, transparent 0%, rgba(186,140,255,0.4) 30%, rgba(20,241,149,0.4) 70%, transparent 100%)",
      margin: "0",
    },
    philosophyCard: (idx) => ({
      display: "flex",
      alignItems: "center",
      gap: "1.5rem",
      padding: "1.2rem 1.5rem",
      borderLeft: "2px solid rgba(186,140,255,0.2)",
      marginBottom: "0.5rem",
      background: "rgba(186,140,255,0.03)",
      transition: "all 0.25s",
      cursor: "default",
      position: "relative",
      overflow: "hidden",
    }),
    skillCard: (color) => ({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "0.8rem",
      padding: "1.8rem 1.2rem",
      border: `1px solid ${color}25`,
      background: `${color}06`,
      borderRadius: "2px",
      transition: "all 0.25s",
      cursor: "default",
      flex: "1 1 100px",
    }),
    stackCard: (color) => ({
      padding: "1.5rem",
      border: `1px solid ${color}30`,
      background: `linear-gradient(135deg, ${color}08 0%, transparent 100%)`,
      borderRadius: "2px",
      flex: "1 1 200px",
    }),
    buildingItem: {
      display: "flex",
      alignItems: "flex-start",
      gap: "1rem",
      padding: "1rem 0",
      borderBottom: "1px solid rgba(255,255,255,0.05)",
      fontSize: "0.95rem",
      letterSpacing: "0.02em",
      color: "#CBD5E1",
      lineHeight: 1.5,
    },
    principleCard: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      padding: "0.9rem 1.2rem",
      background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: "2px",
      fontSize: "0.9rem",
      letterSpacing: "0.03em",
      flex: "1 1 250px",
      color: "#94A3B8",
      transition: "all 0.2s",
    },
    footer: {
      borderTop: "1px solid rgba(186,140,255,0.15)",
      padding: "4rem 2rem",
      textAlign: "center",
      position: "relative",
      zIndex: 2,
    },
    terminalBlock: {
      background: "rgba(0,0,0,0.6)",
      border: "1px solid rgba(20,241,149,0.2)",
      borderRadius: "4px",
      padding: "1.5rem 2rem",
      maxWidth: "700px",
      margin: "0 auto 3rem",
      textAlign: "left",
      fontFamily: "'Courier New', monospace",
    },
  };

  if (!mounted) return null;

  return (
    <div style={styles.root}>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spinReverse { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
        @keyframes scanMove { from { top: -4px; } to { top: 100%; } }
        @keyframes borderGlow { 0%, 100% { border-color: rgba(186,140,255,0.2); } 50% { border-color: rgba(186,140,255,0.6); } }
        
        .philosophy-item:hover {
          border-left-color: #BA8CFF !important;
          background: rgba(186,140,255,0.06) !important;
          padding-left: 2rem !important;
        }
        .philosophy-item:hover .condition-text {
          color: #E2E8F0 !important;
        }
        .skill-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.4);
        }
        .stack-card:hover {
          transform: translateY(-2px);
        }
        .principle-card:hover {
          background: rgba(186,140,255,0.05) !important;
          border-color: rgba(186,140,255,0.2) !important;
          color: #E2E8F0 !important;
        }
        .badge-item:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { margin: 0; background: #050508; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050508; }
        ::-webkit-scrollbar-thumb { background: #BA8CFF40; border-radius: 2px; }
      `}</style>

      {/* Background layers */}
      <GridBackground />
      <ParticleField />

      {/* Ambient glows */}
      <div style={{
        position: "fixed", top: "10%", left: "5%", width: "40vw", height: "40vw",
        background: "radial-gradient(circle, rgba(186,140,255,0.04) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />
      <div style={{
        position: "fixed", bottom: "10%", right: "5%", width: "35vw", height: "35vw",
        background: "radial-gradient(circle, rgba(20,241,149,0.04) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.scanline} />
        <div style={styles.vignette} />

        <div style={{ ...styles.logoRing, zIndex: 2 }}>
          <div style={styles.logoInner}>
            <span style={styles.logoText}>M</span>
          </div>
          {/* Orbit dot */}
          <div style={{
            position: "absolute",
            width: "6px", height: "6px",
            borderRadius: "50%",
            background: "#14F195",
            boxShadow: "0 0 10px #14F195",
            top: "2px", left: "50%",
            transform: "translateX(-50%)",
          }} />
        </div>

        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={{ ...styles.name, position: "relative", display: "inline-block" }}>
            {glitch && <span style={{ ...styles.name, ...styles.glitchA, position: "absolute" }}>MARTIAN</span>}
            {glitch && <span style={{ ...styles.name, ...styles.glitchB, position: "absolute" }}>MARTIAN</span>}
            MARTIAN
          </div>
        </div>

        <div style={styles.typingLine}>
          <span style={{ color: "#BA8CFF", marginRight: "0.5rem" }}>~/</span>
          {typed}
          <span style={styles.cursor} />
        </div>

        <div style={styles.badgeRow}>
          {[
            ["AI Agent Builder", "#7C3AED"],
            ["Solana On-Chain Dev", "#14F195"],
            ["Rust Systems", "#FF8A3D"],
            ["Ships What Matters", "#0EA5E9"],
            ["Cuts Complexity", "#10B981"],
            ["Real Work. No Hype.", "#DC2626"],
          ].map(([label, color]) => (
            <span key={label} className="badge-item" style={styles.badge(color)}>{label}</span>
          ))}
        </div>

        {/* Scroll hint */}
        <div style={{
          position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem",
          zIndex: 2, opacity: 0.4,
        }}>
          <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#BA8CFF" }}>scroll</span>
          <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, #BA8CFF, transparent)", animation: "pulse 2s ease-in-out infinite" }} />
        </div>
      </section>

      <div style={styles.divider} />

      {/* ABOUT / IDENTITY */}
      <section style={styles.section}>
        <div style={styles.sectionLabel}>
          <span>■■</span> Identity
        </div>
        <h2 style={styles.sectionTitle}>
          I build things that<br />
          <span style={{ color: "#BA8CFF" }}>hold up under</span> pressure.
        </h2>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1px", background: "rgba(186,140,255,0.1)", border: "1px solid rgba(186,140,255,0.1)",
        }}>
          {[
            ["AI agents, Solana automation systems, Rust executors, on-chain tools, and small utilities — all designed to remove friction and create leverage.", "#BA8CFF"],
            ["No trend chasing. No noise shipping. No glorified complexity. The focus is clarity, correctness, practicality, and execution speed.", "#14F195"],
            ["I use AI for reasoning and acceleration. I use Solana for speed and determinism. I use Rust when correctness actually matters.", "#0EA5E9"],
          ].map(([text, color], i) => (
            <div key={i} style={{
              padding: "2rem", background: "#050508",
              borderTop: i === 0 ? `2px solid ${color}` : undefined,
              borderLeft: i > 0 ? `2px solid ${color}` : undefined,
            }}>
              <div style={{ width: "20px", height: "2px", background: color, marginBottom: "1rem", boxShadow: `0 0 8px ${color}` }} />
              <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "#94A3B8", letterSpacing: "0.02em" }}>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <div style={styles.divider} />

      {/* PHILOSOPHY */}
      <section style={styles.section}>
        <div style={styles.sectionLabel}><span>■■</span> Work Philosophy</div>
        <h2 style={styles.sectionTitle}>
          The rules I<br /><span style={{ color: "#14F195" }}>never break.</span>
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          {philosophy.map((p, i) => (
            <div key={i} className="philosophy-item" style={{ ...styles.philosophyCard(i), transition: "all 0.25s" }}>
              <div style={{
                minWidth: "28px", height: "28px",
                border: "1px solid rgba(186,140,255,0.3)",
                borderRadius: "2px",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.7rem", color: "#BA8CFF", fontWeight: "900", letterSpacing: "0.05em",
              }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <div style={{ flex: 1 }}>
                <span className="condition-text" style={{ color: "#64748B", fontSize: "0.9rem", letterSpacing: "0.02em", transition: "color 0.25s" }}>
                  {p.condition}
                </span>
                <span style={{ color: "#BA8CFF", fontSize: "0.9rem", letterSpacing: "0.02em" }}> → </span>
                <span style={{ color: "#E2E8F0", fontSize: "0.9rem", fontWeight: "700", letterSpacing: "0.02em" }}>{p.action}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={styles.divider} />

      {/* STACK */}
      <section style={styles.section}>
        <div style={styles.sectionLabel}><span>■■</span> Technical Stack</div>
        <h2 style={styles.sectionTitle}>
          The full<br /><span style={{ color: "#0EA5E9" }}>AI × Crypto</span> layer.
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {stack.map((s) => (
            <div key={s.label} className="stack-card" style={styles.stackCard(s.color)}>
              <div style={{
                fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase",
                color: s.color, marginBottom: "1rem", fontWeight: "700",
              }}>
                {s.label}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {s.items.map(item => (
                  <div key={item} style={{
                    display: "flex", alignItems: "center", gap: "0.6rem",
                    fontSize: "0.88rem", color: "#94A3B8", letterSpacing: "0.04em",
                  }}>
                    <span style={{ color: s.color, fontSize: "0.5rem" }}>◆</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={styles.divider} />

      {/* SKILLS */}
      <section style={styles.section}>
        <div style={styles.sectionLabel}><span>■■</span> Skills</div>
        <h2 style={styles.sectionTitle}>
          Tools of the<br /><span style={{ color: "#F97316" }}>trade.</span>
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {skills.map((s) => (
            <div key={s.name} className="skill-card" style={styles.skillCard(s.color)}>
              <div style={{
                width: "48px", height: "48px",
                border: `1px solid ${s.color}40`,
                borderRadius: "4px",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.4rem",
                background: `${s.color}10`,
                boxShadow: `0 0 20px ${s.color}20`,
              }}>
                <span style={{ fontSize: "1.2rem" }}>
                  {s.name === "Python" ? "🐍" :
                   s.name === "Rust" ? "⚙️" :
                   s.name === "JavaScript" ? "⚡" :
                   s.name === "Node.js" ? "🔷" :
                   s.name === "Solana" ? "◎" : "💨"}
                </span>
              </div>
              <span style={{ fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", color: s.color, fontWeight: "700" }}>
                {s.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      <div style={styles.divider} />

      {/* CURRENTLY BUILDING */}
      <section style={styles.section}>
        <div style={styles.sectionLabel}><span>■■</span> Currently Building</div>
        <h2 style={styles.sectionTitle}>
          Right now,<br /><span style={{ color: "#14F195" }}>in progress.</span>
        </h2>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "0",
          border: "1px solid rgba(20,241,149,0.1)",
        }}>
          {building.map((item, i) => (
            <div key={i} style={{
              ...styles.buildingItem,
              padding: "1.2rem 1.5rem",
              borderBottom: i < building.length - 2 ? "1px solid rgba(255,255,255,0.05)" : "none",
              borderRight: i % 2 === 0 ? "1px solid rgba(255,255,255,0.05)" : "none",
              gap: "1rem",
            }}>
              <div style={{
                minWidth: "6px", height: "6px", borderRadius: "50%",
                background: "#14F195", marginTop: "0.5rem",
                boxShadow: "0 0 8px #14F195",
              }} />
              <span style={{ fontSize: "0.9rem", color: "#94A3B8", lineHeight: 1.6 }}>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <div style={styles.divider} />

      {/* PRINCIPLES */}
      <section style={styles.section}>
        <div style={styles.sectionLabel}><span>■■</span> Core Principles</div>
        <h2 style={styles.sectionTitle}>
          The code I<br /><span style={{ color: "#BA8CFF" }}>live by.</span>
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
          {principles.map((p, i) => (
            <div key={i} className="principle-card" style={styles.principleCard}>
              <span style={{ fontSize: "1.3rem" }}>{p.moon}</span>
              <span>{p.text}</span>
            </div>
          ))}
        </div>
      </section>

      <div style={styles.divider} />

      {/* FOOTER / CTA */}
      <footer style={styles.footer}>
        <div style={styles.terminalBlock}>
          <div style={{ display: "flex", gap: "0.4rem", marginBottom: "1rem" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FF5F56" }} />
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FFBD2E" }} />
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#27C93F" }} />
            <span style={{ marginLeft: "1rem", fontSize: "0.65rem", color: "#475569", letterSpacing: "0.1em" }}>terminal — martian@systems</span>
          </div>
          <div style={{ fontSize: "0.85rem", lineHeight: 2, color: "#475569" }}>
            <div><span style={{ color: "#BA8CFF" }}>$</span> <span style={{ color: "#E2E8F0" }}>whoami</span></div>
            <div style={{ paddingLeft: "1rem", color: "#94A3B8" }}>Martian — AI × Solana Systems Builder</div>
            <div style={{ marginTop: "0.5rem" }}><span style={{ color: "#BA8CFF" }}>$</span> <span style={{ color: "#E2E8F0" }}>cat mission.txt</span></div>
            <div style={{ paddingLeft: "1rem", color: "#14F195" }}>Build things that hold up under pressure.</div>
            <div style={{ marginTop: "0.5rem" }}><span style={{ color: "#BA8CFF" }}>$</span> <span style={{ color: "#E2E8F0" }}>echo $GOAL</span></div>
            <div style={{ paddingLeft: "1rem", color: "#94A3B8" }}>Not popularity — <span style={{ color: "#0EA5E9" }}>craftsmanship</span>.</div>
            <div style={{ marginTop: "0.8rem", display: "flex", alignItems: "center", gap: "4px" }}>
              <span style={{ color: "#BA8CFF" }}>$</span>
              <span style={styles.cursor} />
            </div>
          </div>
        </div>

        <div style={{
          fontSize: "clamp(1.2rem, 3vw, 2rem)",
          fontWeight: "900",
          letterSpacing: "-0.01em",
          textTransform: "uppercase",
          fontFamily: "'Courier New', monospace",
          marginBottom: "0.5rem",
          color: "#E2E8F0",
        }}>
          I don't build for attention.
        </div>
        <div style={{
          fontSize: "clamp(1.2rem, 3vw, 2rem)",
          fontWeight: "900",
          letterSpacing: "-0.01em",
          textTransform: "uppercase",
          fontFamily: "'Courier New', monospace",
          marginBottom: "2rem",
          background: "linear-gradient(90deg, #BA8CFF, #14F195)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          I build because the work matters.
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", justifyContent: "center", marginBottom: "3rem" }}>
          {[
            ["OpenAI Builder", "#3B82F6"],
            ["Solana Engineer", "#14F195"],
            ["Rust Systems Thinking", "#F97316"],
            ["AI Agents In Production", "#DC2626"],
            ["Builder, Not Influencer", "#7C3AED"],
          ].map(([label, color]) => (
            <span key={label} className="badge-item" style={{ ...styles.badge(color), fontSize: "0.6rem" }}>{label}</span>
          ))}
        </div>

        <div style={{ fontSize: "0.65rem", color: "#1E293B", letterSpacing: "0.15em", textTransform: "uppercase" }}>
          Martian Systems — Precision. Speed. Clarity.
        </div>
      </footer>
    </div>
  );
}