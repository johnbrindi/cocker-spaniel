"use client";

/**
 * components/Navbar.tsx
 * Top navigation with announcement ticker bar, logo, and nav links.
 */

import Link from "next/link";
import { useState } from "react";

const TICKER_ITEMS = [
    "Next litter arriving July 5, 2026",
    "All puppies AKC registered & health cleared",
    "OFA Hip & CAER Eye certifications on all breeding stock",
    "Health guarantee included with every puppy",
    "Free lifetime breeder support",
    "Now accepting deposits for our Summer 2026 litter",
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header style={{ borderBottom: "1px solid var(--slate-border)" }}>
            {/* ── Announcement Ticker ── */}
            <div
                style={{
                    backgroundColor: "var(--charcoal)",
                    color: "var(--white)",
                    overflow: "hidden",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <div className="ticker-track" style={{ gap: "4rem" }}>
                    {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
                        <span
                            key={i}
                            style={{
                                fontFamily: "var(--font-sans)",
                                fontSize: "0.75rem",
                                fontWeight: 500,
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                                paddingRight: "3rem",
                            }}
                        >
                            ✦ {item}
                        </span>
                    ))}
                </div>
            </div>

            {/* ── Main Nav Bar ── */}
            <nav
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    padding: "0 1.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: "72px",
                }}
            >
                {/* Logo */}
                <Link href="/" style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "1.35rem",
                            fontWeight: 700,
                            color: "var(--charcoal)",
                            letterSpacing: "-0.01em",
                            lineHeight: 1,
                        }}
                    >
                        Kenny Cocker Spaniels
                    </span>
                    <span
                        style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.65rem",
                            fontWeight: 500,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: "var(--cobalt)",
                        }}
                    >
                        AKC Registered · Health Cleared
                    </span>
                </Link>

                {/* Desktop Nav Links */}
                <ul
                    style={{
                        display: "flex",
                        gap: "2.5rem",
                        listStyle: "none",
                        alignItems: "center",
                    }}
                    className="desktop-nav"
                >
                    {[
                        { href: "/", label: "Home" },
                        { href: "/#puppies", label: "Puppies" },
                        { href: "/#about", label: "About" },
                        { href: "/#contact", label: "Contact" },
                    ].map(({ href, label }) => (
                        <li key={href}>
                            <Link
                                href={href}
                                style={{
                                    fontFamily: "var(--font-sans)",
                                    fontSize: "0.8rem",
                                    fontWeight: 500,
                                    letterSpacing: "0.06em",
                                    textTransform: "uppercase",
                                    color: "var(--charcoal)",
                                    transition: "color 0.2s",
                                }}
                                onMouseEnter={(e) =>
                                    ((e.target as HTMLElement).style.color = "var(--cobalt)")
                                }
                                onMouseLeave={(e) =>
                                    ((e.target as HTMLElement).style.color = "var(--charcoal)")
                                }
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile Hamburger */}
                <button
                    onClick={() => setMenuOpen((v) => !v)}
                    aria-label="Toggle menu"
                    style={{
                        display: "none",
                        background: "none",
                        border: "1px solid var(--slate-border)",
                        cursor: "pointer",
                        padding: "0.4rem 0.6rem",
                        fontFamily: "var(--font-sans)",
                        fontSize: "1.2rem",
                    }}
                    className="mobile-menu-btn"
                >
                    {menuOpen ? "✕" : "☰"}
                </button>
            </nav>

            {/* Mobile Dropdown */}
            {menuOpen && (
                <div
                    style={{
                        borderTop: "1px solid var(--slate-border)",
                        backgroundColor: "var(--white)",
                        padding: "1rem 1.5rem 1.5rem",
                    }}
                >
                    {[
                        { href: "/", label: "Home" },
                        { href: "/#puppies", label: "Puppies" },
                        { href: "/#about", label: "About" },
                        { href: "/#contact", label: "Contact" },
                    ].map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setMenuOpen(false)}
                            style={{
                                display: "block",
                                fontFamily: "var(--font-sans)",
                                fontSize: "0.9rem",
                                fontWeight: 500,
                                letterSpacing: "0.04em",
                                padding: "0.75rem 0",
                                borderBottom: "1px solid var(--slate-border)",
                                color: "var(--charcoal)",
                            }}
                        >
                            {label}
                        </Link>
                    ))}
                </div>
            )}

            <style jsx global>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
        </header>
    );
}
