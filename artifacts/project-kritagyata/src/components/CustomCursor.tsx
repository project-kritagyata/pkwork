import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    let mouseX = -200;
    let mouseY = -200;
    let curX = -200;
    let curY = -200;
    let raf = 0;
    let lastTime = 0;
    let hovering = false;
    let spinning = false;
    let spinTimeout = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        !!target.closest("a, button, [role='button'], input, textarea, select, label") ||
        window.getComputedStyle(target).cursor === "pointer";

      if (isInteractive && !hovering) {
        hovering = true;
        el.style.width = "52px";
        el.style.height = "52px";
        el.style.marginLeft = "-26px";
        el.style.marginTop = "-26px";
        el.style.filter = "drop-shadow(0 0 8px rgba(180,30,60,0.8))";

        if (!spinning) {
          spinning = true;
          el.style.animation = "none";
          void el.offsetWidth;
          el.style.animation = "cursorSpin 0.45s ease-in-out forwards";
          clearTimeout(spinTimeout);
          spinTimeout = window.setTimeout(() => {
            el.style.animation = "none";
            spinning = false;
          }, 460);
        }
      } else if (!isInteractive && hovering) {
        hovering = false;
        el.style.width = "42px";
        el.style.height = "42px";
        el.style.marginLeft = "-21px";
        el.style.marginTop = "-21px";
        el.style.filter = "drop-shadow(0 1px 3px rgba(0,0,0,0.3))";
      }
    };

    const loop = (time: number) => {
      const dt = lastTime ? Math.min((time - lastTime) / 16.667, 3) : 1;
      lastTime = time;

      const factor = 1 - Math.pow(0.18, dt);
      curX += (mouseX - curX) * factor;
      curY += (mouseY - curY) * factor;

      el.style.transform = `translate3d(${curX}px,${curY}px,0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
      clearTimeout(spinTimeout);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "42px",
        height: "42px",
        marginLeft: "-21px",
        marginTop: "-21px",
        pointerEvents: "none",
        zIndex: 999999,
        willChange: "transform",
        transition: "width 0.15s ease, height 0.15s ease, margin 0.15s ease, filter 0.15s ease",
        filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.3))",
      }}
    >
      <img
        src="/cursor.png"
        alt=""
        style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
      />
    </div>
  );
}
