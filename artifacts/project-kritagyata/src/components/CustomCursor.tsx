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
    let hovering = false;
    let spinning = false;
    let spinTimeout = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = !!target.closest(
        "a, button, [role='button'], input, textarea, select, label"
      ) || window.getComputedStyle(target).cursor === "pointer";

      if (isInteractive && !hovering) {
        hovering = true;
        el.style.width = "56px";
        el.style.height = "56px";
        el.style.marginLeft = "-28px";
        el.style.marginTop = "-28px";
        el.style.filter =
          "drop-shadow(0 0 7px rgba(180,30,60,0.75))";

        if (!spinning) {
          spinning = true;
          el.style.animation = "none";
          void el.offsetWidth;
          el.style.animation = "cursorSpin 0.5s ease-in-out forwards";
          clearTimeout(spinTimeout);
          spinTimeout = window.setTimeout(() => {
            el.style.animation = "none";
            spinning = false;
          }, 520);
        }
      } else if (!isInteractive && hovering) {
        hovering = false;
        el.style.width = "44px";
        el.style.height = "44px";
        el.style.marginLeft = "-22px";
        el.style.marginTop = "-22px";
        el.style.filter =
          "drop-shadow(0 1px 3px rgba(0,0,0,0.35))";
      }
    };

    const loop = () => {
      curX += (mouseX - curX) * 0.14;
      curY += (mouseY - curY) * 0.14;
      el.style.transform = `translate(${curX}px, ${curY}px)`;
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
        width: "44px",
        height: "44px",
        marginLeft: "-22px",
        marginTop: "-22px",
        pointerEvents: "none",
        zIndex: 999999,
        willChange: "transform",
        transition: "width 0.2s ease, height 0.2s ease, margin 0.2s ease, filter 0.2s ease",
        filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.35))",
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
