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
      console.log(req.body)
      const eventData = await req.json();

      const event = await calendar.events.insert({
        calendarId: "primary",
        requestBody: eventData,
      });
      
      return NextResponse.json(event.data);
    } catch (error) {
      console.error("Error creating event:", error);
      return NextResponse.json(
        { error: "Failed to create event" },
        { status: 500 }
      );
    }
  }
  