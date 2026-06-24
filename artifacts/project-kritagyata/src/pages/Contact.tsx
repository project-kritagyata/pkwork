import { useState, FormEvent } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type FormState = "idle" | "sent" | "error";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    const mailSubject = subject.trim() || `Message from ${name} via Project Kritagyata`;
    const mailBody = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const mailto = `mailto:projectkritagyata@gmail.com?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

    try {
      window.location.href = mailto;
      setFormState("sent");
    } catch {
      setFormState("error");
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setFormState("idle");
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.75rem 1rem",
    borderRadius: "0.5rem",
    border: "1px solid hsl(36,20%,82%)",
    fontSize: "0.9375rem",
    color: "#1f2937",
    backgroundColor: "white",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    fontFamily: "var(--font-sans)",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    marginBottom: "0.375rem",
    fontSize: "0.8125rem",
    fontWeight: 500,
    color: "#374151",
    letterSpacing: "0.03em",
  };

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
            Contact Us
          </h1>
          <p style={{ color: "hsl(36,15%,70%)", fontSize: "1rem", lineHeight: 1.7 }}>
            Have a question, want to collaborate, or just want to say hello? We'd love to hear from you.
          </p>
        </div>
      </div>

      <main style={{ flex: 1, padding: "3.5rem 1rem", backgroundColor: "hsl(36,25%,96%)" }}>
        <div style={{ maxWidth: "52rem", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2rem" }}>

          {/* Contact info sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "#1f2937", marginBottom: "0.75rem" }}>
                Get in touch
              </h2>
              <p style={{ fontSize: "0.875rem", color: "#6b7280", lineHeight: 1.7 }}>
                Whether you want to volunteer, collaborate, donate, or just share a kind word — we're all ears.
              </p>
            </div>

            {[
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                ),
                label: "Email",
                value: "projectkritagyata@gmail.com",
                href: "mailto:projectkritagyata@gmail.com",
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                ),
                label: "Instagram",
                value: "@projectkritagyata",
                href: "https://www.instagram.com/projectkritagyata",
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.875rem",
                  padding: "1rem 1.25rem",
                  borderRadius: "0.75rem",
                  border: "1px solid hsl(36,20%,88%)",
                  backgroundColor: "white",
                  color: "inherit",
                  textDecoration: "none",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                  transition: "box-shadow 0.2s, border-color 0.2s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                  (e.currentTarget as HTMLElement).style.borderColor = "hsl(37,55%,65%)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 4px rgba(0,0,0,0.05)";
                  (e.currentTarget as HTMLElement).style.borderColor = "hsl(36,20%,88%)";
                }}
              >
                <span style={{ color: "hsl(345,75%,28%)", flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "#9ca3af", marginBottom: "0.125rem" }}>{item.label}</div>
                  <div style={{ fontSize: "0.875rem", fontWeight: 500, color: "#374151" }}>{item.value}</div>
                </div>
              </a>
            ))}

            <div
              style={{
                padding: "1.25rem",
                borderRadius: "0.75rem",
                background: "linear-gradient(135deg, hsl(345,60%,14%), hsl(345,50%,24%))",
                color: "hsl(36,25%,85%)",
                fontSize: "0.875rem",
                lineHeight: 1.7,
              }}
            >
              <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1rem", color: "hsl(37,60%,68%)", marginBottom: "0.5rem" }}>
                "Every connection is a seed of kindness."
              </p>
              <p style={{ color: "hsl(36,15%,62%)" }}>
                We typically respond within 1–3 business days.
              </p>
            </div>
          </div>

          {/* Form card */}
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "1rem",
              border: "1px solid hsl(36,20%,88%)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
              padding: "2rem",
              animation: "fadeUp 0.5s 0.1s ease-out both",
            }}
          >
            {formState === "sent" ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.25rem", minHeight: "20rem", textAlign: "center" }}>
                <div
                  style={{
                    width: "4rem",
                    height: "4rem",
                    borderRadius: "50%",
                    backgroundColor: "hsl(36,30%,95%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    animation: "popIn 0.4s cubic-bezier(0.22,1,0.36,1) both",
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="hsl(345,75%,28%)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.375rem", color: "#1f2937", marginBottom: "0.5rem" }}>
                    Email opened!
                  </h3>
                  <p style={{ color: "#6b7280", fontSize: "0.875rem", lineHeight: 1.6 }}>
                    Your email client should have opened with the message pre-filled. Just hit send — we'll get back to you soon.
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  style={{
                    padding: "0.625rem 1.5rem",
                    borderRadius: "0.375rem",
                    border: "1px solid hsl(36,20%,82%)",
                    fontSize: "0.875rem",
                    color: "#4b5563",
                    cursor: "pointer",
                    background: "white",
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = "hsl(36,25%,96%)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = "white"}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.375rem", color: "#1f2937", marginBottom: "0.25rem" }}>
                  Send a message
                </h2>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={labelStyle} htmlFor="contact-name">Your Name *</label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Priya Sharma"
                      style={inputStyle}
                      onFocus={e => {
                        e.currentTarget.style.borderColor = "hsl(345,75%,28%)";
                        e.currentTarget.style.boxShadow = "0 0 0 3px hsla(345,75%,28%,0.1)";
                      }}
                      onBlur={e => {
                        e.currentTarget.style.borderColor = "hsl(36,20%,82%)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle} htmlFor="contact-email">Your Email *</label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="priya@example.com"
                      style={inputStyle}
                      onFocus={e => {
                        e.currentTarget.style.borderColor = "hsl(345,75%,28%)";
                        e.currentTarget.style.boxShadow = "0 0 0 3px hsla(345,75%,28%,0.1)";
                      }}
                      onBlur={e => {
                        e.currentTarget.style.borderColor = "hsl(36,20%,82%)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={labelStyle} htmlFor="contact-subject">Subject</label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    placeholder="e.g. Volunteer inquiry"
                    style={inputStyle}
                    onFocus={e => {
                      e.currentTarget.style.borderColor = "hsl(345,75%,28%)";
                      e.currentTarget.style.boxShadow = "0 0 0 3px hsla(345,75%,28%,0.1)";
                    }}
                    onBlur={e => {
                      e.currentTarget.style.borderColor = "hsl(36,20%,82%)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>

                <div>
                  <label style={labelStyle} htmlFor="contact-message">Message *</label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Write your message here..."
                    style={{ ...inputStyle, resize: "vertical", minHeight: "7rem" }}
                    onFocus={e => {
                      e.currentTarget.style.borderColor = "hsl(345,75%,28%)";
                      e.currentTarget.style.boxShadow = "0 0 0 3px hsla(345,75%,28%,0.1)";
                    }}
                    onBlur={e => {
                      e.currentTarget.style.borderColor = "hsl(36,20%,82%)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>

                {formState === "error" && (
                  <p style={{ fontSize: "0.875rem", color: "#dc2626", backgroundColor: "#fef2f2", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #fecaca" }}>
                    Something went wrong. Please email us directly at{" "}
                    <a href="mailto:projectkritagyata@gmail.com" style={{ color: "#dc2626", fontWeight: 500 }}>
                      projectkritagyata@gmail.com
                    </a>
                  </p>
                )}

                <button
                  type="submit"
                  style={{
                    padding: "0.75rem 2rem",
                    borderRadius: "0.5rem",
                    backgroundColor: "hsl(345,75%,28%)",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    letterSpacing: "0.05em",
                    cursor: "pointer",
                    border: "none",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    transition: "background-color 0.2s, transform 0.1s",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    alignSelf: "flex-start",
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = "hsl(345,65%,35%)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = "hsl(345,75%,28%)"}
                  onMouseDown={e => (e.currentTarget as HTMLElement).style.transform = "scale(0.97)"}
                  onMouseUp={e => (e.currentTarget as HTMLElement).style.transform = "scale(1)"}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>
                  </svg>
                  Send Message
                </button>

                <p style={{ fontSize: "0.75rem", color: "#9ca3af", lineHeight: 1.5 }}>
                  This will open your email client with the message pre-filled. Your email address is kept private and never stored.
                </p>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes popIn { from { opacity:0; transform:scale(0.6); } to { opacity:1; transform:scale(1); } }
      `}</style>
    </div>
  );
}
