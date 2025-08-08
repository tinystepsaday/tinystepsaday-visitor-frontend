"use client"

import { useState } from "react"
import { Search, ImageIcon, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { useGlobalSearch } from "@/lib/api"
import { formatBytes } from "@/lib/utils"

export default function GlobalSearch() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")

  const { data: searchResults, isLoading } = useGlobalSearch(query)

  return (
    <>
      <Button
        variant="outline"
        className="relative h-8 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        <span className="hidden lg:inline-flex">Search everything...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search posts, courses, media..." value={query} onValueChange={setQuery} />
        <CommandList>
          <CommandEmpty>{isLoading ? "Searching..." : "No results found."}</CommandEmpty>

          {searchResults?.courses && searchResults.courses.length > 0 && (
            <CommandGroup heading="Courses">
              {searchResults.courses.map((course) => (
                <CommandItem key={course.id} value={course.title}>
                  <GraduationCap className="mr-2 h-4 w-4" />
                  <div className="flex flex-col">
                    <span>{course.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {course.duration} min • {course.category}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {searchResults?.media && searchResults.media.length > 0 && (
            <CommandGroup heading="Media Files">
              {searchResults.media.map((file) => (
                <CommandItem key={file.id} value={file.filename}>
                  <ImageIcon className="mr-2 h-4 w-4" />
                  <div className="flex flex-col">
                    <span>{file.filename}</span>
                    <span className="text-xs text-muted-foreground">
                      {file.type} • {formatBytes(file.size)}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
} 