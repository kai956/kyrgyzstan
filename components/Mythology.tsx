"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

const myths = [
    {
        id: "manas",
        title: "Epic of Manas",
        subtitle: "The Longest Epic Poem",
        description: "The story of the hero Manas and his descendants' struggles to unite the Kyrgyz people and defend their homeland. It is 20 times longer than Homer's Odyssey.",
        color: "bg-red-900/40",
        image: "https://images.unsplash.com/photo-1596323087332-959952230756?q=80&w=2574&auto=format&fit=crop", // Placeholder
    },
    {
        id: "umay",
        title: "Umay Ene",
        subtitle: "Goddess of Fertility",
        description: "The ancient goddess of fertility, children, and motherhood. She protects newborns and is represented with golden hair flowing like sun rays.",
        color: "bg-yellow-900/40",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2670&auto=format&fit=crop", // Placeholder
    },
    {
        id: "spirits",
        title: "Mountain Spirits",
        subtitle: "Guardians of Nature",
        description: "Every mountain peak, lake, and river has its own spirit (aruakh) that must be respected. Tөө (Mountain spirits) and Suuduk (Water spirits).",
        color: "bg-blue-900/40",
        image: "https://images.unsplash.com/photo-1542296332-2e44a996aa0d?q=80&w=2574&auto=format&fit=crop", // Placeholder
    },
];

export function Mythology() {
    const [activeMyth, setActiveMyth] = useState(0);

    return (
        <section id="mythology" className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4 py-24">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="mb-16 font-serif text-5xl text-white md:text-6xl"
            >
                Mythology & Legends
            </motion.h2>

            <div className="relative flex h-[600px] w-full max-w-6xl items-center justify-center">
                {myths.map((myth, index) => {
                    const isActive = index === activeMyth;
                    const offset = index - activeMyth;

                    return (
                        <motion.div
                            key={myth.id}
                            initial={false}
                            animate={{
                                x: offset * 100,
                                scale: isActive ? 1 : 0.8,
                                zIndex: isActive ? 10 : 0,
                                opacity: Math.abs(offset) > 1 ? 0 : 1 - Math.abs(offset) * 0.5,
                                rotateY: offset * -15,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 20,
                            }}
                            className={cn(
                                "absolute h-[500px] w-[350px] cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 shadow-2xl md:w-[400px]",
                                myth.color
                            )}
                            onClick={() => setActiveMyth(index)}
                        >
                            <div
                                className="h-1/2 w-full bg-cover bg-center"
                                style={{ backgroundImage: `url(${myth.image})` }}
                            />
                            <div className="p-8">
                                <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-white/60">
                                    {myth.subtitle}
                                </span>
                                <h3 className="mb-4 font-serif text-3xl text-white">
                                    {myth.title}
                                </h3>
                                <p className="text-sm leading-relaxed text-zinc-300">
                                    {myth.description}
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <div className="mt-8 flex gap-2">
                {myths.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveMyth(index)}
                        className={cn(
                            "h-2 w-2 rounded-full transition-all",
                            activeMyth === index ? "w-8 bg-white" : "bg-white/20"
                        )}
                    />
                ))}
            </div>
        </section>
    );
}
