"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const culturalItems = [
    {
        id: "horses",
        title: "Wings of the Nomad",
        category: "Tradition",
        description: "The horse is central to Kyrgyz identity, essential for the nomadic lifestyle, warfare, and cuisine. 'A man without a horse is like a bird without wings.'",
        image: "https://images.unsplash.com/photo-1551893665-28ab9615fbfa?q=80&w=2574&auto=format&fit=crop",
        color: "bg-blue-900",
    },
    {
        id: "yurt",
        title: "The Grey House",
        category: "Architecture",
        description: "The Boz-Ui (Yurt) is an architectural masterpiece of the nomads. Portable, felt-covered, and circular, it represents the universe and the womb.",
        image: "https://images.unsplash.com/photo-1627320499039-65239a2636d7?q=80&w=2670&auto=format&fit=crop",
        color: "bg-emerald-900",
    },
    {
        id: "kok-boru",
        title: "Kok-Boru",
        category: "Sport",
        description: "The legendary headless goat polo. A test of strength, horsemanship, and strategy, dating back to wolf hunting traditions of the steppe.",
        image: "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?q=80&w=2574&auto=format&fit=crop",
        color: "bg-purple-900",
    },
    {
        id: "shyrdak",
        title: "Felt Artistry",
        category: "Craft",
        description: "Shyrdaks are felt carpets with stitched mosaic patterns. Each symbol tells a story of family, blessings, and the natural world, passed down through generations.",
        image: "https://images.unsplash.com/photo-1596323087332-959952230756?q=80&w=2574&auto=format&fit=crop",
        color: "bg-orange-900",
    },
    {
        id: "manas",
        title: "Epic of Manas",
        category: "Oral History",
        description: "The longest epic poem in the world. It is not just a story, but the spiritual backbone of the nation, preserving history, values, and identity.",
        image: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=2670&auto=format&fit=crop",
        color: "bg-red-900",
    },
    {
        id: "eagle",
        title: "Salburun",
        category: "Hunting",
        description: "The ancient art of hunting with Golden Eagles. It is a partnership between bird and human, built on mutual respect and trust.",
        image: "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?q=80&w=2574&auto=format&fit=crop",
        color: "bg-indigo-900",
    },
    {
        id: "komuz",
        title: "Komuz",
        category: "Music",
        description: "The three-stringed lute that carries the soul of Kyrgyz music. Its melodies echo through valleys, telling stories of love, loss, and the steppe.",
        image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2670&auto=format&fit=crop",
        color: "bg-teal-900",
    },
    {
        id: "kalpak",
        title: "Ak-Kalpak",
        category: "Heritage",
        description: "The white felt hat symbolizing purity and nobility. Its four panels represent the four elements, and its peak points to the eternal sky.",
        image: "https://images.unsplash.com/photo-1580136608260-4eb11f4b64fe?q=80&w=2676&auto=format&fit=crop",
        color: "bg-slate-900",
    },
    {
        id: "beshbarmak",
        title: "Beshbarmak",
        category: "Cuisine",
        description: "Five fingers - the traditional dish eaten with hands. Boiled meat and noodles shared among family, symbolizing unity and hospitality.",
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2574&auto=format&fit=crop",
        color: "bg-amber-900",
    },
    {
        id: "felt-making",
        title: "Kiyiz",
        category: "Craft",
        description: "The ancient art of felt-making, passed from mother to daughter. Wool transformed into warmth, beauty, and shelter through generations of wisdom.",
        image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?q=80&w=2670&auto=format&fit=crop",
        color: "bg-rose-900",
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

                                {/* Center Card (instead of image for now) */}
                                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[45vh] w-[50vw] overflow-hidden rounded-lg ${item.color} flex items-center justify-center`}>
                                    <span className="text-white text-2xl font-serif">{item.title}</span>
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
