'use client'

import { useState, useRef, useEffect } from 'react'
import { Edit, RefreshCw, Save, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DownloadICS } from "../downloadICS"
import { EventInterface } from '@/app/utils/types'
import { saveEventsToCalendar } from '@/lib/calendar'
import Link from 'next/link'
import { toast } from 'react-toastify'

interface ResultsComponentProps {
  events: EventInterface[],
  setEvents: (events: EventInterface[]) => void,
  calendarTitle: string,
  setCalendarTitle: (title: string) => void
}

export default function ResultsComponent({events, setEvents, calendarTitle, setCalendarTitle}: ResultsComponentProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [editingEvent, setEditingEvent] = useState<number | null>(null)
  const [editingTitle, setEditingTitle] = useState(false)
  const [editedDescription, setEditedDescription] = useState<string>('')
  const [editedTitle, setEditedTitle] = useState<string>('')
  const [editedStartDate, setEditedStartDate] = useState<string>('')
  const [editedEndDate, setEditedEndDate] = useState<string>('')
  const [googleCalendarLoading, setGoogleCalendarLoading] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setSelectedIndex(null)
        setEditingEvent(null)
        setEditingTitle(false)
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

  const handleEdit = (index: number, event: EventInterface) => {
    setEditingEvent(index)
    setEditedDescription(event.description)
    setEditedTitle(event.title)
    setEditedStartDate(event.startDateTime)
    setEditedEndDate(event.endDateTime)
  }

  const handleSave = (index: number) => {
    setEvents(events.map((event, i) => 
      i === index ? { ...event, description: editedDescription, title: editedTitle, startDateTime: editedStartDate, endDateTime: editedEndDate } : event
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
    toast.success('Events downloaded as .ICS file');
  }

  const handleOption2 = async () => {
    setGoogleCalendarLoading(true)
    await saveEventsToCalendar(events, calendarTitle)
    setGoogleCalendarLoading(false);
    toast.success('Events synced to Google Calendar');
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
      {editingTitle ? (
        <div className="flex items-center justify-center mb-6">
          <Input
            value={calendarTitle}
            onChange={(e) => setCalendarTitle(e.target.value)}
            className="text-3xl font-bold text-center tracking-tighter"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setEditingTitle(false)}
            className="ml-2"
          >
            <Save className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <h1 
          className="text-3xl font-bold mb-6 text-center tracking-tighter cursor-pointer"
          onClick={() => setEditingTitle(true)}
        >
          {calendarTitle}
        </h1>
      )}

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
                    handleEdit(index, event)
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
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="mb-2"
                  placeholder="Event Title"
                />
                <Input
                  type="datetime-local"
                  value={editedStartDate}
                  onChange={(e) => setEditedStartDate(e.target.value)}
                  className="mb-2"
                />
                <Input
                  type="datetime-local"
                  value={editedEndDate}
                  onChange={(e) => setEditedEndDate(e.target.value)}
                  className="mb-2"
                />
                <Input
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  className="mb-2"
                  placeholder="Event Description"
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
        {
          googleCalendarLoading ? (
            <Button className='bg-blue-500 ' disabled>
              <RefreshCw className="animate-spin w-5 h-5 mr-2" />
              Syncing to Google Calendar
            </Button>
          ) : (
            <Button onClick={handleOption2} className='bg-blue-500 '>Sync to Google Calendar</Button>
          )
        }

      </div>
      <Link href="/upload_file" passHref className='mt-2 flex justify-center space-x-4'>
          <Button className='bg-blue-500 w-[340px] '>Upload More</Button>
        </Link>
    </div>
  )
}
