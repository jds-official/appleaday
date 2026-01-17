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

  // Keyboard navigation and touch/swipe support
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Find current apple index
      const currentIndex = appleData.findIndex(
        (apple) => apple.date === selectedDate
      );
      if (currentIndex === -1) return;

      if (e.key === 'ArrowLeft') {
        // Go to previous apple (earlier date)
        if (currentIndex > 0) {
          setSelectedDate(appleData[currentIndex - 1].date);
        }
      } else if (e.key === 'ArrowRight') {
        // Go to next apple (later date)
        if (currentIndex < appleData.length - 1) {
          setSelectedDate(appleData[currentIndex + 1].date);
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    };

    const handleSwipe = () => {
      const currentIndex = appleData.findIndex(
        (apple) => apple.date === selectedDate
      );
      if (currentIndex === -1) return;

      const swipeThreshold = 50; // Minimum distance for a swipe
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swiped left - go to next apple (later date)
          if (currentIndex < appleData.length - 1) {
            setSelectedDate(appleData[currentIndex + 1].date);
          }
        } else {
          // Swiped right - go to previous apple (earlier date)
          if (currentIndex > 0) {
            setSelectedDate(appleData[currentIndex - 1].date);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [appleData, selectedDate]);

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
          <div key={selectedDate} className="animate-fade-in">
            <Apple
              appleName={currentApple.appleName}
              appleDate={displayDate(currentApple.date)}
              stats={currentApple.stats}
              accentColor={currentApple.accentColor || '#ec1d25'}
              description={currentApple.description}
              imageUrl={currentApple.imageUrl}
            />
          </div>
        )}{' '}
        <p className="text-center text-md mt-8 mb-12 mx-4 md:mx-0">
          Use the arrow keys or swipe to navigate between apples!
        </p>
        <p className="text-center text-xs">
          This was made in January 2026 by&nbsp;
          <a
            className="text-blue-900 font-bold border-b-2 border-transparent hover:border-blue-900 focus:border-blue-900 transition-colors duration-300"
            href="https://www.jamesdavidsaul.net"
            target="_blank"
          >
            James David Saul
          </a>
        </p>
      </main>
    </div>
  );
}
