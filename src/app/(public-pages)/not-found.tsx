import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
    title: "404 - Page Not Found",
    description: "The page you are looking for does not exist.",
}

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center w-full bg-gradient-to-br from-violet-100 via-white to-violet-50 dark:from-violet-950 dark:via-gray-950 dark:to-violet-900 px-4 py-12">
            <div className="flex flex-col items-center gap-6 animate-fade-in">
                <div className="relative mb-2">
                    <span className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-violet-200 opacity-40 animate-pulse-slow dark:bg-violet-900" />
                    <Image
                        src="/tinystepsaday-logo.png"
                        alt="TinyStepsADay Logo"
                        width={64}
                        height={64}
                        className="z-10 drop-shadow-lg"
                        priority
                    />
                </div>
                <h1 className="text-7xl font-extrabold text-violet-600 drop-shadow-sm tracking-tight dark:text-violet-300">404</h1>
                <h2 className="text-2xl font-semibold text-gray-700 mb-2 dark:text-gray-200">Oops! Page Not Found</h2>
                <p className="text-gray-500 text-center max-w-md mb-6 dark:text-gray-400">The page you are looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track!</p>
                <Link href="/" className="inline-block px-6 py-3 rounded-lg bg-violet-600 text-white font-medium shadow-md hover:bg-violet-700 transition-colors dark:bg-violet-800 dark:hover:bg-violet-700">Go Home</Link>
            </div>
        </div>
    );
}