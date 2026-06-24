import { useState } from "react";
import { Link } from "wouter";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { projects } from "../data/projects";

const categories = ["All", "Elder Care", "Distribution", "Community Visit"];

export default function OurWork() {
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? projects : projects.filter(p => p.category === filter);

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
            Our Work
          </h1>
          <p style={{ color: "hsl(36,15%,70%)", fontSize: "1rem", lineHeight: 1.7 }}>
            Across communities, across years — a record of service offered with gratitude.
          </p>
        </div>
      </div>

      <main style={{ flex: 1, padding: "3rem 1rem", backgroundColor: "white" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
          {/* Filter tabs */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2rem" }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "9999px",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  border: "1px solid",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  backgroundColor: filter === cat ? "hsl(345,60%,14%)" : "transparent",
                  borderColor: filter === cat ? "hsl(345,60%,14%)" : "hsl(36,20%,80%)",
                  color: filter === cat ? "white" : "#4b5563",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Project grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {filtered.map(project => (
              <div
                key={project.id}
                style={{
                  borderRadius: "0.75rem",
                  overflow: "hidden",
                  border: "1px solid hsl(36,20%,88%)",
                  backgroundColor: "white",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                  transition: "box-shadow 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)"}
              >
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  style={{ width: "100%", height: "13rem", objectFit: "cover" }}
                />
                <div style={{ padding: "1.25rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                    <span style={{
                      padding: "0.25rem 0.625rem",
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
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", color: "#1f2937", marginBottom: "0.5rem" }}>
                    {project.title}
                  </h3>
                  <p style={{ fontSize: "0.875rem", color: "#6b7280", lineHeight: 1.6, marginBottom: "1rem" }}>
                    {project.description.slice(0, 140)}...
                  </p>
                  <div style={{ display: "flex", gap: "1rem", fontSize: "0.75rem", color: "#9ca3af", marginBottom: "1rem" }}>
                    <span>📍 {project.location}</span>
                    <span>👥 {project.beneficiaries} beneficiaries</span>
                  </div>
                  <Link
                    href={`/project/${project.id}`}
                    style={{ color: "hsl(345,75%,28%)", fontSize: "0.875rem", fontWeight: 500, textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "hsl(345,65%,38%)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "hsl(345,75%,28%)"}
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  );
}
