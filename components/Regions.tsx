"use client";

import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ZoomIn, ZoomOut } from "lucide-react";

const regions = [
    {
        id: "KG-B",
        name: "Batken",
        description: "Famous for its apricots and complex geography",
        coordinates: { x: 15, y: 82 }, // Southwest region
        image: "/batken.jpg",
    },
    {
        id: "KG-C",
        name: "Chuy",
        description: "Northern gateway, home to Bishkek",
        coordinates: { x: 48, y: 20 }, // North-central region
        image: "/bishkek.jpg",
    },
    {
        id: "KG-J",
        name: "Jalal-Abad",
        description: "World's largest natural walnut forest",
        coordinates: { x: 33, y: 48 }, // West-central region
        image: "/djalalabad.jpg",
    },
    {
        id: "KG-N",
        name: "Naryn",
        description: "Land of celestial mountains",
        coordinates: { x: 48, y: 45 }, // Central-east region
        image: "/kelsuu.jpg",
    },
    {
        id: "KG-O",
        name: "Osh",
        description: "Ancient Silk Road city",
        coordinates: { x: 35, y: 70 }, // South-central region
        image: "/osh.jpg",
    },
    {
        id: "KG-T",
        name: "Talas",
        description: "Birthplace of Manas",
        coordinates: { x: 28, y: 25 }, // Northwest region
        image: "/talas.jpg",
    },
    {
        id: "KG-Y",
        name: "Ysyk-Köl",
        description: "The Pearl of Central Asia",
        coordinates: { x: 72, y: 33 }, // Northeast region (lake area)
        image: "/yssyk kul .jpg",
    },
];

export function Regions() {
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
    const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
    const [showDetailedView, setShowDetailedView] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1); // Start unzoomed
    const containerRef = useRef<HTMLDivElement>(null);

    // Mouse position for panning
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Transform mouse position to pan values
    const panX = useTransform(mouseX, [0, 1], [-100, 100]);
    const panY = useTransform(mouseY, [0, 1], [-50, 50]);

    useEffect(() => {
        if (showDetailedView) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                mouseX.set(x);
                mouseY.set(y);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [showDetailedView, mouseX, mouseY]);

    const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.5, 5));
    const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.5, 1));

    return (
        <section className="relative h-screen w-full overflow-hidden bg-zinc-800">
            <AnimatePresence mode="wait">
                {!showDetailedView ? (
                    // Central Asia Map View
                    <motion.div
                        key="central-asia-map"
                        initial={{ opacity: 0, filter: "blur(8px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, filter: "blur(8px)", scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="absolute inset-0 flex items-center justify-center"
                        ref={containerRef}
                    >


                        {/* Interactive Central Asia Map */}
                        <motion.div
                            className="relative w-full h-full flex items-center justify-center"
                            style={{
                                scale: zoomLevel,
                                x: panX,
                                y: panY,
                            }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        >
                            <Image
                                src="/Map_of_Central_Asia.svg"
                                alt="Central Asia Map"
                                width={1200}
                                height={800}
                                className="object-contain opacity-90"
                                priority
                            />
                        </motion.div>

                        {/* Zoom Controls */}
                        <div className="absolute bottom-32 right-8 z-40 flex flex-col gap-3">
                            <button
                                onClick={handleZoomIn}
                                className="group rounded-full border border-white/10 bg-black/20 p-4 backdrop-blur-md transition-all hover:bg-white/10"
                            >
                                <ZoomIn className="h-6 w-6 text-white" />
                            </button>
                            <button
                                onClick={handleZoomOut}
                                className="group rounded-full border border-white/10 bg-black/20 p-4 backdrop-blur-md transition-all hover:bg-white/10"
                            >
                                <ZoomOut className="h-6 w-6 text-white" />
                            </button>
                        </div>

                        {/* Explore Regions Button */}
                        <motion.button
                            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.3 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setShowDetailedView(true)}
                            className="absolute top-8 left-8 z-40 group rounded-full border border-white/10 bg-black/20 px-8 py-4 backdrop-blur-md transition-all hover:bg-white/10"
                        >
                            <span className="text-lg font-serif font-bold text-white">Explore Regions</span>
                        </motion.button>

                    </motion.div>
                ) : (
                    // Detailed Regions View (Existing)
                    <motion.div
                        key="detailed-regions"
                        initial={{ opacity: 0, scale: 1.02, filter: "blur(8px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="absolute inset-0"
                    >
                        {/* Header - Consistent with Sports and Culture */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.1 }}
                            className="absolute top-0 left-0 right-0 pt-24 pb-16 z-30 text-center"
                        >
                            <h2 className="font-serif text-5xl md:text-6xl text-white">
                                Regions of Kyrgyzstan
                            </h2>
                        </motion.div>

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
                                            <div className="mb-8 h-64 w-full rounded-2xl overflow-hidden">
                                                <img
                                                    src={region.image}
                                                    alt={region.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <h2 className="mb-4 font-serif text-5xl text-white">{region.name}</h2>
                                            <p className="text-xl text-zinc-300">{region.description}</p>
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Back to Map Button */}
                        <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.2 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setShowDetailedView(false)}
                            className="absolute top-8 left-8 z-40 group rounded-full border border-white/10 bg-black/20 px-8 py-4 backdrop-blur-md transition-all hover:bg-white/10"
                        >
                            <span className="text-sm font-serif font-bold uppercase tracking-wider text-white">← Back to Map</span>
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
