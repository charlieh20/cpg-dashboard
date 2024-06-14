export const dateString = (date: Date) => {
    const month = date.getMonth() + 1; // Months are zero-indexed, so we add 1
    const day = date.getDate();
    const year = date.getFullYear() % 100; // Get the last two digits of the year

    // Pad month and day with leading zeroes if necessary
    const monthStr = month < 10 ? '0' + month : month;
    const dayStr = day < 10 ? '0' + day : day;

    // Convert year to string and ensure it's two digits
    const yearStr = year < 10 ? '0' + year : year;

    // Construct the formatted date string
    return `${monthStr}/${dayStr}/${yearStr}`;
}


export function createDate(dateString: string) {
    // Split the date string into an array [YYYY, MM, DD]
    const dateParts = dateString.split('-');

    // Extract the year, month, and day from the array
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Months are zero-indexed in JavaScript Date
    const day = parseInt(dateParts[2], 10);

    // Create and return the Date object
    return new Date(year, month, day);
}