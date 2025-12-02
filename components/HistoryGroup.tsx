"use client";

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

// Combined data for the timeline
const timelineData = [
    {
        id: "yenisei",
        category: "History",
        title: "Yenisei Kyrgyz",
        period: "6th-9th Century",
        description: "Originating in the Yenisei River valley, establishing the Kyrgyz Khaganate.",
        image: "https://images.unsplash.com/photo-1518182170546-0766ce6fecde?q=80&w=2670&auto=format&fit=crop",
    },
    {
        id: "manas",
        category: "Mythology",
        title: "Epic of Manas",
        period: "Legendary Era",
        description: "The story of the hero Manas uniting the Kyrgyz people. 20 times longer than the Odyssey.",
        image: "https://images.unsplash.com/photo-1596323087332-959952230756?q=80&w=2574&auto=format&fit=crop",
    },
    {
        id: "migration",
        category: "History",
        title: "The Great Migration",
        period: "10th-15th Century",
        description: "Journey from Yenisei to the Tian Shan mountains.",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2670&auto=format&fit=crop",
    },
    {
        id: "mongol",
        category: "History",
        title: "Mongol Era",
        period: "13th-15th Century",
        description: "Part of the Mongol Empire, shaping political organization.",
        image: "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?q=80&w=2574&auto=format&fit=crop",
    },
    {
        id: "russian",
        category: "Politics",
        title: "Russian Empire",
        period: "1876-1917",
        description: "Incorporation into the Russian Empire and changes to nomadic life.",
        image: "https://images.unsplash.com/photo-1580136608260-4eb11f4b64fe?q=80&w=2676&auto=format&fit=crop",
    },
    {
        id: "soviet",
        category: "Politics",
        title: "Soviet Period",
        period: "1917-1991",
        description: "Transformation from nomadic life to industrialization and socialism.",
        image: "https://images.unsplash.com/photo-1596323087332-959952230756?q=80&w=2574&auto=format&fit=crop",
    },
    {
        id: "independence",
        category: "Politics",
        title: "Independence",
        period: "1991-Present",
        description: "Sovereignty, democratic transitions, and modern challenges.",
        image: "https://images.unsplash.com/photo-1627320499039-65239a2636d7?q=80&w=2670&auto=format&fit=crop",
    },
];

