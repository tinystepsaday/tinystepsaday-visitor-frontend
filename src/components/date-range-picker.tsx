"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { addDays, format } from "date-fns"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DateRangePickerProps {
  date: DateRange | undefined
  onDateChange: (date: DateRange | undefined) => void
  className?: string
}

export default function DateRangePicker({ date, onDateChange, className }: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false)

  const handlePresetSelect = (preset: string) => {
    const today = new Date()
    let newDate: DateRange | undefined

    switch (preset) {
      case "today":
        newDate = { from: today, to: today }
        break
      case "yesterday":
        const yesterday = addDays(today, -1)
        newDate = { from: yesterday, to: yesterday }
        break
      case "last7days":
        newDate = { from: addDays(today, -7), to: today }
        break
      case "last30days":
        newDate = { from: addDays(today, -30), to: today }
        break
      case "thisMonth":
        newDate = {
          from: new Date(today.getFullYear(), today.getMonth(), 1),
          to: today,
        }
        break
      case "lastMonth":
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)
        const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0)
        newDate = { from: lastMonth, to: lastMonthEnd }
        break
      case "thisYear":
        newDate = {
          from: new Date(today.getFullYear(), 0, 1),
          to: today,
        }
        break
      default:
        newDate = undefined
    }

    onDateChange(newDate)
    setOpen(false)
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn("w-[300px] justify-start text-left font-normal", !date && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex">
            <div className="border-r p-3">
              <div className="space-y-1">
                <h4 className="text-sm font-medium">Presets</h4>
                <div className="grid gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start"
                    onClick={() => handlePresetSelect("today")}
                  >
                    Today
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start"
                    onClick={() => handlePresetSelect("yesterday")}
                  >
                    Yesterday
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start"
                    onClick={() => handlePresetSelect("last7days")}
                  >
                    Last 7 days
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start"
                    onClick={() => handlePresetSelect("last30days")}
                  >
                    Last 30 days
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start"
                    onClick={() => handlePresetSelect("thisMonth")}
                  >
                    This month
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start"
                    onClick={() => handlePresetSelect("lastMonth")}
                  >
                    Last month
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start"
                    onClick={() => handlePresetSelect("thisYear")}
                  >
                    This year
                  </Button>
                </div>
              </div>
            </div>
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={onDateChange}
              numberOfMonths={2}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
} 