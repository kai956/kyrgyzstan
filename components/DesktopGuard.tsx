"use client";

import { useEffect, useState } from "react";

export function DesktopGuard({ children }: { children: React.ReactNode }) {
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (!mounted) return <>{children}</>;

    if (isMobile) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-zinc-950 p-8">
                <div className="text-center">
                    <h1 className="mb-4 font-serif text-4xl text-white">Desktop Only</h1>
                    <p className="text-lg text-zinc-400">
                        This presentation is designed for desktop viewing only.
                        <br />
                        Please open this site on a desktop or laptop computer.
                    </p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
