'use server'
/**
 
Server Actions to parse text from file and generate events objects
*/

// import { openai } from '@ai-sdk/openai'; // Importing the OpenAI SDK
import { z } from 'zod'; // Importing Zod for schema validation
import { openai } from "@ai-sdk/openai"
import { generateObject } from 'ai'; // Importing utility functions from the 'ai' module
import ical, { ICalEventData } from 'ical-generator';
import { PROMPTGEN } from '../content/ai_prompts';

export async function generateEvents(content: string) {
  const { object } = await generateObject({
    model: openai("gpt-4o-2024-08-06"),
    schema: z.object({
      events: z.array(
        z.object({
          title: z.string().describe("The title of the event"),
          startDateTime: z.string().describe("The start date and time of the event in ISO 8601. If no time is found, set it to 1 am."),
          endDateTime: z.string().describe("The end date and time of the event. If no time is found, set it to 11:59 pm."),
          description: z.string().describe("Any descriptive information -- locations, links, etc."),
          timed: z.boolean().describe("Whether the event has a specific time or is an all-day event."),
        }) )}
    ),
    prompt: PROMPTGEN(content)
    ,
  })
  return (object);
}

export async function convertEventsToICS(events: Array<{ title: string; date: string; time: string; description: string }>) {
  const calendar = ical({ name: 'Generated Events Calendar' });

  events.forEach(event => {
    const [year, month, day] = event.date.split('-').map(Number);
    const [hour, minute] = event.time.split(':').map(Number);

    calendar.createEvent({
      start: new Date(year, month - 1, day, hour, minute),
      end: new Date(year, month - 1, day, hour + 1, minute), // Assuming 1-hour duration if no end time provided
      summary: event.title,
      description: event.description,
    } as ICalEventData);
  });

  // Return the ICS data as a string
  return calendar.toString();
}
