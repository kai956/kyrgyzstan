"use client";

import { motion } from "framer-motion";

const sports = [
    {
        id: "kok-boru",
        title: "Kok-Boru",
        subtitle: "The Grey Wolf",
        description: "Traditional horse game where riders compete to carry a goat carcass to the opponent's goal. A test of strength, horsemanship, and teamwork that has been passed down through generations of nomadic warriors.",
        image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?q=80&w=2671&auto=format&fit=crop", // Horses running - warm tones
    },
    {
        id: "er-enish",
        title: "Er Enish",
        subtitle: "Wrestling on Horseback",
        description: "Wrestlers grapple on horseback trying to pull the opponent to the ground. A display of raw strength, balance, and the deep bond between rider and horse.",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2670&auto=format&fit=crop", // Mountains - blue/purple tones
    },
    {
        id: "salbuurun",
        title: "Salbuurun",
        subtitle: "Eagle Hunting",
        description: "Ancient tradition of hunting with trained golden eagles and falcons. A sacred partnership between human and bird of prey, requiring years of patience and mutual respect.",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2670&auto=format&fit=crop", // Mountain landscape - golden hour
    },
    {
        id: "kyz-kuumai",
        title: "Kyz Kuumai",
        subtitle: "Kiss the Girl",
        description: "Romantic horse game where a young man chases a young woman to win a kiss. If he fails, she chases him back with a whip. A playful test of horsemanship and courtship.",
        image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2674&auto=format&fit=crop", // Nature/forest - green tones
    },
];

export function Sports() {
    return (
        <section id="sports" className="relative bg-zinc-950">
            {/* Fixed Title */}
            <div className="sticky top-0 z-20 bg-gradient-to-b from-zinc-950 via-zinc-950/95 to-transparent pt-24 pb-16">
                <h2 className="text-center font-serif text-5xl md:text-6xl text-white">
                    Nomadic Games
                </h2>
            </div>

            {/* Scrollable Games */}
            <div className="relative">
                {sports.map((sport, index) => {
                    const isLeft = index % 2 === 0;

                    return (
                        <div key={sport.id} className="relative min-h-screen flex items-center">
                            {/* Background Image with Blur Transition */}
                            <div className="absolute inset-0 z-0">
                                <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{ backgroundImage: `url(${sport.image})` }}
                                />
                                {/* Dark overlay */}
                                <div className="absolute inset-0 bg-black/50" />

                                {/* Blur transition at top and bottom */}
                                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-zinc-950 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 w-full px-8 md:px-16 lg:px-24 py-20">
                                <motion.div
                                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8 }}
                                    viewport={{ once: false, amount: 0.3 }}
                                    className={`max-w-2xl ${isLeft ? 'mr-auto' : 'ml-auto'}`}
                                >
                                    {/* Text Container without Backdrop Blur */}
                                    <div className="bg-black/60 rounded-2xl p-8 md:p-12 border border-white/10">
                                        <span className="block font-mono text-sm uppercase tracking-widest text-zinc-400 mb-3">
                                            {sport.subtitle}
                                        </span>
                                        <h3 className="font-serif text-4xl md:text-5xl text-white mb-6 leading-tight">
                                            {sport.title}
                                        </h3>
                                        <p className="text-lg text-zinc-300 leading-relaxed">
                                            {sport.description}
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
