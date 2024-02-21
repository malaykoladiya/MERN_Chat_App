// This function takes a dateString as input and extracts the time from it.
export function extractTime(dateString){
    // Create a new Date object using the provided dateString.
    const date = new Date(dateString);
    // Get the hours from the date object and pad it with a leading zero if necessary.
    const hours = padZero(date.getHours());
    // Get the minutes from the date object and pad it with a leading zero if necessary.
    const minutes = padZero(date.getMinutes());
    // Return the formatted time string in the format "HH:MM".
    return `${hours}:${minutes}`;
}

// This function pads a number with a leading zero if it is a single digit.
function padZero(number) {
    // Convert the number to a string and use the padStart() method to add a leading zero if necessary.
    return number.toString().padStart(2, '0');
}