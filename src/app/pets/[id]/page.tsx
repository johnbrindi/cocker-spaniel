/**
 * app/pets/[id]/page.tsx
 * Dynamic pet detail page — rendered server-side.
 * Shows image gallery, breed traits table, and an inquiry button.
 */

import { getPets, getPetBySlug } from "@/lib/actions";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    const pets = await getPets();
    return pets.map((p) => ({ id: p.slug }));
}

/* ── Metadata ── */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const pet = await getPetBySlug(id);
    if (!pet) return { title: "Not Found" };
    return {
        title: `${pet.name} — ${pet.breed} | Kenny Cocker Spaniels`,
        description: pet.description,
    };
}

/* ── Page ── */
export default async function PetDetailPage({ params }: PageProps) {
    const { id } = await params;
    const pet = await getPetBySlug(id);
    if (!pet) notFound();

    const statusColor = {
        Available: "#064e3b",
        Reserved: "#92400e",
        Sold: "#374151",
    }[pet.status];

    const statusBg = {
        Available: "#d1fae5",
        Reserved: "#fef3c7",
        Sold: "#f3f4f6",
    }[pet.status];

    return (
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>
            {/* Breadcrumb */}
            <nav
                style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.04em",
                    color: "var(--slate-muted)",
                    marginBottom: "2.5rem",
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "center",
                }}
            >
                <Link
                    href="/"
                    style={{ color: "var(--cobalt)", textDecoration: "underline" }}
                >
                    Home
                </Link>
                <span>›</span>
                <Link
                    href="/#puppies"
                    style={{ color: "var(--cobalt)", textDecoration: "underline" }}
                >
                    Puppies
                </Link>
                <span>›</span>
                <span>{pet.name}</span>
            </nav>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "4rem",
                    alignItems: "start",
                }}
                className="detail-grid"
            >
                {/* ── Left: Image Gallery ── */}
                <div>
                    {/* Main image */}
                    <div
                        style={{
                            position: "relative",
                            width: "100%",
                            aspectRatio: "4/3",
                            overflow: "hidden",
                            border: "1px solid var(--slate-border)",
                            marginBottom: "1px",
                        }}
                    >
                        <Image
                            src={pet.imageUrls[0]}
                            alt={`${pet.name} main`}
                            fill
                            style={{ objectFit: "cover" }}
                            priority
                            sizes="(max-width: 900px) 100vw, 50vw"
                        />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(pet.imageUrls.length, 5)}, 1fr)`, gap: "1px" }}>
                        {pet.imageUrls.map((src, i) => (
                            <div
                                key={i}
                                style={{
                                    position: "relative",
                                    aspectRatio: "1",
                                    overflow: "hidden",
                                    border: "1px solid var(--slate-border)",
                                    opacity: i === 0 ? 1 : 0.6,
                                }}
                            >
                                <Image
                                    src={src}
                                    alt={`${pet.name} ${i + 1}`}
                                    fill
                                    style={{ objectFit: "cover" }}
                                    sizes="150px"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Right: Details ── */}
                <div>
                    {/* Status badge */}
                    <span
                        style={{
                            display: "inline-block",
                            padding: "0.25rem 0.875rem",
                            fontSize: "0.65rem",
                            fontWeight: 600,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            fontFamily: "var(--font-sans)",
                            backgroundColor: statusBg,
                            color: statusColor,
                            border: `1px solid ${statusColor}22`,
                            marginBottom: "1rem",
                        }}
                    >
                        {pet.status}
                    </span>

                    <h1
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(2rem, 4vw, 3rem)",
                            fontWeight: 700,
                            color: "var(--charcoal)",
                            lineHeight: 1.1,
                            marginBottom: "0.5rem",
                        }}
                    >
                        {pet.name}
                    </h1>

                    <p
                        style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.85rem",
                            color: "var(--slate-muted)",
                            letterSpacing: "0.04em",
                            marginBottom: "1.5rem",
                        }}
                    >
                        {pet.breed} · {pet.gender} · {pet.color} · {pet.age}
                    </p>

                    <p
                        style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.95rem",
                            color: "#374151",
                            lineHeight: 1.85,
                            marginBottom: "2rem",
                            borderLeft: "2px solid var(--cobalt)",
                            paddingLeft: "1.25rem",
                        }}
                    >
                        {pet.description}
                    </p>



                    {/* Breed Traits Table */}
                    <div style={{ marginBottom: "2rem" }}>
                        <div
                            style={{
                                fontFamily: "var(--font-sans)",
                                fontSize: "0.65rem",
                                fontWeight: 600,
                                letterSpacing: "0.14em",
                                textTransform: "uppercase",
                                color: "var(--cobalt)",
                                marginBottom: "0.75rem",
                            }}
                        >
                            Breed & Health Details
                        </div>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <tbody>
                                {[
                                    { label: "Breed", value: pet.breed },
                                    { label: "Age", value: pet.age },
                                    { label: "Gender", value: pet.gender },
                                    { label: "Color", value: pet.color }
                                ].map(({ label, value }) => (
                                    <tr
                                        key={label}
                                        style={{ borderBottom: "1px solid var(--slate-border)" }}
                                    >
                                        <td
                                            style={{
                                                fontFamily: "var(--font-sans)",
                                                fontSize: "0.8rem",
                                                fontWeight: 600,
                                                color: "var(--slate-muted)",
                                                padding: "0.6rem 0",
                                                width: "45%",
                                            }}
                                        >
                                            {label}
                                        </td>
                                        <td
                                            style={{
                                                fontFamily: "var(--font-sans)",
                                                fontSize: "0.85rem",
                                                color: "var(--charcoal)",
                                                padding: "0.6rem 0",
                                            }}
                                        >
                                            {value}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* CTA Buttons */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                        <a
                            href={`mailto:kennyhoffman541@gmail.com?subject=Inquiry about ${pet.name} (${pet.breed})&body=Hi Kenny,%0A%0AI am interested in ${pet.name}. Please send me more information.`}
                            className="btn-primary"
                            style={{ textAlign: "center" }}
                        >
                            Enquire About {pet.name}
                        </a>
                        <a
                            href="tel:5774022453"
                            className="btn-outline"
                            style={{ textAlign: "center" }}
                        >
                            Call +1 (442) 416-6435
                        </a>
                    </div>
                </div>
            </div>

            {/* Back link */}
            <div style={{ marginTop: "3rem", borderTop: "1px solid var(--slate-border)", paddingTop: "2rem" }}>
                <Link
                    href="/#puppies"
                    style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        letterSpacing: "0.06em",
                        color: "var(--cobalt)",
                        textTransform: "uppercase",
                    }}
                >
                    ← Back to All Puppies
                </Link>
            </div>


        </div>
    );
}
