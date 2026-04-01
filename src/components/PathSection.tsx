interface PathNode {
  label: string;
  status: string;
  sub: string;
}

interface PathStat {
  val: string;
  accent: string;
  label: string;
}

interface PathSectionProps {
  nodes?: PathNode[];
  stats?: PathStat[];
}

export default function PathSection({ nodes, stats }: PathSectionProps) {
  const pathNodes = nodes || [
    { label: "You", status: "active", sub: "Starting point" },
    { label: "React", status: "active", sub: "Learned" },
    { label: "Next.js", status: "active", sub: "Learned" },
    { label: "Node.js", status: "current", sub: "In progress" },
    { label: "DSA", status: "gap", sub: "Skill gap" },
    { label: "SDE", status: "goal", sub: "Goal" },
  ];

  const pathStats = stats || [
    { val: "3", accent: "/6", label: "Steps completed" },
    { val: "2", accent: "", label: "Skill gaps" },
    { val: "~4", accent: "mo", label: "Estimated to goal" },
  ];

  const getBubble = (status: string): React.CSSProperties => {
    const base: React.CSSProperties = {
      width: "72px",
      height: "72px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "12px",
      fontWeight: 300,
      fontFamily: "'Outfit', sans-serif",
      textAlign: "center",
      letterSpacing: "0.02em",
      transition: "transform 0.25s, box-shadow 0.25s",
      cursor: "none",
    };
    if (status === "goal")
      return { ...base, background: "linear-gradient(135deg, var(--teal), var(--teal-bright))", border: "none", color: "var(--black)", fontWeight: 500, boxShadow: "0 0 24px rgba(110,212,200,0.35)" };
    if (status === "active")
      return { ...base, background: "rgba(240,160,192,0.1)", border: "1px solid rgba(240,160,192,0.4)", color: "var(--pink-soft)", boxShadow: "0 0 12px rgba(240,160,192,0.1)" };
    if (status === "current")
      return { ...base, background: "rgba(110,212,200,0.1)", border: "1px solid rgba(110,212,200,0.5)", color: "var(--teal-soft)", boxShadow: "0 0 16px rgba(110,212,200,0.15)" };
    return { ...base, background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)", color: "var(--muted)" };
  };

  return (
    <div>
      <div style={{
        fontSize: "9px",
        letterSpacing: "0.28em",
        textTransform: "uppercase",
        color: "var(--muted)",
        marginBottom: "32px",
        fontWeight: 300,
      }}>
        Graph traversal · Powered by TigerGraph
      </div>

      <div style={{
        display: "flex",
        alignItems: "center",
        overflowX: "auto",
        paddingBottom: "8px",
        scrollbarWidth: "none",
        gap: "0",
      }}>
        {pathNodes.map((node, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: "100px" }}>
              <div
                className="hover-target"
                style={getBubble(node.status)}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1.08)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1)")}
              >
                {node.label}
              </div>
              <div style={{ marginTop: "10px", fontSize: "10px", color: "var(--muted)", textAlign: "center", letterSpacing: "0.05em", fontWeight: 300 }}>
                {node.sub}
              </div>
            </div>
            {i < pathNodes.length - 1 && (
              <div style={{
                width: "32px",
                height: "1px",
                background: "linear-gradient(90deg, rgba(240,160,192,0.3), rgba(110,212,200,0.3))",
                flexShrink: 0,
                marginBottom: "20px",
              }} />
            )}
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px", marginTop: "44px" }}>
        {pathStats.map((s, i) => (
          <div key={i} style={{ borderTop: "1px solid var(--border)", paddingTop: "18px" }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "38px",
              fontWeight: 300,
              color: "var(--white)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}>
              {s.val}<span style={{ color: "var(--teal)" }}>{s.accent}</span>
            </div>
            <div style={{ marginTop: "6px", fontSize: "11px", color: "var(--muted)", letterSpacing: "0.06em", fontWeight: 300 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
