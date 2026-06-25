"use server";

import { prisma } from "./prisma";
import { pets as seedPets } from "./pets";

export async function getPets() {
    try {
        let allPets = await prisma.pet.findMany({
            orderBy: { createdAt: "desc" },
        });

        // If DB has old mock data (like bella-2026), or is empty, clear and seed with real images
        const hasOldData = allPets.some((p: { slug: string }) => p.slug.includes("bella") || p.slug.includes("rosie"));

        if (allPets.length === 0 || hasOldData) {
            if (hasOldData) {
                await prisma.pet.deleteMany({});
            }
            for (const p of seedPets) {
                await prisma.pet.upsert({
                    where: { slug: p.id },
                    update: {},
                    create: {
                        slug: p.id,
                        name: p.name,
                        breed: p.breed,
                        age: p.age,
                        gender: p.gender,
                        color: p.color,
                        status: p.status,
                        description: p.description,
                        imageUrls: p.imageUrls,
                    },
                });
            }
            allPets = await prisma.pet.findMany({
                orderBy: { createdAt: "desc" },
            });
        }

        return allPets;
    } catch (error) {
        console.error("[getPets] Database error:", error);
        // Graceful fallback: return seed data so page never crashes
        return seedPets.map((p, i) => ({
            id: `seed-${i}`,
            slug: p.id,
            name: p.name,
            breed: p.breed,
            age: p.age,
            gender: p.gender,
            color: p.color,
            status: p.status as "Available" | "Reserved" | "Sold",
            description: p.description,
            imageUrls: p.imageUrls,
            createdAt: new Date(),
            updatedAt: new Date(),
        }));
    }
}

export async function getPetBySlug(slug: string) {
    try {
        return await prisma.pet.findUnique({
            where: { slug },
        });
    } catch (error) {
        console.error("[getPetBySlug] Database error:", error);
        // Fallback to seed data
        const seed = seedPets.find(p => p.id === slug);
        if (!seed) return null;
        return {
            id: `seed-${slug}`,
            slug: seed.id,
            name: seed.name,
            breed: seed.breed,
            age: seed.age,
            gender: seed.gender,
            color: seed.color,
            status: seed.status as "Available" | "Reserved" | "Sold",
            description: seed.description,
            imageUrls: seed.imageUrls,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }
}

export async function addPet(data: any) {
    try {
        return await prisma.pet.create({
            data: {
                ...data,
                slug: data.name.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now(),
            },
        });
    } catch (error) {
        console.error("[addPet] Database error:", error);
        throw new Error("Failed to add pet. Please check your database connection.");
    }
}

export async function updatePet(id: string, data: any) {
    try {
        return await prisma.pet.update({
            where: { id },
            data,
        });
    } catch (error) {
        console.error("[updatePet] Database error:", error);
        throw new Error("Failed to update pet. Please check your database connection.");
    }
}

export async function deletePet(id: string) {
    try {
        await prisma.pet.delete({
            where: { id },
        });
    } catch (error) {
        console.error("[deletePet] Database error:", error);
        throw new Error("Failed to delete pet. Please check your database connection.");
    }
}
