"use client";

import { motion } from "framer-motion";

const sports = [
    {
        id: "kok-boru",
        title: "Kok-Boru",
        subtitle: "The Grey Wolf",
        description: "Traditional horse game where riders compete to carry a goat carcass to the opponent's goal. A test of strength, horsemanship, and teamwork that has been passed down through generations of nomadic warriors.",
        image: "/kok boru .jpg",
    },
    {
        id: "er-enish",
        title: "Er Enish",
        subtitle: "Wrestling on Horseback",
        description: "Wrestlers grapple on horseback trying to pull the opponent to the ground. A display of raw strength, balance, and the deep bond between rider and horse.",
        image: "/erenish.png",
    },
    {
        id: "salburun",
        title: "Salburun",
        subtitle: "Eagle Hunting",
        description: "Ancient tradition of hunting with trained golden eagles and falcons. A sacred partnership between human and bird of prey, requiring years of patience and mutual respect.",
        image: "/salburun2.jpg",
    },
    {
        id: "at-chabysh",
        title: "At Chabysh",
        subtitle: "Horse Racing",
        description: "Long-distance horse racing across the steppe. A test of endurance for both rider and horse, celebrating the speed and stamina of Kyrgyz horses.",
        image: "/at chabysh.jpg",
    },
    {
        id: "alysh",
        title: "Alysh",
        subtitle: "Traditional Wrestling",
        description: "Kyrgyz belt wrestling where opponents try to throw each other to the ground. A test of technique, strength, and agility rooted in ancient traditions.",
        image: "/alysh.png",
    },
    {
        id: "chucko",
        title: "Chucko",
        subtitle: "Traditional Game",
        description: "A traditional Kyrgyz game that tests skill, precision, and cultural knowledge passed down through generations.",
        image: "/checko.png",
    },
];

export function Sports() {
    return (
        <section id="sports" className="relative bg-zinc-950">
            {/* Title */}
            <div className="text-center pt-24 pb-12 relative z-10 bg-zinc-950">
                <h2 className="font-serif text-5xl md:text-6xl text-white">
                    Nomadic Games
                </h2>
            </div>

            {/* Stacking Games */}
            <div className="relative">
                {sports.map((sport, index) => {
                    const isLeft = index % 2 === 0;
                    const isFirst = index === 0;

                    return (
                        <div
                            key={sport.id}
                            className={`min-h-screen flex items-center justify-center bg-zinc-950 py-24 ${isFirst ? '-mt-32' : ''
                                }`}
                        >
                            {/* Content */}
                            <div className={`relative z-10 max-w-7xl w-full px-8 md:px-16 flex flex-col md:flex-row items-stretch gap-16 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                                }`}>
                                {/* Image */}
                                <div className={`flex-1 flex ${isLeft ? 'justify-end' : 'justify-start'}`}>
                                    <div className="w-[500px] h-[350px] relative overflow-hidden rounded-lg shadow-2xl">
                                        <img
                                            src={sport.image}
                                            alt={sport.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>

                                {/* Text */}
                                <div className={`flex-1 flex flex-col justify-between h-[350px] py-2 ${isLeft ? 'items-start' : 'items-end'}`}>
                                    <div className={`flex flex-col ${isLeft ? 'items-start text-left' : 'items-end text-right'}`}>
                                        <span className="block font-mono text-sm uppercase tracking-widest text-zinc-400 mb-4">
                                            {sport.subtitle}
                                        </span>
                                        <h3 className="font-serif text-5xl md:text-6xl text-white leading-tight">
                                            {sport.title}
                                        </h3>
                                    </div>
                                    <p className={`text-lg text-zinc-300 leading-relaxed max-w-md ${isLeft ? 'text-left' : 'text-right'}`}>
                                        {sport.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
