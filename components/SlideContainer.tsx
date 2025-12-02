"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SlideContainerProps {
    children: ReactNode;
    isActive: boolean;
    direction: number;
}

export function SlideContainer({ children, isActive, direction }: SlideContainerProps) {
    const variants = {
        enter: {
            opacity: 0,
            scale: 0.95,
            filter: "blur(10px)",
        },
        center: {
            zIndex: 1,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
        },
        exit: {
            zIndex: 0,
            opacity: 0,
            scale: 1.05,
            filter: "blur(10px)",
        },
    };

    return (
        <div className={`absolute inset-0 h-full w-full overflow-hidden ${isActive ? "z-10 pointer-events-auto" : "z-0 pointer-events-none"}`}>
            <motion.div
                variants={variants}
                initial="enter"
                animate={isActive ? "center" : "exit"}
                transition={{
                    opacity: { duration: 0.5, ease: "easeInOut" },
                    scale: { duration: 0.5, ease: "easeInOut" },
                    filter: { duration: 0.5, ease: "easeInOut" },
                }}
                className="h-full w-full overflow-y-auto"
            >
                {children}
            </motion.div>
        </div>
    );
}
