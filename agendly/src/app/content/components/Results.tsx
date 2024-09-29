'use client'

import { useState, useRef, useEffect } from 'react'
import { Check, Edit, Save, RefreshCw } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"


interface ResultsComponentProps {
  events: Event[],
  setEvents: (events: Event[]) => void
}

export default function ResultsComponent({events, setEvents}: ResultsComponentProps) {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)
  const [editingEvent, setEditingEvent] = useState<string | null>(null)
  const [editedSubtext, setEditedSubtext] = useState<string>('')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setSelectedEvent(null)
        setEditingEvent(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSelect = (title: string) => {
    setSelectedEvent(selectedEvent === title ? null : title)
    setEditingEvent(null)
  }

  const handleEdit = (id: string, subtext: string) => {
    setEditingEvent(id)
    setEditedSubtext(subtext)
  }

  const handleSave = (id: string) => {
    setEvents(events.map(event => 
      event.title === title ? { ...event, subtext: editedSubtext } : event
    ))
    setEditingEvent(null)
  }

  const handleOption1 = () => {
    console.log('Option 1 selected')
    // Implement option 1 functionality here
  }

  const handleOption2 = () => {
    console.log('Option 2 selected')
    // Implement option 2 functionality here
  }

  const handleRegenerate = () => {
    console.log('Regenerating events')
    // Implement regenerate functionality here
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl mt-20" ref={containerRef}>
      <h1 className="text-3xl font-bold mb-6 text-center tracking-tighter">Calendar Events</h1>

      <ul className="space-y-2">
        {events.map((event) => (
          <li
            key={event.id}
            className={`bg-card rounded-lg shadow-sm transition-all duration-300 ease-in-out p-3
              ${selectedEvent === event.id ? 'ring-2 ring-primary' : ''}
            `}
          >
            <div className="flex items-center">
              <div
                className={`w-5 h-5 rounded-full border-2 border-primary mr-3 flex items-center justify-center cursor-pointer
                  ${selectedEvent === event.id ? 'bg-primary' : 'bg-background'}
                `}
                onClick={() => handleSelect(event.id)}
              >
                {selectedEvent === event.id && <Check className="text-primary-foreground w-3 h-3" />}
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold tracking-tighter">{event.title}</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2"
                    onClick={() => handleEdit(event.id, event.subtext)}
                  >
                    <Edit className="w-4 h-4" />
                    <span className="sr-only">Edit Options</span>
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground text-gray-500">{event.date}</div>
                {(selectedEvent === event.id || editingEvent === event.id) && (
                  <div className="mt-2 text-sm text-gray-700">{event.subtext}</div>
                )}
              </div>
            </div>
            {editingEvent === event.id && (
              <div className="mt-2">
                <Input
                  value={editedSubtext}
                  onChange={(e) => setEditedSubtext(e.target.value)}
                  className="mb-2"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSave(event.id)}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-center space-x-4">
        <Button onClick={handleOption1} className='bg-blue-500'>Save as an .ICS</Button>
        <Button onClick={handleOption2} className='bg-blue-500'>Sync to Google Calendar</Button>
      </div>
    </div>
  )
}

