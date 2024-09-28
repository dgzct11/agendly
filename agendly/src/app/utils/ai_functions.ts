/**
 *  Server Actions to parse text from file and generate events objects
 * 
 * 
 */

import { openai } from '@ai-sdk/openai'; // Importing the OpenAI SDK
import { convertToCoreMessages, generateText, streamText } from 'ai'; // Importing utility functions from the 'ai' module
import { z } from 'zod'; // Importing Zod for schema validation

// Define the POST function to handle incoming requests
export async function generateEvents(textData: string) {
  
  // Call the streamText function to generate a response using the OpenAI model
  const result = await streamText({
    model: openai('gpt-4o'), // Specify the model to use
    system: QUIZ_AGENT_PROMPT, // Provide the system prompt
    prompt: textData,
    tools: {
      generateQuizQuestion: {
        description: 'Generate a multiple choice quiz question where each answer is a list of countries', // Description of the tool
        parameters: z.object({
          question: z.string().describe("The question to ask the user"), // Schema for the question parameter
          number: z.number().describe("The number of the question generated."), // Schema for the number parameter
          options: z.array(z.string()).describe("The list of possible answers, with each one being a country's name"), // Schema for the options parameter
          answer: z.string() // Schema for the answer parameter
        })
      }
    }
  });

  return result;
}