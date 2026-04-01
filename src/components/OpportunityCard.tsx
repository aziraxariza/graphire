import { motion } from "framer-motion";

interface OpportunityCardProps {
  title: string;
  company: string;
  location?: string;
  tag?: string;
  match?: number;
  deadline?: string;
}

export default function OpportunityCard({ title, company, location, tag, match, deadline }: OpportunityCardProps) {
  const isHigh = (match ?? 0) >= 85;
  const isMid = (match ?? 0) >= 70;

  const tagColor = isHigh
    ? { color: "var(--teal)", border: "rgba(110,212,200,0.25)", bg: "var(--teal-dim)" }
    : isMid
    ? { color: "var(--pink)", border: "rgba(240,160,192,0.25)", bg: "var(--pink-dim)" }
    : { color: "var(--muted-mid)", border: "rgba(110,117,144,0.2)", bg: "rgba(110,117,144,0.06)" };

  return (
    <motion.div
      whileHover={{ y: -8, borderColor: isHigh ? "rgba(110,212,200,0.3)" : "rgba(240,160,192,0.3)" }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="hover-target opp-card"
      data-cursor="view"
      style={{
        minWidth: "282px",
        maxWidth: "282px",
        padding: "26px 24px",
        background: "rgba(17,21,38,0.85)",
        backdropFilter: "blur(16px)",
        border: "1px solid var(--border)",
        borderRadius: "20px",
        cursor: "none",
        flexShrink: 0,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute",
        top: 0, left: "20%", right: "20%",
        height: "1px",
        background: `linear-gradient(90deg, transparent, ${isHigh ? "rgba(110,212,200,0.5)" : "rgba(240,160,192,0.5)"}, transparent)`,
      }} />

      {tag && (
        <div style={{
          fontSize: "9px",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: tagColor.color,
          border: `1px solid ${tagColor.border}`,
          background: tagColor.bg,
          padding: "4px 11px",
          borderRadius: "100px",
          display: "inline-block",
          marginBottom: "16px",
          fontWeight: 300,
        }}>
          {tag}
        </div>
      )}

      <h3 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "20px",
        fontWeight: 400,
        lineHeight: 1.2,
        marginBottom: "6px",
        color: "var(--white)",
        letterSpacing: "-0.01em",
      }}>
        {title}
      </h3>

      <p style={{ fontSize: "12px", color: "var(--muted)", marginBottom: "20px", letterSpacing: "0.03em" }}>
        {company}{location ? ` · ${location}` : ""}
      </p>

      {match !== undefined && (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            flex: 1,
            height: "1px",
            background: "var(--surface3)",
            borderRadius: "1px",
            overflow: "hidden",
          }}>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${match}%` }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              style={{
                height: "100%",
                background: isHigh
                  ? "linear-gradient(90deg, var(--teal), var(--teal-bright))"
                  : "linear-gradient(90deg, var(--pink), var(--pink-bright))",
                boxShadow: isHigh
                  ? "0 0 6px rgba(110,212,200,0.6)"
                  : "0 0 6px rgba(240,160,192,0.6)",
              }}
            />
          </div>
          <span style={{
            fontSize: "12px",
            color: isHigh ? "var(--teal)" : "var(--pink)",
            fontWeight: 400,
            minWidth: "32px",
            textAlign: "right",
          }}>
            {match}%
          </span>
        </div>
      )}

      {deadline && (
        <p style={{
          marginTop: "14px",
          fontSize: "10px",
          letterSpacing: "0.08em",
          color: "var(--muted)",
          textTransform: "uppercase",
          fontWeight: 300,
        }}>
          Deadline: {deadline}
        </p>
      )}
    </motion.div>
  );
}
