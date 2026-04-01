import { useEffect, useRef } from "react";

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COUNT = 220;
    const stars = Array.from({ length: COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.4 + 0.2,
      baseAlpha: Math.random() * 0.6 + 0.15,
      alpha: 0,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.008 + 0.003,
      driftX: (Math.random() - 0.5) * 0.04,
      driftY: (Math.random() - 0.5) * 0.02,
      color: ["255,255,255","255,255,255","255,255,255","240,160,192","110,212,200","180,140,255"][Math.floor(Math.random() * 6)],
    }));

    let raf: number;
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.4;

      stars.forEach((s) => {
        s.x += s.driftX;
        s.y += s.driftY;
        if (s.x < 0) s.x = canvas.width;
        if (s.x > canvas.width) s.x = 0;
        if (s.y < 0) s.y = canvas.height;
        if (s.y > canvas.height) s.y = 0;

        s.alpha = s.baseAlpha * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));

        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = `rgb(${s.color})`;
        ctx.shadowBlur = s.r > 1 ? 4 : 0;
        ctx.shadowColor = `rgba(${s.color},0.8)`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      if (Math.random() < 0.0015) {
        const sx = Math.random() * canvas.width * 0.7;
        const sy = Math.random() * canvas.height * 0.4;
        const len = Math.random() * 120 + 60;
        const angle = Math.PI / 6 + (Math.random() - 0.5) * 0.3;
        const grad = ctx.createLinearGradient(sx, sy, sx + Math.cos(angle) * len, sy + Math.sin(angle) * len);
        grad.addColorStop(0, "rgba(255,255,255,0)");
        grad.addColorStop(0.3, "rgba(110,212,200,0.6)");
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.save();
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx + Math.cos(angle) * len, sy + Math.sin(angle) * len);
        ctx.stroke();
        ctx.restore();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.75,
      }}
    />
  );
}
