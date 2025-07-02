import Image from "next/image";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(120,108,255,0.15)] backdrop-blur-sm">
            <div className="flex flex-col items-center gap-6">
                <div className="relative flex items-center justify-center">
                    <span className="absolute inline-block w-40 h-40 rounded-full bg-violet-400 opacity-30 animate-pulse-slow" />
                    <span className="absolute inline-block w-56 h-56 rounded-full bg-violet-300 opacity-20 animate-pulse-slower" />
                    <Image
                        src="/tinystepsaday-logo.png"
                        alt="TinyStepsADay Logo"
                        width={120}
                        height={120}
                        className="z-10 animate-spin-slow drop-shadow-xl"
                        priority
                    />
                </div>
                <span className="text-xl font-semibold text-violet-700 animate-fade-in">Loading Tiny Steps...</span>
            </div>
        </div>
    );
}