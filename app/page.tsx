"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Hero } from "@/components/Hero";
import { HistoryGroup } from "@/components/HistoryGroup";
import { Regions } from "@/components/Regions";
import { CulturalConnections } from "@/components/CulturalConnections";
import { Sports } from "@/components/Sports";
import { Intro } from "@/components/Intro";
import { SlideContainer } from "@/components/SlideContainer";
import { ChevronRight, ChevronLeft } from "lucide-react";

const slides = [
  { id: "home", component: Hero },
  { id: "history-group", component: HistoryGroup },
  { id: "regions", component: Regions },
  { id: "culture", component: CulturalConnections },
  { id: "sports", component: Sports },
];

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const paginate = useCallback((newDirection: number) => {
    const nextSlide = currentSlide + newDirection;
    if (nextSlide >= 0 && nextSlide < slides.length) {
      setCurrentSlide(nextSlide);
    }
  }, [currentSlide]);

  useEffect(() => {
    if (showIntro) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        paginate(1);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        paginate(-1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showIntro, paginate]);

  return (
    <main className="relative h-screen w-full overflow-hidden bg-zinc-950 text-zinc-50 selection:bg-red-500/30">
      <AnimatePresence mode="wait">
        {showIntro && (
          <Intro onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      {!showIntro && (
        <>
          <div className="relative h-full w-full">
            {slides.map((slide, index) => (
              <SlideContainer
                key={slide.id}
                isActive={currentSlide === index}
                direction={0} // Direction not needed for fade
              >
                <slide.component />
              </SlideContainer>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="fixed bottom-8 right-8 z-40 flex gap-4">
            <button
              onClick={() => paginate(-1)}
              disabled={currentSlide === 0}
              className="group rounded-full border border-white/10 bg-black/20 p-4 backdrop-blur-md transition-all hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-6 w-6 transition-transform group-hover:-translate-x-1" />
            </button>
            <button
              onClick={() => paginate(1)}
              disabled={currentSlide === slides.length - 1}
              className="group rounded-full border border-white/10 bg-black/20 p-4 backdrop-blur-md transition-all hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Slide Indicator */}
          <div className="fixed bottom-12 left-1/2 z-40 -translate-x-1/2 flex gap-3">
            {slides.map((_, index) => (
              <motion.div
                key={index}
                initial={false}
                animate={{
                  width: currentSlide === index ? 32 : 8,
                  opacity: currentSlide === index ? 1 : 0.3,
                  backgroundColor: currentSlide === index ? "#ffffff" : "#ffffff",
                }}
                className="h-1 rounded-full transition-all duration-300"
              />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
