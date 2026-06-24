import { Link } from "wouter";

const VOLUNTEER_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScorLtLhXrCs-lU5G_D5fGcKuYwMyGMQ_DaUz8sEzSAPVOljQ/viewform?utm_source=ig&utm_medium=social&utm_content=link_in_bio";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "hsl(345,60%,10%)", color: "hsl(36,20%,75%)", marginTop: "5rem" }}>
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "3rem 1rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2.5rem" }}>
          {/* Brand */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <img
                src="/logo.png"
                alt="Logo"
                style={{
                  height: "2.5rem",
                  width: "2.5rem",
                  objectFit: "contain",
                  borderRadius: "50%",
                  outline: "2px solid hsl(37,70%,58%)",
                  outlineOffset: "2px"
                }}
              />
              <span style={{ fontFamily: "var(--font-serif)", color: "hsl(36,30%,90%)", fontSize: "1.125rem", letterSpacing: "0.05em" }}>
                Project Kritagyata
              </span>
            </div>
            <p style={{ fontSize: "0.875rem", lineHeight: "1.625", color: "hsl(36,15%,65%)" }}>
              Kritagyata — the spirit of gratitude. We serve communities with heartfelt dedication, one act of kindness at a time.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 style={{ fontFamily: "var(--font-serif)", color: "hsl(36,30%,88%)", fontSize: "1rem", marginBottom: "1rem", letterSpacing: "0.05em" }}>
              Explore
            </h4>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {[{ href: "/", label: "Home" }, { href: "/our-work", label: "Our Work" }, { href: "/gallery", label: "Gallery" }, { href: "/contact", label: "Contact" }].map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{ fontSize: "0.875rem", color: "hsl(36,20%,75%)", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "hsl(37,70%,58%)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "hsl(36,20%,75%)"}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={VOLUNTEER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: "0.875rem", color: "hsl(36,20%,75%)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "hsl(37,70%,58%)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "hsl(36,20%,75%)"}
                >
                  Join Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: "var(--font-serif)", color: "hsl(36,30%,88%)", fontSize: "1rem", marginBottom: "1rem", letterSpacing: "0.05em" }}>
              Contact Us
            </h4>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              <li>
                <a
                  href="mailto:projectkritagyata@gmail.com"
                  style={{ fontSize: "0.875rem", color: "hsl(36,20%,75%)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "hsl(37,70%,58%)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "hsl(36,20%,75%)"}
                >
                  projectkritagyata@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/projectkritagyata"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: "0.875rem", color: "hsl(36,20%,75%)", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.375rem", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "hsl(37,70%,58%)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "hsl(36,20%,75%)"}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                  @projectkritagyata
                </a>
              </li>
              <li>
                <a
                  href={VOLUNTEER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: "0.875rem", color: "hsl(36,20%,75%)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "hsl(37,70%,58%)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "hsl(36,20%,75%)"}
                >
                  Volunteer Form
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ marginTop: "2.5rem", paddingTop: "1.5rem", borderTop: "1px solid hsl(345,35%,18%)", textAlign: "center", fontSize: "0.75rem", color: "hsl(36,10%,45%)" }}>
          © {new Date().getFullYear()} Project Kritagyata. All rights reserved. Made with{" "}
          <span style={{ color: "hsl(37,70%,58%)" }}>❤</span> for the community.
        </div>
      </div>
    </footer>
  );
}
