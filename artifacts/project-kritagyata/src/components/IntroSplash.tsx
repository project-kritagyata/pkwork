import { useState, useEffect } from "react";

export default function IntroSplash() {
  const [visible, setVisible] = useState(() => {
    try {
      return !sessionStorage.getItem("kritagyata_intro_seen");
    } catch {
      return true;
    }
  });
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setVisible(false);
        try { sessionStorage.setItem("kritagyata_intro_seen", "1"); } catch {}
      }, 800);
    }, 3000);
    return () => clearTimeout(timer);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(160deg, hsl(345,65%,10%) 0%, hsl(345,55%,17%) 60%, hsl(37,40%,20%) 100%)",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.8s ease-in-out",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, hsla(37,70%,40%,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <img
          src="/logo.png"
          alt="Project Kritagyata"
          style={{
            width: "8rem",
            height: "8rem",
            objectFit: "contain",
            borderRadius: "50%",
            boxShadow: "0 0 60px hsla(37,70%,50%,0.35), 0 0 120px hsla(37,60%,40%,0.15)",
            animation: "logoIn 0.75s cubic-bezier(0.22, 1, 0.36, 1) both",
          }}
        />
        {/* Pulse ring */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            border: "1px solid hsla(37,70%,58%,0.3)",
            animation: "pulseRing 1.8s ease-out 0.4s infinite",
          }}
        />
      </div>

      <h1
        style={{
          marginTop: "2rem",
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
          color: "hsl(36,30%,95%)",
          letterSpacing: "0.2em",
          animation: "fadeUp 0.6s 0.6s ease-out both",
        }}
      >
        Project Kritagyata
      </h1>
      <p
        style={{
          marginTop: "0.75rem",
          fontFamily: "var(--font-serif)",
          fontStyle: "italic",
          color: "hsl(37,60%,65%)",
          fontSize: "clamp(0.875rem, 3vw, 1.125rem)",
          letterSpacing: "0.2em",
          animation: "fadeIn 0.6s 1s ease-out both",
        }}
      >
        कृतज्ञता — Grateful hearts
      </p>

      <div
        style={{
          position: "absolute",
          bottom: "2.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          animation: "fadeIn 0.5s 1.4s ease-out both",
        }}
      >
        <div
          style={{
            width: "1px",
            height: "2rem",
            backgroundColor: "hsl(37,60%,58%)",
            animation: "pulse 1.2s ease-in-out infinite",
          }}
        />
      </div>

      <style>{`
        @keyframes logoIn {
          from { opacity: 0; transform: scale(0.4); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pulseRing {
          0% { width: 128px; height: 128px; opacity: 0.8; }
          100% { width: 220px; height: 220px; opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { transform: scaleY(0); }
          50% { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}
