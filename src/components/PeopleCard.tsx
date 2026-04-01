import { motion } from "framer-motion";

interface PeopleCardProps {
  name: string;
  role: string;
  skills?: string[];
  isMentor?: boolean;
}

export default function PeopleCard({ name, role, skills, isMentor }: PeopleCardProps) {
  const initials = name
    ? name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "??";

  return (
    <motion.div
      whileHover={{ y: -4, borderColor: "rgba(110,212,200,0.25)" }}
      transition={{ duration: 0.25 }}
      className="hover-target person-card"
      data-cursor="connect"
      style={{
        background: "rgba(17,21,38,0.8)",
        backdropFilter: "blur(12px)",
        border: "1px solid var(--border)",
        borderRadius: "16px",
        padding: "22px 18px",
        cursor: "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        background: "rgba(110,212,200,0.08)",
        border: "1px solid rgba(110,212,200,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "14px",
        fontWeight: 400,
        color: "var(--teal)",
        marginBottom: "12px",
        letterSpacing: "0.05em",
      }}>
        {initials}
      </div>

      <p style={{ fontSize: "14px", fontWeight: 400, marginBottom: "3px", color: "var(--white)", letterSpacing: "0.01em" }}>{name}</p>
      <p style={{ fontSize: "11px", color: "var(--muted)", marginBottom: "12px", lineHeight: 1.5, fontWeight: 300 }}>{role}</p>

      {skills && skills.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
          {isMentor && (
            <span style={{
              fontSize: "9px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              background: "var(--teal-dim)",
              color: "var(--teal)",
              padding: "3px 9px",
              borderRadius: "100px",
              border: "1px solid rgba(110,212,200,0.2)",
              fontWeight: 300,
            }}>
              Mentor
            </span>
          )}
          {skills.map((s, i) => (
            <span key={i} style={{
              fontSize: "9px",
              letterSpacing: "0.06em",
              background: "rgba(255,255,255,0.04)",
              color: "var(--muted-mid)",
              padding: "3px 9px",
              borderRadius: "100px",
              fontWeight: 300,
            }}>
              {s}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}
