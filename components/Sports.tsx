"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const sports = [
    {
        id: "kok-boru",
        title: "Kok-Boru",
        subtitle: "The Grey Wolf",
        description: "Traditional horse game where riders compete to carry a goat carcass to the opponent's goal. A test of strength, horsemanship, and teamwork.",
        image: "https://images.unsplash.com/photo-1596323087332-959952230756?q=80&w=2574&auto=format&fit=crop", // Placeholder
        size: "large",
    },
    {
        id: "er-enish",
        title: "Er Enish",
        subtitle: "Wrestling on Horseback",
        description: "Wrestlers grapple on horseback trying to pull the opponent to the ground.",
        image: "https://images.unsplash.com/photo-1627320499039-65239a2636d7?q=80&w=2670&auto=format&fit=crop", // Placeholder
        size: "small",
    },
    {
        id: "salbuurun",
        title: "Salbuurun",
        subtitle: "Eagle Hunting",
        description: "Ancient tradition of hunting with trained golden eagles and falcons.",
        image: "https://images.unsplash.com/photo-1518182170546-0766ce6fecde?q=80&w=2670&auto=format&fit=crop", // Placeholder
        size: "small",
    },
    {
        id: "kyz-kuumai",
        title: "Kyz Kuumai",
        subtitle: "Kiss the Girl",
        description: "Romantic horse game where a young man chases a young woman to win a kiss.",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2670&auto=format&fit=crop", // Placeholder
        size: "wide",
    },
];

export function Sports() {
    return (
        <section id="sports" className="min-h-screen bg-zinc-900 px-4 py-24 md:px-12">
            <div className="mx-auto max-w-7xl">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mb-16 text-center font-serif text-5xl text-white md:text-6xl"
                >
                    Nomadic Games
                </motion.h2>

                <div className="grid gap-4 md:grid-cols-4 md:grid-rows-2 h-[800px]">
                    {sports.map((sport, index) => (
                        <motion.div
                            key={sport.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className={cn(
                                "group relative overflow-hidden rounded-2xl bg-zinc-800",
                                sport.size === "large" && "md:col-span-2 md:row-span-2",
                                sport.size === "wide" && "md:col-span-2",
                                sport.size === "small" && "md:col-span-1"
                            )}
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url(${sport.image})` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                            <div className="absolute bottom-0 left-0 p-6 md:p-8">
                                <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-zinc-400">
                                    {sport.subtitle}
                                </span>
                                <h3 className={cn(
                                    "mb-2 font-serif text-white",
                                    sport.size === "large" ? "text-4xl" : "text-2xl"
                                )}>
                                    {sport.title}
                                </h3>
                                <p className={cn(
                                    "text-zinc-300",
                                    sport.size === "large" ? "text-lg line-clamp-3" : "text-sm line-clamp-2"
                                )}>
                                    {sport.description}
                                </p>
                            </div>

                            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                                    <div className="ml-1 h-0 w-0 border-b-[10px] border-l-[16px] border-t-[10px] border-b-transparent border-l-white border-t-transparent" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
