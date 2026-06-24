import { Link } from "wouter";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { projects } from "../data/projects";

interface Props {
  params: { id: string };
}

export default function ProjectDetail({ params }: Props) {
  const project = projects.find(p => p.id === Number(params.id));

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      {project ? (
        <>
          {/* Header image */}
          <div style={{ width: "100%", height: "clamp(14rem, 40vw, 24rem)", overflow: "hidden" }}>
            <img
              src={project.imageUrl}
              alt={project.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          <main style={{ flex: 1, padding: "3rem 1rem", backgroundColor: "hsl(36,25%,96%)" }}>
            <div style={{ maxWidth: "48rem", margin: "0 auto" }}>
              <Link
                href="/our-work"
                style={{ color: "hsl(345,75%,28%)", fontSize: "0.875rem", fontWeight: 500, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.25rem", marginBottom: "1.5rem", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "hsl(345,65%,38%)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "hsl(345,75%,28%)"}
              >
                ← Back to Our Work
              </Link>

              <div style={{
                backgroundColor: "white",
                borderRadius: "1rem",
                border: "1px solid hsl(36,20%,88%)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}>
                {/* Category & Year */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                  <span style={{
                    padding: "0.25rem 0.75rem",
                    borderRadius: "9999px",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    backgroundColor: "hsl(36,30%,95%)",
                    color: "hsl(345,60%,20%)",
                    border: "1px solid hsl(36,20%,85%)"
                  }}>
                    {project.category}
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "#9ca3af", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    🗓 {project.year}
                  </span>
                </div>

                <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.5rem, 4vw, 2.25rem)", color: "#1f2937" }}>
                  {project.title}
                </h1>

                {/* Meta */}
                <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", fontSize: "0.875rem", color: "#6b7280", paddingBottom: "1rem", borderBottom: "1px solid hsl(36,20%,90%)" }}>
                  <span>📍 {project.location}</span>
                  <span>👥 {project.beneficiaries} beneficiaries</span>
                </div>

                {/* Long description */}
                <div>
                  {project.longDescription.split("\n").map((para, i) => (
                    <p key={i} style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.8, marginBottom: "1rem" }}>
                      {para}
                    </p>
                  ))}
                </div>

                {/* Tags */}
                {project.tags.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
                    <span style={{ fontSize: "0.75rem", color: "#9ca3af" }}>Tags:</span>
                    {project.tags.map(tag => (
                      <span key={tag} style={{
                        padding: "0.2rem 0.625rem",
                        borderRadius: "9999px",
                        fontSize: "0.75rem",
                        border: "1px solid hsl(36,20%,85%)",
                        color: "#6b7280",
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* CTA */}
                <div style={{ paddingTop: "1rem", borderTop: "1px solid hsl(36,20%,90%)" }}>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLScorLtLhXrCs-lU5G_D5fGcKuYwMyGMQ_DaUz8sEzSAPVOljQ/viewform"
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
                    Volunteer for Projects Like This
                  </a>
                </div>
              </div>
            </div>
          </main>
        </>
      ) : (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "6rem 1rem", textAlign: "center" }}>
          <p style={{ color: "#6b7280", marginBottom: "1rem" }}>Project not found.</p>
          <Link href="/our-work" style={{ color: "hsl(345,75%,28%)", fontSize: "0.875rem", textDecoration: "none" }}>
            Return to Our Work
          </Link>
        </div>
      )}

      <Footer />
    </div>
  );
}
