import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStreakParams() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        page: "1",
        sort: "popular",
        filter: "",
        viewMode: "card",
      })
    }, 1000)
  })
}

// File management utilities
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export function formatDate(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function formatDateTime(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatRelativeTime(date: Date | string): string {
  const d = new Date(date)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return 'Just now'
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`
  }

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`
  }

  const diffInWeeks = Math.floor(diffInDays / 7)
  if (diffInWeeks < 4) {
    return `${diffInWeeks} week${diffInWeeks !== 1 ? 's' : ''} ago`
  }

  const diffInMonths = Math.floor(diffInDays / 30)
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''} ago`
  }

  const diffInYears = Math.floor(diffInDays / 365)
  return `${diffInYears} year${diffInYears !== 1 ? 's' : ''} ago`
}

export function generateFileId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || ''
}

export function isValidFileType(filename: string, allowedTypes: string[]): boolean {
  const extension = getFileExtension(filename)
  return allowedTypes.includes(extension)
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

export const quizCategoryColorMap = {
  // Personal Development & Growth
  "personal development": { bg: "bg-blue-50 dark:bg-blue-950", text: "text-blue-700 dark:text-blue-300", border: "border-blue-200 dark:border-blue-800", accent: "bg-blue-100 dark:bg-blue-900" },
  "personal growth": { bg: "bg-indigo-50 dark:bg-indigo-950", text: "text-indigo-700 dark:text-indigo-300", border: "border-indigo-200 dark:border-indigo-800", accent: "bg-indigo-100 dark:bg-indigo-900" },
  "self-improvement": { bg: "bg-cyan-50 dark:bg-cyan-950", text: "text-cyan-700 dark:text-cyan-300", border: "border-cyan-200 dark:border-cyan-800", accent: "bg-cyan-100 dark:bg-cyan-900" },

  // Mental Health & Wellness
  "mental health": { bg: "bg-rose-50 dark:bg-rose-950", text: "text-rose-700 dark:text-rose-300", border: "border-rose-200 dark:border-rose-800", accent: "bg-rose-100 dark:bg-rose-900" },
  "wellness": { bg: "bg-emerald-50 dark:bg-emerald-950", text: "text-emerald-700 dark:text-emerald-300", border: "border-emerald-200 dark:border-emerald-800", accent: "bg-emerald-100 dark:bg-emerald-900" },
  "mindfulness": { bg: "bg-amber-50 dark:bg-amber-950", text: "text-amber-700 dark:text-amber-300", border: "border-amber-200 dark:border-amber-800", accent: "bg-amber-100 dark:bg-amber-900" },
  "meditation": { bg: "bg-violet-50 dark:bg-violet-950", text: "text-violet-700 dark:text-violet-300", border: "border-violet-200 dark:border-violet-800", accent: "bg-violet-100 dark:bg-violet-900" },
  "yoga": { bg: "bg-teal-50 dark:bg-teal-950", text: "text-teal-700 dark:text-teal-300", border: "border-teal-200 dark:border-teal-800", accent: "bg-teal-100 dark:bg-teal-900" },

  // Life & Purpose
  "life purpose": { bg: "bg-purple-50 dark:bg-purple-950", text: "text-purple-700 dark:text-purple-300", border: "border-purple-200 dark:border-purple-800", accent: "bg-purple-100 dark:bg-purple-900" },
  "spirituality": { bg: "bg-fuchsia-50 dark:bg-fuchsia-950", text: "text-fuchsia-700 dark:text-fuchsia-300", border: "border-fuchsia-200 dark:border-fuchsia-800", accent: "bg-fuchsia-100 dark:bg-fuchsia-900" },

  // Career & Business
  "career": { bg: "bg-slate-50 dark:bg-slate-950", text: "text-slate-700 dark:text-slate-300", border: "border-slate-200 dark:border-slate-800", accent: "bg-slate-100 dark:bg-slate-900" },
  "leadership": { bg: "bg-orange-50 dark:bg-orange-950", text: "text-orange-700 dark:text-orange-300", border: "border-orange-200 dark:border-orange-800", accent: "bg-orange-100 dark:bg-orange-900" },
  "entrepreneurship": { bg: "bg-red-50 dark:bg-red-950", text: "text-red-700 dark:text-red-300", border: "border-red-200 dark:border-red-800", accent: "bg-red-100 dark:bg-red-900" },
  "marketing": { bg: "bg-pink-50 dark:bg-pink-950", text: "text-pink-700 dark:text-pink-300", border: "border-pink-200 dark:border-pink-800", accent: "bg-pink-100 dark:bg-pink-900" },
  "sales": { bg: "bg-rose-50 dark:bg-rose-950", text: "text-rose-700 dark:text-rose-300", border: "border-rose-200 dark:border-rose-800", accent: "bg-rose-100 dark:bg-rose-900" },

  // Technology & Creative
  "technology": { bg: "bg-blue-50 dark:bg-blue-950", text: "text-blue-700 dark:text-blue-300", border: "border-blue-200 dark:border-blue-800", accent: "bg-blue-100 dark:bg-blue-900" },
  "design": { bg: "bg-purple-50 dark:bg-purple-950", text: "text-purple-700 dark:text-purple-300", border: "border-purple-200 dark:border-purple-800", accent: "bg-purple-100 dark:bg-purple-900" },
  "art": { bg: "bg-pink-50 dark:bg-pink-950", text: "text-pink-700 dark:text-pink-300", border: "border-pink-200 dark:border-pink-800", accent: "bg-pink-100 dark:bg-pink-900" },

  // Communication & Learning
  "writing": { bg: "bg-emerald-50 dark:bg-emerald-950", text: "text-emerald-700 dark:text-emerald-300", border: "border-emerald-200 dark:border-emerald-800", accent: "bg-emerald-100 dark:bg-emerald-900" },
  "reading": { bg: "bg-teal-50 dark:bg-teal-950", text: "text-teal-700 dark:text-teal-300", border: "border-teal-200 dark:border-teal-800", accent: "bg-teal-100 dark:bg-teal-900" },
  "listening": { bg: "bg-cyan-50 dark:bg-cyan-950", text: "text-cyan-700 dark:text-cyan-300", border: "border-cyan-200 dark:border-cyan-800", accent: "bg-cyan-100 dark:bg-cyan-900" },
  "speaking": { bg: "bg-orange-50 dark:bg-orange-950", text: "text-orange-700 dark:text-orange-300", border: "border-orange-200 dark:border-orange-800", accent: "bg-orange-100 dark:bg-orange-900" },

  // Lifestyle & Entertainment
  "travel": { bg: "bg-sky-50 dark:bg-sky-950", text: "text-sky-700 dark:text-sky-300", border: "border-sky-200 dark:border-sky-800", accent: "bg-sky-100 dark:bg-sky-900" },
  "food": { bg: "bg-amber-50 dark:bg-amber-950", text: "text-amber-700 dark:text-amber-300", border: "border-amber-200 dark:border-amber-800", accent: "bg-amber-100 dark:bg-amber-900" },
  "fashion": { bg: "bg-fuchsia-50 dark:bg-fuchsia-950", text: "text-fuchsia-700 dark:text-fuchsia-300", border: "border-fuchsia-200 dark:border-fuchsia-800", accent: "bg-fuchsia-100 dark:bg-fuchsia-900" },
  "music": { bg: "bg-violet-50 dark:bg-violet-950", text: "text-violet-700 dark:text-violet-300", border: "border-violet-200 dark:border-violet-800", accent: "bg-violet-100 dark:bg-violet-900" },
  "movies": { bg: "bg-red-50 dark:bg-red-950", text: "text-red-700 dark:text-red-300", border: "border-red-200 dark:border-red-800", accent: "bg-red-100 dark:bg-red-900" },
  "tv": { bg: "bg-pink-50 dark:bg-pink-950", text: "text-pink-700 dark:text-pink-300", border: "border-pink-200 dark:border-pink-800", accent: "bg-pink-100 dark:bg-pink-900" },
  "books": { bg: "bg-emerald-50 dark:bg-emerald-950", text: "text-emerald-700 dark:text-emerald-300", border: "border-emerald-200 dark:border-emerald-800", accent: "bg-emerald-100 dark:bg-emerald-900" },
  "podcasts": { bg: "bg-indigo-50 dark:bg-indigo-950", text: "text-indigo-700 dark:text-indigo-300", border: "border-indigo-200 dark:border-indigo-800", accent: "bg-indigo-100 dark:bg-indigo-900" },
  "gaming": { bg: "bg-purple-50 dark:bg-purple-950", text: "text-purple-700 dark:text-purple-300", border: "border-purple-200 dark:border-purple-800", accent: "bg-purple-100 dark:bg-purple-900" },

  // Health & Fitness
  "health": { bg: "bg-green-50 dark:bg-green-950", text: "text-green-700 dark:text-green-300", border: "border-green-200 dark:border-green-800", accent: "bg-green-100 dark:bg-green-900" },
  "fitness": { bg: "bg-emerald-50 dark:bg-emerald-950", text: "text-emerald-700 dark:text-emerald-300", border: "border-emerald-200 dark:border-emerald-800", accent: "bg-emerald-100 dark:bg-emerald-900" },
  "sleep": { bg: "bg-slate-50 dark:bg-slate-950", text: "text-slate-700 dark:text-slate-300", border: "border-slate-200 dark:border-slate-800", accent: "bg-slate-100 dark:bg-slate-900" },

  // Relationships & Social
  "relationships": { bg: "bg-rose-50 dark:bg-rose-950", text: "text-rose-700 dark:text-rose-300", border: "border-rose-200 dark:border-rose-800", accent: "bg-rose-100 dark:bg-rose-900" },
  "family": { bg: "bg-pink-50 dark:bg-pink-950", text: "text-pink-700 dark:text-pink-300", border: "border-pink-200 dark:border-pink-800", accent: "bg-pink-100 dark:bg-pink-900" },
  "social": { bg: "bg-blue-50 dark:bg-blue-950", text: "text-blue-700 dark:text-blue-300", border: "border-blue-200 dark:border-blue-800", accent: "bg-blue-100 dark:bg-blue-900" },

  // Productivity & Skills
  "productivity": { bg: "bg-cyan-50 dark:bg-cyan-950", text: "text-cyan-700 dark:text-cyan-300", border: "border-cyan-200 dark:border-cyan-800", accent: "bg-cyan-100 dark:bg-cyan-900" },
  "time management": { bg: "bg-sky-50 dark:bg-sky-950", text: "text-sky-700 dark:text-sky-300", border: "border-sky-200 dark:border-sky-800", accent: "bg-sky-100 dark:bg-sky-900" },
  "goal setting": { bg: "bg-orange-50 dark:bg-orange-950", text: "text-orange-700 dark:text-orange-300", border: "border-orange-200 dark:border-orange-800", accent: "bg-orange-100 dark:bg-orange-900" },
  "habit building": { bg: "bg-teal-50 dark:bg-teal-950", text: "text-teal-700 dark:text-teal-300", border: "border-teal-200 dark:border-teal-800", accent: "bg-teal-100 dark:bg-teal-900" },

  // Finance
  "finance": { bg: "bg-green-50 dark:bg-green-950", text: "text-green-700 dark:text-green-300", border: "border-green-200 dark:border-green-800", accent: "bg-green-100 dark:bg-green-900" },

  // Onboarding
  "onboarding": { bg: "bg-indigo-50 dark:bg-indigo-950", text: "text-indigo-700 dark:text-indigo-300", border: "border-indigo-200 dark:border-indigo-800", accent: "bg-indigo-100 dark:bg-indigo-900" },
} as const;

export const generateFallbackColors = (category: string) => {
  const hash = category.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const colorPalettes = [
    { bg: "bg-slate-50 dark:bg-slate-950", text: "text-slate-700 dark:text-slate-300", border: "border-slate-200 dark:border-slate-800", accent: "bg-slate-100 dark:bg-slate-900" },
    { bg: "bg-zinc-50 dark:bg-zinc-950", text: "text-zinc-700 dark:text-zinc-300", border: "border-zinc-200 dark:border-zinc-800", accent: "bg-zinc-100 dark:bg-zinc-900" },
    { bg: "bg-neutral-50 dark:bg-neutral-950", text: "text-neutral-700 dark:text-neutral-300", border: "border-neutral-200 dark:border-neutral-800", accent: "bg-neutral-100 dark:bg-neutral-900" },
    { bg: "bg-stone-50 dark:bg-stone-950", text: "text-stone-700 dark:text-stone-300", border: "border-stone-200 dark:border-stone-800", accent: "bg-stone-100 dark:bg-stone-900" },
  ];

  return colorPalettes[hash % colorPalettes.length];
};