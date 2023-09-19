import { gameWeekSchedule } from "../constants/gameWeekSchedule";

export const formatDate = (dateString: string): string => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(dateString);
  const dayOfWeek = daysOfWeek[date.getDay()];
  const dayOfMonth = date.getDate();
  const monthOfYear = monthsOfYear[date.getMonth()];

  const year = date.getFullYear();

  return `${dayOfWeek} ${dayOfMonth} ${monthOfYear} ${year}`;
};

export const isSameDay = (
  dateString1: string,
  dateString2: string
): boolean => {
  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);

  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDay() === date2.getDay()
  );
};


export const getHoursMins = (dateString: string): string => {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

const stripTimeFromDate = (date: Date) => {
  // Create a new date with the same year, month, and day, but with the time set to midnight.
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

export const findCurrentGameWeek = (dateStrings: string[]): number => {
  const dates: Date[] = dateStrings.map((dateString) =>
    stripTimeFromDate(new Date(dateString))
  );
  const currentDate: Date = new Date();
  for (let i = 0; i < dates.length; i++) {
    if (dates[i] >= currentDate) {
      return i == 0 ? 0 : i - 1;
    }
  }
  return dates.length > 0 ? dates.length - 1 : 0;
};

export const getFixtureGameWeekIndex = (inputDate: string): number => {
  const parsedInputDate = new Date(inputDate);

  // Check if the input date is before the first date in the array
  if (parsedInputDate < new Date(gameWeekSchedule[0])) {
    return 0;
  }

  // Check if the input date is after the last date in the array
  if (
    parsedInputDate > new Date(gameWeekSchedule[gameWeekSchedule.length - 1])
  ) {
    return gameWeekSchedule.length - 1;
  }

  // Iterate through the array to find the index of the input date
  for (let i = 0; i < gameWeekSchedule.length; i++) {
    const currentDate = new Date(gameWeekSchedule[i]);

    // If the input date is equal to or after the current date, continue
    if (parsedInputDate >= currentDate) {
      continue;
    }

    // If the input date is before the current date, return the previous index
    return i - 1;
  }

  // If the input date is not found (unlikely in this case), return -1
  return -1;
};
