import { useRef, useEffect, useState } from "react";
import { Link } from "wouter";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { projects, stats } from "../data/projects";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1600;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function StarParticles() {
  const dots = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 3,
    duration: Math.random() * 2 + 2,
  }));

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {dots.map(d => (
        <div
          key={d.id}
          style={{
            position: "absolute",
            top: d.top,
            left: d.left,
            width: d.size,
            height: d.size,
            borderRadius: "50%",
            backgroundColor: "hsl(37,70%,80%)",
            opacity: 0.4,
            animation: `twinkle ${d.duration}s ${d.delay}s ease-in-out infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.4); }
        }
      `}</style>
    </div>
  );
}

export default function Home() {
  const featured = projects.slice(0, 3);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      {/* Hero */}
      <section
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "6rem 1rem",
          minHeight: "90vh",
          background: "linear-gradient(160deg, hsl(345,60%,14%) 0%, hsl(345,55%,22%) 60%, hsl(37,45%,30%) 100%)",
          overflow: "hidden",
        }}
      >
        <div style={{
          position: "absolute",
          inset: 0,
          opacity: 0.1,
          backgroundImage: "radial-gradient(circle at 20% 50%, hsl(37,70%,58%) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(37,60%,45%) 0%, transparent 40%)"
        }} />
        <StarParticles />

        <div
          style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem", maxWidth: "48rem", margin: "0 auto", animation: "heroIn 0.6s ease-out both" }}
        >
          <img
            src="/logo.png"
            alt="Project Kritagyata"
            style={{
              width: "9rem",
              height: "9rem",
              objectFit: "contain",
              borderRadius: "50%",
              outline: "4px solid hsl(37,70%,58%)",
              outlineOffset: "4px",
              filter: "drop-shadow(0 0 2rem rgba(0,0,0,0.5))",
              animation: "heroItem 0.6s 0s ease-out both",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", animation: "heroItem 0.6s 0.12s ease-out both" }}>
            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 8vw, 4.5rem)", color: "hsl(36,30%,95%)", letterSpacing: "0.05em", lineHeight: 1.1 }}>
              Project Kritagyata
            </h1>
            <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "clamp(1rem, 3vw, 1.5rem)", color: "hsl(37,55%,70%)", letterSpacing: "0.1em" }}>
              कृतज्ञता — Grateful hearts — filled with care
            </p>
          </div>

          <p style={{ color: "hsl(36,20%,78%)", fontSize: "clamp(0.875rem, 2vw, 1.125rem)", lineHeight: 1.7, maxWidth: "36rem", animation: "heroItem 0.6s 0.24s ease-out both" }}>
            We serve communities with heartfelt dedication — empowering lives through education, healthcare, and opportunity. Every act of service is an expression of gratitude.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center", paddingTop: "0.5rem", animation: "heroItem 0.6s 0.36s ease-out both" }}>
            <Link
              href="/our-work"
              style={{
                padding: "0.75rem 2rem",
                borderRadius: "0.375rem",
                backgroundColor: "hsl(37,70%,58%)",
                color: "hsl(345,60%,10%)",
                fontWeight: 600,
                letterSpacing: "0.05em",
                fontSize: "0.875rem",
                boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                transition: "background-color 0.2s",
                textDecoration: "none",
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = "hsl(37,70%,65%)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = "hsl(37,70%,58%)"}
            >
              See Our Work
            </Link>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScorLtLhXrCs-lU5G_D5fGcKuYwMyGMQ_DaUz8sEzSAPVOljQ/viewform?utm_source=ig&utm_medium=social&utm_content=link_in_bio"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "0.75rem 2rem",
                borderRadius: "0.375rem",
                border: "1px solid hsl(36,20%,60%)",
                color: "hsl(36,25%,85%)",
                fontWeight: 500,
                letterSpacing: "0.05em",
                fontSize: "0.875rem",
                transition: "background-color 0.2s",
                textDecoration: "none",
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = "hsl(345,40%,22%)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"}
            >
              Volunteer With Us
            </a>
            <button
              onClick={() => document.getElementById("our-story")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                padding: "0.75rem 2rem",
                borderRadius: "0.375rem",
                border: "1px solid hsl(37,55%,55%)",
                color: "hsl(37,70%,72%)",
                fontWeight: 500,
                letterSpacing: "0.05em",
                fontSize: "0.875rem",
                transition: "background-color 0.2s",
                cursor: "pointer",
                background: "transparent",
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = "hsl(345,40%,22%)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"}
            >
              Our Story ↓
            </button>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section style={{ backgroundColor: "hsl(36,30%,97%)", padding: "4rem 1rem", borderBottom: "1px solid hsl(36,20%,85%)" }}>
        <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.5rem, 4vw, 2.5rem)", textAlign: "center", color: "#333", marginBottom: "3rem" }}>
            Our Impact
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }}>
            {[
              { target: stats.totalProjects, suffix: "", label: "Projects Completed", color: "hsl(345,75%,28%)", icon: "📋" },
              { target: 500, suffix: "+", label: "Lives Touched", color: "hsl(37,70%,50%)", icon: "❤" },
              { target: 70, suffix: "+", label: "Active Volunteers", color: "hsl(345,65%,35%)", icon: "🤝" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", textAlign: "center" }}>
                <span style={{ fontSize: "2rem" }}>{item.icon}</span>
                <span style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 600, color: item.color }}>
                  <AnimatedCounter target={item.target} suffix={item.suffix} />
                </span>
                <span style={{ color: "#6b7280", fontSize: "0.875rem", letterSpacing: "0.05em" }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Quote */}
      <section style={{ padding: "5rem 1rem", backgroundColor: "white" }}>
        <div style={{ maxWidth: "52rem", margin: "0 auto", textAlign: "center" }}>
          <blockquote style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.125rem, 3vw, 1.875rem)", color: "hsl(345,60%,20%)", fontStyle: "italic", lineHeight: 1.6 }}>
            "We believe that gratitude is not just a feeling — it is an act. Every service rendered is a debt repaid to the community that shaped us."
          </blockquote>
          <div style={{ marginTop: "1.5rem", width: "3rem", height: "2px", backgroundColor: "hsl(37,70%,58%)", margin: "1.5rem auto 0" }} />
          <p style={{ marginTop: "1rem", color: "#9ca3af", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            Our Mission
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section id="our-story" style={{ padding: "5rem 1rem", backgroundColor: "hsl(345,60%,14%)" }}>
        <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "3rem", justifyContent: "center" }}>
            <div style={{ flexShrink: 0 }}>
              <img
                src="/founder.png"
                alt="Nishtha Bhatia, Founder of Project Kritagyata"
                style={{
                  width: "14rem",
                  height: "18rem",
                  objectFit: "cover",
                  objectPosition: "top",
                  borderRadius: "1rem",
                  boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
                  border: "4px solid hsl(37,70%,58%)",
                }}
              />
            </div>
            <div style={{ flex: 1, minWidth: "280px", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <p style={{ color: "hsl(37,70%,58%)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                  Our Story
                </p>
                <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.5rem, 4vw, 2.5rem)", color: "hsl(36,30%,95%)", lineHeight: 1.2 }}>
                  Born from a Teenager's Dream
                </h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", color: "hsl(36,15%,72%)", fontSize: "1rem", lineHeight: 1.7 }}>
                <p>
                  Project Kritagyata was launched on{" "}
                  <span style={{ color: "hsl(37,70%,65%)", fontWeight: 500 }}>11th November 2025</span>{" "}
                  by{" "}
                  <span style={{ color: "hsl(36,30%,92%)", fontWeight: 600 }}>Nishtha Bhatia</span>
                  , who was just{" "}
                  <span style={{ color: "hsl(37,70%,65%)", fontWeight: 500 }}>16 years old</span>{" "}
                  when she decided that gratitude should be more than a feeling — it should be a force for change.
                </p>
                <p>
                  Growing up, Nishtha witnessed first-hand the inequalities that communities around her faced — children without access to quality education, families struggling for basic healthcare, and elderly members left without support. Rather than looking away, she chose to act.
                </p>
                <p>
                  With a handful of friends, a notebook full of ideas, and an unshakeable belief in the power of community, she launched Kritagyata — the Sanskrit word for{" "}
                  <em style={{ color: "hsl(36,30%,85%)" }}>gratitude</em>. The vision was simple: every life we have been given is a gift, and the truest way to honour it is to give back.
                </p>
                <p>
                  Today, what began as one young woman's resolve has grown into a movement of{" "}
                  <span style={{ color: "hsl(37,70%,65%)", fontWeight: 500 }}>70+ volunteers</span>
                  , spanning education, healthcare, environment, livelihood, and women empowerment — touching over{" "}
                  <span style={{ color: "hsl(37,70%,65%)", fontWeight: 500 }}>500 lives</span>{" "}
                  and counting.
                </p>
              </div>
              <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.125rem", color: "hsl(37,55%,62%)" }}>
                "You don't need to be older to make a difference. You just need to care enough to start."
                <span style={{ display: "block", marginTop: "0.25rem", fontSize: "0.875rem", fontStyle: "normal", color: "hsl(36,15%,55%)" }}>
                  — Nishtha Bhatia, Founder
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Work */}
      <section style={{ padding: "5rem 1rem", backgroundColor: "hsl(36,25%,96%)" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.5rem, 4vw, 2.25rem)", color: "#333" }}>
              Recent Work
            </h2>
            <Link
              href="/our-work"
              style={{ color: "hsl(345,75%,28%)", fontSize: "0.875rem", fontWeight: 500, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "hsl(345,65%,38%)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "hsl(345,75%,28%)"}
            >
              View All →
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {featured.map(project => (
              <Link
                key={project.id}
                href={`/project/${project.id}`}
                style={{
                  borderRadius: "0.5rem",
                  overflow: "hidden",
                  border: "1px solid hsl(36,20%,85%)",
                  backgroundColor: "white",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "box-shadow 0.2s",
                  display: "block",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.12)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 4px rgba(0,0,0,0.07)"}
              >
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  style={{ width: "100%", height: "12rem", objectFit: "cover" }}
                />
                <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "hsl(37,60%,45%)" }}>
                    {project.category}
                  </span>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", color: "#1f2937" }}>
                    {project.title}
                  </h3>
                  <p style={{ fontSize: "0.875rem", color: "#6b7280", lineHeight: 1.6 }}>
                    {project.description.slice(0, 100)}...
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.5rem", fontSize: "0.75rem", color: "#9ca3af" }}>
                    <span>📍 {project.location}</span>
                    <span>·</span>
                    <span>👥 {project.beneficiaries} beneficiaries</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes heroIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes heroItem {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
