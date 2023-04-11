import React, { useState } from "react";
import { calender, months } from "./calendarHelper.js";
import EmptyDays from "./EmptyDays.js";
import { v4 as uuidV4 } from "uuid";
import "./calendarStyles.css";
import { MdArrowForwardIos, MdOutlineArrowBackIos } from "react-icons/md";

const Calendar = () => {
  // State Variables
  const [selectedDate, setSelectedDate] = useState(null);
  // Constants
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let selectedYear, selectedMonth;

  // State Variables
  const [calendarInfo, setCalendarInfo] = useState(
    calender(selectedYear, selectedMonth)
  );

  // Helper Functions
  const preventGoingToLastMonth = () => {
    let solution =
      calendarInfo.calender[0].available || lastMonth().calender[0].available;
    return solution;
  };

  const lastMonth = () => {
    const year =
      calendarInfo.monthNumber === 0
        ? calendarInfo.year - 1
        : calendarInfo.year;
    const month = year < calendarInfo.year ? 11 : calendarInfo.monthNumber - 1;
    return calender(year, month);
  };

  const decreaseMonth = () => {
    setCalendarInfo((state) => {
      let year = state.monthNumber === 0 ? state.year - 1 : state.year;
      let month = year < state.year ? 11 : state.monthNumber - 1;
      return calender(year, month);
    });
  };

  const increaseMonth = () => {
    setCalendarInfo((state) => {
      let year = state.monthNumber === 11 ? state.year + 1 : state.year;
      let month = year > state.year ? 0 : state.monthNumber + 1;
      return calender(year, month);
    });
  };

  const dateToString = (day, month, year) => `${months[month]} ${day}, ${year}`;

  const selectDay = (day, month, year) => {
    let selectedDay = dateToString(day, month, year);
    setSelectedDate(() => selectedDay);
    console.log(selectedDay);
  };

  return (
    <section className="darkOverlay">
      <div className="calendarWrapper">
        <div className="calendarContainer">
          <section>
            <div className="monthAndYear">
              <div>
                {calendarInfo.month} {calendarInfo.year}
              </div>
              <div className="nextButtons">
                {preventGoingToLastMonth() ? (
                  <MdOutlineArrowBackIos
                    onClick={decreaseMonth}
                    className="arrowButton"
                  />
                ) : (
                  <MdOutlineArrowBackIos className="arrowButtonDisabled" />
                )}
                <MdArrowForwardIos
                  onClick={increaseMonth}
                  className="arrowButton"
                />
              </div>
            </div>
            <div className="calendarGrid">
              {days.map((day) => (
                <span className="calendarSlot" key={uuidV4()}>
                  {day}
                </span>
              ))}
              <EmptyDays calenderInfo={calendarInfo} days={days} />
              {calendarInfo.calender.map(({ day, available, year }) => (
                <span
                  key={uuidV4()}
                  className={
                    !available
                      ? "unavailableDay"
                      : selectedDate ===
                        dateToString(day, calendarInfo.monthNumber, year)
                      ? "availableDay selected"
                      : "availableDay"
                  }
                  onClick={() => selectDay(day, calendarInfo.monthNumber, year)}
                >
                  {day}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default Calendar;
