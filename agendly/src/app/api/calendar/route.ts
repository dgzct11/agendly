// app/api/calendar/events/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getOAuth2Client } from "@/lib/google";
import { google } from "googleapis";

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  if (!token?.accessToken || !token?.refreshToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const oauth2Client = getOAuth2Client(
      token.accessToken as string,
      token.refreshToken as string
    );
    const calendar = google.calendar({ version: "v3", auth: oauth2Client });
    
    const events = await calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });
    
    return NextResponse.json(events.data);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  if (!token?.accessToken || !token?.refreshToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const oauth2Client = getOAuth2Client(
      token.accessToken as string,
      token.refreshToken as string
    );
    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    // Get the list of events from the request body
    const eventsData = await req.json();

    if (!Array.isArray(eventsData)) {
      return NextResponse.json(
        { error: "Request body must be an array of events" },
        { status: 400 }
      );
    }

    const createdEvents = [];
    const errors = [];

    for (const eventData of eventsData) {
      const parsedEventData = {
        summary: eventData.title,
        description: eventData.description,
        start: { dateTime: `${eventData.startDateTime}-07:00` },
        end: { dateTime: `${eventData.endDateTime}-07:00` },
      }
      try {
        const event = await calendar.events.insert({
          calendarId: "primary",
          requestBody: parsedEventData,
        });
        createdEvents.push(event.data);
      } catch (error: any) {
        console.error("Error creating event:", error);
        errors.push({ eventData, error: error.message });
      }
    }

    return NextResponse.json({ createdEvents, errors });
  } catch (error: any) {
    console.error("Error creating events:", error);
    return NextResponse.json(
      { error: "Failed to create events" },
      { status: 500 }
    );
  }
}