import { CalendarDate, parseDate } from "@internationalized/date";

function stringToCalendarDate(val: string | null): CalendarDate | null {
  if (!val) return null;
  return parseDate(val);
}

function calendarDateToString(date: CalendarDate | null): string | null {
  if (!date) return null;
  return date.toString();
}

export { stringToCalendarDate, calendarDateToString };
