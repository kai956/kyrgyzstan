"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

const politicalEras = [
    {
        id: "russian-empire",
        title: "Russian Empire Period",
        years: "1876-1917",
        summary: "Incorporation into the Russian Empire and changes to nomadic life.",
        details: [
            "Treaty annexation of northern Kyrgyzstan (1855)",
            "Complete incorporation by 1876",
            "Andijan Uprising (1898-1899)",
            "Land confiscation for Russian settlers",
        ],
        image: "https://images.unsplash.com/photo-1580136608260-4eb11f4b64fe?q=80&w=2676&auto=format&fit=crop", // Placeholder
    },
    {
        id: "soviet-period",
        title: "Revolution & Soviet Period",
        years: "1917-1991",
        summary: "Transformation from nomadic life to industrialization and socialism.",
        details: [
            "Formation of Kyrgyz ASSR (1926) and SSR (1936)",
            "Forced collectivization and sedentarization",
            "Industrial development and universal literacy",
            "Suppression of religious and traditional practices",
        ],
        image: "https://images.unsplash.com/photo-1596323087332-959952230756?q=80&w=2574&auto=format&fit=crop", // Placeholder
    },
    {
        id: "independence",
        title: "Independence",
        years: "1991-Present",
        summary: "Sovereignty, democratic transitions, and modern challenges.",
        details: [
            "Declaration of Independence (August 31, 1991)",
            "Tulip Revolution (2005)",
            "April Revolution (2010) and October Revolution (2020)",
            "Building a parliamentary democracy",
        ],
        image: "https://images.unsplash.com/photo-1627320499039-65239a2636d7?q=80&w=2670&auto=format&fit=crop", // Placeholder
    },
];

export function Politics() {
    const [activeEra, setActiveEra] = useState<string | null>(null);

    return (
        <section id="politics" className="min-h-screen bg-zinc-950 px-4 py-24 md:px-12">
            <div className="mx-auto max-w-7xl">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mb-16 text-center font-serif text-5xl text-white md:text-6xl"
                >
                    Political Evolution
                </motion.h2>

                <div className="grid gap-8 md:grid-cols-3">
                    {politicalEras.map((era, index) => (
                        <motion.div
                            key={era.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => setActiveEra(activeEra === era.id ? null : era.id)}
                            className={cn(
                                "group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 transition-all duration-500",
                                activeEra === era.id ? "md:col-span-2 md:row-span-2" : "hover:border-white/20"
                            )}
                        >
                            <div className="aspect-[4/3] w-full overflow-hidden">
                                <div
                                    className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                    style={{ backgroundImage: `url(${era.image})` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                            </div>

                            <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
                                <span className="mb-2 block font-mono text-sm text-zinc-400">
                                    {era.years}
                                </span>
                                <h3 className="mb-2 font-serif text-2xl text-white md:text-3xl">
                                    {era.title}
                                </h3>
                                <p className="text-zinc-300">
                                    {era.summary}
                                </p>

                                <AnimatePresence>
                                    {activeEra === era.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="mt-6 border-t border-white/10 pt-6">
                                                <h4 className="mb-4 font-serif text-xl text-white">Key Events</h4>
                                                <ul className="space-y-2">
                                                    {era.details.map((detail, i) => (
                                                        <motion.li
                                                            key={i}
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: i * 0.1 }}
                                                            className="flex items-start gap-2 text-zinc-400"
                                                        >
                                                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/50" />
                                                            {detail}
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
