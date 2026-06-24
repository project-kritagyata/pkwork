import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const galleryImages = [
  { id: 1, src: "/slice_0.png", caption: "Moments of joy and connection" },
  { id: 2, src: "/slice_1.png", caption: "Kritagyata — Together we serve" },
  { id: 3, src: "/slice_2.png", caption: "Hands that care, hearts that give" },
];

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      {/* Hero */}
      <div
        style={{
          padding: "4rem 1rem",
          textAlign: "center",
          background: "linear-gradient(160deg, hsl(345,60%,14%) 0%, hsl(345,50%,24%) 100%)",
          animation: "fadeUp 0.6s ease-out both",
        }}
      >
        <div style={{ maxWidth: "40rem", margin: "0 auto" }}>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 6vw, 3rem)", color: "hsl(36,30%,93%)", marginBottom: "1rem" }}>
            Gallery
          </h1>
          <p style={{ color: "hsl(36,15%,70%)", fontSize: "1rem", lineHeight: 1.7 }}>
            Moments of service, captured in time. Each photograph is a story of humanity.
          </p>
        </div>
      </div>

      <main style={{ flex: 1, padding: "3.5rem 1rem", backgroundColor: "hsl(36,25%,96%)" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "2.5rem" }}>
          {/* Divider label */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ height: "1px", width: "2.5rem", backgroundColor: "hsl(37,70%,55%)" }} />
            <span style={{ fontFamily: "var(--font-serif)", letterSpacing: "0.28em", textTransform: "uppercase", fontSize: "0.875rem", color: "hsl(345,60%,20%)" }}>
              Kritagyata
            </span>
            <div style={{ height: "1px", width: "2.5rem", backgroundColor: "hsl(37,70%,55%)" }} />
          </div>

          {/* Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem", width: "100%" }}>
            {galleryImages.map((img, i) => (
              <button
                key={img.id}
                onClick={() => setActiveIndex(i)}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "0.75rem",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                  aspectRatio: "3/4",
                  cursor: "pointer",
                  border: "none",
                  padding: 0,
                  background: "none",
                  transition: "transform 0.2s",
                  animation: `fadeUp 0.5s ${i * 0.12}s ease-out both`,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1.02)";
                  const overlay = e.currentTarget.querySelector(".overlay") as HTMLElement;
                  if (overlay) overlay.style.backgroundColor = "hsla(345,60%,10%,0.5)";
                  const caption = e.currentTarget.querySelector(".caption") as HTMLElement;
                  if (caption) { caption.style.opacity = "1"; caption.style.transform = "translateY(0)"; }
                  const bar = e.currentTarget.querySelector(".bar") as HTMLElement;
                  if (bar) bar.style.transform = "scaleX(1)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                  const overlay = e.currentTarget.querySelector(".overlay") as HTMLElement;
                  if (overlay) overlay.style.backgroundColor = "hsla(345,60%,10%,0)";
                  const caption = e.currentTarget.querySelector(".caption") as HTMLElement;
                  if (caption) { caption.style.opacity = "0"; caption.style.transform = "translateY(8px)"; }
                  const bar = e.currentTarget.querySelector(".bar") as HTMLElement;
                  if (bar) bar.style.transform = "scaleX(0)";
                }}
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
                />
                <div
                  className="overlay"
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "hsla(345,60%,10%,0)",
                    transition: "background-color 0.3s",
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <p
                    className="caption"
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      color: "white",
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      opacity: 0,
                      transform: "translateY(8px)",
                      transition: "all 0.3s",
                      textAlign: "center",
                    }}
                  >
                    {img.caption}
                  </p>
                </div>
                <div
                  className="bar"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    backgroundColor: "hsl(37,70%,58%)",
                    transform: "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform 0.3s",
                  }}
                />
              </button>
            ))}
          </div>

          <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "hsl(345,40%,35%)", fontSize: "1rem", letterSpacing: "0.05em" }}>
            "Gratitude in action — one drive at a time."
          </p>
        </div>
      </main>

      {/* Lightbox */}
      {activeIndex !== null && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.92)",
            padding: "1rem",
            animation: "fadeIn 0.2s ease-out",
          }}
          onClick={() => setActiveIndex(null)}
        >
          {/* Close */}
          <button
            style={{ position: "absolute", top: "1rem", right: "1rem", color: "rgba(255,255,255,0.7)", padding: "0.5rem", zIndex: 10, cursor: "pointer", background: "none", border: "none" }}
            onClick={() => setActiveIndex(null)}
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
            </svg>
          </button>

          {/* Prev */}
          {activeIndex > 0 && (
            <button
              style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.6)", fontSize: "2rem", padding: "0.5rem 0.75rem", zIndex: 10, cursor: "pointer", background: "none", border: "none" }}
              onClick={e => { e.stopPropagation(); setActiveIndex(activeIndex - 1); }}
              aria-label="Previous"
            >
              ‹
            </button>
          )}

          {/* Next */}
          {activeIndex < galleryImages.length - 1 && (
            <button
              style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.6)", fontSize: "2rem", padding: "0.5rem 0.75rem", zIndex: 10, cursor: "pointer", background: "none", border: "none" }}
              onClick={e => { e.stopPropagation(); setActiveIndex(activeIndex + 1); }}
              aria-label="Next"
            >
              ›
            </button>
          )}

          <div
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", maxWidth: "40rem", width: "100%", animation: "scaleIn 0.25s ease-out" }}
            onClick={e => e.stopPropagation()}
          >
            <img
              src={galleryImages[activeIndex].src}
              alt={galleryImages[activeIndex].caption}
              style={{ maxHeight: "78vh", maxWidth: "100%", objectFit: "contain", borderRadius: "0.75rem", boxShadow: "0 25px 50px rgba(0,0,0,0.6)" }}
            />
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.875rem", textAlign: "center", fontFamily: "var(--font-serif)", fontStyle: "italic" }}>
              {galleryImages[activeIndex].caption}
            </p>
          </div>
        </div>
      )}

      <Footer />
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes scaleIn { from { opacity:0; transform:scale(0.92); } to { opacity:1; transform:scale(1); } }
      `}</style>
    </div>
  );
}
