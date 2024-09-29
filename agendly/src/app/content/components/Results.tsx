'use client'

import { useState, useRef, useEffect } from 'react'
import { Check, Edit, Save, RefreshCw } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {DownloadICS} from "../downloadICS"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { EventInterface } from '@/app/utils/types'


interface ResultsComponentProps {
  events: EventInterface[],
  setEvents: (events: EventInterface[]) => void
}

export default function ResultsComponent({events, setEvents}: ResultsComponentProps) {
  const [selectedIndex, setSelectedIndexs] = useState<number | null>(null)
  const [editingEvent, setEditingEvent] = useState<number | null>(null)
  const [editedSubtext, setEditedSubtext] = useState<string>('')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setSelectedIndexs(null)
        setEditingEvent(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSelect = (index: number) => {
    setSelectedIndexs(selectedIndex === index ? null : index)
    setEditingEvent(null)
  }

  const handleEdit = (index: number, subtext: string) => {
    setEditingEvent(index)
    setEditedSubtext(subtext)
  }

  const handleSave = (index: number) => {
    setEvents(events.map((event, index) => 
      editingEvent ==  index ? { ...event, description: editedSubtext } : event
    ))
    setEditingEvent(null)
  }

  const handleOption1 = async () => {
    console.log('Option 1 selected')
    await DownloadICS(events)
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
        {events.map((event, index) => (
          <li
            key={index}
            className={`bg-card rounded-lg shadow-sm transition-all duration-300 ease-in-out p-3
              ${selectedIndex === index ? 'ring-2 ring-primary' : ''}
            `}
          >
            <div className="flex items-center">
              <div
                className={`w-5 h-5 rounded-full border-2 border-primary mr-3 flex items-center justify-center cursor-pointer
                  ${selectedIndex === index ? 'bg-primary' : 'bg-background'}
                `}
                onClick={() => handleSelect(index)}
              >
                {selectedIndex === index && <Check className="text-primary-foreground w-3 h-3" />}
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold tracking-tighter">{event.title}</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2"
                    onClick={() => handleEdit(index, event.description)}
                  >
                    <Edit className="w-4 h-4" />
                    <span className="sr-only">Edit Options</span>
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground text-gray-500">{event.date}</div>
                {(selectedIndex === index || editingEvent === index) && (
                  <div className="mt-2 text-sm text-gray-700">{event.description}</div>
                )}
              </div>
            </div>
            {editingEvent === index && (
              <div className="mt-2">
                <Input
                  value={editedSubtext}
                  onChange={(e) => setEditedSubtext(e.target.value) }
                  className="mb-2"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSave(index)}
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

