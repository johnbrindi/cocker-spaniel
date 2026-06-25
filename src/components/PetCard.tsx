"use client";

/**
 * components/PetCard.tsx
 * Framer-motion animated card for pet listings grid.
 * Clicking navigates to /pets/[id] for the detail page.
 */

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Pet } from "@/lib/pets";

interface PetCardProps {
    pet: Pet;
}

const statusColors: Record<Pet["status"], string> = {
    Available: "#064e3b",  // dark green text
    Reserved: "#92400e",   // amber text
    Sold: "#374151",        // grey
};

const statusBg: Record<Pet["status"], string> = {
    Available: "#d1fae5",
    Reserved: "#fef3c7",
    Sold: "#f3f4f6",
};

export default function PetCard({ pet }: PetCardProps) {
    return (
        <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            style={{
                border: "1px solid var(--slate-border)",
                backgroundColor: "var(--white)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Link href={`/pets/${pet.slug}`} style={{ display: "block" }}>
                {/* Image */}
                <div style={{ position: "relative", width: "100%", aspectRatio: "4/3", overflow: "hidden" }}>
                    <Image
                        src={pet.imageUrls && pet.imageUrls[0] ? pet.imageUrls[0] : "/hero-dog.jpg"} // Fallback to hero image if missing
                        alt={`${pet.name} – ${pet.breed}`}
                        fill
                        style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        onMouseEnter={(e) =>
                            ((e.target as HTMLElement).style.transform = "scale(1.04)")
                        }
                        onMouseLeave={(e) =>
                            ((e.target as HTMLElement).style.transform = "scale(1)")
                        }
                    />
                    {/* Status Badge */}
                    <span
                        style={{
                            position: "absolute",
                            top: "12px",
                            right: "12px",
                            padding: "0.25rem 0.75rem",
                            fontSize: "0.65rem",
                            fontWeight: 600,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            fontFamily: "var(--font-sans)",
                            backgroundColor: statusBg[pet.status],
                            color: statusColors[pet.status],
                            border: `1px solid ${statusColors[pet.status]}22`,
                        }}
                    >
                        {pet.status}
                    </span>
                </div>

                {/* Body */}
                <div style={{ padding: "1.25rem 1.5rem 1.5rem" }}>
                    <div
                        style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.65rem",
                            fontWeight: 600,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: "var(--cobalt)",
                            marginBottom: "0.4rem",
                        }}
                    >
                        {pet.gender} · {pet.color}
                    </div>

                    <h3
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "1.35rem",
                            fontWeight: 600,
                            color: "var(--charcoal)",
                            marginBottom: "0.25rem",
                        }}
                    >
                        {pet.name}
                    </h3>

                    <p
                        style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.8rem",
                            color: "var(--slate-muted)",
                            marginBottom: "0.75rem",
                        }}
                    >
                        {pet.breed} · {pet.age}
                    </p>

                    <p
                        style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.875rem",
                            color: "#374151",
                            lineHeight: 1.6,
                            marginBottom: "1.25rem",
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                        }}
                    >
                        {pet.description}
                    </p>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            borderTop: "1px solid var(--slate-border)",
                            paddingTop: "1rem",
                        }}
                    >
                        <span
                            style={{
                                fontFamily: "var(--font-sans)",
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                                color: "var(--cobalt)",
                                borderBottom: "1px solid var(--cobalt)",
                                paddingBottom: "1px",
                            }}
                        >
                            View Details →
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
