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