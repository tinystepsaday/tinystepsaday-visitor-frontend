"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, HelpCircle } from "lucide-react"
import type { FAQ } from "../types"
import { createDefaultFAQ } from "../utils"

interface FAQsTabProps {
  faqs: FAQ[]
  onFAQsChange: (faqs: FAQ[]) => void
}

export function FAQsTab({ faqs, onFAQsChange }: FAQsTabProps) {
  const addFAQ = () => {
    const newFAQ = createDefaultFAQ()
    onFAQsChange([...faqs, newFAQ])
  }

  const updateFAQ = (faqId: number, updates: Partial<FAQ>) => {
    onFAQsChange(
      faqs.map((faq) => (faq.id === faqId ? { ...faq, ...updates } : faq))
    )
  }

  const removeFAQ = (faqId: number) => {
    onFAQsChange(faqs.filter((faq) => faq.id !== faqId))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Course FAQs</h3>
          <p className="text-sm text-muted-foreground">Add frequently asked questions to help students</p>
        </div>
        <Button type="button" onClick={addFAQ}>
          <Plus className="mr-2 h-4 w-4" />
          Add FAQ
        </Button>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, faqIndex) => (
          <Card key={faq.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <HelpCircle className="h-4 w-4" />
                  <Badge variant="outline">FAQ {faqIndex + 1}</Badge>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFAQ(faq.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Question..."
                value={faq.question}
                onChange={(e) => updateFAQ(faq.id, { question: e.target.value })}
              />
              <Textarea
                placeholder="Answer..."
                value={faq.answer}
                onChange={(e) => updateFAQ(faq.id, { answer: e.target.value })}
                className="min-h-[100px]"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 