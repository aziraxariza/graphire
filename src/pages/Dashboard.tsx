import { motion } from "framer-motion";
import GraphireSidebar from "../components/GraphireSidebar";
import PathSection from "../components/PathSection";
import SkillProgress from "../components/SkillProgress";
import OpportunityCard from "../components/OpportunityCard";
import PeopleCard from "../components/PeopleCard";
import CareerGraph from "../components/CareerGraph";
import { useRef } from "react";

const FEED = [
  { text: "New opportunity matched", sub: "Google STEP — 88% match based on your graph", time: "2 minutes ago" },
  { text: "Skill gap closed", sub: "You completed Next.js basics. New path discovered.", time: "1 hour ago" },
  { text: "Priya Raj is now on the same path", sub: "React → Node → SDE", time: "3 hours ago" },
  { text: "+150 XP earned", sub: "React Level 3 unlocked", time: "Yesterday" },
  { text: "Adobe Fellowship deadline in 14 days", sub: "You are 82% matched — apply now", time: "2 days ago" },
];

const OPPS = [
  { title: "Google STEP Internship", company: "Google", location: "Hyderabad", tag: "High match", match: 88, deadline: "Feb 28, 2026" },
  { title: "Girls Who Code Fellowship", company: "Girls Who Code", location: "Remote", tag: "Top match", match: 95, deadline: "Apr 20, 2026" },
  { title: "SheHacks+ 7", company: "SheHacks", location: "Online", tag: "Top match", match: 96, deadline: "Feb 2026" },
  { title: "Adobe Women in Tech Fellowship", company: "Adobe", location: "Remote", tag: "High match", match: 89, deadline: "Mar 15, 2026" },
];

const PEOPLE = [
  { name: "Priya Raj", role: "Frontend Learner · React 75%", skills: ["React", "Next.js"] },
  { name: "Anika Singh", role: "SDE @ Adobe · walked the same path", skills: ["SDE"], isMentor: true },
  { name: "Zara Khan", role: "ML Engineer · Goal: FAANG", skills: ["Python", "ML"] },
  { name: "Maya Gupta", role: "CS Junior · Google STEP 2026", skills: ["DSA", "React"] },
];

const ACHIEVEMENTS = [
  { icon: "↯", title: "React Level 3 unlocked", desc: "+150 XP · Completed React Hooks module" },
  { icon: "◎", title: "Path defined", desc: "+80 XP · You set your first career goal" },
  { icon: "◈", title: "First connection", desc: "+40 XP · Connected with a mentor" },
  { icon: "◇", title: "Resume parsed", desc: "+60 XP · 7 skills extracted from resume" },
];

function SectionHeader({ num, eyebrow, eyebrowColor = "var(--teal)", heading, italic, italicColor = "var(--teal)" }: {
  num: string; eyebrow: string; eyebrowColor?: string; heading: string; italic?: string; italicColor?: string;
}) {
  return (
    <div style={{ marginBottom: "48px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "22px" }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "11px", color: "var(--muted)", fontWeight: 300, letterSpacing: "0.05em" }}>{num}.</span>
        <div style={{ width: "20px", height: "1px", background: "var(--border-mid)" }} />
        <span style={{ fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", color: eyebrowColor, fontWeight: 300 }}>{eyebrow}</span>
      </div>
      <h2 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "clamp(30px, 3.8vw, 52px)",
        fontWeight: 300,
        letterSpacing: "-0.04em",
        lineHeight: 0.95,
        color: "var(--white)",
      }}>
        {heading}{" "}
        {italic && <em style={{ fontStyle: "italic", color: italicColor, fontWeight: 300 }}>{italic}</em>}
      </h2>
    </div>
  );
}

function OppCarousel({ items }: { items: typeof OPPS }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} style={{ display: "flex", gap: "16px", overflowX: "auto", paddingBottom: "8px", scrollbarWidth: "none" }}>
      {items.map((o, i) => <OpportunityCard key={i} {...o} />)}
    </div>
  );
}

