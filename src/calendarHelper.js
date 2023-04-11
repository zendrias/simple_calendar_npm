// Be Able To Set A Default Value
// Month View Only
// Shouldn't See Days Of Another Month
import dayjs from "dayjs";
import { v4 as uuidV4 } from "uuid";

export const months = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

export const daysOfTheWeek = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

export const calender = (
  year = dayjs().year(),
  monthNumber = dayjs().month()
) => {
  const lastDayOfTheMonth = dayjs()
    .year(year)
    .month(monthNumber)
    .endOf("month");

  const calender = [];
  const month = months[monthNumber];

  for (let day = 1; day < lastDayOfTheMonth["$D"] + 1; day += 1) {
    const dayOfTheWeek =
      daysOfTheWeek[dayjs().year(year).month(monthNumber).date(day).day()];
    const date = new Date(`${month} ${day}, ${year}`);
    const currentDate = new Date();
    const dateData = {
      day,
      month,
      year,
      availableHours: [],
      dayOfTheWeek,
      available: currentDate <= date,
    };
    calender.push(dateData);
  }

  return { month, year, calender, monthNumber };
};

export const generateEmptySpans = (num) => {
  let spans = [];
  for (let i = 0; i < num; i += 1) {
    spans.push(<span key={uuidV4()}></span>);
  }
  return spans;
};
