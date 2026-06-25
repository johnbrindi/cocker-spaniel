/**
 * components/Footer.tsx
 * Site-wide footer with contact details and brand credits.
 */

export default function Footer() {
    return (
        <footer
            style={{
                borderTop: "1px solid var(--slate-border)",
                backgroundColor: "var(--charcoal)",
                color: "var(--white)",
                padding: "3.5rem 1.5rem 2rem",
            }}
        >
            <div
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "2.5rem",
                    marginBottom: "2.5rem",
                }}
            >
                {/* Brand */}
                <div>
                    <div
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "1.2rem",
                            fontWeight: 700,
                            marginBottom: "0.5rem",
                        }}
                    >
                        Kenny Cocker Spaniels
                    </div>
                    <p
                        style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.8rem",
                            lineHeight: 1.7,
                            color: "#9ca3af",
                            maxWidth: "220px",
                        }}
                    >
                        Premium, health-cleared Cocker Spaniel puppies raised with love in a
                        family home environment since 2012.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <div className="section-label" style={{ color: "#9ca3af" }}>
                        Quick Links
                    </div>
                    {[
                        { href: "/", label: "Home" },
                        { href: "/#puppies", label: "Available Puppies" },
                        { href: "/#about", label: "About Us" },
                        { href: "/#contact", label: "Contact" },
                    ].map(({ href, label }) => (
                        <a
                            key={href}
                            href={href}
                            style={{
                                display: "block",
                                fontFamily: "var(--font-sans)",
                                fontSize: "0.8rem",
                                color: "#9ca3af",
                                marginBottom: "0.4rem",
                                transition: "color 0.2s",
                            }}
                            className="hover-white"
                        >
                            {label}
                        </a>
                    ))}
                </div>

                {/* Contact */}
                <div>
                    <div className="section-label" style={{ color: "#9ca3af" }}>
                        Contact
                    </div>
                    <p
                        style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.8rem",
                            color: "#9ca3af",
                            marginBottom: "0.5rem",
                        }}
                    >
                        <strong style={{ color: "var(--white)" }}>Email</strong>
                        <br />
                        <a
                            href="mailto:kennyhoffman541@gmail.com"
                            style={{ color: "#9ca3af", transition: "color 0.2s" }}
                            className="hover-white"
                        >
                            kennyhoffman541@gmail.com
                        </a>
                    </p>
                    <p
                        style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.8rem",
                            color: "#9ca3af",
                        }}
                    >
                        <strong style={{ color: "var(--white)" }}>Phone</strong>
                        <br />
                        <a
                            href="tel:14424166435"
                            style={{ color: "#9ca3af", transition: "color 0.2s" }}
                            className="hover-white"
                        >
                            +1 (442) 416-6435
                        </a>
                    </p>
                </div>
            </div>

            {/* Bottom Bar */}
            <div
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    paddingTop: "1.5rem",
                    borderTop: "1px solid #1f2937",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                }}
            >
                <span
                    style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.72rem",
                        color: "#6b7280",
                        letterSpacing: "0.04em",
                    }}
                >
                    © 2026 Kenny Cocker Spaniels. All rights reserved.
                </span>
                <span
                    style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.72rem",
                        color: "#6b7280",
                    }}
                >
                    AKC Registered Breeder · Health Guaranteed
                </span>
            </div>
        </footer>
    );
}
