import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OpportunityCard from "../components/OpportunityCard";

const ALL_OPPS = [
  { id:1,  title:"Google STEP Internship",              company:"Google",               location:"Hyderabad / Remote",  tag:"High match",     match:88, deadline:"Feb 28, 2026", type:"internship" },
  { id:2,  title:"Microsoft Explore Internship",         company:"Microsoft",             location:"Bengaluru",           tag:"High match",     match:84, deadline:"Mar 15, 2026", type:"internship" },
  { id:3,  title:"Amazon SDE Internship",                company:"Amazon",                location:"Hyderabad",           tag:"Strong match",   match:79, deadline:"Mar 20, 2026", type:"internship" },
  { id:4,  title:"Adobe Research Internship",            company:"Adobe",                 location:"Noida / Remote",      tag:"High match",     match:82, deadline:"Mar 10, 2026", type:"internship" },
  { id:5,  title:"Flipkart SWE Internship",              company:"Flipkart",              location:"Bengaluru",           tag:"Good match",     match:74, deadline:"Apr 1, 2026",  type:"internship" },
  { id:6,  title:"Goldman Sachs Technology Analyst",     company:"Goldman Sachs",         location:"Bengaluru",           tag:"Good match",     match:71, deadline:"Mar 25, 2026", type:"internship" },
  { id:7,  title:"Atlassian SWE Intern",                 company:"Atlassian",             location:"Remote",              tag:"High match",     match:85, deadline:"Apr 5, 2026",  type:"internship" },
  { id:8,  title:"Intuit Software Engineer Intern",      company:"Intuit",                location:"Bengaluru",           tag:"Good match",     match:76, deadline:"Mar 30, 2026", type:"internship" },
  { id:9,  title:"Nvidia AI Research Intern",            company:"Nvidia",                location:"Pune",                tag:"Skill gap: ML",  match:58, deadline:"May 1, 2026",  type:"internship" },
  { id:10, title:"IBM India Internship",                  company:"IBM",                   location:"Mumbai / Remote",     tag:"Good match",     match:73, deadline:"Apr 10, 2026", type:"internship" },
  { id:11, title:"Google Women Techmakers Fellowship",   company:"Google",                location:"Global / Remote",     tag:"High match",     match:92, deadline:"Mar 1, 2026",  type:"fellowship" },
  { id:12, title:"Adobe Women in Tech Fellowship",       company:"Adobe",                 location:"Remote",              tag:"High match",     match:89, deadline:"Mar 15, 2026", type:"fellowship" },
  { id:13, title:"Girls Who Code Fellowship 2026",       company:"Girls Who Code",         location:"Remote",              tag:"High match",     match:95, deadline:"Apr 20, 2026", type:"fellowship" },
  { id:14, title:"Microsoft TEALS Fellowship",           company:"Microsoft",             location:"Remote",              tag:"Good match",     match:78, deadline:"Mar 30, 2026", type:"fellowship" },
  { id:15, title:"Outreachy Internship Fellowship",      company:"Outreachy / Linux Fdn", location:"Remote",              tag:"High match",     match:86, deadline:"Jan 31, 2026", type:"fellowship" },
  { id:16, title:"MLH Fellowship — Spring 2026",         company:"Major League Hacking",  location:"Remote",              tag:"Good match",     match:80, deadline:"Rolling",       type:"fellowship" },
  { id:17, title:"Palantir Women in Tech Scholarship",   company:"Palantir",              location:"Global",              tag:"Good match",     match:75, deadline:"Apr 15, 2026", type:"fellowship" },
  { id:18, title:"HackMIT 2026",                         company:"MIT",                   location:"Cambridge, MA",       tag:"Top match",      match:91, deadline:"Aug 2026",     type:"hackathon" },
  { id:19, title:"Grace Hopper Celebration Hackathon",   company:"AnitaB.org",            location:"Atlanta, GA",         tag:"Top match",      match:94, deadline:"Jul 2026",     type:"hackathon" },
  { id:20, title:"Hack the North 2026",                  company:"Univ. of Waterloo",     location:"Waterloo / Online",   tag:"High match",     match:88, deadline:"Sep 2026",     type:"hackathon" },
  { id:21, title:"SheHacks+ 7",                          company:"SheHacks",              location:"Online",              tag:"Top match",      match:96, deadline:"Feb 2026",     type:"hackathon" },
  { id:22, title:"Pearl Hacks 2026",                     company:"UNC Chapel Hill",       location:"Chapel Hill, NC",     tag:"High match",     match:90, deadline:"Mar 2026",     type:"hackathon" },
  { id:23, title:"Frontend Developer — React",           company:"Zepto",                 location:"Mumbai / Remote",     tag:"Quick apply",    match:87, deadline:"Rolling",       type:"job" },
  { id:24, title:"Fullstack Engineer",                    company:"Razorpay",              location:"Bengaluru",           tag:"Good match",     match:77, deadline:"Rolling",       type:"job" },
  { id:25, title:"UI/UX Engineer",                        company:"Figma",                 location:"Remote",              tag:"Good match",     match:72, deadline:"Rolling",       type:"job" },
  { id:26, title:"Product Engineer",                      company:"Linear",                location:"Remote",              tag:"Skill gap: TS",  match:62, deadline:"Rolling",       type:"job" },
  { id:27, title:"Women in Engineering Program",          company:"Cisco",                 location:"Bengaluru",           tag:"High match",     match:83, deadline:"Apr 30, 2026", type:"job" },
];

