// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Apple from '@/components/Apple';
import Calendar, { AppleDay } from '@/components/Calendar';
import { getApples } from '@/sanity/lib/sanity';

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    return new Date().toISOString().split('T')[0];
  });
  const [appleData, setAppleData] = useState<AppleDay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchApples() {
      try {
        const apples = await getApples();
        setAppleData(apples);
      } catch (error) {
        console.error('Error fetching apples:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchApples();
  }, []);

  // Find the apple data for the selected date
  const currentApple = appleData.find((apple) => apple.date === selectedDate);
  const displayDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${month}/${day}/${year}`;
  };
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading apples...</div>
      </div>
    );
  }
  if (!currentApple) {
    return (
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8 mt-8">
          An Apple A Day – JDS Fun-A-Day Hudson Valley 2026
        </h1>
        <div className="text-xl">
          No apple posted yet today! Check back later or use the calendar to
          browse previous apples.
        </div>
        <Calendar
          appleData={appleData}
          currentDate={selectedDate}
          onDateSelect={setSelectedDate}
        />
      </div>
    );
  }
  return (
    <div>
      <main>
        <div className="text-center mt-12 md:mt-8">
          <h1 className="text-xl m-auto w-[70vw] md:w-full md:text-2xl font-bold">
            An Apple A Day – JDS Fun-A-Day Hudson Valley 2026
          </h1>
        </div>
        <Calendar
          appleData={appleData}
          currentDate={selectedDate}
          onDateSelect={setSelectedDate}
        />

        {currentApple && (
          <Apple
            appleName={currentApple.appleName}
            appleDate={displayDate(currentApple.date)}
            stats={currentApple.stats}
            accentColor={currentApple.accentColor || '#ec1d25'}
            description={currentApple.description}
            imageUrl={currentApple.imageUrl}
          />
        )}
      </main>
    </div>
  );
}
