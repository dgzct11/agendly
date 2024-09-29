'use client'

import { useState, useRef, useEffect } from 'react'
import { Check, Edit, Save, RefreshCw } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Event {
  id: string
  title: string
  subtext: string
}

const sampleEvents: Event[] = [
  { id: '1', title: 'Conference Call', subtext: 'Discuss Q4 projections with the team' },
  { id: '2', title: 'Project Deadline', subtext: 'Submit final report for client review' },
  { id: '3', title: 'Team Building', subtext: 'Outdoor activities and lunch with colleagues' },
  { id: '4', title: 'Training Session', subtext: 'New software implementation workshop' },
  { id: '5', title: 'Client Meeting', subtext: 'Presentation of new marketing strategy' },
]

export default function Results() {
  const [events, setEvents] = useState<Event[]>(sampleEvents)
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null)
  const [editingEvent, setEditingEvent] = useState<string | null>(null)
  const [editedSubtext, setEditedSubtext] = useState<string>('')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setExpandedEvent(null)
        setEditingEvent(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSelect = (id: string) => {
    setSelectedEvent(selectedEvent === id ? null : id)
    setExpandedEvent(id)
    setEditingEvent(null)
  }

  const handleEdit = (id: string, subtext: string) => {
    setEditingEvent(id)
    setEditedSubtext(subtext)
  }

  const handleSave = (id: string) => {
    setEvents(events.map(event => 
      event.id === id ? { ...event, subtext: editedSubtext } : event
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
    <div className="container mx-auto p-4 max-w-3xl" ref={containerRef}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Event Results</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={handleRegenerate}>
                <RefreshCw className="h-4 w-4" />
                <span className="sr-only">Regenerate events</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Regenerate events</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <ul className="space-y-2">
        {events.map((event) => (
          <li
            key={event.id}
            className={`bg-card rounded-lg shadow-sm transition-all duration-300 ease-in-out
              ${expandedEvent === event.id ? 'h-auto' : 'h-12'}
              ${selectedEvent === event.id ? 'ring-2 ring-primary' : ''}
            `}
          >
            <div
              className="flex items-center p-3 cursor-pointer hover:bg-accent rounded-lg"
              onClick={() => handleSelect(event.id)}
            >
              <div className={`w-5 h-5 rounded-full border-2 border-primary mr-3 flex items-center justify-center
                ${selectedEvent === event.id ? 'bg-primary' : 'bg-background'}
              `}>
                {selectedEvent === event.id && <Check className="text-primary-foreground w-3 h-3" />}
              </div>
              <div className="flex-grow">
                <h2 className="text-base font-semibold">{event.title}</h2>
                {expandedEvent === event.id && editingEvent !== event.id && (
                  <div className="mt-1 text-sm text-muted-foreground">{event.subtext}</div>
                )}
              </div>
            </div>
            {expandedEvent === event.id && (
              <div className="px-3 pb-3">
                {editingEvent === event.id ? (
                  <div className="flex items-center mt-2">
                    <Input
                      value={editedSubtext}
                      onChange={(e) => setEditedSubtext(e.target.value)}
                      className="flex-grow mr-2"
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
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => handleEdit(event.id, event.subtext)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Options
                  </Button>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-center space-x-4">
        <Button onClick={handleOption1}>Option 1</Button>
        <Button onClick={handleOption2}>Option 2</Button>
      </div>
    </div>
  )
}