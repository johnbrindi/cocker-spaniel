/**
 * app/page.tsx
 * Homepage: Hero → Stats → Puppies Grid → About → Contact
 */

import Image from "next/image";
import Link from "next/link";
import { getPets } from "@/lib/actions";
import PetCard from "@/components/PetCard";
import ContactForm from "@/components/ContactForm";

/* ── Inline section wrapper ── */
const S = ({ id, style, children }: {
    id?: string;
    style?: React.CSSProperties;
    children: React.ReactNode;
}) => (
    <section id={id} style={{ padding: "5rem 1.5rem", ...style }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>{children}</div>
    </section>
);

export default async function HomePage() {
    const pets = await getPets();
    return (
        <>
            {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
            <section
                style={{
                    position: "relative",
                    minHeight: "88vh",
                    display: "flex",
                    alignItems: "center",
                    overflow: "hidden",
                    backgroundColor: "#def0fa",
                }}
            >
                <div
                    style={{
                        position: "relative",
                        zIndex: 1,
                        maxWidth: "1200px",
                        margin: "0 auto",
                        padding: "4rem 1.5rem",
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "4rem",
                        alignItems: "center",
                        width: "100%",
                    }}
                    className="hero-grid"
                >
                    {/* Left — text */}
                    <div>
                        <span className="section-label">Kenny Cocker Spaniels</span>
                        <h1
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
                                fontWeight: 700,
                                color: "var(--charcoal)",
                                lineHeight: 1.1,
                                marginBottom: "1.5rem",
                            }}
                        >
                            Where Every Puppy Is a Masterpiece.
                        </h1>
                        <p
                            style={{
                                fontFamily: "var(--font-sans)",
                                fontSize: "1.05rem",
                                color: "#374151",
                                lineHeight: 1.8,
                                maxWidth: "480px",
                                marginBottom: "2.5rem",
                            }}
                        >
                            We are a small, dedicated family breeder of AKC-registered Cocker
                            Spaniels. Each puppy is health-cleared, raised in our home, and
                            placed with families who share our commitment to loving care.
                        </p>
                        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                            <a href="#puppies" className="btn-primary">
                                View Available Puppies
                            </a>
                            <a href="#contact" className="btn-outline">
                                Get in Touch
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right - image */}
                <div className="hero-image-panel" style={{ position: "relative", width: "100%", height: "100%", minHeight: "500px", overflow: "hidden" }}>
                    <Image
                        src="/hero-dog.jpg"
                        alt="Cocker Spaniel portrait"
                        fill
                        style={{ objectFit: "cover" }}
                        priority
                    />
                </div>
            </section>

            {/* ════════════════════════════════════════
          STATS BAR
      ════════════════════════════════════════ */}
            <section
                style={{
                    borderTop: "1px solid var(--slate-border)",
                    borderBottom: "1px solid var(--slate-border)",
                    padding: "2rem 1.5rem",
                    backgroundColor: "var(--white)",
                }}
            >
                <div
                    style={{
                        maxWidth: "1200px",
                        margin: "0 auto",
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: "1.5rem",
                    }}
                    className="stats-grid"
                >
                    {[
                        { value: "14+", label: "Years Breeding" },
                        { value: "200+", label: "Puppies Placed" },
                        { value: "100%", label: "AKC Registered" },
                        { value: "OFA", label: "Hip & Eye Cleared" },
                    ].map(({ value, label }) => (
                        <div
                            key={label}
                            style={{
                                textAlign: "center",
                                padding: "1rem 0",
                            }}
                        >
                            <div
                                style={{
                                    fontFamily: "var(--font-serif)",
                                    fontSize: "1.8rem",
                                    color: "var(--charcoal)",
                                }}
                            >
                                {value}
                            </div>
                            <div
                                style={{
                                    fontFamily: "var(--font-sans)",
                                    fontSize: "0.72rem",
                                    fontWeight: 600,
                                    letterSpacing: "0.12em",
                                    textTransform: "uppercase",
                                    color: "var(--slate-muted)",
                                    marginTop: "0.25rem",
                                }}
                            >
                                {label}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ════════════════════════════════════════
          PUPPIES GRID
      ════════════════════════════════════════ */}
            <S id="puppies" style={{ backgroundColor: "#f8f7f4" }}>
                <span className="section-label">Currently Available</span>
                <h2
                    style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                        color: "var(--charcoal)",
                        marginBottom: "0.5rem",
                    }}
                >
                    Meet Our Puppies
                </h2>
                <p
                    style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.9rem",
                        color: "var(--slate-muted)",
                        marginBottom: "3rem",
                        maxWidth: "520px",
                    }}
                >
                    Each puppy comes with AKC papers, health records, a starter kit, and
                    lifetime breeder support. Deposits secure your place in the next litter.
                </p>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                        gap: "1.5px",
                        border: "1px solid var(--slate-border)",
                    }}
                >
                    {pets.map((pet: any) => (
                        <PetCard key={pet.id} pet={pet} />
                    ))}
                </div>
            </S>

            {/* ════════════════════════════════════════
          ABOUT
      ════════════════════════════════════════ */}
            <S id="about">
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "4rem",
                        alignItems: "center",
                    }}
                    className="about-grid"
                >
                    <div
                        style={{
                            position: "relative",
                            aspectRatio: "1",
                            border: "1px solid var(--slate-border)",
                            overflow: "hidden",
                        }}
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1601979031925-424e53b6caaa?w=800&q=80"
                            alt="About Kenny"
                            fill
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                    <div>
                        <span className="section-label">Our Story</span>
                        <h2
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                                color: "var(--charcoal)",
                                marginBottom: "1.5rem",
                            }}
                        >
                            Bred with Intention. Raised with Love.
                        </h2>
                        <p
                            style={{
                                fontFamily: "var(--font-sans)",
                                fontSize: "0.9rem",
                                color: "#374151",
                                lineHeight: 1.85,
                                marginBottom: "1rem",
                            }}
                        >
                            Kenny Cocker Spaniels began as a passion project, rooted in
                            the belief that every puppy deserves the best possible start in life.
                            Our breeding programme prioritises temperament, health, and conformation
                            above all else.
                        </p>
                        <p
                            style={{
                                fontFamily: "var(--font-sans)",
                                fontSize: "0.9rem",
                                color: "#374151",
                                lineHeight: 1.85,
                                marginBottom: "2rem",
                            }}
                        >
                            We work with a licensed veterinarian to conduct OFA hip evaluations
                            and CAER eye certifications on all breeding stock. Our puppies are
                            raised underfoot alongside children and other dogs, ensuring they
                            are thoroughly socialised before going to their new homes.
                        </p>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.75rem",
                            }}
                        >
                            {[
                                "AKC Breeder of Merit",
                                "OFA Hip & CAER Eye Certified Parents",
                                "Lifetime Breeder Support Guarantee",
                                "2-Year Health Guarantee on All Puppies",
                            ].map((item) => (
                                <div
                                    key={item}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.75rem",
                                        fontFamily: "var(--font-sans)",
                                        fontSize: "0.85rem",
                                        color: "var(--charcoal)",
                                    }}
                                >
                                    <span style={{ color: "var(--cobalt)", fontWeight: 700 }}>✓</span>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div >
            </S >

            {/* ════════════════════════════════════════
          CONTACT
      ════════════════════════════════════════ */}
            < S
                id="contact"
                style={{
                    backgroundColor: "var(--charcoal)",
                    color: "var(--white)",
                }
                }
            >
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "4rem",
                        alignItems: "start",
                    }}
                    className="contact-grid"
                >
                    {/* Left — info */}
                    <div>
                        <span className="section-label" style={{ color: "#9ca3af" }}>
                            Reach Out
                        </span>
                        <h2
                            style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                                color: "var(--white)",
                                marginBottom: "1.25rem",
                            }}
                        >
                            Reserve Your Puppy Today.
                        </h2>
                        <p
                            style={{
                                fontFamily: "var(--font-sans)",
                                fontSize: "0.9rem",
                                color: "#9ca3af",
                                lineHeight: 1.85,
                                marginBottom: "2.5rem",
                            }}
                        >
                            Use the enquiry form or contact us directly. We respond to all
                            messages within 24 hours. Deposits are $300 and fully deducted
                            from the final purchase price.
                        </p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                            <div>
                                <div
                                    style={{
                                        fontFamily: "var(--font-sans)",
                                        fontSize: "0.65rem",
                                        fontWeight: 600,
                                        letterSpacing: "0.14em",
                                        textTransform: "uppercase",
                                        color: "#6b7280",
                                        marginBottom: "0.25rem",
                                    }}
                                >
                                    Email
                                </div>
                                <a
                                    href="mailto:kennyhoffman541@gmail.com"
                                    style={{
                                        fontFamily: "var(--font-sans)",
                                        fontSize: "1rem",
                                        color: "var(--white)",
                                        transition: "color 0.2s",
                                    }}
                                    className="hover-blue"
                                >
                                    kennyhoffman541@gmail.com
                                </a>
                            </div>
                            <div>
                                <div
                                    style={{
                                        fontFamily: "var(--font-sans)",
                                        fontSize: "0.65rem",
                                        fontWeight: 600,
                                        letterSpacing: "0.14em",
                                        textTransform: "uppercase",
                                        color: "#6b7280",
                                        marginBottom: "0.25rem",
                                    }}
                                >
                                    Phone / Text
                                </div>
                                <a
                                    href="tel:5774022453"
                                    style={{
                                        fontFamily: "var(--font-sans)",
                                        fontSize: "1rem",
                                        color: "var(--white)",
                                        transition: "color 0.2s",
                                    }}
                                    className="hover-blue"
                                >
                                    +1 (442) 416-6435
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right — form */}
                    <ContactForm />
                </div>
            </S >

        </>
    );
}
