export const formatDate = (dateString: number): string => {
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
  dateString1: number,
  dateString2: number,
): boolean => {
  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);

  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDay() === date2.getDay()
  );
};

export const getHoursMins = (dateString: number): string => {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

const stripTimeFromDate = (date: Date) => {
  // Create a new date with the same year, month, and day, but with the time set to midnight.
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

export const findCurrentGameWeek = (dateStrings: number[]): number => {
  const dates: Date[] = dateStrings.map((dateString) => new Date(dateString));

  const currentDate: Date = new Date();
  for (let i = 0; i < dates.length; i++) {
    if (currentDate <= dates[i]) {
      console.log(dates[i]);
      return i == 0 ? 0 : i;
    }
  }
  return dates.length > 0 ? dates.length - 1 : 0;
};
