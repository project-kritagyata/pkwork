import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const raf = useRef<number>(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const checkHover = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const interactive = el.closest("a, button, [role='button'], input, textarea, select, label, [style*='cursor: pointer']");
      setHovered(!!interactive);
    };

    const loop = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      raf.current = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", checkHover, { passive: true });
    raf.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", checkHover);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: hovered ? "56px" : "48px",
        height: hovered ? "56px" : "48px",
        marginLeft: hovered ? "-28px" : "-24px",
        marginTop: hovered ? "-28px" : "-24px",
        pointerEvents: "none",
        zIndex: 999999,
        willChange: "transform",
        transition: "width 0.18s ease, height 0.18s ease, margin 0.18s ease",
        animation: hovered ? "cursorSpin 0.55s ease-in-out" : "none",
      }}
    >
      <img
        src="/cursor.png"
        alt=""
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          display: "block",
          filter: hovered
            ? "drop-shadow(0 0 6px rgba(180,30,60,0.7))"
            : "drop-shadow(0 1px 3px rgba(0,0,0,0.35))",
          transition: "filter 0.18s ease",
        }}
      />
    </div>
  );
}
