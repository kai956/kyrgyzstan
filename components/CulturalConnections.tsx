"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const culturalItems = [
    {
        id: "horses",
        title: "Wings of the Nomad",
        category: "Tradition",
        description: "The horse is central to Kyrgyz identity, essential for the nomadic lifestyle, warfare, and cuisine. 'A man without a horse is like a bird without wings.'",
        image: "/horse.jpg",
        color: "bg-blue-900",
    },
    {
        id: "yurt",
        title: "The Grey House",
        category: "Architecture",
        description: "The Boz-Ui (Yurt) is an architectural masterpiece of the nomads. Portable, felt-covered, and circular, it represents the universe and the womb.",
        image: "/yurt.jpg",
        color: "bg-emerald-900",
    },
    {
        id: "national-clothes-boys",
        title: "Traditional Attire - Boys",
        category: "Heritage",
        description: "Traditional Kyrgyz clothing for boys, reflecting the nomadic heritage and cultural identity passed down through generations.",
        image: "/boi.jpg",
        color: "bg-indigo-900",
    },
    {
        id: "national-clothes-girls",
        title: "Traditional Attire - Girls",
        category: "Heritage",
        description: "Elegant traditional clothing for girls, adorned with intricate patterns and vibrant colors that tell stories of Kyrgyz culture.",
        image: "/girl.jpg",
        color: "bg-rose-900",
    },
    {
        id: "national-clothes-elderly",
        title: "Traditional Attire - Elders",
        category: "Heritage",
        description: "The wisdom keepers wear traditional garments that embody centuries of cultural heritage and the dignity of age.",
        image: "/kyrgyz national clothes old .jpg",
        color: "bg-amber-900",
    },
    {
        id: "instruments",
        title: "Traditional Instruments",
        category: "Music",
        description: "The komuz, kyl-kyiak, and other traditional instruments carry the soul of Kyrgyz music. Their melodies echo through valleys, telling stories of love, loss, and the steppe.",
        image: "/isntruments.png",
        color: "bg-teal-900",
    },
];

export function CulturalConnections() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const isLockedRef = useRef(false); // Use ref to persist across re-renders

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault(); // Always prevent default to avoid page scroll

            // Ignore all scroll input during lockout period
            if (isLockedRef.current) return;

            const delta = e.deltaY || e.deltaX;

            // Only respond to meaningful scroll (not accidental tiny movements)
            if (Math.abs(delta) < 3) return;

            // Determine direction and move exactly ONE card
            if (delta > 0) {
                setCurrentIndex(prev => {
                    if (prev < culturalItems.length - 1) {
                        isLockedRef.current = true;
                        setTimeout(() => { isLockedRef.current = false; }, 1500);
                        return prev + 1;
                    }
                    return prev;
                });
            } else if (delta < 0) {
                setCurrentIndex(prev => {
                    if (prev > 0) {
                        isLockedRef.current = true;
                        setTimeout(() => { isLockedRef.current = false; }, 1500);
                        return prev - 1;
                    }
                    return prev;
                });
            }
        };

        container.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            container.removeEventListener('wheel', handleWheel);
        };
    }, []); // Empty dependency array - only set up once!

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' && currentIndex < culturalItems.length - 1) {
                setCurrentIndex(prev => prev + 1);
            } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
                setCurrentIndex(prev => prev - 1);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex]);

    return (
        <section ref={containerRef} id="culture" className="relative h-screen w-full bg-zinc-950 overflow-hidden">
            {/* Fixed Centered Header - Consistent with Sports */}
            <div className="absolute top-0 left-0 right-0 pt-24 pb-16 z-30 text-center pointer-events-none">
                <h2 className="font-serif text-5xl md:text-6xl text-white">
                    Cultural Connections
                </h2>
            </div>

            {/* Horizontal Scroll Track */}
            <div className="absolute inset-0 flex items-center overflow-hidden">
                <motion.div
                    className="flex h-full"
                    animate={{
                        x: `-${currentIndex * 100}vw`
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 25,
                        mass: 1
                    }}
                >
                    {/* Cultural Items */}
                    {culturalItems.map((item, index) => (
                        <div
                            key={item.id}
                            className="relative h-full w-screen shrink-0 flex items-center justify-center px-[10vw]"
                        >
                            <div className="relative h-[65vh] w-full max-w-[80vw]">
                                {/* Top Left Title */}
                                <div className="absolute top-0 left-0 z-10 max-w-md">
                                    <span className="block font-mono text-sm uppercase tracking-widest text-zinc-500 mb-2">
                                        {item.category}
                                    </span>
                                    <h3 className="font-serif text-5xl text-white leading-tight">
                                        {item.title}
                                    </h3>
                                </div>

                                {/* Center Image - Natural size, no overlay */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[70vh] max-w-[60vw]">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="max-h-[70vh] max-w-[60vw] object-contain rounded-lg"
                                    />
                                </div>

                                {/* Bottom Right Description */}
                                <div className="absolute bottom-0 right-0 max-w-lg text-right z-10">
                                    <p className="text-base leading-relaxed text-zinc-400">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Card Counter */}
            <div className="absolute bottom-32 right-32 z-20">
                <p className="text-white text-sm font-mono">
                    {currentIndex + 1} / {culturalItems.length}
                </p>
            </div>

            {/* Navigation Hint */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 text-center">
                <p className="text-zinc-500 text-sm font-mono">
                    Scroll
                </p>
            </div>
        </section>
    );
}
