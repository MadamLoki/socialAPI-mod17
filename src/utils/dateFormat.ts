export const dateFormat = (timestamp: Date): string => {
    // Create month array for getting month name
    const months: string[] = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    const formattedTimestamp = new Date(timestamp);

    // Get various components of the date
    const monthName: string = months[formattedTimestamp.getMonth()];
    const dayOfMonth: number = formattedTimestamp.getDate();
    const year: number = formattedTimestamp.getFullYear();
    let hour: number = formattedTimestamp.getHours();
    const minutes: string = formattedTimestamp.getMinutes().toString().padStart(2, '0');

    // Convert to 12-hour format
    const periodOfDay: string = hour >= 12 ? 'pm' : 'am';
    hour = hour % 12 || 12; // Convert 0 to 12

    // Build and return formatted timestamp string
    const formattedDate: string = `${monthName} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;

    return formattedDate;
};