const TABS = ["All", "Internship", "Fellowship", "Hackathon", "Job"];

function OppCarousel({ items }: { items: typeof ALL_OPPS }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeftRef = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startX.current = e.pageX - (trackRef.current?.offsetLeft || 0);
    scrollLeftRef.current = trackRef.current?.scrollLeft || 0;
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (trackRef.current?.offsetLeft || 0);
    if (trackRef.current) trackRef.current.scrollLeft = scrollLeftRef.current - (x - startX.current);
  };
  const onMouseUp = () => setIsDragging(false);

  const scroll = (dir: number) => trackRef.current?.scrollBy({ left: dir * 310, behavior: "smooth" });

  return (
    <div style={{ position: "relative" }}>
      {[{ dir: -1, side: "left" as const }, { dir: 1, side: "right" as const }].map(({ dir, side }) => (
        <button
          key={side}
          onClick={() => scroll(dir)}
          className="hover-target"
          data-cursor="click"
          style={{
            position: "absolute",
            top: "50%",
            [side]: "-18px",
            transform: "translateY(-50%)",
            zIndex: 10,
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "var(--surface2)",
            border: "1px solid var(--border-mid)",
            color: "var(--white)",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "none",
            transition: "border-color 0.2s, background 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--teal)";
            (e.currentTarget as HTMLElement).style.background = "var(--teal-dim)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--border-mid)";
            (e.currentTarget as HTMLElement).style.background = "var(--surface2)";
          }}
        >
          {side === "left" ? "←" : "→"}
        </button>
      ))}

      <div
        ref={trackRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        style={{
          display: "flex",
          gap: "18px",
          overflowX: "auto",
          paddingBottom: "8px",
          scrollbarWidth: "none",
          cursor: isDragging ? "grabbing" : "grab",
          userSelect: "none",
          paddingLeft: "4px",
          paddingRight: "4px",
        }}
      >
        {items.map((opp, i) => (
          <motion.div
            key={opp.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.035, duration: 0.35 }}
          >
            <OpportunityCard
              title={opp.title}
              company={opp.company}
              location={opp.location}
              tag={opp.tag}
              match={opp.match}
              deadline={opp.deadline}
            />
          </motion.div>
        ))}
      </div>

      <div style={{ marginTop: "18px", fontSize: "10px", color: "var(--muted)", letterSpacing: "0.14em", textTransform: "uppercase", textAlign: "center" }}>
        Drag to explore · {items.length} matched
      </div>
    </div>
  );
}

export default function Opportunities() {
  const [active, setActive] = useState("All");

  const filtered = active === "All"
    ? ALL_OPPS
    : ALL_OPPS.filter((o) => o.type === active.toLowerCase());

  return (
    <div style={{ paddingTop: "88px", minHeight: "100vh", background: "var(--black)" }}>
      <div className="orb-pink" style={{ top: "-80px", right: "-60px" }} />

      <div style={{ padding: "80px 60px 0" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "28px" }}>
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "11px", color: "var(--muted)", fontWeight: 300 }}>02.</span>
            <div style={{ width: "24px", height: "1px", background: "var(--border-mid)" }} />
            <span style={{ fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--teal)", fontWeight: 300 }}>Smart matching · 2026</span>
          </div>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(52px, 8vw, 104px)",
            fontWeight: 300,
            letterSpacing: "-0.04em",
            lineHeight: 0.9,
            color: "var(--white)",
          }}>
            Opportunities<br />
            mapped to{" "}
            <em style={{ fontStyle: "italic", color: "var(--pink)" }}>your</em>
            <br />
            <em style={{ fontStyle: "italic", color: "var(--pink)" }}>graph</em>
          </h1>

          <p style={{ marginTop: "28px", fontSize: "15px", color: "var(--muted-mid)", maxWidth: "420px", lineHeight: 1.85, fontWeight: 300, letterSpacing: "0.01em" }}>
            Every listing is scored against your current skills and career graph. Real companies, real 2026 deadlines.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ display: "flex", gap: "8px", marginTop: "48px", flexWrap: "wrap" }}
        >
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className="hover-target"
              data-cursor="click"
              style={{
                fontSize: "10px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "8px 20px",
                borderRadius: "100px",
                border: "1px solid",
                borderColor: active === tab ? "var(--teal)" : "var(--border-mid)",
                background: active === tab ? "var(--teal-dim)" : "transparent",
                color: active === tab ? "var(--teal)" : "var(--muted-mid)",
                cursor: "none",
                transition: "all 0.2s",
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              {tab}
              <span style={{ marginLeft: "5px", fontSize: "9px", opacity: 0.65 }}>
                ({tab === "All" ? ALL_OPPS.length : ALL_OPPS.filter(o => o.type === tab.toLowerCase()).length})
              </span>
            </button>
          ))}
        </motion.div>
      </div>

      <div style={{ padding: "48px 76px 110px" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <OppCarousel items={filtered} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
