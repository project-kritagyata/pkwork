import { useState } from "react";
import DonateModal from "./DonateModal";

export default function FloatingDonate() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <DonateModal onClose={() => setOpen(false)} />}
      <button
        onClick={() => setOpen(true)}
        aria-label="Donate"
        style={{
          position: "fixed",
          bottom: "1.5rem",
          right: "1.25rem",
          zIndex: 150,
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.75rem 1.25rem",
          borderRadius: "9999px",
          boxShadow: "0 4px 20px hsla(37,70%,55%,0.55)",
          fontWeight: 600,
          fontSize: "0.875rem",
          letterSpacing: "0.05em",
          cursor: "pointer",
          background: "linear-gradient(135deg, hsl(37,75%,52%), hsl(37,80%,62%))",
          color: "hsl(345,60%,10%)",
          border: "none",
          transition: "transform 0.2s, box-shadow 0.2s",
          animation: "floatIn 0.5s 1.2s ease-out both",
          userSelect: "none",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.transform = "scale(1.07)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 28px hsla(37,70%,55%,0.7)";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.transform = "scale(1)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px hsla(37,70%,55%,0.55)";
        }}
        onMouseDown={e => (e.currentTarget as HTMLElement).style.transform = "scale(0.95)"}
        onMouseUp={e => (e.currentTarget as HTMLElement).style.transform = "scale(1.07)"}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
        </svg>
        Donate
      </button>

      <style>{`
        @keyframes floatIn {
          from { opacity: 0; transform: scale(0.7) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </>
  );
}
