"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const navItems = [
    { name: "Home", id: "home" },
    { name: "History", id: "history" },
    { name: "Politics", id: "politics" },
    { name: "Mythology", id: "mythology" },
    { name: "Regions", id: "regions" },
    { name: "Culture", id: "culture" },
    { name: "Sports", id: "sports" },
];

export function Navigation() {
    const [activeSection, setActiveSection] = useState("home");
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setActiveSection(id);
        }
    };

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 flex justify-center p-6 transition-all duration-300",
                scrolled ? "py-4" : "py-8"
            )}
        >
            <div
                className={cn(
                    "flex items-center gap-1 rounded-full border border-white/10 bg-black/20 px-2 py-2 backdrop-blur-md transition-all duration-300",
                    scrolled ? "bg-black/40 shadow-lg" : ""
                )}
            >
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={cn(
                            "relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                            activeSection === item.id
                                ? "text-white"
                                : "text-white/60 hover:text-white"
                        )}
                    >
                        {activeSection === item.id && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 rounded-full bg-white/10"
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            />
                        )}
                        {item.name}
                    </button>
                ))}
            </div>
        </motion.nav>
    );
}
