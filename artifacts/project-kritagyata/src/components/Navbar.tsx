import { useState } from "react";
import { Link, useLocation } from "wouter";
import DonateModal from "./DonateModal";

const INSTAGRAM_URL =
  "https://www.instagram.com/projectkritagyata?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";
const VOLUNTEER_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScorLtLhXrCs-lU5G_D5fGcKuYwMyGMQ_DaUz8sEzSAPVOljQ/viewform?utm_source=ig&utm_medium=social&utm_content=link_in_bio";

const navLinks = [
  { href: "/", label: "Home", external: false },
  { href: "/our-work", label: "Our Work", external: false },
  { href: "/gallery", label: "Gallery", external: false },
  { href: VOLUNTEER_URL, label: "Join Us", external: true },
];

export default function Navbar() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [donateOpen, setDonateOpen] = useState(false);

  return (
    <>
      {donateOpen && <DonateModal onClose={() => setDonateOpen(false)} />}
      <nav style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: "hsl(345,60%,14%)",
        boxShadow: "0 4px 16px rgba(0,0,0,0.3)"
      }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "4rem" }}>
            {/* Logo */}
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
              <img
                src="/logo.png"
                alt="Project Kritagyata Logo"
                style={{
                  height: "2.5rem",
                  width: "2.5rem",
                  objectFit: "contain",
                  borderRadius: "50%",
                  outline: "2px solid hsl(37,70%,58%)",
                  outlineOffset: "2px"
                }}
              />
              <span style={{ fontFamily: "var(--font-serif)", color: "hsl(36,30%,92%)", fontSize: "1.125rem", letterSpacing: "0.05em" }}>
                Project Kritagyata
              </span>
            </Link>

            {/* Desktop Nav */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }} className="desktop-nav">
              {/* Instagram */}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{
                  padding: "0.5rem",
                  borderRadius: "0.375rem",
                  color: "hsl(36,25%,80%)",
                  display: "flex",
                  alignItems: "center",
                  marginRight: "0.25rem",
                  transition: "all 0.2s"
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color = "hsl(36,30%,97%)";
                  (e.currentTarget as HTMLElement).style.backgroundColor = "hsl(345,40%,22%)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color = "hsl(36,25%,80%)";
                  (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>

              {navLinks.map(link => {
                const isActive = !link.external && (location === link.href || (link.href !== "/" && location.startsWith(link.href)));
                const baseStyle: React.CSSProperties = {
                  padding: "0.5rem 1rem",
                  borderRadius: "0.375rem",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                  transition: "all 0.2s",
                  display: "block",
                  textDecoration: "none",
                };
                const activeStyle: React.CSSProperties = {
                  ...baseStyle,
                  backgroundColor: "hsl(37,70%,58%)",
                  color: "hsl(345,60%,10%)",
                };
                const inactiveStyle: React.CSSProperties = {
                  ...baseStyle,
                  color: "hsl(36,25%,80%)",
                };

                if (link.external) {
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={inactiveStyle}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.color = "hsl(36,30%,97%)";
                        (e.currentTarget as HTMLElement).style.backgroundColor = "hsl(345,40%,22%)";
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.color = "hsl(36,25%,80%)";
                        (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                      }}
                    >
                      {link.label}
                    </a>
                  );
                }
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={isActive ? activeStyle : inactiveStyle}
                    onMouseEnter={e => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.color = "hsl(36,30%,97%)";
                        (e.currentTarget as HTMLElement).style.backgroundColor = "hsl(345,40%,22%)";
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.color = "hsl(36,25%,80%)";
                        (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                      }
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {/* Donate button */}
              <button
                onClick={() => setDonateOpen(true)}
                style={{
                  marginLeft: "0.25rem",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.375rem",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  backgroundColor: "hsl(37,70%,58%)",
                  color: "hsl(345,60%,10%)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  transition: "all 0.2s",
                  cursor: "pointer"
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = "hsl(37,70%,65%)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = "hsl(37,70%,58%)"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                </svg>
                Donate
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              style={{ color: "hsl(36,25%,80%)", padding: "0.5rem", borderRadius: "0.375rem" }}
            >
              {mobileOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div style={{
            backgroundColor: "hsl(345,55%,11%)",
            borderTop: "1px solid hsl(345,35%,22%)",
            padding: "0.75rem 1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem"
          }}>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              style={{
                padding: "0.625rem 1rem",
                borderRadius: "0.375rem",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "hsl(36,25%,80%)",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "all 0.2s"
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
              Instagram
            </a>
            {navLinks.map(link => {
              const isActive = !link.external && (location === link.href || (link.href !== "/" && location.startsWith(link.href)));
              const style: React.CSSProperties = {
                padding: "0.625rem 1rem",
                borderRadius: "0.375rem",
                fontSize: "0.875rem",
                fontWeight: 500,
                letterSpacing: "0.05em",
                transition: "all 0.2s",
                display: "block",
                textDecoration: "none",
                backgroundColor: isActive ? "hsl(37,70%,58%)" : "transparent",
                color: isActive ? "hsl(345,60%,10%)" : "hsl(36,25%,80%)",
              };
              if (link.external) {
                return (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)} style={style}>
                    {link.label}
                  </a>
                );
              }
              return (
                <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} style={style}>
                  {link.label}
                </Link>
              );
            })}
            <button
              onClick={() => { setDonateOpen(true); setMobileOpen(false); }}
              style={{
                padding: "0.625rem 1rem",
                borderRadius: "0.375rem",
                fontSize: "0.875rem",
                fontWeight: 600,
                backgroundColor: "hsl(37,70%,58%)",
                color: "hsl(345,60%,10%)",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginTop: "0.25rem"
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              </svg>
              Donate
            </button>
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (min-width: 769px) {
          .desktop-nav { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </>
  );
}