export function HistoryGroup() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const lineProgress = useMotionValue(0);
    const smoothProgress = useSpring(lineProgress, { stiffness: 100, damping: 30 });

    // Calculate line height to stop at each circle position
    // Since items are distributed with justify-between, we need to account for spacing
    const lineHeight = useTransform(smoothProgress, (value) => {
        // The circles are evenly distributed, so each segment is 1/(n-1) of the total height
        const segmentHeight = 100 / (timelineData.length - 1);
        const currentSegment = value * (timelineData.length - 1);
        const heightPercentage = currentSegment * segmentHeight;
        return `${Math.min(heightPercentage, 100)}%`;
    });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let isScrolling: NodeJS.Timeout;

        const handleScroll = () => {
            const scrollTop = container.scrollTop;
            const itemHeight = container.clientHeight;
            const lastItemTop = itemHeight * (timelineData.length - 1);

            // Check if scrolled past the last item - loop back to beginning
            if (scrollTop > lastItemTop + 50) {
                container.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                setCurrentIndex(0);
                lineProgress.set(0);
                return;
            }

            // Calculate which item we're at based on scroll position
            const rawIndex = scrollTop / itemHeight;
            const nearestIndex = Math.round(rawIndex);

            // Calculate progress based on the position between circles
            // Map the scroll to stop exactly at each circle (not beyond)
            const clampedIndex = Math.min(rawIndex, timelineData.length - 1);
            const progress = clampedIndex / (timelineData.length - 1);
            lineProgress.set(progress);

            // Change topic immediately when we pass the threshold (more responsive)
            // Use a threshold of 0.3 so it changes when the line is approaching the circle
            const displayIndex = Math.min(Math.max(Math.floor(rawIndex + 0.3), 0), timelineData.length - 1);
            setCurrentIndex(displayIndex);

            // Clear previous timeout
            clearTimeout(isScrolling);

            // Snap to nearest item after scrolling stops
            isScrolling = setTimeout(() => {
                const targetIndex = Math.min(Math.max(nearestIndex, 0), timelineData.length - 1);
                setCurrentIndex(targetIndex);

                // Smooth snap scroll
                container.scrollTo({
                    top: targetIndex * itemHeight,
                    behavior: 'smooth'
                });
            }, 150);
        };

        container.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial call

        return () => {
            container.removeEventListener('scroll', handleScroll);
            clearTimeout(isScrolling);
        };
    }, [lineProgress]);

    const handleItemClick = (index: number) => {
        const container = containerRef.current;
        if (!container) return;

        // Update current index immediately
        setCurrentIndex(index);

        // Scroll to the clicked item
        const itemHeight = container.clientHeight;
        container.scrollTo({
            top: index * itemHeight,
            behavior: 'smooth'
        });

        // Update line progress
        const progress = index / (timelineData.length - 1);
        lineProgress.set(progress);
    };

    const currentItem = timelineData[currentIndex];

    return (
        <section className="flex h-screen w-full bg-zinc-950 text-white overflow-hidden">
            {/* Left Timeline */}
            <div className="flex w-2/5 flex-col p-12 pl-24 relative">
                <h2 className="mb-16 font-serif text-5xl">Timeline</h2>

                <div className="relative flex-1">
                    {/* Timeline Lines Container */}
                    <div
                        className="absolute left-8 w-0.5"
                        style={{
                            top: '3rem', // py-8 (2rem) + top-2 (0.5rem) + half-dot (0.5rem)
                            height: `calc((100% - 4rem) * ${(timelineData.length - 1) / timelineData.length})`
                        }}
                    >
                        {/* Vertical Background Line */}
                        <div className="absolute inset-0 bg-white/10" />

                        {/* Animated Progress Line */}
                        <motion.div
                            className="absolute top-0 w-full bg-white"
                            style={{
                                height: lineHeight,
                            }}
                        />
                    </div>

                    {/* Stationary Timeline Items */}
                    <div
                        className="grid h-full w-full py-8"
                        style={{
                            gridTemplateRows: `repeat(${timelineData.length}, minmax(0, 1fr))`
                        }}
                    >
                        {timelineData.map((item, index) => (
                            <div
                                key={item.id}
                                onClick={() => handleItemClick(index)}
                                className={cn(
                                    "relative flex items-start gap-8 text-left transition-all duration-500 pl-20 cursor-pointer hover:opacity-100",
                                    index === currentIndex ? "opacity-100" : "opacity-40"
                                )}
                            >
                                <motion.div
                                    className={cn(
                                        "absolute left-8 top-2 z-10 h-4 w-4 shrink-0 rounded-full border-2 transition-all -translate-x-[7px]",
                                        index <= currentIndex ? "border-white bg-white" : "border-white/20 bg-zinc-950"
                                    )}
                                    animate={{
                                        scale: index === currentIndex ? 1.5 : 1
                                    }}
                                    transition={{ duration: 0.3 }}
                                />

                                <div className="flex-1">
                                    <span className="block font-mono text-sm uppercase tracking-wider text-zinc-400 mb-2">
                                        {item.period}
                                    </span>
                                    <span className="block font-serif text-3xl leading-tight">
                                        {item.title}
                                    </span>
                                    <span className="block mt-2 text-sm text-zinc-500">
                                        {item.category}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Invisible scroll container for snap effect */}
                <div
                    ref={containerRef}
                    className="absolute left-0 top-0 w-full h-full overflow-y-scroll opacity-0"
                    style={{
                        scrollSnapType: 'y mandatory',
                        WebkitOverflowScrolling: 'touch',
                        pointerEvents: 'auto',
                        cursor: 'default'
                    }}
                >
                    {timelineData.map((_, index) => (
                        <div
                            key={index}
                            className="h-screen w-full"
                            style={{ scrollSnapAlign: 'start' }}
                        />
                    ))}
                    {/* Spacer for loop trigger */}
                    <div className="h-[20vh] w-full" />
                </div>
            </div>

            {/* Right Content */}
            <div className="relative w-3/5 overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentItem.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                    >
                        {/* Background Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-40"
                            style={{ backgroundImage: `url(${currentItem.image})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent" />

                        {/* Content */}
                        <div className="relative flex h-full flex-col justify-center p-24">
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="mb-6 inline-block rounded-full border border-white/20 bg-white/5 px-6 py-2 font-mono text-base uppercase tracking-widest text-zinc-300 w-fit"
                            >
                                {currentItem.category}
                            </motion.span>

                            <motion.h3
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="mb-8 font-serif text-7xl leading-tight"
                            >
                                {currentItem.title}
                            </motion.h3>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="max-w-2xl text-2xl leading-relaxed text-zinc-300"
                            >
                                {currentItem.description}
                            </motion.p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
