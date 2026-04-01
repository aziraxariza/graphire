import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function GraphireNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        padding: "20px 48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 100,
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        background: scrolled ? "rgba(7,8,15,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(28px) saturate(1.3)" : "none",
        transition: "all 0.4s ease",
      }}
    >
      <Link
        to="/"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "20px",
          fontWeight: 600,
          letterSpacing: "0.06em",
          color: "var(--white)",
          textTransform: "uppercase",
        }}
      >
        Graph<span style={{ color: "var(--pink)", fontStyle: "italic", fontWeight: 300 }}>ire</span>
      </Link>

      <ul style={{ display: "flex", gap: "36px", margin: 0, padding: 0 }}>
        {[
          { label: "(A). Home", path: "/" },
          { label: "(B). Dashboard", path: "/dashboard" },
          { label: "(C). Opportunities", path: "/opportunities" },
        ].map(({ label, path }) => {
          const active = location.pathname === path;
          return (
            <li key={label}>
              <Link
                to={path}
                className="hover-target"
                data-cursor="go"
                style={{
                  fontSize: "11px",
                  fontWeight: active ? 400 : 300,
                  letterSpacing: "0.08em",
                  color: active ? "var(--white)" : "var(--muted)",
                  transition: "color 0.2s",
                  position: "relative",
                  paddingBottom: "2px",
                }}
                onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLElement).style.color = "var(--muted-hi)"; }}
                onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLElement).style.color = "var(--muted)"; }}
              >
                {label}
                {active && (
                  <span style={{
                    position: "absolute",
                    bottom: "-2px",
                    left: 0,
                    right: 0,
                    height: "1px",
                    background: "linear-gradient(90deg, var(--pink), var(--teal))",
                  }} />
                )}
              </Link>
            </li>
          );
        })}
      </ul>

      <Link
        to="/dashboard"
        className="hover-target"
        data-cursor="go"
        style={{
          fontSize: "10px",
          fontWeight: 400,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          border: "1px solid rgba(240,160,192,0.35)",
          color: "var(--pink-soft)",
          padding: "8px 22px",
          borderRadius: "100px",
          transition: "all 0.25s",
          background: "transparent",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = "var(--pink-dim)";
          (e.currentTarget as HTMLElement).style.borderColor = "var(--pink)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = "transparent";
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(240,160,192,0.35)";
        }}
      >
        Start →
      </Link>
    </nav>
  );
}
