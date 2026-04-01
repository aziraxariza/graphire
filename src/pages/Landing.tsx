import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import FloatingCard from "../components/FloatingCard";

const FLOATERS = [
  { title: "Google STEP Internship", company: "Google", tag: "88% match", match: 88 },
  { title: "Girls Who Code Fellowship", company: "GWC", tag: "95% match", match: 95 },
  { title: "SheHacks+ 7", company: "SheHacks", tag: "96% match", match: 96 },
  { title: "Adobe Women in Tech", company: "Adobe", tag: "89% match", match: 89 },
  { title: "MLH Fellowship", company: "MLH", tag: "80% match", match: 80 },
];

const MARQUEE_ITEMS = [
  "Career Graph", "Skill Intelligence", "Opportunity Matching",
  "Women in Tech", "TigerGraph Powered", "Mentor Network",
  "Path Discovery", "XP System", "Live Feed",
];

function Loader({ onDone }: { onDone?: () => void }) {
  const [pct, setPct] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let v = 0;
    const id = setInterval(() => {
      v += Math.random() * 14 + 4;
      if (v >= 100) {
        v = 100;
        clearInterval(id);
        setTimeout(() => {
          setHidden(true);
          onDone?.();
        }, 400);
      }
      setPct(Math.min(100, Math.round(v)));
    }, 60);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <div className={`loading-screen ${hidden ? "hidden" : ""}`}>
      <div style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "24px",
        fontWeight: 300,
        letterSpacing: "0.08em",
        color: "var(--white)",
        textTransform: "uppercase",
      }}>
        Graphire
      </div>
      <div>
        <div className="loading-bar-track">
          <div className="loading-bar-fill" style={{ width: `${pct}%` }} />
        </div>
        <div style={{
          marginTop: "12px",
          fontSize: "10px",
          letterSpacing: "0.14em",
          color: "var(--muted)",
          textTransform: "uppercase",
          textAlign: "center",
        }}>
          {pct === 100 ? "Ready" : `Loading — ${pct}%`}
        </div>
      </div>
    </div>
  );
}

