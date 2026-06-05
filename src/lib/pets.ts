export interface Pet {
    id: string;
    slug?: string;
    name: string;
    breed: string;
    age: string;
    gender: "Male" | "Female";
    color: string;
    status: "Available" | "Reserved" | "Sold";
    description: string;
    imageUrls: string[];
}

export const pets: Pet[] = [
    {
        id: "litter-chocolate-bruno",
        slug: "litter-chocolate-bruno",
        name: "Bruno",
        breed: "Cocker Spaniel",
        age: "8 Weeks",
        gender: "Male",
        color: "Chocolate Particolor",
        status: "Available",
        description: "Playful and energetic chocolate particolor male. A beautiful puppy with a sweet temperament, champion bloodlines, and a love for cuddles. Perfect family companion.",
        imageUrls: [
            "/new-breed/image1.png",
            "/new-breed/image2.png",
            "/new-breed/image3.png",
            "/new-breed/image4.png"
        ],
    }
];

export function getPetById(id: string): Pet | undefined {
    return pets.find((p) => p.id === id);
}
