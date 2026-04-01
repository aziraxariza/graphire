import { motion } from "framer-motion";

interface FloatingCardProps {
  title: string;
  company?: string;
  tag?: string;
  match?: number;
}

export default function FloatingCard({ title, company, tag, match }: FloatingCardProps) {
  const isHigh = (match ?? 0) >= 85;

  return (
    <motion.div
      whileHover={{ y: -8, borderColor: isHigh ? "rgba(110,212,200,0.28)" : "rgba(240,160,192,0.28)" }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      className="hover-target"
      data-cursor="view"
      style={{
        minWidth: "268px",
        maxWidth: "268px",
        padding: "28px 24px",
        background: "rgba(15,18,32,0.85)",
        backdropFilter: "blur(16px)",
        border: "1px solid var(--border)",
        borderRadius: "18px",
        cursor: "none",
        flexShrink: 0,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute",
        top: 0, left: "18%", right: "18%",
        height: "1px",
        background: isHigh
          ? "linear-gradient(90deg,transparent,rgba(110,212,200,0.5),transparent)"
          : "linear-gradient(90deg,transparent,rgba(240,160,192,0.5),transparent)",
      }} />

      {tag && (
        <div style={{
          fontSize: "9px",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: isHigh ? "var(--teal)" : "var(--pink)",
          border: `1px solid ${isHigh ? "rgba(110,212,200,0.22)" : "rgba(240,160,192,0.22)"}`,
          background: isHigh ? "var(--teal-dim)" : "var(--pink-dim)",
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
        lineHeight: 1.15,
        marginBottom: "7px",
        color: "var(--white)",
        letterSpacing: "-0.01em",
      }}>
        {title}
      </h3>

      {company && (
        <p style={{ fontSize: "12px", color: "var(--muted)", marginBottom: "20px", letterSpacing: "0.03em", fontWeight: 300 }}>
          {company}
        </p>
      )}

      {match !== undefined && (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ flex: 1, height: "1px", background: "var(--surface3)", overflow: "hidden" }}>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${match}%` }}
              transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              style={{
                height: "100%",
                background: isHigh
                  ? "linear-gradient(90deg,var(--teal),var(--teal-bright))"
                  : "linear-gradient(90deg,var(--pink),var(--pink-bright))",
                boxShadow: isHigh
                  ? "0 0 8px rgba(110,212,200,0.5)"
                  : "0 0 8px rgba(240,160,192,0.5)",
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
    </motion.div>
  );
}
