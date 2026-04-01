import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!ring || !dot) return;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringP = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const vel = { x: 0, y: 0 };

    let hovered = false;
    let clicking = false;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      dot.style.left = e.clientX + "px";
      dot.style.top = e.clientY + "px";
    };

    const getLabel = (el: HTMLElement) => {
      if (el.dataset.cursor) return el.dataset.cursor;
      if (el.tagName === "A") return "open";
      if (el.tagName === "BUTTON") return "click";
      return "view";
    };

    const onEnter = (e: Event) => {
      hovered = true;
      const lbl = getLabel(e.currentTarget as HTMLElement);
      if (label) {
        label.textContent = lbl.toUpperCase();
        label.style.opacity = "1";
      }
      ring.style.width = "100px";
      ring.style.height = "100px";
      ring.style.borderColor = "var(--teal)";
      ring.style.background = "rgba(110,212,200,0.07)";
      ring.style.mixBlendMode = "normal";
    };

    const onLeave = () => {
      hovered = false;
      if (label) label.style.opacity = "0";
      ring.style.width = "52px";
      ring.style.height = "52px";
      ring.style.borderColor = "rgba(240,160,192,0.6)";
      ring.style.background = "rgba(240,160,192,0.04)";
    };

    const onDown = () => {
      clicking = true;
      ring.style.transform = "translate(-50%,-50%) scale(0.72)";
      ring.style.borderColor = "var(--pink-bright)";
    };
    const onUp = () => {
      clicking = false;
      ring.style.transform = "translate(-50%,-50%) scale(1)";
      ring.style.borderColor = hovered ? "var(--teal)" : "rgba(240,160,192,0.6)";
    };

    const SEL = "a, button, [data-cursor], .hover-target, nav li, .opp-card, .person-card, .feed-item, .ach-item";
    const attach = () => {
      document.querySelectorAll(SEL).forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };
    attach();
    const mo = new MutationObserver(attach);
    mo.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    const STIFFNESS = 0.085;
    const DAMPING = 0.78;

    const loop = () => {
      vel.x += (mouse.x - ringP.x) * STIFFNESS;
      vel.y += (mouse.y - ringP.y) * STIFFNESS;
      vel.x *= DAMPING;
      vel.y *= DAMPING;
      ringP.x += vel.x;
      ringP.y += vel.y;

      ring.style.left = ringP.x + "px";
      ring.style.top = ringP.y + "px";

      if (!clicking) {
        const speed = Math.hypot(vel.x, vel.y);
        const skewX = Math.max(-8, Math.min(8, vel.x * 0.4));
        const scaleX = hovered ? 1 : 1 + speed * 0.008;
        const scaleY = hovered ? 1 : Math.max(0.85, 1 - speed * 0.004);
        ring.style.transform = `translate(-50%,-50%) skew(${skewX}deg) scale(${scaleX},${scaleY})`;
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      mo.disconnect();
      document.querySelectorAll(SEL).forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          width: "52px",
          height: "52px",
          borderRadius: "50%",
          border: "1.5px solid rgba(240,160,192,0.6)",
          background: "rgba(240,160,192,0.04)",
          pointerEvents: "none",
          zIndex: 99998,
          top: 0,
          left: 0,
          transform: "translate(-50%,-50%)",
          transition: [
            "width 0.45s cubic-bezier(0.16,1,0.3,1)",
            "height 0.45s cubic-bezier(0.16,1,0.3,1)",
            "background 0.3s",
            "border-color 0.3s",
          ].join(", "),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          ref={labelRef}
          style={{
            fontSize: "7px",
            fontWeight: 500,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--teal)",
            opacity: 0,
            transition: "opacity 0.2s",
            userSelect: "none",
            pointerEvents: "none",
            whiteSpace: "nowrap",
            fontFamily: "'Outfit', sans-serif",
          }}
        />
      </div>
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          background: "var(--pink)",
          pointerEvents: "none",
          zIndex: 99999,
          top: 0,
          left: 0,
          transform: "translate(-50%,-50%)",
          boxShadow: "0 0 8px rgba(240,160,192,0.8)",
        }}
      />
    </>
  );
}
