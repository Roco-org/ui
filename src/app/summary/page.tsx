// pages/SummaryPage.tsx
"use client";
import { useTransactions } from "@/hooks/useTransactions";
import TransactionList from "@/components/TransactionList";
import Calendar from "@/components/Calendar"; // Ensure correct path
import FocusLock from "react-focus-lock"; // For accessibility

// Import date utilities
import { getLastMonday } from "@/utils/dateUtils"; // Adjust the path as needed
import { useEffect, useState } from "react";
import { format } from "date-fns"; // Ensure date-fns is installed

export default function SummaryPage() {
  // Calculate today and last Monday
  const today = new Date(); // Current date
  const lastMonday = getLastMonday(today); // Last Monday

  // State to manage startDate and endDate
  const [startDate, setStartDate] = useState<Date | null>(lastMonday);
  const [endDate, setEndDate] = useState<Date | null>(today);

  // State to manage Calendar visibility
  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  // Use the custom hook with dynamic dates
  const {
    transactions,
    totalAmount,
    averageAmount,
    maxAmount,
    avgTransactionsPerDay,
    amountSpentToday,
    loading,
    error,
  } = useTransactions(startDate, endDate);

  // Optionally, format dates for display
  const formattedStartDate = startDate ? format(startDate, "MMM d") : "";
  const formattedEndDate = endDate ? format(endDate, "MMM d") : "";

  // Function to handle date range changes from Calendar
  const handleDateRangeChange = (newStartDate: Date | null, newEndDate: Date | null) => {
    if (newStartDate && newEndDate) {
      // Only update if endDate has changed
      const isEndDateChanged =
        !endDate ||
        format(newEndDate, "yyyy-MM-dd") !== format(endDate, "yyyy-MM-dd");

      if (isEndDateChanged) {
        setStartDate(newStartDate);
        setEndDate(newEndDate);
        setShowCalendar(false); // Close modal only when both dates are selected
      }
    } else if (newStartDate && !newEndDate) {
      // If only start date is selected, set startDate and reset endDate
      setStartDate(newStartDate);
      setEndDate(null); // Do not set endDate to prevent fetch
      // Do NOT close the modal here
    } else {
      // Handle cases where dates are deselected or invalid
      setStartDate(lastMonday);
      setEndDate(today);
      // Do NOT close the modal here
    }
    // Removed setShowCalendar(false) from here
  };

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowCalendar(false);
      }
    };

    if (showCalendar) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showCalendar]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-between">
      <main className="container mx-auto px-4 py-6">
        <div className="space-y-8">
          <div className="text-center">
            {/* Period Button */}
            <button
              className="bg-gray-200 text-black px-3 py-1 rounded-full text-sm"
              onClick={() => setShowCalendar(!showCalendar)}
            >
              Period: {formattedStartDate} - {formattedEndDate}
            </button>
            <div className="text-6xl font-bold mt-4">
              {new Intl.NumberFormat("es-CL", {
                style: "currency",
                currency: "CLP",
              }).format(totalAmount)}
            </div>
            <p className="text-lg text-gray-600 mt-2">Spent so far</p>
            <div className="flex justify-center mt-4">
              <button className="bg-black text-white px-4 py-2 rounded-l-full text-sm">
                Credit
              </button>
              <button className="bg-gray-300 text-black px-4 py-2 rounded-r-full text-sm">
                Debit
              </button>
            </div>
          </div>

          {/* Calendar Modal */}
          {showCalendar && (
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="calendar-title"
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300"
              onClick={() => setShowCalendar(false)}
            >
              <FocusLock>
                <div
                  className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 relative transform transition-transform duration-300"
                  onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
                >
                  {/* Close Button */}
                  <button
                    onClick={() => setShowCalendar(false)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    aria-label="Close calendar"
                  >
                    {/* Close Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>

                  {/* Calendar Component */}
                  <Calendar
                    startDate={startDate}
                    endDate={endDate}
                    onDateRangeChange={handleDateRangeChange}
                  />
                </div>
              </FocusLock>
            </div>
          )}

          {/* Loading and Error States */}
          {loading && (
            <div className="flex justify-center items-center">
              <svg
                className="animate-spin h-5 w-5 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              <span className="ml-2 text-blue-500">Loading transactions...</span>
            </div>
          )}
          {error && (
            <p className="text-center text-red-500">{error}</p>
          )}

          {/* Transaction List */}
          <TransactionList transactions={transactions} />
        </div>
      </main>
    </div>
  );
}