function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div style={{ overflow: "hidden", padding: "40px 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div style={{
        display: "flex",
        gap: "60px",
        whiteSpace: "nowrap",
        animation: "marquee 30s linear infinite",
      }}>
        {items.map((item, i) => (
          <span key={i} style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(20px, 3vw, 36px)",
            fontWeight: 300,
            color: i % 2 === 0 ? "var(--pink)" : "var(--teal)",
            opacity: 0.5,
            letterSpacing: "0.02em",
            fontStyle: i % 3 === 0 ? "italic" : "normal",
          }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Landing() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const heroOp = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div style={{ background: "var(--black)", minHeight: "100vh" }}>
      <Loader />

      {/* Ambient orbs */}
      <div className="orb-pink" style={{ top: "-200px", right: "-200px" }} />
      <div className="orb-teal" style={{ bottom: "-100px", left: "-150px" }} />

      {/* HERO */}
      <div ref={heroRef} style={{ minHeight: "100vh", position: "relative" }}>
        <motion.div
          style={{ y: heroY, opacity: heroOp, padding: "0 60px", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}
        >
          {/* Top-right eyebrow */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "60px" }}>
            <div style={{
              fontSize: "9px",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "var(--muted)",
              fontWeight: 300,
            }}>
              Career graph · 2026
            </div>
          </div>

          {/* Numbered label */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "28px" }}>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "11px",
              color: "var(--muted)",
              fontWeight: 300,
              letterSpacing: "0.05em",
            }}>01.</span>
            <div style={{ width: "24px", height: "1px", background: "var(--border-mid)" }} />
            <span style={{ fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--teal)", fontWeight: 300 }}>
              Index
            </span>
          </div>

          {/* MASSIVE headline */}
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(60px, 10vw, 140px)",
            fontWeight: 300,
            letterSpacing: "-0.04em",
            lineHeight: 0.9,
            color: "var(--white)",
            marginBottom: "48px",
          }}>
            Map your<br />
            <em style={{ fontStyle: "italic", color: "var(--pink)", fontWeight: 300 }}>path</em>{" "}
            to the<br />
            <span style={{ color: "var(--teal)" }}>stars</span>
          </h1>

          {/* Bottom row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", maxWidth: "900px" }}>
            <p style={{
              fontSize: "14px",
              color: "var(--muted-mid)",
              maxWidth: "340px",
              lineHeight: 1.8,
              fontWeight: 300,
            }}>
              A graph-powered career platform for women in tech.
              Know your gaps, find your path, connect with your constellation.
            </p>

            <div style={{ display: "flex", gap: "14px" }}>
              <Link
                to="/dashboard"
                className="hover-target"
                data-cursor="go"
                style={{
                  fontSize: "10px",
                  fontWeight: 400,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  background: "var(--pink)",
                  color: "var(--black)",
                  padding: "14px 32px",
                  borderRadius: "100px",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 44px rgba(240,160,192,0.25)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLElement).style.transform = "none";
                }}
              >
                Begin mapping
              </Link>
              <Link
                to="/opportunities"
                className="hover-target"
                data-cursor="go"
                style={{
                  fontSize: "10px",
                  fontWeight: 300,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  border: "1px solid var(--border-mid)",
                  color: "var(--muted-hi)",
                  padding: "14px 32px",
                  borderRadius: "100px",
                  transition: "all 0.3s",
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--teal)";
                  (e.currentTarget as HTMLElement).style.color = "var(--teal)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border-mid)";
                  (e.currentTarget as HTMLElement).style.color = "var(--muted-hi)";
                }}
              >
                Explore →
              </Link>
            </div>
          </div>

          {/* Scroll hint */}
          <div style={{ position: "absolute", bottom: "40px", left: "60px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "1px", height: "32px", background: "linear-gradient(to bottom, var(--pink), transparent)" }} />
            <span style={{ fontSize: "8px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)" }}>
              Scroll
            </span>
          </div>
        </motion.div>
      </div>

      {/* MARQUEE */}
      <Marquee />

      {/* SECTION 01 */}
      <div style={{ padding: "120px 60px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "22px" }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "11px", color: "var(--muted)", fontWeight: 300 }}>01.</span>
            <div style={{ width: "20px", height: "1px", background: "var(--border-mid)" }} />
            <span style={{ fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--teal)", fontWeight: 300 }}>The intelligence</span>
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(36px, 4vw, 56px)",
            fontWeight: 300,
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
            color: "var(--white)",
          }}>
            Right skills,{" "}
            <em style={{ fontStyle: "italic", color: "var(--teal)", fontWeight: 300 }}>right</em>
            <br />opportunity
          </h2>
        </div>
        <div>
          <p style={{
            fontSize: "14px",
            color: "var(--muted-mid)",
            lineHeight: 1.9,
            fontWeight: 300,
            marginBottom: "32px",
          }}>
            Graphire uses graph intelligence to map every skill you have to every
            opportunity that matches. Not just keywords — actual career graph traversal.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--teal)", boxShadow: "0 0 8px rgba(110,212,200,0.5)" }} />
            <span style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 300 }}>
              Powered by TigerGraph
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 02: Cards */}
      <div style={{ padding: "80px 60px", borderTop: "1px solid var(--border)" }}>
        <div style={{ marginBottom: "48px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "22px" }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "11px", color: "var(--muted)", fontWeight: 300 }}>02.</span>
            <div style={{ width: "20px", height: "1px", background: "var(--border-mid)" }} />
            <span style={{ fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--pink)", fontWeight: 300 }}>Matched for you</span>
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(36px, 4vw, 56px)",
            fontWeight: 300,
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
            color: "var(--white)",
          }}>
            Opportunities from{" "}
            <em style={{ fontStyle: "italic", color: "var(--pink)", fontWeight: 300 }}>your</em>
            <br />constellation
          </h2>
        </div>

        <div style={{ display: "flex", gap: "18px", overflowX: "auto", paddingBottom: "12px", scrollbarWidth: "none" }}>
          {FLOATERS.map((card, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} viewport={{ once: true }}>
              <FloatingCard {...card} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* STATS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", borderTop: "1px solid var(--border)" }}>
        {[
          { val: "27+", label: "Opportunities curated", color: "var(--pink)" },
          { val: "96%", label: "Top match accuracy", color: "var(--teal)" },
          { val: "∞", label: "Career paths discovered", color: "var(--pink)" },
        ].map((s, i) => (
          <div key={i} style={{
            padding: "60px",
            borderRight: i < 2 ? "1px solid var(--border)" : "none",
            textAlign: "center",
          }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(48px, 6vw, 80px)",
              fontWeight: 300,
              color: s.color,
              lineHeight: 1,
              letterSpacing: "-0.03em",
            }}>
              {s.val}
            </div>
            <div style={{ marginTop: "12px", fontSize: "10px", color: "var(--muted)", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 300 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* SECTION 03: Manifesto */}
      <div style={{ padding: "120px 60px", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "700px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "22px" }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "11px", color: "var(--muted)", fontWeight: 300 }}>03.</span>
            <div style={{ width: "20px", height: "1px", background: "var(--border-mid)" }} />
            <span style={{ fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--teal)", fontWeight: 300 }}>Why Graphire</span>
          </div>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(24px, 3vw, 36px)",
            fontWeight: 300,
            lineHeight: 1.5,
            color: "var(--muted-hi)",
            letterSpacing: "-0.01em",
          }}>
            Career paths aren't linear. They're{" "}
            <em style={{ color: "var(--teal)", fontStyle: "italic" }}>graphs</em>
            {" "}— connected, branching, alive. Graphire maps yours in real time so you always know the{" "}
            <em style={{ color: "var(--pink)", fontStyle: "italic" }}>shortest route</em>
            {" "}from where you are to where you deserve to be.
          </p>

          {/* Scrolling tagline */}
          <div style={{ overflow: "hidden", marginTop: "48px" }}>
            <div style={{
              display: "flex",
              gap: "40px",
              whiteSpace: "nowrap",
              animation: "marquee 20s linear infinite",
            }}>
              {[...Array(6)].map((_, i) => (
                <span key={i} style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "18px",
                  fontStyle: "italic",
                  color: "var(--muted)",
                  opacity: 0.4,
                }}>
                  Passion is the point{" "}·{" "}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ padding: "48px 60px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "16px",
          fontWeight: 600,
          letterSpacing: "0.06em",
          color: "var(--white)",
          textTransform: "uppercase",
        }}>
          Graph<span style={{ color: "var(--pink)", fontStyle: "italic", fontWeight: 300 }}>ire</span>
        </div>
        <div style={{ fontSize: "10px", color: "var(--muted)", letterSpacing: "0.1em", fontWeight: 300 }}>
          Built for women in tech · 2026
        </div>
      </div>
    </div>
  );
}
