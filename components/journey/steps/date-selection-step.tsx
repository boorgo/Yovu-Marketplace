"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface DateSelectionStepProps {
  departureDate: Date | undefined
  returnDate: Date | undefined
  onChange: (departureDate: Date | undefined, returnDate: Date | undefined) => void
}

export function DateSelectionStep({ departureDate, returnDate, onChange }: DateSelectionStepProps) {
  const [tripType, setTripType] = useState<"round-trip" | "one-way">(returnDate ? "round-trip" : "one-way")
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: departureDate,
    to: returnDate,
  })

  const handleDateChange = (range: { from: Date | undefined; to: Date | undefined }) => {
    setDateRange(range)

    if (tripType === "round-trip") {
      onChange(range.from, range.to)
    } else {
      onChange(range.from, undefined)
    }
  }

  const handleTripTypeChange = (value: "round-trip" | "one-way") => {
    setTripType(value)

    if (value === "one-way") {
      onChange(dateRange.from, undefined)
    } else {
      onChange(dateRange.from, dateRange.to)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="text-yovu-charcoal">Trip type</Label>
        <RadioGroup
          value={tripType}
          onValueChange={(v) => handleTripTypeChange(v as "round-trip" | "one-way")}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="round-trip" id="round-trip" className="border-yovu-charcoal text-yovu-charcoal" />
            <Label htmlFor="round-trip" className="text-yovu-charcoal">
              Round trip
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="one-way" id="one-way" className="border-yovu-charcoal text-yovu-charcoal" />
            <Label htmlFor="one-way" className="text-yovu-charcoal">
              One way
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label className="text-yovu-charcoal">
          {tripType === "round-trip" ? "Select departure and return dates" : "Select departure date"}
        </Label>
        <div className="border border-yovu-mint rounded-md p-4 bg-white">
          <Calendar
            mode={tripType === "round-trip" ? "range" : "single"}
            selected={tripType === "round-trip" ? dateRange : dateRange.from}
            onSelect={(selected) => {
              if (tripType === "round-trip") {
                handleDateChange(
                  (selected as { from: Date | undefined; to: Date | undefined }) || { from: undefined, to: undefined },
                )
              } else {
                handleDateChange({ from: selected as Date, to: undefined })
              }
            }}
            className="mx-auto"
            disabled={{ before: new Date() }}
            initialFocus
          />
        </div>
      </div>

      <div className="p-4 bg-yovu-mint/20 rounded-md">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-yovu-charcoal/70">Departure</span>
            <p className="font-medium text-yovu-charcoal">
              {dateRange.from ? format(dateRange.from, "EEE, MMM d, yyyy") : "Select a date"}
            </p>
          </div>

          {tripType === "round-trip" && (
            <div className="text-right">
              <span className="text-sm text-yovu-charcoal/70">Return</span>
              <p className="font-medium text-yovu-charcoal">
                {dateRange.to ? format(dateRange.to, "EEE, MMM d, yyyy") : "Select a date"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
