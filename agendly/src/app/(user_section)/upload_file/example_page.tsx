// app/page.tsx
"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session } = useSession();
  const [events, setEvents] = useState<any[]>([]);
  const [newEvent, setNewEvent] = useState({
    summary: "",
    description: "",
    start: { dateTime: "" },
    end: { dateTime: "" },
  });

  useEffect(() => {
    if (session) {
      fetch("/api/calendar", {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
            setEvents(data.items || []);
            console.log("Fetching data")
            console.log(data);
        })
        .catch((error) => console.error(error));
    }
  }, [session]);

  const handleCreateEvent = async () => {
    const res = await fetch("/api/calendar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
      credentials: "include",
    });
    const data = await res.json();
    if (res.ok) {
      setEvents([...events, data]);
      setNewEvent({
        summary: "",
        description: "",
        start: { dateTime: "" },
        end: { dateTime: "" },
      });
    } else {
      console.error(data.error);
    }
  };


  const handleStartDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    setNewEvent({
      ...newEvent,
      start: { dateTime: date.toISOString() },
    });
  };

  const handleEndDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    setNewEvent({
      ...newEvent,
      end: { dateTime: date.toISOString() },
    });
  };

  if (!session) {
    return (
      <div>
        <h1>Welcome to My Calendar App</h1>
        <button onClick={() => signIn("google")}>Sign in with Google</button>
      </div>
    );
  }

  return (
    <div>
      <p>Signed in as {session.user?.email}</p>
      <button onClick={() => signOut()}>Sign out</button>

      <h2>Your Upcoming Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.summary} -{" "}
            {new Date(event.start.dateTime).toLocaleString()}
          </li>
        ))}
      </ul>

      <h2>Create a New Event</h2>
      <input
        type="text"
        placeholder="Summary"
        value={newEvent.summary}
        onChange={(e) =>
          setNewEvent({ ...newEvent, summary: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Description"
        value={newEvent.description}
        onChange={(e) =>
          setNewEvent({ ...newEvent, description: e.target.value })
        }
      />
      <input
  type="datetime-local"
  value={newEvent.start.dateTime ? newEvent.start.dateTime.substring(0, 16) : ""}
  onChange={handleStartDateTimeChange}
/>
<input
  type="datetime-local"
  value={newEvent.end.dateTime ? newEvent.end.dateTime.substring(0, 16) : ""}
  onChange={handleEndDateTimeChange}
/>
      <button onClick={handleCreateEvent}>Create Event</button>
    </div>
  );
}
