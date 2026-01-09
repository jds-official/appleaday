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

        // Check if there's an apple for today
        const today = new Date().toISOString().split('T')[0];
        const todayApple = apples.find(
          (apple: AppleDay) => apple.date === today
        );

        // If no apple for today, default to the most recent apple
        if (!todayApple && apples.length > 0) {
          // Apples are already sorted by date (order(date asc) in query)
          // So the last apple is the most recent
          const mostRecentApple = apples[apples.length - 1];
          setSelectedDate(mostRecentApple.date);
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
          An Apple A Day – JDS Fun-A-Day Hudson Valley 2026
        </h1>
        <div className="text-xl">COMING SOON.</div>
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
