"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, FileText } from "lucide-react"
import type { Note } from "../types"

interface NotesTabProps {
  notes: Note[]
  onNotesChange: (notes: Note[]) => void
}

export function NotesTab({ notes, onNotesChange }: NotesTabProps) {
  const addNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: "",
      content: "",
    }
    onNotesChange([...notes, newNote])
  }

  const updateNote = (noteId: string, updates: Partial<Note>) => {
    onNotesChange(
      notes.map((note) => (note.id === noteId ? { ...note, ...updates } : note))
    )
  }

  const removeNote = (noteId: string) => {
    onNotesChange(notes.filter((note) => note.id !== noteId))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Course Notes</h3>
          <p className="text-sm text-muted-foreground">Add supplementary notes and resources</p>
        </div>
        <Button type="button" onClick={addNote}>
          <Plus className="mr-2 h-4 w-4" />
          Add Note
        </Button>
      </div>

      <div className="space-y-4">
        {notes.map((note, noteIndex) => (
          <Card key={note.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <Badge variant="outline">Note {noteIndex + 1}</Badge>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeNote(note.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Note title..."
                value={note.title}
                onChange={(e) => updateNote(note.id, { title: e.target.value })}
              />
              <Textarea
                placeholder="Note content..."
                value={note.content}
                onChange={(e) => updateNote(note.id, { content: e.target.value })}
                className="min-h-[120px]"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 