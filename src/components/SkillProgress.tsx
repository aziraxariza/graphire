import { useEffect, useRef, useState } from "react";

const DEFAULT_SKILLS = [
  { name: "React", pct: 80 },
  { name: "Next.js", pct: 65 },
  { name: "Node.js", pct: 45 },
  { name: "DSA", pct: 30 },
  { name: "System Design", pct: 20 },
  { name: "TypeScript", pct: 15 },
];

const DEFAULT_GAPS = [
  { name: "React", has: true },
  { name: "Next.js", has: true },
  { name: "Node.js", has: true },
  { name: "DSA", has: false },
  { name: "System Design", has: false },
  { name: "TypeScript", has: false },
];

interface SkillProgressProps {
  skills?: { name: string; pct: number }[];
  goal?: string;
  gaps?: { name: string; has: boolean }[];
}

export default function SkillProgress({ skills, goal, gaps }: SkillProgressProps) {
  const skillList = skills || DEFAULT_SKILLS;
  const gapList = gaps || DEFAULT_GAPS;
  const [animate, setAnimate] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setAnimate(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const missing = gapList.filter((g) => !g.has).length;

  return (
    <div
      ref={ref}
      style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "40px", alignItems: "start" }}
    >
      <div>
        {skillList.map((skill, i) => (
          <div key={i} style={{ marginBottom: "28px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <span style={{ fontSize: "13px", fontWeight: 300, color: "var(--muted-hi)", letterSpacing: "0.03em" }}>
                {skill.name}
              </span>
              <span style={{
                fontSize: "13px",
                color: i % 2 === 0 ? "var(--pink)" : "var(--teal)",
                fontWeight: 400,
              }}>
                {skill.pct}%
              </span>
            </div>
            <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", borderRadius: "1px", overflow: "hidden" }}>
              <div style={{
                height: "100%",
                borderRadius: "1px",
                background: i % 2 === 0
                  ? "linear-gradient(90deg, var(--pink), var(--pink-bright))"
                  : "linear-gradient(90deg, var(--teal), var(--teal-bright))",
                boxShadow: i % 2 === 0
                  ? "0 0 8px rgba(240,160,192,0.4)"
                  : "0 0 8px rgba(110,212,200,0.4)",
                width: animate ? `${skill.pct}%` : "0%",
                transition: `width 1.3s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`,
              }} />
            </div>
          </div>
        ))}
      </div>

      <div style={{
        background: "rgba(17,21,38,0.8)",
        backdropFilter: "blur(16px)",
        border: "1px solid var(--border)",
        borderRadius: "16px",
        padding: "28px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          top: 0, left: "20%", right: "20%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(110,212,200,0.4), transparent)",
        }} />
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "20px",
          fontWeight: 400,
          marginBottom: "18px",
          color: "var(--white)",
          letterSpacing: "-0.01em",
        }}>
          Goal: {goal || "SDE @ Google"}
        </h3>
        {gapList.map((item, i) => (
          <div key={i} style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "11px 0",
            borderBottom: i < gapList.length - 1 ? "1px solid var(--border)" : "none",
            fontSize: "13px",
            fontWeight: 300,
            color: item.has ? "var(--muted-hi)" : "var(--muted)",
          }}>
            <div style={{
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: item.has ? "var(--teal)" : "transparent",
              border: item.has ? "none" : "1px solid var(--surface3)",
              boxShadow: item.has ? "0 0 6px rgba(110,212,200,0.5)" : "none",
              flexShrink: 0,
            }} />
            {item.name}
            {!item.has && (
              <span style={{
                marginLeft: "auto",
                fontSize: "9px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--pink)",
                opacity: 0.8,
                fontWeight: 300,
              }}>
                gap
              </span>
            )}
          </div>
        ))}
        <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px solid var(--border)", fontSize: "12px", color: "var(--muted)", fontWeight: 300 }}>
          Graph found <strong style={{ color: "var(--pink)", fontWeight: 400 }}>{missing} missing skills</strong>
        </div>
      </div>
    </div>
  );
}
