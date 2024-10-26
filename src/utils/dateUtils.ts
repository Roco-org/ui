// Helper function to format dates as 'YYYY-MM-DD'
export const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

// Get today's date in 'YYYY-MM-DD' format
export const getToday = (): string => formatDate(new Date());

// Get the 19th of last month in 'YYYY-MM-DD' format
export const getLast19th = (): string => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // 0-based (0 = January)
  const currentDay = today.getDate();

  let targetYear = currentYear;
  let targetMonth = currentMonth;

  if (currentDay < 19) {
    // If current month is January, go to December of the previous year
    if (currentMonth === 0) {
      targetMonth = 11; // December
      targetYear = currentYear - 1;
    } else {
      targetMonth = currentMonth - 1;
    }
  }

  const targetDate = new Date(targetYear, targetMonth, 19);

  return formatDate(targetDate);
};

export const getMonthNames = (): {
  currentMonth: string;
  nextMonth: string;
} => {
  const currentDate = new Date();
  const monthIndex =
    currentDate.getDate() > 19
      ? currentDate.getMonth() + 1
      : currentDate.getMonth();

  const currentMonth = currentDate.toLocaleString("default", {
    month: "long",
    timeZone: "UTC",
  });

  const nextMonth = new Date(
    currentDate.getFullYear(),
    monthIndex
  ).toLocaleString("default", { month: "long", timeZone: "UTC" });

  return { currentMonth, nextMonth };
};

export const formatDateForDisplay = (dateStr: string): string => {
  // Validate the input format using a regular expression
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateStr)) {
    throw new Error('Invalid date format. Expected "YYYY-MM-DD".');
  }

  // Parse the date string
  const [year, month, day] = dateStr.split("-").map(Number);

  // Note: Months in JavaScript Date are zero-based (0 = January, 11 = December)
  const date = new Date(year, month - 1, day);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date.");
  }

  // Define options for formatting
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short", // "Oct"
    day: "numeric", // "23"
  };

  // Format the date
  return date.toLocaleDateString("en-US", options);
};
