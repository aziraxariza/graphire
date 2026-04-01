import { Link, useLocation } from "react-router-dom";

const links = [
  { label: "Dashboard", path: "/dashboard", icon: "◈" },
  { label: "My Path", path: "/dashboard#path", icon: "◎" },
  { label: "Opportunities", path: "/opportunities", icon: "◇" },
  { label: "People", path: "/dashboard#network", icon: "◉" },
  { label: "Skills", path: "/dashboard#skills", icon: "◐" },
];

export default function GraphireSidebar() {
  const location = useLocation();

  return (
    <aside style={{
      width: "200px",
      minWidth: "200px",
      padding: "44px 14px",
      borderRight: "1px solid var(--border)",
      display: "flex",
      flexDirection: "column",
      gap: "2px",
      background: "rgba(10,12,22,0.92)",
      backdropFilter: "blur(24px)",
      minHeight: "100vh",
      position: "sticky",
      top: 0,
      alignSelf: "flex-start",
    }}>
      <div style={{
        fontSize: "9px",
        letterSpacing: "0.28em",
        textTransform: "uppercase",
        color: "var(--muted)",
        marginBottom: "18px",
        paddingLeft: "12px",
        fontWeight: 300,
      }}>
        Navigation
      </div>

      {links.map(({ label, path, icon }) => {
        const active = location.pathname === path.split("#")[0];
        return (
          <Link
            key={label}
            to={path}
            className="hover-target"
            data-cursor="go"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 12px",
              borderRadius: "10px",
              fontSize: "13px",
              fontWeight: active ? 400 : 300,
              color: active ? "var(--white)" : "var(--muted)",
              background: active ? "rgba(240,160,192,0.07)" : "transparent",
              border: active ? "1px solid rgba(240,160,192,0.12)" : "1px solid transparent",
              transition: "all 0.2s",
              textDecoration: "none",
              letterSpacing: "0.01em",
            }}
            onMouseEnter={(e) => {
              if (!active) {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.035)";
                (e.currentTarget as HTMLElement).style.color = "var(--muted-hi)";
              }
            }}
            onMouseLeave={(e) => {
              if (!active) {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = "var(--muted)";
              }
            }}
          >
            <span style={{ fontSize: "11px", color: active ? "var(--pink)" : "var(--surface3)", flexShrink: 0 }}>
              {icon}
            </span>
            {label}
          </Link>
        );
      })}

      <div style={{ marginTop: "auto", paddingTop: "24px", borderTop: "1px solid var(--border)" }}>
        <div style={{
          padding: "16px",
          background: "rgba(240,160,192,0.05)",
          border: "1px solid rgba(240,160,192,0.12)",
          borderRadius: "12px",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "1px",
            background: "linear-gradient(90deg,transparent,rgba(240,160,192,0.45),transparent)",
          }} />
          <div style={{ fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--pink)", marginBottom: "4px", fontWeight: 300 }}>
            Level 4
          </div>
          <div style={{
            fontSize: "14px",
            color: "var(--white)",
            fontWeight: 400,
            fontFamily: "'Cormorant Garamond', serif",
            letterSpacing: "0.02em",
          }}>
            Rising Developer
          </div>
          <div style={{ marginTop: "10px", height: "1px", background: "var(--surface3)", overflow: "hidden" }}>
            <div style={{ height: "100%", width: "65%", background: "linear-gradient(90deg,var(--pink),var(--teal))" }} />
          </div>
          <div style={{ marginTop: "7px", fontSize: "11px", color: "var(--muted)", fontWeight: 300 }}>760 XP to Level 5</div>
        </div>
      </div>
    </aside>
  );
}
