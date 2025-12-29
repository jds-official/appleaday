// src/app/page.tsx
'use client';

import { useState } from 'react';
import Apple from '@/components/Apple';
import type { StatRank } from '@/components/Apple';
import Calendar, { AppleDay } from '@/components/Calendar';

// Hardcoded apple data - structured for easy Contentful migration
const APPLE_DATA: AppleDay[] = [
  {
    date: '2026-01-01',
    appleName: 'Honeycrisp',
    slug: 'honeycrisp',
    stats: {
      crunchiness: 'S' as StatRank,
      sweetness: 'A' as StatRank,
      durability: 'C' as StatRank,
      crispiness: 'A' as StatRank,
      vibes: 'E' as StatRank,
      appleal: 'A' as StatRank,
    },
    description:
      'The Honeycrisp apple is known for its exceptional crunchiness and balanced sweet-tart flavor.',
  },
  {
    date: '2026-01-02',
    appleName: 'Fuji',
    slug: 'fuji',
    stats: {
      crunchiness: 'A' as StatRank,
      sweetness: 'S' as StatRank,
      durability: 'B' as StatRank,
      crispiness: 'B' as StatRank,
      vibes: 'A' as StatRank,
      appleal: 'S' as StatRank,
    },
    description:
      'Fuji apples are incredibly sweet and crisp, making them perfect for snacking.',
  },
  {
    date: '2026-01-15',
    appleName: 'Granny Smith',
    slug: 'granny-smith',
    stats: {
      crunchiness: 'S' as StatRank,
      sweetness: 'D' as StatRank,
      durability: 'A' as StatRank,
      crispiness: 'S' as StatRank,
      vibes: 'B' as StatRank,
      appleal: 'B' as StatRank,
    },
    description:
      'Tart and crisp, Granny Smith apples are excellent for baking and add a nice contrast to sweet dishes.',
  },
  // Add more days here...
];

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<string>('2026-01-01'); // Default to Jan 1

  // Find the apple data for the selected date
  const currentApple = APPLE_DATA.find((apple) => apple.date === selectedDate);

  return (
    <div>
      <main>
        <Calendar
          appleData={APPLE_DATA}
          currentDate={selectedDate}
          onDateSelect={setSelectedDate}
        />

        {currentApple && (
          <Apple
            appleName={currentApple.appleName}
            stats={currentApple.stats}
            description={currentApple.description}
          />
        )}
      </main>
    </div>
  );
}
