"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

const sections = [
    {
        id: "cuisine",
        title: "Cuisine",
        items: [
            { name: "Beshbarmak", desc: "National dish: Boiled meat with noodles" },
            { name: "Kumis", desc: "Fermented mare's milk" },
            { name: "Plov", desc: "Central Asian rice pilaf" },
            { name: "Lagman", desc: "Hand-pulled noodles" },
        ],
    },
    {
        id: "music",
        title: "Music & Dance",
        items: [
            { name: "Komuz", desc: "Three-stringed traditional instrument" },
            { name: "Kyl-kyiak", desc: "Two-stringed bow instrument" },
            { name: "Manaschi", desc: "Epic performances" },
            { name: "Kara Jorgo", desc: "Traditional dance" },
        ],
    },
    {
        id: "crafts",
        title: "Crafts",
        items: [
            { name: "Shyrdak", desc: "Felt carpets with traditional patterns" },
            { name: "Ala-kiyiz", desc: "Pressed felt carpets" },
            { name: "Tush kyiz", desc: "Embroidered wall hangings" },
            { name: "Jewelry", desc: "Silver and semi-precious stones" },
        ],
    },
];

export function AdditionalSections() {
    const [activeTab, setActiveTab] = useState("cuisine");

    return (
        <section className="min-h-screen bg-zinc-950 px-4 py-24 md:px-12">
            <div className="mx-auto max-w-4xl">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mb-16 text-center font-serif text-5xl text-white md:text-6xl"
                >
                    Discover More
                </motion.h2>

                <div className="flex justify-center gap-4 mb-12">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => setActiveTab(section.id)}
                            className={cn(
                                "rounded-full px-6 py-2 text-sm font-medium transition-all duration-300",
                                activeTab === section.id
                                    ? "bg-white text-zinc-900"
                                    : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                            )}
                        >
                            {section.title}
                        </button>
                    ))}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    {sections
                        .find((s) => s.id === activeTab)
                        ?.items.map((item, index) => (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="rounded-xl border border-white/10 bg-zinc-900 p-6 hover:bg-zinc-800 transition-colors"
                            >
                                <h3 className="mb-2 font-serif text-2xl text-white">
                                    {item.name}
                                </h3>
                                <p className="text-zinc-400">{item.desc}</p>
                            </motion.div>
                        ))}
                </div>
            </div>
        </section>
    );
}