export default function Dashboard() {
  return (
    <div style={{ display: "flex", paddingTop: "80px", minHeight: "100vh", background: "var(--black)" }}>
      <GraphireSidebar />

      <main style={{ flex: 1, overflowX: "hidden" }}>

        {/* BANNER */}
        <div style={{
          padding: "60px 56px 52px",
          borderBottom: "1px solid var(--border)",
          background: "rgba(11,14,24,0.7)",
          backdropFilter: "blur(24px)",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(240,160,192,0.45), rgba(110,212,200,0.45), transparent)",
          }} />

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "22px" }}>
              <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "11px", color: "var(--muted)", fontWeight: 300 }}>01.</span>
              <div style={{ width: "18px", height: "1px", background: "var(--border-mid)" }} />
              <span style={{ fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--teal)", fontWeight: 300 }}>Welcome back</span>
            </div>

            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(40px, 5.5vw, 72px)",
              fontWeight: 300,
              letterSpacing: "-0.04em",
              lineHeight: 0.92,
              color: "var(--white)",
            }}>
              Your Career{" "}
              <em style={{ fontStyle: "italic", color: "var(--pink)", fontWeight: 300 }}>Graph</em>
            </h1>

            <p style={{ marginTop: "16px", fontSize: "13px", color: "var(--muted)", fontWeight: 300, letterSpacing: "0.04em" }}>
              3 of 6 steps complete · 2 skill gaps · approx. 4 months to goal
            </p>
          </motion.div>
        </div>

        {/* STATS */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          borderBottom: "1px solid var(--border)",
          background: "rgba(15,18,30,0.5)",
        }}>
          {[
            { val: "1,240", accent: "", label: "XP Earned", color: "var(--pink)" },
            { val: "88", accent: "%", label: "Top match score", color: "var(--teal)" },
            { val: "3", accent: "/6", label: "Path steps done", color: "var(--pink)" },
            { val: "7", accent: "", label: "Opps matched", color: "var(--teal)" },
          ].map((s, i) => (
            <div key={i} style={{
              padding: "30px 36px",
              borderRight: i < 3 ? "1px solid var(--border)" : "none",
            }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "42px",
                fontWeight: 300,
                lineHeight: 1,
                color: "var(--white)",
                letterSpacing: "-0.03em",
              }}>
                {s.val}<span style={{ color: s.color }}>{s.accent}</span>
              </div>
              <div style={{ marginTop: "7px", fontSize: "9px", color: "var(--muted)", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 300 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* CAREER GRAPH ANIMATION */}
        <div style={{ padding: "72px 56px", borderBottom: "1px solid var(--border)", background: "rgba(15,18,28,0.4)" }}>
          <SectionHeader num="02" eyebrow="Spanning graph" heading="Your skill" italic="constellation" />
          <CareerGraph />
        </div>

        {/* PATH */}
        <div id="path" style={{ padding: "72px 56px", borderBottom: "1px solid var(--border)" }}>
          <SectionHeader num="03" eyebrow="Career path" heading="Shortest route from" italic="you to your goal" italicColor="var(--teal)" />
          <div style={{
            background: "rgba(15,18,32,0.8)",
            backdropFilter: "blur(18px)",
            border: "1px solid var(--border)",
            borderRadius: "18px",
            padding: "44px",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{
              position: "absolute",
              top: 0, left: 0, right: 0,
              height: "1px",
              background: "linear-gradient(90deg,transparent,rgba(110,212,200,0.38),transparent)",
            }} />
            <PathSection />
          </div>
        </div>

        {/* OPPORTUNITIES */}
        <div style={{ padding: "72px 56px", borderBottom: "1px solid var(--border)", background: "rgba(15,18,28,0.4)" }}>
          <SectionHeader num="04" eyebrow="Matched for you · 2026" eyebrowColor="var(--pink)" heading="Opportunities from" italic="your graph" italicColor="var(--pink)" />
          <OppCarousel items={OPPS} />
        </div>

        {/* SKILLS */}
        <div id="skills" style={{ padding: "72px 56px", borderBottom: "1px solid var(--border)" }}>
          <SectionHeader num="05" eyebrow="Skill intelligence" heading="Know exactly what you're" italic="missing" />
          <SkillProgress />
        </div>

        {/* XP / GROWTH */}
        <div style={{ padding: "72px 56px", borderBottom: "1px solid var(--border)", background: "rgba(15,18,28,0.4)" }}>
          <SectionHeader num="06" eyebrow="Growth system" eyebrowColor="var(--pink)" heading="Make progress" italic="addictive" italicColor="var(--pink)" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "24px", alignItems: "start" }}>
            {/* XP card */}
            <div style={{
              background: "rgba(15,18,32,0.9)",
              backdropFilter: "blur(18px)",
              border: "1px solid var(--border)",
              borderRadius: "18px",
              padding: "40px",
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{
                position: "absolute",
                top: 0, left: 0, right: 0,
                height: "1px",
                background: "linear-gradient(90deg, var(--pink), var(--teal))",
                opacity: 0.55,
              }} />
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "80px",
                fontWeight: 300,
                lineHeight: 1,
                letterSpacing: "-0.05em",
                color: "var(--white)",
              }}>
                1,<span style={{ color: "var(--pink)" }}>240</span>
              </div>
              <div style={{ marginTop: "10px", fontSize: "9px", color: "var(--muted)", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 300 }}>
                Level 4 — Rising Developer
              </div>
              <div style={{ marginTop: "24px", height: "1px", background: "var(--surface3)", overflow: "hidden" }}>
                <div style={{ height: "100%", width: "65%", background: "linear-gradient(90deg,var(--pink),var(--teal))", boxShadow: "0 0 10px rgba(240,160,192,0.35)" }} />
              </div>
              <div style={{ marginTop: "8px", fontSize: "11px", color: "var(--muted)", fontWeight: 300 }}>760 XP to Level 5</div>
            </div>

            {/* Achievements */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {ACHIEVEMENTS.map((a, i) => (
                <motion.div
                  key={i}
                  whileHover={{ borderColor: i % 2 === 0 ? "rgba(240,160,192,0.22)" : "rgba(110,212,200,0.22)" }}
                  className="hover-target ach-item"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    background: "rgba(15,18,32,0.75)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid var(--border)",
                    borderRadius: "14px",
                    padding: "14px 18px",
                  }}
                >
                  <div style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    background: i % 2 === 0 ? "var(--pink-dim)" : "var(--teal-dim)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "15px",
                    flexShrink: 0,
                    color: i % 2 === 0 ? "var(--pink)" : "var(--teal)",
                    fontFamily: "monospace",
                  }}>
                    {a.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: 400, marginBottom: "2px", color: "var(--white)" }}>{a.title}</div>
                    <div style={{ fontSize: "11px", color: "var(--muted)", fontWeight: 300 }}>{a.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* NETWORK */}
        <div id="network" style={{ padding: "72px 56px", borderBottom: "1px solid var(--border)" }}>
          <SectionHeader num="07" eyebrow="Women network" heading="People on the" italic="same path as you" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(188px,1fr))", gap: "12px" }}>
            {PEOPLE.map((p, i) => <PeopleCard key={i} {...p} />)}
          </div>
        </div>

        {/* FEED */}
        <div style={{ padding: "72px 56px", background: "rgba(15,18,28,0.4)" }}>
          <SectionHeader num="08" eyebrow="Live feed" eyebrowColor="var(--pink)" heading="Your career" italic="in motion" italicColor="var(--pink)" />
          <div>
            {FEED.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ paddingLeft: "8px" }}
                className="hover-target feed-item"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "18px",
                  padding: "22px 0",
                  borderBottom: "1px solid var(--border)",
                  transition: "padding-left 0.2s",
                  cursor: "none",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "6px" }}>
                  <div style={{
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: i % 2 === 0 ? "var(--pink)" : "var(--teal)",
                    boxShadow: i % 2 === 0 ? "0 0 7px rgba(240,160,192,0.6)" : "0 0 7px rgba(110,212,200,0.6)",
                    flexShrink: 0,
                  }} />
                  {i < FEED.length - 1 && (
                    <div style={{ width: "1px", flex: 1, background: "var(--border)", marginTop: "7px", minHeight: "22px" }} />
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "14px", lineHeight: 1.6, fontWeight: 400, color: "var(--white)" }}>{item.text}</div>
                  <div style={{ fontSize: "12px", color: "var(--muted)", marginTop: "3px", fontWeight: 300 }}>{item.sub}</div>
                  <div style={{ fontSize: "10px", color: "var(--muted)", opacity: 0.45, marginTop: "5px", letterSpacing: "0.05em", fontWeight: 300 }}>{item.time}</div>
                </div>
                <div style={{ color: "var(--muted)", marginTop: "4px", fontSize: "12px", opacity: 0.4 }}>→</div>
              </motion.div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
