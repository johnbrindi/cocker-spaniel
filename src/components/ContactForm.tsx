"use client";

/**
 * components/ContactForm.tsx
 * Client-side contact enquiry form for the homepage.
 */

export default function ContactForm() {
    const inputStyle: React.CSSProperties = {
        width: "100%",
        padding: "0.75rem 1rem",
        backgroundColor: "transparent",
        border: "1px solid #374151",
        color: "var(--white)",
        fontFamily: "var(--font-sans)",
        fontSize: "0.875rem",
        outline: "none",
        transition: "border-color 0.2s",
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you! We will be in touch within 24 hours.");
                (e.target as HTMLFormElement).reset();
            }}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
            <input
                type="text"
                placeholder="Your Name"
                required
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "var(--cobalt)")}
                onBlur={(e) => (e.target.style.borderColor = "#374151")}
            />
            <input
                type="email"
                placeholder="Email Address"
                required
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "var(--cobalt)")}
                onBlur={(e) => (e.target.style.borderColor = "#374151")}
            />
            <input
                type="tel"
                placeholder="Phone Number"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "var(--cobalt)")}
                onBlur={(e) => (e.target.style.borderColor = "#374151")}
            />
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "#9ca3af", marginBottom: "1rem" }}>
                Prefer to chat? WhatsApp us at <a href="https://wa.me/14424166435" target="_blank" rel="noopener noreferrer" style={{ color: "var(--cobalt)", fontWeight: 600 }}>+1 (442) 416-6435</a>
            </p>
            <textarea
                placeholder="Tell us about yourself and which puppy you are interested in..."
                rows={5}
                required
                style={{ ...inputStyle, resize: "vertical" }}
                onFocus={(e) => (e.target.style.borderColor = "var(--cobalt)")}
                onBlur={(e) => (e.target.style.borderColor = "#374151")}
            />
            <button type="submit" className="btn-primary" style={{ cursor: "pointer" }}>
                Send Enquiry
            </button>
        </form>
    );
}
