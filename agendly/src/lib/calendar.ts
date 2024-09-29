import { EventInterface } from "@/app/utils/types";

export async function saveEventsToCalendar(events: EventInterface[]) {
  
  console.log('Saving events to calendar');
  const res = await fetch("/api/calendar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(events),
    credentials: "include",
  });
    const data = await res.json();
    if (res.ok) {
        console.log('Events saved successfully');
        return true;
    } else {
        console.error(data.error);
        return false;
    }
}