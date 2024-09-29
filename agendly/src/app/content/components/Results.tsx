'use client'

import { useState, useRef, useEffect } from 'react'
import { Edit, RefreshCw, Save, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DownloadICS } from "../downloadICS"
import { EventInterface } from '@/app/utils/types'
import { saveEventsToCalendar } from '@/lib/calendar'
import Link from 'next/link'

interface ResultsComponentProps {
  events: EventInterface[],
  setEvents: (events: EventInterface[]) => void
}

export default function ResultsComponent({events, setEvents}: ResultsComponentProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [editingEvent, setEditingEvent] = useState<number | null>(null)
  const [editedDescription, setEditedDescription] = useState<string>('')

  //google calendar 
  const [googleCalendarLoading, setGoogleCalendarLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setSelectedIndex(null)
        setEditingEvent(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSelect = (index: number) => {
    setSelectedIndex(selectedIndex === index ? null : index)
    setEditingEvent(null)
  }

  const handleEdit = (index: number, description: string) => {
    setEditingEvent(index)
    setEditedDescription(description)
  }

  const handleSave = (index: number) => {
    setEvents(events.map((event, i) => 
      i === index ? { ...event, description: editedDescription } : event
    ))
    setEditingEvent(null)
  }

  const handleDelete = (index: number) => {
    setEvents(events.filter((_, i) => i !== index))
    setSelectedIndex(null)
    setEditingEvent(null)
  }

  const handleOption1 = () => {
    DownloadICS(events)
  }

  const handleOption2 = () => {
    saveEventsToCalendar(events)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    })
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl mt-20" ref={containerRef}>
      <h1 className="text-3xl font-bold mb-6 text-center tracking-tighter">Calendar Events</h1>

      <ul className="space-y-2">
        {events.map((event, index) => (
          <li
            key={index}
            className={`bg-card rounded-lg shadow-sm transition-all duration-300 ease-in-out p-3 cursor-pointer
              ${selectedIndex === index ? 'ring-2 ring-primary' : ''}
            `}
            onClick={() => handleSelect(index)}
          >
            <div className="flex items-center justify-between">
              <div className="flex-grow">
                <h2 className="text-lg font-semibold tracking-tighter">{event.title}</h2>
                <div className="text-sm text-muted-foreground text-gray-500">
                  {formatDate(event.startDateTime)}
                  {event.timed && ` - ${formatDate(event.endDateTime)}`}
                </div>
                {selectedIndex === index && editingEvent !== index && (
                  <div className="mt-2 text-sm text-gray-700">{event.description}</div>
                )}
              </div>
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-2"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleEdit(index, event.description)
                  }}
                >
                  <Edit className="w-4 h-4" />
                  <span className="sr-only">Edit Event</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-2 text-red-500 hover:text-red-700"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDelete(index)
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="sr-only">Delete Event</span>
                </Button>
              </div>
            </div>
            {editingEvent === index && (
              <div className="mt-2" onClick={(e) => e.stopPropagation()}>
                <Input
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
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
        <Button onClick={handleOption1}className='bg-blue-500'> Save as an .ICS</Button>
        {
          googleCalendarLoading ? (
            <Button className='bg-blue-500' disabled>
              <RefreshCw className="animate-spin w-5 h-5 mr-2" />
              Syncing to Google Calendar
            </Button>
          ) : (
            <Button onClick={handleOption2} className='bg-blue-500'>Sync to Google Calendar</Button>
          )
        }
        
      </div>
    </div>
  )
}
