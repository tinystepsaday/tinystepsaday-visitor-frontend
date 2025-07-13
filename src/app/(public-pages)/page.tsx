import { Metadata } from "next";
import Image from "next/image";
import { Wrench, Clock, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Under Maintenance - Tiny Steps A Day",
  description: "We're currently performing some maintenance to improve your experience. We'll be back soon with exciting new features!",
};

export default function page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center w-full bg-gradient-to-br from-violet-100 via-white to-violet-50 dark:from-violet-950 dark:via-gray-950 dark:to-violet-900 px-4 py-12">
      <div className="flex flex-col items-center gap-8 animate-fade-in max-w-2xl mx-auto text-center">
        {/* Animated Logo */}
        <div className="relative mb-4">
          <span className="absolute -top-6 -left-6 w-32 h-32 rounded-full bg-violet-200 opacity-40 animate-pulse-slow dark:bg-violet-900" />
          <span className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-violet-300 opacity-30 animate-pulse-slower dark:bg-violet-800" />
          <Image
            src="/tinystepsaday-logo.png"
            alt="TinyStepsADay Logo"
            width={80}
            height={80}
            className="z-10 animate-spin-slow drop-shadow-xl"
            priority
          />
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Icon and Title */}
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 rounded-full bg-violet-100 dark:bg-violet-900/50">
              <Wrench className="w-8 h-8 text-violet-600 dark:text-violet-300" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-violet-600 dark:text-violet-300">
              Under Maintenance
            </h1>
          </div>

          {/* Subtitle */}
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-200">
            We&apos;re making things better for you!
          </h2>

          {/* Description */}
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg">
            We&apos;re currently performing some maintenance to improve your experience and bring you exciting new features. 
            We appreciate your patience and can&apos;t wait to show you what we&apos;ve been working on!
          </p>

          {/* Estimated Time */}
          <div className="flex items-center justify-center gap-2 text-violet-600 dark:text-violet-300">
            <Clock className="w-5 h-5" />
            <span className="font-medium">Estimated completion: 7 days</span>
          </div>

          {/* Features Coming Soon */}
          <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-6 border border-violet-200 dark:border-violet-800">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
              What&apos;s coming next?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-violet-500" />
                <span>Enhanced user experience</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-violet-500" />
                <span>Faster loading times</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-violet-500" />
                <span>New learning features</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-violet-500" />
                <span>Improved mobile experience</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}