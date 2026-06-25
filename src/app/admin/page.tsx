"use client";

/**
 * app/admin/page.tsx
 * Protected admin dashboard with client-side mock auth.
 * Uses Server Actions (getPets, addPet, deletePet) for CRUD.
 */

import { useState, useEffect } from "react";
import Image from "next/image";
import { getPets, addPet, updatePet, deletePet } from "@/lib/actions";

const ADMIN_PASSWORD = "admin123";

export default function AdminPage() {
    const [authed, setAuthed] = useState(false);
    const [pw, setPw] = useState("");
    const [pwError, setPwError] = useState("");

    /* ── Auth handler ── */
    function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        if (pw === ADMIN_PASSWORD) {
            setAuthed(true);
            setPwError("");
        } else {
            setPwError("Incorrect password. Please try again.");
        }
    }

    if (!authed) {
        return (
            <div
                style={{
                    minHeight: "80vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "2rem",
                    backgroundColor: "#f8f7f4",
                }}
            >
                <div
                    style={{
                        width: "100%",
                        maxWidth: "420px",
                        border: "1px solid var(--slate-border)",
                        backgroundColor: "var(--white)",
                        padding: "3rem",
                    }}
                >
                    <span className="section-label">Admin Access</span>
                    <h1
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "1.8rem",
                            color: "var(--charcoal)",
                            marginBottom: "0.5rem",
                        }}
                    >
                        Dashboard Login
                    </h1>
                    <p
                        style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.85rem",
                            color: "var(--slate-muted)",
                            marginBottom: "2rem",
                        }}
                    >
                        Enter the admin password to manage your listings.
                    </p>
                    <form
                        onSubmit={handleLogin}
                        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
                    >
                        <input
                            type="password"
                            placeholder="Admin Password"
                            value={pw}
                            onChange={(e) => setPw(e.target.value)}
                            autoFocus
                            style={{
                                width: "100%",
                                padding: "0.75rem 1rem",
                                border: pwError
                                    ? "1px solid #dc2626"
                                    : "1px solid var(--slate-border)",
                                fontFamily: "var(--font-sans)",
                                fontSize: "0.875rem",
                                outline: "none",
                                backgroundColor: "var(--white)",
                                color: "var(--charcoal)",
                            }}
                            onFocus={(e) => (e.target.style.borderColor = "var(--cobalt)")}
                            onBlur={(e) =>
                            (e.target.style.borderColor = pwError
                                ? "#dc2626"
                                : "var(--slate-border)")
                            }
                        />
                        {pwError && (
                            <p
                                style={{
                                    fontFamily: "var(--font-sans)",
                                    fontSize: "0.8rem",
                                    color: "#dc2626",
                                    marginTop: "-0.5rem",
                                }}
                            >
                                {pwError}
                            </p>
                        )}
                        <button
                            type="submit"
                            className="btn-primary"
                            style={{ cursor: "pointer" }}
                        >
                            Access Dashboard
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return <AdminDashboard onLogout={() => setAuthed(false)} />;
}

