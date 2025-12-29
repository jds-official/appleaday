'use client';

import React, { useState } from 'react';
import type { AppleStats } from './Apple';

// TypeScript types for apple calendar data
export type AppleDay = {
  date: string; // Format: 'YYYY-MM-DD' (e.g., '2026-01-01')
  appleName: string;
  slug: string; // URL-friendly version (e.g., 'honeycrisp')
  stats: AppleStats;
  description?: string;
  imageUrl?: string;
};

interface CalendarProps {
  appleData: AppleDay[];
  currentDate?: string; // Currently selected date
  onDateSelect?: (date: string) => void; // Callback when a date is clicked
  month?: number; // 0 = January, 1 = February, etc.
  year?: number;
}

const Calendar: React.FC<CalendarProps> = ({
  appleData = [],
  currentDate,
  onDateSelect,
  month = 0, // Default to January
  year = 2026, // Default to 2026
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Convert array to lookup object for quick access
  const appleByDate = appleData.reduce((acc, apple) => {
    // Extract MM-DD from YYYY-MM-DD
    const monthDay = apple.date.slice(5); // Gets '01-15' from '2026-01-15'
    acc[monthDay] = apple;
    return acc;
  }, {} as Record<string, AppleDay>);

  // Generate January 2026 calendar
  const generateCalendar = () => {
    const year = 2025;
    const month = 12; // January (0-indexed)

    // Get first day of month and total days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Create array of calendar cells
    const calendar = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      calendar.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      calendar.push(day);
    }

    return calendar;
  };

  const calendar = generateCalendar();
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handleDayClick = (day: number) => {
    const dateKey = `01-${String(day).padStart(2, '0')}`;
    const appleForDay = appleByDate[dateKey];

    if (appleForDay && onDateSelect) {
      onDateSelect(appleForDay.date);
      setIsExpanded(false); // Close calendar after selection
    }
  };

  return (
    <>
      {/* Calendar Icon - Fixed in top-right corner */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="fixed top-6 right-6 z-50 bg-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all hover:scale-110"
        aria-label="Toggle Calendar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-slate-700"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      </button>

      {/* Expanded Calendar View */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center p-4"
          onClick={() => setIsExpanded(false)}
        >
          <div
            className="bg-white rounded-lg shadow-2xl max-w-2xl w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              aria-label="Close Calendar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Calendar Header */}
            <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
              {monthNames[month]} {year}{' '}
            </h2>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {/* Week day headers */}
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="text-center font-semibold text-slate-600 text-sm py-2"
                >
                  {day}
                </div>
              ))}

              {/* Calendar days */}
              {calendar.map((day, index) => {
                if (day === null) {
                  return (
                    <div key={`empty-${index}`} className="aspect-square" />
                  );
                }

                const dateKey = `01-${String(day).padStart(2, '0')}`;
                const fullDate = `2026-${dateKey}`;
                const appleForDay = appleByDate[dateKey];
                const isCurrentDate = currentDate === fullDate;

                return (
                  <button
                    key={day}
                    onClick={() => handleDayClick(day)}
                    disabled={!appleForDay}
                    className={`
                      aspect-square border rounded-lg p-2 transition-all flex flex-col items-center justify-center
                      ${
                        appleForDay
                          ? 'border-slate-300 hover:bg-slate-50 hover:border-slate-400 cursor-pointer'
                          : 'border-slate-100 cursor-not-allowed opacity-40'
                      }
                      ${
                        isCurrentDate
                          ? 'bg-red-50 border-red-300 ring-2 ring-red-200'
                          : ''
                      }
                    `}
                  >
                    <span
                      className={`text-sm font-medium mb-1 ${
                        isCurrentDate ? 'text-red-600' : 'text-slate-700'
                      }`}
                    >
                      {day}
                    </span>
                    {appleForDay && (
                      <div className="text-2xl" title={appleForDay.appleName}>
                        🍎
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Calendar;
