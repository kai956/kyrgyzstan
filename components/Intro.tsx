"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface IntroProps {
    onComplete: () => void;
}

export function Intro({ onComplete }: IntroProps) {
    const [step, setStep] = useState<"ready" | "loading" | "complete">("ready");
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (step === "loading") {
            const interval = setInterval(() => {
                setCount((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setTimeout(onComplete, 500); // Transition directly to Hero
                        return 100;
                    }
                    return prev + 1;
                });
            }, 30);

            return () => clearInterval(interval);
        }
    }, [step, onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950 text-white"
            exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
        >
            <AnimatePresence mode="wait">
                {step === "ready" && (
                    <motion.div
                        key="ready"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                        transition={{ duration: 0.5 }}
                    >
                        <button
                            onClick={() => setStep("loading")}
                            className="group relative overflow-hidden rounded-full border border-white/20 bg-white/5 px-8 py-4 font-serif text-2xl transition-all hover:bg-white/10 hover:scale-105 active:scale-95"
                        >
                            <span className="relative z-10">Are you ready?</span>
                            <div className="absolute inset-0 -z-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        </button>
                    </motion.div>
                )}

                {step === "loading" && (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="flex flex-col items-center"
                    >
                        <motion.div
                            className="font-serif text-9xl font-bold"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {count}%
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mt-4 font-mono text-sm uppercase tracking-[0.5em] text-zinc-500"
                        >
                            Loading Experience
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
