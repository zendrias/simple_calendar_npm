import { generateEmptySpans } from "./calendarHelper.js";

const EmptyDays = ({ calenderInfo, days }) => {
  const firstDay = calenderInfo.calender[0].dayOfTheWeek;
  for (let i = 0; i < days.length; i += 1) {
    if (firstDay.includes(days[i])) return generateEmptySpans(i);
  }
  return null;
};

export default EmptyDays;