/* ══════════════════════════════════════════
   Admin Dashboard Component
══════════════════════════════════════════ */
function AdminDashboard({ onLogout }: { onLogout: () => void }) {
    const [pets, setPets] = useState<any[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [form, setForm] = useState({
        name: "",
        breed: "",
        age: "",
        gender: "Female",
        color: "",
        status: "Available",
        description: "",
    });
    const [images, setImages] = useState<string[]>([]);
    const [success, setSuccess] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        getPets().then((res) => {
            setPets(res);
            setIsLoading(false);
        });
    }, []);

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) return;

        const files = Array.from(e.target.files);
        if (files.length > 5) {
            alert("Maximum 5 images allowed");
            return;
        }

        const base64Images: string[] = [];

        for (const file of files) {
            const reader = new FileReader();
            base64Images.push(await new Promise((resolve) => {
                reader.onload = (e) => resolve(e.target?.result as string);
                reader.readAsDataURL(file);
            }));
        }

        setImages(base64Images);
    }

    async function handleAdd(e: React.FormEvent) {
        e.preventDefault();

        if (images.length === 0) {
            alert("Please upload at least 1 image");
            return;
        }

        setIsLoading(true);
        try {
            const newPet = await addPet({ ...form, imageUrls: images });
            setPets([newPet, ...pets]);
            resetForm();
            setSuccess(`"${newPet.name}" has been added successfully.`);
            setTimeout(() => setSuccess(""), 4000);
        } catch (err: any) {
            alert(err?.message || "Failed to add listing. Please try again.");
            setIsLoading(false);
        }
    }

    async function handleUpdate(e: React.FormEvent) {
        e.preventDefault();
        if (images.length === 0) {
            alert("Please upload at least 1 image");
            return;
        }
        setIsLoading(true);
        try {
            const updatedPet = await updatePet(editingId!, { ...form, imageUrls: images });
            setPets(pets.map(p => p.id === editingId ? updatedPet : p));
            resetForm();
            setSuccess(`"${updatedPet.name}" has been updated successfully.`);
            setTimeout(() => setSuccess(""), 4000);
        } catch (err: any) {
            alert(err?.message || "Failed to update listing. Please try again.");
            setIsLoading(false);
        }
    }

    function resetForm() {
        setForm({
            name: "",
            breed: "",
            age: "",
            gender: "Female",
            color: "",
            status: "Available",
            description: "",
        });
        setImages([]);
        setShowForm(false);
        setEditingId(null);
        setIsLoading(false);
    }

    async function handleDelete(id: string) {
        if (!confirm("Remove this listing?")) return;
        setIsLoading(true);
        await deletePet(id);
        setPets(pets.filter((p) => p.id !== id));
        setIsLoading(false);
    }

    function startEdit(pet: any) {
        setForm({
            name: pet.name,
            breed: pet.breed,
            age: pet.age,
            gender: pet.gender,
            color: pet.color,
            status: pet.status,
            description: pet.description,
        });
        setImages(pet.imageUrls);
        setEditingId(pet.id);
        setShowForm(true);
    }

    const inputStyle: React.CSSProperties = {
        width: "100%",
        padding: "0.65rem 0.875rem",
        border: "1px solid var(--slate-border)",
        fontFamily: "var(--font-sans)",
        fontSize: "0.85rem",
        outline: "none",
        backgroundColor: "var(--white)",
        color: "var(--charcoal)",
    };

    return (
        <div style={{ minHeight: "80vh", backgroundColor: "#f8f7f4", padding: "2.5rem 1.5rem 5rem" }}>
            <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "2.5rem",
                        paddingBottom: "1.5rem",
                        borderBottom: "1px solid var(--slate-border)",
                        flexWrap: "wrap",
                        gap: "1rem",
                    }}
                >
                    <div>
                        <span className="section-label">Admin Dashboard</span>
                        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: "var(--charcoal)" }}>
                            Manage Listings
                        </h1>
                    </div>
                    <div style={{ display: "flex", gap: "0.75rem" }}>
                        <button
                            onClick={() => { setShowForm(!showForm); setEditingId(null); }}
                            className="btn-primary"
                            style={{ cursor: "pointer" }}
                        >
                            {showForm ? "Cancel" : "+ New Listing"}
                        </button>
                        <button onClick={onLogout} className="btn-outline" style={{ cursor: "pointer" }}>
                            Log Out
                        </button>
                    </div>
                </div>

                {success && (
                    <div style={{ padding: "1rem", backgroundColor: "#ecfdf5", color: "#065f46", border: "1px solid #a7f3d0", marginBottom: "2rem" }}>
                        {success}
                    </div>
                )}

                {showForm && (
                    <div style={{ marginBottom: "3rem", padding: "2rem", border: "1px solid var(--slate-border)", backgroundColor: "var(--white)" }}>
                        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", color: "var(--charcoal)", marginBottom: "1.5rem" }}>
                            {editingId ? "Edit Listing" : "Add New Listing"}
                        </h2>
                        <form onSubmit={editingId ? handleUpdate : handleAdd} style={{ display: "grid", gap: "1.5rem" }}>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                                <input style={inputStyle} placeholder="Puppy Name *" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                                <input style={inputStyle} placeholder="Breed *" required value={form.breed} onChange={(e) => setForm({ ...form, breed: e.target.value })} />
                                <input style={inputStyle} placeholder="Age" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} />
                                <input style={inputStyle} placeholder="Color" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} />
                                <select style={{ ...inputStyle, cursor: "pointer" }} value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
                                    <option value="Female">Female</option>
                                    <option value="Male">Male</option>
                                </select>
                                <select style={{ ...inputStyle, cursor: "pointer" }} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                                    <option value="Available">Available</option>
                                    <option value="Reserved">Reserved</option>
                                    <option value="Sold">Sold</option>
                                </select>
                            </div>
                            <textarea style={{ ...inputStyle, resize: "vertical" }} placeholder="Description *" rows={3} required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />

                            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                <label style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", fontWeight: 600, color: "var(--charcoal)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                                    Images (Max 5)
                                </label>
                                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "flex-start" }}>
                                    {images.length < 5 && (
                                        <label style={{ width: "80px", height: "80px", border: "1px dashed var(--slate-border)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", backgroundColor: "#f9fafb", borderRadius: "4px" }}>
                                            <span style={{ fontSize: "1.5rem", color: "#9ca3af" }}>+</span>
                                            <input type="file" multiple accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
                                        </label>
                                    )}
                                    {images.map((img, idx) => (
                                        <div key={idx} style={{ position: "relative", width: "80px", height: "80px", borderRadius: "4px", overflow: "hidden", border: "1px solid var(--slate-border)" }}>
                                            <Image src={img} alt={`Preview ${idx + 1}`} fill style={{ objectFit: "cover" }} />
                                            <button type="button" onClick={() => setImages(images.filter((_, i) => i !== idx))} style={{ position: "absolute", top: "2px", right: "2px", background: "rgba(0,0,0,0.5)", color: "white", border: "none", borderRadius: "50%", width: "20px", height: "20px", fontSize: "10px", cursor: "pointer" }}>✕</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                                <button type="button" onClick={resetForm} className="btn-outline" style={{ flex: 1, textAlign: "center" }}>Cancel</button>
                                <button type="submit" className="btn-primary" style={{ flex: 1, padding: "0.875rem", textAlign: "center" }} disabled={isLoading}>
                                    {isLoading ? "Saving..." : (editingId ? "Update Listing" : "Upload & Publish")}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {isLoading && pets.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "4rem" }}>Loading...</div>
                ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "2rem" }}>
                        {pets.length === 0 ? (
                            <div style={{ padding: "3rem", textAlign: "center", fontFamily: "var(--font-sans)", fontSize: "0.875rem", color: "var(--slate-muted)", gridColumn: "1 / -1" }}>
                                No listings yet. Click &quot;+ New Listing&quot; to get started.
                            </div>
                        ) : pets.map(pet => (
                            <div key={pet.id} style={{ backgroundColor: "var(--white)", border: "1px solid var(--slate-border)", display: "flex", flexDirection: "column" }}>
                                <div style={{ position: "relative", width: "100%", aspectRatio: "4/3", overflow: "hidden" }}>
                                    <Image src={pet.imageUrls[0]} alt={pet.name} fill style={{ objectFit: "cover" }} />
                                    <span style={{ position: "absolute", top: "12px", right: "12px", padding: "0.25rem 0.75rem", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-sans)", backgroundColor: pet.status === "Available" ? "#d1fae5" : pet.status === "Reserved" ? "#fef3c7" : "#f3f4f6", color: pet.status === "Available" ? "#064e3b" : pet.status === "Reserved" ? "#92400e" : "#374151" }}>
                                        {pet.status}
                                    </span>
                                </div>
                                <div style={{ padding: "1.25rem" }}>
                                    <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", color: "var(--charcoal)", marginBottom: "0.25rem" }}>{pet.name}</h3>
                                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: "var(--slate-muted)", marginBottom: "1rem" }}>{pet.breed}</p>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <button
                                            onClick={() => startEdit(pet)}
                                            className="btn-outline"
                                            style={{ padding: "0.4rem 0.8rem", fontSize: "0.75rem" }}
                                            disabled={isLoading}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(pet.id)}
                                            style={{
                                                background: "none",
                                                border: "1px solid #dc2626",
                                                color: "#dc2626",
                                                fontFamily: "var(--font-sans)",
                                                fontSize: "0.72rem",
                                                fontWeight: 600,
                                                letterSpacing: "0.08em",
                                                textTransform: "uppercase",
                                                padding: "0.4rem 0.8rem",
                                                cursor: "pointer",
                                                transition: "background-color 0.2s",
                                            }}
                                            onMouseEnter={(e) => {
                                                (e.target as HTMLElement).style.backgroundColor = "#dc2626";
                                                (e.target as HTMLElement).style.color = "#fff";
                                            }}
                                            onMouseLeave={(e) => {
                                                (e.target as HTMLElement).style.backgroundColor = "transparent";
                                                (e.target as HTMLElement).style.color = "#dc2626";
                                            }}
                                            disabled={isLoading}
                                        >
                                            {isLoading ? "..." : "Delete"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div >
    );
}
