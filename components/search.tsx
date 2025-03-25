"use client"

import { useState } from "react"
import { Calendar, Globe, MapPin, DollarSign, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

export function Search() {
  const [date, setDate] = useState<Date>()
  const [budget, setBudget] = useState([1000])
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="w-full max-w-4xl bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="relative md:col-span-2">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" size={18} />
          <Input
            placeholder="Where from?"
            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/70 h-12 rounded-lg"
          />
        </div>
        <div className="relative md:col-span-2">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" size={18} />
          <Input
            placeholder="Where to?"
            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/70 h-12 rounded-lg"
          />
        </div>

        <div className="flex gap-2">
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal bg-white/5 border-white/10 text-white h-12 rounded-lg",
                  !date && "text-white/70",
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {date ? date.toLocaleDateString() : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={(date) => {
                  setDate(date)
                  setIsOpen(false)
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <DollarSign className="text-white/70 mr-2" size={18} />
            <span className="text-white/90 text-sm">Budget: ${budget[0]}</span>
          </div>
          <Slider defaultValue={[1000]} max={10000} step={100} onValueChange={setBudget} className="mt-2" />
        </div>

        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center">
            <User className="text-white/70 mr-2" size={18} />
            <span className="text-white/90 text-sm">Preferences</span>
          </div>
          <div className="mt-2 flex gap-2">
            <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-white/90 hover:bg-white/10">
              Fastest
            </Button>
            <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-white/90 hover:bg-white/10">
              Cheapest
            </Button>
            <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-white/90 hover:bg-white/10">
              Balanced
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white h-12 rounded-lg">
            <Globe className="mr-2" size={18} />
            Search
          </Button>
        </div>
      </div>
    </div>
  )
}

