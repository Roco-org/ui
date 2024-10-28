// components/Calendar.tsx
import React, { useEffect, useState } from "react";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameMonth,
  isToday,
  parse,
  isAfter,
  isBefore,
} from "date-fns";

interface CalendarProps {
  startDate: Date | null;
  endDate: Date | null;
  onDateRangeChange: (start: Date | null, end: Date | null) => void;
}

function classNames(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

const colStartClasses: string[] = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

const Calendar: React.FC<CalendarProps> = ({ startDate, endDate, onDateRangeChange }) => {
  const [currentMonth, setCurrentMonth] = useState<string>(
    startDate ? format(startDate, "MMM-yyyy") : format(new Date(), "MMM-yyyy")
  );

  // Update currentMonth if startDate changes
  useEffect(() => {
    if (startDate) {
      setCurrentMonth(format(startDate, "MMM-yyyy"));
    }
  }, [startDate]);

  const firstDayCurrentMonth: Date = parse(currentMonth, "MMM-yyyy", new Date());

  const days: Date[] = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  // Arrow functions to prevent function declarations inside blocks
  const previousMonth = (): void => {
    const firstDayPrevMonth: Date = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayPrevMonth, "MMM-yyyy"));
  };

  const nextMonth = (): void => {
    const firstDayNextMonth: Date = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  };

  // Function to handle day selection
  const handleDayClick = (day: Date): void => {
    const today: Date = new Date();

    if (isAfter(day, today)) {
      // Do not allow selecting future dates
      return;
    }

    if (!startDate || (startDate && endDate)) {
      // Start a new selection
      onDateRangeChange(day, null);
    } else if (isBefore(day, startDate)) {
      // Reset start date if a day before the start is clicked
      onDateRangeChange(day, null);
    } else if (isEqual(day, startDate)) {
      // Deselect if the same day is clicked again
      onDateRangeChange(null, null);
    } else {
      // Set end date
      onDateRangeChange(startDate, day);
    }
  };

  // Function to check if a day is within the selected range
  const isInRange = (day: Date): boolean => {
    if (startDate && endDate) {
      return isAfter(day, startDate) && isBefore(day, endDate);
    }
    return false;
  };

  return (
    <div className="pt-2">
      <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
        {/* Calendar Header */}
        <div>
          <div className="flex items-center">
            <h2 id="calendar-title" className="flex-auto font-semibold text-gray-900">
              {format(firstDayCurrentMonth, "MMMM yyyy")}
            </h2>
            <button
              type="button"
              onClick={previousMonth}
              className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              aria-label="Previous month"
            >
              {/* Previous Month Icon */}
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <button
              onClick={nextMonth}
              type="button"
              className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              aria-label="Next month"
            >
              {/* Next Month Icon */}
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>

          {/* Weekday Labels */}
          <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
            <div>S</div>
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 mt-2 text-sm">
            {days.map((day, dayIdx) => (
              <div
                key={day.toString()}
                className={classNames(
                  dayIdx === 0 && colStartClasses[getDay(day)],
                  "py-1.5"
                )}
              >
                <button
                  type="button"
                  onClick={() => handleDayClick(day)}
                  className={classNames(
                    // Start Date
                    startDate && isEqual(day, startDate) && "text-white bg-black rounded-l-full",
                    // End Date
                    endDate && isEqual(day, endDate) && "text-white bg-black rounded-r-full",
                    // In-Range Dates
                    isInRange(day) && "bg-gray-300",
                    // Today
                    isToday(day) && "border border-red-300",
                    // Dates in Current Month
                    startDate &&
                      endDate &&
                      !isEqual(day, startDate) &&
                      !isEqual(day, endDate) &&
                      isSameMonth(day, firstDayCurrentMonth) &&
                      "text-gray-900",
                    // Dates Outside Current Month
                    !isSameMonth(day, firstDayCurrentMonth) && "text-gray-400",
                    // Common Styles
                    "mx-auto flex h-8 w-8 items-center justify-center relative hover:bg-gray-200 transition-colors"
                  )}
                >
                  <time dateTime={format(day, "yyyy-MM-dd")}>
                    {format(day, "d")}
                  </time>

                  {/* Add a dot for today */}
                  {isToday(day) && (
                    <span className="absolute bottom-0 right-0 block h-1 w-1 rounded-full bg-red-500"></span>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Removed PropTypes as TypeScript handles prop validation
export default Calendar;
