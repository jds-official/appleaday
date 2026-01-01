// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Apple from '@/components/Apple';
import Calendar, { AppleDay } from '@/components/Calendar';
import { getApples } from '@/sanity/lib/sanity';

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<string>('2026-01-01');
  const [appleData, setAppleData] = useState<AppleDay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchApples() {
      try {
        const apples = await getApples();
        setAppleData(apples);

        // Set first apple as default if available
        if (apples.length > 0) {
          setSelectedDate(apples[0].date);
        }
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
  if (appleData.length === 0) {
    return (
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8 mt-8">
          An Apple A Day – JDS Fun-A-Day Hudson Valley 2026
        </h1>
        <div className="text-xl">COMING SOON.</div>
      </div>
    );
  }
  return (
    <div>
      <main>
        <div className="text-center mt-12 md:mt-8">
          <h1 className="text-xl md:w-full md:text-4xl font-bold">
            An Apple A Day
            <br /> JDS Fun-A-Day Hudson Valley 2026
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
