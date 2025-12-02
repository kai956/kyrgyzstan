"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section
            ref={ref}
            id="home"
            className="relative h-screen w-full overflow-hidden bg-zinc-900"
        >
            {/* Background Image Placeholder - Replace with actual mountain image */}
            <motion.div
                style={{ y: backgroundY }}
                className="absolute inset-0 z-0"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-950 z-10" />
                <div
                    className="h-full w-full bg-cover bg-center opacity-60"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542296332-2e44a996aa0d?q=80&w=2574&auto=format&fit=crop")' }}
                />
            </motion.div>

            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
                <motion.h1
                    style={{ y: textY }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                    className="font-serif text-6xl font-normal text-white md:text-8xl lg:text-9xl"
                >
                    Kyrgyzstan
                </motion.h1>

                <motion.p
                    style={{ y: textY }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                    className="mt-6 max-w-2xl text-lg text-zinc-300 md:text-xl"
                >
                    Journey Through the Land of Celestial Mountains
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2"
                >

                </motion.div>
            </div>
        </section>
    );
}
