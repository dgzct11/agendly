export function validateDateTimeString(dateTimeString: string) {
    //if the string is longer than 19 characters, return the first 16
    if (dateTimeString.length > 19) {
        return dateTimeString.substring(0, 19);
    }
    return dateTimeString;
}