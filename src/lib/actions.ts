"use server";

import { prisma } from "./prisma";
import { pets as seedPets } from "./pets";

export async function getPets() {
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
            await prisma.pet.create({
                data: {
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
}

export async function getPetBySlug(slug: string) {
    return await prisma.pet.findUnique({
        where: { slug },
    });
}

export async function addPet(data: any) {
    return await prisma.pet.create({
        data: {
            ...data,
            slug: data.name.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now(),
        },
    });
}

export async function updatePet(id: string, data: any) {
    return await prisma.pet.update({
        where: { id },
        data,
    });
}

export async function deletePet(id: string) {
    await prisma.pet.delete({
        where: { id },
    });
}
