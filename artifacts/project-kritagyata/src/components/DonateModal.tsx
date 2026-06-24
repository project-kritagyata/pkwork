import { useEffect, useState, useRef, FormEvent, ChangeEvent } from "react";

interface DonateModalProps {
  onClose: () => void;
}

type Step = "details" | "payment" | "thanks";

export default function DonateModal({ onClose }: DonateModalProps) {
  const [step, setStep] = useState<Step>("details");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleDetailsSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !amount.trim()) return;
    setStep("payment");
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setScreenshot(file);
    const reader = new FileReader();
    reader.onload = () => setScreenshotPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handlePaymentDone = () => setStep("thanks");

  const presetAmounts = ["51", "101", "251", "501", "1001"];

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

  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = "hsl(345,75%,28%)";
    e.currentTarget.style.boxShadow = "0 0 0 3px hsla(345,75%,28%,0.1)";
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = "hsl(36,20%,82%)";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.72)",
        backdropFilter: "blur(5px)",
        padding: "1rem",
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: "relative",
          backgroundColor: "white",
          borderRadius: "1rem",
          boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
          width: "100%",
          maxWidth: "26rem",
          overflow: "hidden",
          animation: "modalIn 0.25s cubic-bezier(0.22,1,0.36,1)",
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header bar */}
        <div style={{ backgroundColor: "hsl(345,60%,14%)", padding: "1rem 1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="hsl(37,70%,58%)" stroke="hsl(37,70%,58%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
            </svg>
            <span style={{ fontFamily: "var(--font-serif)", color: "hsl(36,30%,93%)", fontSize: "1rem", letterSpacing: "0.05em" }}>
              {step === "details" ? "Make a Donation" : step === "payment" ? "Complete Payment" : "Thank You!"}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{ color: "hsl(36,20%,65%)", background: "none", border: "none", cursor: "pointer", padding: "0.25rem", borderRadius: "0.25rem", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "white"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "hsl(36,20%,65%)"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
            </svg>
          </button>
        </div>

        {/* Step indicator */}
        {step !== "thanks" && (
          <div style={{ display: "flex", alignItems: "center", padding: "0.875rem 1.25rem 0", gap: "0.5rem" }}>
            {[{ id: "details", num: 1, label: "Details" }, { id: "payment", num: 2, label: "Payment" }].map((s, i) => (
              <div key={s.id} style={{ display: "flex", alignItems: "center", gap: "0.5rem", flex: i === 1 ? 1 : "unset" }}>
                {i > 0 && (
                  <div style={{ flex: 1, height: "1px", backgroundColor: step === "payment" ? "hsl(345,60%,14%)" : "hsl(36,20%,85%)" }} />
                )}
                <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                  <div style={{
                    width: "1.375rem",
                    height: "1.375rem",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.6875rem",
                    fontWeight: 600,
                    backgroundColor: (step === s.id || (step === "payment" && s.id === "details")) ? "hsl(345,60%,14%)" : "hsl(36,20%,85%)",
                    color: (step === s.id || (step === "payment" && s.id === "details")) ? "white" : "#9ca3af",
                    flexShrink: 0,
                  }}>
                    {step === "payment" && s.id === "details" ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                    ) : s.num}
                  </div>
                  <span style={{ fontSize: "0.75rem", fontWeight: 500, color: step === s.id ? "hsl(345,60%,14%)" : "#9ca3af" }}>{s.label}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ padding: "1.25rem" }}>
          {/* ── STEP 1: Details ── */}
          {step === "details" && (
            <form onSubmit={handleDetailsSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <p style={{ fontSize: "0.8125rem", color: "#6b7280", lineHeight: 1.6, marginBottom: "0.25rem" }}>
                Your support goes directly to our community drives. Thank you for giving with gratitude.
              </p>

              <div>
                <label style={labelStyle} htmlFor="donate-name">Your Name *</label>
                <input
                  id="donate-name"
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Arjun Mehta"
                  style={inputStyle}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
              </div>

              <div>
                <label style={labelStyle} htmlFor="donate-amount">Donation Amount (₹) *</label>
                {/* Preset buttons */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.625rem" }}>
                  {presetAmounts.map(preset => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setAmount(preset)}
                      style={{
                        padding: "0.375rem 0.75rem",
                        borderRadius: "9999px",
                        border: "1px solid",
                        fontSize: "0.8125rem",
                        fontWeight: 500,
                        cursor: "pointer",
                        transition: "all 0.15s",
                        backgroundColor: amount === preset ? "hsl(345,60%,14%)" : "white",
                        borderColor: amount === preset ? "hsl(345,60%,14%)" : "hsl(36,20%,82%)",
                        color: amount === preset ? "white" : "#4b5563",
                      }}
                    >
                      ₹{preset}
                    </button>
                  ))}
                </div>
                <input
                  id="donate-amount"
                  type="number"
                  required
                  min="1"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  placeholder="Enter custom amount"
                  style={inputStyle}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  backgroundColor: "hsl(345,60%,14%)",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  letterSpacing: "0.04em",
                  cursor: "pointer",
                  border: "none",
                  transition: "background-color 0.2s",
                  marginTop: "0.25rem",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = "hsl(345,50%,22%)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = "hsl(345,60%,14%)"}
              >
                Proceed to Payment →
              </button>
            </form>
          )}

          {/* ── STEP 2: Payment ── */}
          {step === "payment" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.125rem" }}>
              {/* Summary pill */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "hsl(36,30%,97%)",
                borderRadius: "0.5rem",
                padding: "0.625rem 1rem",
                border: "1px solid hsl(36,20%,88%)",
              }}>
                <span style={{ fontSize: "0.8125rem", color: "#6b7280" }}>Donor: <strong style={{ color: "#1f2937" }}>{name}</strong></span>
                <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", color: "hsl(345,75%,28%)", fontWeight: 600 }}>₹{amount}</span>
              </div>

              <p style={{ fontSize: "0.8125rem", color: "#374151", lineHeight: 1.6, textAlign: "center" }}>
                Scan the QR code below with any UPI app and complete the payment of <strong>₹{amount}</strong>.
              </p>

              {/* QR code */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                <img
                  src="/qrcode.png"
                  alt="Donate QR Code"
                  style={{
                    width: "13rem",
                    height: "13rem",
                    objectFit: "contain",
                    borderRadius: "0.75rem",
                    border: "1px solid hsl(36,20%,88%)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                  }}
                />
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "0.8125rem", fontWeight: 600, color: "hsl(345,60%,14%)", letterSpacing: "0.1em" }}>8076659789@fam</p>
                  <p style={{ fontSize: "0.7rem", color: "#9ca3af" }}>UPI · Trio</p>
                </div>
              </div>

              {/* Screenshot upload */}
              <div>
                <p style={{ fontSize: "0.8125rem", fontWeight: 500, color: "#374151", marginBottom: "0.5rem" }}>
                  Upload payment screenshot <span style={{ color: "#9ca3af", fontWeight: 400 }}>(optional but helpful)</span>
                </p>

                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />

                {screenshotPreview ? (
                  <div style={{ position: "relative", borderRadius: "0.5rem", overflow: "hidden", border: "1px solid hsl(36,20%,82%)" }}>
                    <img src={screenshotPreview} alt="Payment screenshot" style={{ width: "100%", maxHeight: "10rem", objectFit: "cover" }} />
                    <button
                      type="button"
                      onClick={() => { setScreenshot(null); setScreenshotPreview(null); if (fileRef.current) fileRef.current.value = ""; }}
                      style={{
                        position: "absolute",
                        top: "0.5rem",
                        right: "0.5rem",
                        backgroundColor: "rgba(0,0,0,0.6)",
                        color: "white",
                        border: "none",
                        borderRadius: "50%",
                        width: "1.5rem",
                        height: "1.5rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        fontSize: "0.75rem",
                      }}
                    >
                      ✕
                    </button>
                    <div style={{ padding: "0.5rem 0.75rem", backgroundColor: "hsl(36,30%,97%)", fontSize: "0.75rem", color: "#6b7280" }}>
                      {screenshot?.name}
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    style={{
                      width: "100%",
                      padding: "0.875rem",
                      borderRadius: "0.5rem",
                      border: "2px dashed hsl(36,20%,82%)",
                      backgroundColor: "hsl(36,25%,98%)",
                      color: "#6b7280",
                      fontSize: "0.875rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      transition: "border-color 0.2s, background-color 0.2s",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = "hsl(345,60%,40%)";
                      (e.currentTarget as HTMLElement).style.backgroundColor = "hsl(36,25%,96%)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = "hsl(36,20%,82%)";
                      (e.currentTarget as HTMLElement).style.backgroundColor = "hsl(36,25%,98%)";
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/>
                      <line x1="12" x2="12" y1="3" y2="15"/>
                    </svg>
                    Click to upload screenshot
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={handlePaymentDone}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  background: "linear-gradient(135deg, hsl(37,75%,52%), hsl(37,80%,62%))",
                  color: "hsl(345,60%,10%)",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  letterSpacing: "0.04em",
                  cursor: "pointer",
                  border: "none",
                  boxShadow: "0 3px 12px hsla(37,70%,50%,0.4)",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "0.9"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
              >
                I've completed the payment ✓
              </button>

              <button
                type="button"
                onClick={() => setStep("details")}
                style={{ background: "none", border: "none", color: "#9ca3af", fontSize: "0.8125rem", cursor: "pointer", textAlign: "center", padding: "0" }}
              >
                ← Go back
              </button>
            </div>
          )}

          {/* ── STEP 3: Thank you ── */}
          {step === "thanks" && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem", padding: "1rem 0", textAlign: "center" }}>
              {/* Animated checkmark */}
              <div style={{ position: "relative" }}>
                <div style={{
                  width: "5rem",
                  height: "5rem",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, hsl(345,60%,14%), hsl(345,50%,24%))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  animation: "popIn 0.5s cubic-bezier(0.22,1,0.36,1) both",
                  boxShadow: "0 0 0 8px hsla(345,60%,14%,0.12)",
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="hsl(37,70%,58%)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                </div>
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.625rem", color: "hsl(345,60%,14%)", marginBottom: "0.375rem" }}>
                  Thank You, {name}!
                </h3>
                <p style={{ color: "#6b7280", fontSize: "0.875rem", lineHeight: 1.7 }}>
                  Your generous donation of{" "}
                  <strong style={{ color: "hsl(345,75%,28%)" }}>₹{amount}</strong>{" "}
                  means the world to us and the communities we serve.
                </p>
              </div>

              {screenshotPreview && (
                <div style={{ borderRadius: "0.5rem", overflow: "hidden", border: "1px solid hsl(36,20%,85%)", width: "100%", maxWidth: "16rem" }}>
                  <img src={screenshotPreview} alt="Payment proof" style={{ width: "100%", maxHeight: "8rem", objectFit: "cover" }} />
                </div>
              )}

              <div style={{
                backgroundColor: "hsl(36,30%,97%)",
                border: "1px solid hsl(36,20%,88%)",
                borderRadius: "0.75rem",
                padding: "1rem",
                width: "100%",
              }}>
                <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "hsl(345,60%,20%)", fontSize: "0.9375rem", lineHeight: 1.6 }}>
                  "Kritagyata — gratitude in action. Your support is the reason we show up."
                </p>
              </div>

              {screenshot && (
                <p style={{ fontSize: "0.75rem", color: "#9ca3af", lineHeight: 1.5 }}>
                  Please send your payment screenshot to{" "}
                  <a href="mailto:projectkritagyata@gmail.com" style={{ color: "hsl(345,75%,28%)", textDecoration: "none" }}>
                    projectkritagyata@gmail.com
                  </a>{" "}
                  for confirmation.
                </p>
              )}

              <button
                onClick={onClose}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  backgroundColor: "hsl(345,60%,14%)",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  cursor: "pointer",
                  border: "none",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = "hsl(345,50%,22%)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = "hsl(345,60%,14%)"}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.88) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
