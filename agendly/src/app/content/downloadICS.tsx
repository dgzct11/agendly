import {convertEventsToICS} from '../utils/ai_functions'


export async function DownloadICS(events: Array<{ title: string; date: string; time: string; description: string }>) {
    // Wait for the ICS data to be generated
    const icsData = await convertEventsToICS(events);
    
    // Create a Blob for the ICS file
    const blob = new Blob([icsData], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    
    // Create a link element for downloading the ICS file
    const a = document.createElement('a');
    a.href = url;
    a.download = 'events.ics';
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // Revoke the object URL to free up memory
    
    return null; // Return null or empty fragment
}
