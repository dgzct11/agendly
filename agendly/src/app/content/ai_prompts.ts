export function PROMPTGEN(text: string) {
    return `
    Extract events from the following text and convert them to calendar entries. If there is no matching time for an event, set it to midnight.
    
    Example output: [ { "title": "Event Name", "date": "YYYY-MM-DD", "time": "HH:MM", "description": "Details about the event" } ]
    
    Text: '''${text}'''
    `

}