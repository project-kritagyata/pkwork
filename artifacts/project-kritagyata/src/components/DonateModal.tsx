import { useEffect } from "react";

interface DonateModalProps {
  onClose: () => void;
}

export default function DonateModal({ onClose }: DonateModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(4px)",
        padding: "1rem",
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: "relative",
          backgroundColor: "white",
          borderRadius: "1rem",
          boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
          padding: "1.5rem",
          maxWidth: "24rem",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          animation: "modalIn 0.25s ease-out"
        }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "0.75rem",
            right: "0.75rem",
            color: "#9ca3af",
            padding: "0.5rem",
            borderRadius: "0.375rem",
            transition: "color 0.2s",
            cursor: "pointer"
          }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#374151"}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#9ca3af"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
          </svg>
        </button>

        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "hsl(345,60%,14%)", letterSpacing: "0.05em" }}>
          Donate
        </h2>
        <p style={{ fontSize: "0.875rem", color: "#6b7280", textAlign: "center" }}>
          Scan the QR code or use the UPI ID below to support our work.
        </p>
        <img
          src="/qrcode.png"
          alt="Donate QR Code — 8076659789@fam"
          style={{
            width: "16rem",
            height: "16rem",
            objectFit: "contain",
            borderRadius: "0.75rem",
            border: "1px solid #f3f4f6"
          }}
        />
        <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "hsl(345,60%,14%)", letterSpacing: "0.1em" }}>
          8076659789@fam
        </p>
        <p style={{ fontSize: "0.75rem", color: "#9ca3af" }}>UPI · Trio</p>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.88); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
