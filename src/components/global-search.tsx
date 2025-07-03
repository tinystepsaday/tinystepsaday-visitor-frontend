"use client"

import { useState } from "react"
import { Search, FileText, GraduationCap, ImageIcon } from "lucide-react"
import { useGlobalSearch } from "@/lib/api"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"

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

          {searchResults?.posts && searchResults.posts.length > 0 && (
            <CommandGroup heading="Blog Posts">
              {searchResults.posts.map((post) => (
                <CommandItem key={post.id} value={post.title}>
                  <FileText className="mr-2 h-4 w-4" />
                  <div className="flex flex-col">
                    <span>{post.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {post.status} • {post.createdAt.toLocaleDateString()}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {searchResults?.courses && searchResults.courses.length > 0 && (
            <CommandGroup heading="Courses">
              {searchResults.courses.map((course) => (
                <CommandItem key={course.id} value={course.title}>
                  <GraduationCap className="mr-2 h-4 w-4" />
                  <div className="flex flex-col">
                    <span>{course.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {course.category} • ${course.price}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {searchResults?.media && searchResults.media.length > 0 && (
            <CommandGroup heading="Media Files">
              {searchResults.media.map((file) => (
                <CommandItem key={file.id} value={file.name}>
                  <ImageIcon className="mr-2 h-4 w-4" />
                  <div className="flex flex-col">
                    <span>{file.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {file.type} • {(file.size / 1024).toFixed(1)} KB
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