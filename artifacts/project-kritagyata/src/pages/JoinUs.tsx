import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const VOLUNTEER_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScorLtLhXrCs-lU5G_D5fGcKuYwMyGMQ_DaUz8sEzSAPVOljQ/viewform?utm_source=ig&utm_medium=social&utm_content=link_in_bio";

export default function JoinUs() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      {/* Hero */}
      <div
        style={{
          padding: "4rem 1rem",
          textAlign: "center",
          background: "linear-gradient(160deg, hsl(345,60%,14%) 0%, hsl(345,50%,24%) 100%)",
        }}
      >
        <div style={{ maxWidth: "40rem", margin: "0 auto", animation: "fadeUp 0.6s ease-out both" }}>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 6vw, 3rem)", color: "hsl(36,30%,93%)", marginBottom: "1rem" }}>
            Join Us
          </h1>
          <p style={{ color: "hsl(36,15%,70%)", fontSize: "1rem", lineHeight: 1.7 }}>
            Become part of a growing family of changemakers. Your time and skills can transform lives.
          </p>
        </div>
      </div>

      <main style={{ flex: 1, padding: "3rem 1rem", backgroundColor: "hsl(36,25%,96%)" }}>
        <div style={{ maxWidth: "48rem", margin: "0 auto" }}>
          {/* Volunteer card */}
          <div
            style={{
              borderRadius: "0.75rem",
              border: "1px solid hsl(36,20%,88%)",
              backgroundColor: "white",
              padding: "2rem",
              boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
              marginBottom: "2.5rem",
              animation: "fadeUp 0.5s ease-out both",
            }}
          >
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "#1f2937", marginBottom: "0.75rem" }}>
              Volunteer With Us
            </h2>
            <p style={{ color: "#6b7280", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              We welcome passionate individuals who want to make a difference. Fill out our volunteer application form and we will get in touch with you about opportunities that match your skills and interests.
            </p>
            <a
              href={VOLUNTEER_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                padding: "0.75rem 2rem",
                borderRadius: "0.375rem",
                backgroundColor: "hsl(345,75%,28%)",
                color: "white",
                fontWeight: 500,
                fontSize: "0.875rem",
                letterSpacing: "0.05em",
                textDecoration: "none",
                transition: "background-color 0.2s",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = "hsl(345,65%,35%)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = "hsl(345,75%,28%)"}
            >
              Apply to Volunteer →
            </a>
          </div>

          {/* Open roles */}
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "#1f2937", marginBottom: "1.5rem" }}>
            Open Roles
          </h2>
          <p style={{ color: "#6b7280", textAlign: "center", padding: "4rem 0" }}>
            No open roles at this time. Check back soon!
          </p>

          {/* Contact card */}
          <div
            style={{
              marginTop: "4rem",
              borderRadius: "0.75rem",
              border: "1px solid hsl(36,20%,88%)",
              backgroundColor: "white",
              padding: "1.5rem",
              boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
            }}
          >
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", color: "#1f2937", marginBottom: "0.5rem" }}>
              Don't see a fitting role?
            </h3>
            <p style={{ color: "#6b7280", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "1rem" }}>
              We're always open to passionate people. Write to us and we'll find a way for you to contribute.
            </p>
            <a
              href="mailto:volunteer@projectkritagayata.org"
              style={{
                display: "inline-block",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "hsl(345,75%,28%)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "hsl(345,65%,38%)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "hsl(345,75%,28%)"}
            >
              volunteer@projectkritagayata.org →
            </a>
          </div>
        </div>
      </main>

      <Footer />
      <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  );
}
