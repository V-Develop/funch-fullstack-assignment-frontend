import { GetBookedDate } from "@/model/user";

export function getDatesBetween(startdate: Date, enddate: Date): Date[] {
  const startDateObj = new Date(startdate);
  const endDateObj = new Date(enddate);
  const dates: Date[] = [];

  let currentDate = startDateObj;

  while (currentDate <= endDateObj) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

export function getAllBookedDates(bookings: GetBookedDate[]): Date[] {
  const allDates: Date[] = [];

  for (const booking of bookings) {
      const checkinDate = new Date(booking.checkin_at);
      const checkoutDate = new Date(booking.checkout_at);
      const datesBetween = getDatesBetween(checkinDate, checkoutDate);

      allDates.push(...datesBetween);
  }
  
  return allDates;
}

export function hasUnallowedDates(startdate: Date | null, enddate: Date | null, unallowedDates: Date[] | undefined): boolean {
  if(startdate == null || enddate == null || unallowedDates == undefined) {
    return false
  }
  const datesBetween = getDatesBetween(startdate, enddate);

  for (const date of datesBetween) {
      if (unallowedDates.some(unallowedDate => isSameDate(unallowedDate, date))) {
          return true;
      }
  }

  return false;
}

export function isSameDate(date1: Date, date2: Date): boolean {
  return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
  );
}
