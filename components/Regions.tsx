"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

const regions = [
    {
        id: "KG-B",
        name: "Batken",
        description: "Famous for its apricots and complex geography",
        coordinates: { x: 15, y: 82 }, // Southwest region
        image: "https://images.unsplash.com/photo-1518182170546-0766ce6fecde?q=80&w=2670&auto=format&fit=crop",
    },
    {
        id: "KG-C",
        name: "Chuy",
        description: "Northern gateway, home to Bishkek",
        coordinates: { x: 48, y: 20 }, // North-central region
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2670&auto=format&fit=crop",
    },
    {
        id: "KG-J",
        name: "Jalal-Abad",
        description: "World's largest natural walnut forest",
        coordinates: { x: 33, y: 48 }, // West-central region
        image: "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?q=80&w=2574&auto=format&fit=crop",
    },
    {
        id: "KG-N",
        name: "Naryn",
        description: "Land of celestial mountains",
        coordinates: { x: 48, y: 45 }, // Central-east region
        image: "https://images.unsplash.com/photo-1627320499039-65239a2636d7?q=80&w=2670&auto=format&fit=crop",
    },
    {
        id: "KG-O",
        name: "Osh",
        description: "Ancient Silk Road city",
        coordinates: { x: 35, y: 70 }, // South-central region
        image: "https://images.unsplash.com/photo-1596323087332-959952230756?q=80&w=2574&auto=format&fit=crop",
    },
    {
        id: "KG-T",
        name: "Talas",
        description: "Birthplace of Manas",
        coordinates: { x: 28, y: 25 }, // Northwest region
        image: "https://images.unsplash.com/photo-1580136608260-4eb11f4b64fe?q=80&w=2676&auto=format&fit=crop",
    },
    {
        id: "KG-Y",
        name: "Ysyk-Köl",
        description: "The Pearl of Central Asia",
        coordinates: { x: 72, y: 33 }, // Northeast region (lake area)
        image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2671&auto=format&fit=crop",
    },
];

export function Regions() {
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
    const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-zinc-800">
            {/* Header - Consistent with Sports and Culture */}
            <div className="absolute top-0 left-0 right-0 pt-24 pb-16 z-30 text-center pointer-events-none">
                <h2 className="font-serif text-5xl md:text-6xl text-white">
                    Regions of Kyrgyzstan
                </h2>
            </div>

            <div className="absolute inset-0 flex items-center justify-center p-12">
                {/* Map Container - Fixed sizing to prevent zoom issues */}
                <motion.div
                    className="relative w-[1200px] h-[600px] max-w-full"
                    animate={{
                        scale: selectedRegion ? 1.2 : 1,
                        opacity: selectedRegion ? 0.5 : 1,
                        x: selectedRegion ? "-15%" : "0%",
                    }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Actual SVG Map */}
                    <div className="relative h-full w-full">
                        <Image
                            src="/kyrgyzstan.svg"
                            alt="Kyrgyzstan Map"
                            fill
                            className="object-contain opacity-80"
                            priority
                        />

                        {/* Interactive overlay for regions */}
                        <svg
                            viewBox="0 0 792 389"
                            className="absolute inset-0 h-full w-full"
                            preserveAspectRatio="xMidYMid meet"
                        >
                            {regions.map((region) => (
                                <g key={region.id}>
                                    <path
                                        id={region.id}
                                        className={`cursor-pointer transition-all duration-300 ${hoveredRegion === region.id || selectedRegion === region.id
                                            ? "fill-white/20 stroke-white/60"
                                            : "fill-transparent stroke-white/20"
                                            }`}
                                        strokeWidth="2"
                                        onMouseEnter={() => setHoveredRegion(region.id)}
                                        onMouseLeave={() => setHoveredRegion(null)}
                                        onClick={() => setSelectedRegion(region.id)}
                                    />
                                </g>
                            ))}
                        </svg>
                    </div>

                    {/* Region Points */}
                    {regions.map((region) => (
                        <motion.button
                            key={region.id}
                            className="absolute z-20 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)] cursor-pointer"
                            style={{ left: `${region.coordinates.x}%`, top: `${region.coordinates.y}%` }}
                            whileHover={{ scale: 1.5 }}
                            onClick={() => setSelectedRegion(region.id)}
                        >
                            <motion.div
                                className="absolute -inset-4 rounded-full border border-white/30"
                                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </motion.button>
                    ))}
                </motion.div>
            </div>

            {/* Selected Region Detail Overlay */}
            <AnimatePresence>
                {selectedRegion && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: "0%" }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="absolute right-0 top-0 h-full w-full max-w-xl bg-zinc-900 border-l border-white/10 p-12 shadow-2xl z-30"
                    >
                        <button
                            onClick={() => setSelectedRegion(null)}
                            className="absolute right-8 top-8 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors text-2xl leading-none"
                        >
                            ✕
                        </button>

                        {regions.filter(r => r.id === selectedRegion).map(region => (
                            <div key={region.id} className="flex h-full flex-col justify-center">
                                <div
                                    className="mb-8 h-64 w-full rounded-2xl bg-cover bg-center"
                                    style={{ backgroundImage: `url(${region.image})` }}
                                />
                                <h2 className="mb-4 font-serif text-5xl text-white">{region.name}</h2>
                                <p className="text-xl text-zinc-300">{region.description}</p>
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
