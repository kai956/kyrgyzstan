"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const historyEvents = [
    {
        id: 1,
        title: "Yenisei Kyrgyz",
        period: "6th-9th Century",
        description: "Originating in the Yenisei River valley, establishing the Kyrgyz Khaganate.",
        image: "https://images.unsplash.com/photo-1518182170546-0766ce6fecde?q=80&w=2670&auto=format&fit=crop", // Placeholder
    },
    {
        id: 2,
        title: "The Great Migration",
        period: "10th-15th Century",
        description: "Journey from Yenisei to the Tian Shan mountains, adapting to high-altitude life.",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2670&auto=format&fit=crop", // Placeholder
    },
    {
        id: 3,
        title: "Tengrism",
        period: "Ancient Beliefs",
        description: "Harmony with nature, centered on Tengri (Sky God) and Umay (Earth Goddess).",
        image: "https://images.unsplash.com/photo-1500964757637-c85e8a162699?q=80&w=2678&auto=format&fit=crop", // Placeholder
    },
    {
        id: 4,
        title: "Runic Script",
        period: "8th-10th Century",
        description: "Orkhon-Yenisei runic alphabet found on stone monuments throughout Central Asia.",
        image: "https://images.unsplash.com/photo-1596323087332-959952230756?q=80&w=2574&auto=format&fit=crop", // Placeholder
    },
    {
        id: 5,
        title: "The Yurt",
        period: "Nomadic Home",
        description: "Portable dwelling perfectly adapted to the nomadic lifestyle and terrain.",
        image: "https://images.unsplash.com/photo-1627320499039-65239a2636d7?q=80&w=2670&auto=format&fit=crop", // Placeholder
    },
    {
        id: 6,
        title: "Mongol Connection",
        period: "13th-15th Century",
        description: "Part of the Mongol Empire, shaping political organization and culture.",
        image: "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?q=80&w=2574&auto=format&fit=crop", // Placeholder
    },
];

export function History() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

    return (
        <section ref={targetRef} id="history" className="relative h-[300vh] bg-zinc-900">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-4 px-12">
                    <div className="flex h-[80vh] w-[40vw] flex-col justify-center px-12">
                        <h2 className="mb-8 font-serif text-6xl text-white">History</h2>
                        <p className="text-xl text-zinc-400">
                            A timeline of resilience, migration, and cultural evolution.
                        </p>
                        <div className="mt-8 text-sm text-zinc-500">
                            Scroll to explore &rarr;
                        </div>
                    </div>

                    {historyEvents.map((event) => (
                        <div
                            key={event.id}
                            className="group relative h-[80vh] w-[60vw] flex-shrink-0 overflow-hidden rounded-2xl bg-zinc-800"
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                style={{ backgroundImage: `url(${event.image})` }}
                            />
                            <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:bg-black/20" />

                            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-12">
                                <span className="mb-2 block font-mono text-sm uppercase tracking-widest text-zinc-400">
                                    {event.period}
                                </span>
                                <h3 className="mb-4 font-serif text-4xl text-white">
                                    {event.title}
                                </h3>
                                <p className="max-w-xl text-lg text-zinc-300">
                                    {event.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
