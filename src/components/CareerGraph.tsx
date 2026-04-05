import { useEffect, useRef } from "react";

interface GraphNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  label: string;
  color: string;
  targetColor: string;
  colorT: number;
  colorSpeed: number;
}

const LABELS = [
  "React", "Node.js", "Python", "ML", "TypeScript", "SQL",
  "AWS", "Docker", "Git", "DSA", "Next.js", "GraphQL",
  "TigerGraph", "Redis", "Figma", "CSS", "Java", "REST",
];

const PINK = [240, 160, 192];
const TEAL = [110, 212, 200];

function lerpColor(a: number[], b: number[], t: number): string {
  return `rgb(${Math.round(a[0] + (b[0] - a[0]) * t)},${Math.round(a[1] + (b[1] - a[1]) * t)},${Math.round(a[2] + (b[2] - a[2]) * t)})`;
}

export default function CareerGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d")!;

    let w = 0, h = 0;
    const resize = () => {
      const rect = container.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * window.devicePixelRatio;
      canvas.height = h * window.devicePixelRatio;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const nodes: GraphNode[] = LABELS.map((label) => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 8 + 6,
      label,
      color: Math.random() > 0.5 ? "teal" : "pink",
      targetColor: Math.random() > 0.5 ? "teal" : "pink",
      colorT: Math.random(),
      colorSpeed: Math.random() * 0.008 + 0.003,
    }));

    const EDGE_DIST = 160;
    let raf: number;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Update nodes
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 20 || n.x > w - 20) n.vx *= -1;
        if (n.y < 20 || n.y > h - 20) n.vy *= -1;

        // Color transition
        n.colorT += n.colorSpeed;
        if (n.colorT >= 1) {
          n.colorT = 0;
          n.color = n.targetColor;
          n.targetColor = n.targetColor === "teal" ? "pink" : "teal";
        }
      });

      // Draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < EDGE_DIST) {
            const alpha = (1 - dist / EDGE_DIST) * 0.25;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(110,212,200,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();

            // Animate a pulse along the edge occasionally
            if (Math.random() < 0.001) {
              const mx = (nodes[i].x + nodes[j].x) / 2;
              const my = (nodes[i].y + nodes[j].y) / 2;
              ctx.beginPath();
              ctx.arc(mx, my, 2, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(240,160,192,${alpha * 3})`;
              ctx.fill();
            }
          }
        }
      }

      // Draw nodes
      nodes.forEach((n) => {
        const fromC = n.color === "teal" ? TEAL : PINK;
        const toC = n.targetColor === "teal" ? TEAL : PINK;
        const col = lerpColor(fromC, toC, n.colorT);

        // Glow
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + 6, 0, Math.PI * 2);
        const fromAlpha = n.color === "teal" ? "rgba(110,212,200,0.08)" : "rgba(240,160,192,0.08)";
        ctx.fillStyle = fromAlpha;
        ctx.fill();

        // Node circle
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = col;
        ctx.globalAlpha = 0.85;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Label
        ctx.font = "300 9px 'Outfit', sans-serif";
        ctx.fillStyle = "rgba(237,240,248,0.6)";
        ctx.textAlign = "center";
        ctx.fillText(n.label, n.x, n.y + n.r + 14);
      });

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "320px",
        position: "relative",
        borderRadius: "18px",
        overflow: "hidden",
        background: "rgba(11,14,24,0.5)",
        border: "1px solid var(--border)",
      }}
    >
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0 }} />
      <div style={{
        position: "absolute",
        bottom: "12px",
        left: "50%",
        transform: "translateX(-50%)",
        fontSize: "9px",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "var(--muted)",
        fontWeight: 300,
      }}>
        Live skill graph · nodes switch teal ↔ pink
      </div>
    </div>
  );
}
