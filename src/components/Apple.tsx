'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

// TypeScript types
export type StatRank = 'E' | 'D' | 'C' | 'B' | 'A' | 'S';

export interface AppleStats {
  crunchiness: StatRank;
  sweetness: StatRank;
  durability: StatRank;
  crispiness: StatRank;
  vibes: StatRank;
  appleal: StatRank;
}

interface AppleStatsChartProps {
  appleName: string;
  appleDate: string;
  stats: AppleStats;
  accentColor?: string;
  description?: string;
}

// Rank to numeric value mapping for visualization
const rankToValue: Record<StatRank, number> = {
  E: 1,
  D: 2,
  C: 3,
  B: 4,
  A: 5,
  S: 6,
};

const AppleStatsChart: React.FC<AppleStatsChartProps> = ({
  appleName,
  appleDate,
  stats,
  accentColor = '#ef4444',
  description,
}) => {
  // Animation state: starts at 0, grows to 1
  const [animationProgress, setAnimationProgress] = useState(0);

  const statOrder: (keyof AppleStats)[] = [
    'sweetness',
    'crunchiness',
    'vibes',
    'durability',
    'crispiness',
    'appleal',
  ];

  // Animation effect
  useEffect(() => {
    // ANIMATION TIMING CONFIG:
    const animationDuration = 1000; // Change this to make animation faster (lower) or slower (higher) in milliseconds
    const animationDelay = 300; // Change this to delay the start of animation in milliseconds

    const startTime = Date.now() + animationDelay;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);

      // EASING FUNCTION: Controls the animation curve
      // Current: easeOutCubic - starts fast, ends slow
      // Other options:
      // - Linear: progress (no easing, constant speed)
      // - easeOutQuad: 1 - (1 - progress) ** 2 (gentle deceleration)
      // - easeOutQuart: 1 - (1 - progress) ** 4 (strong deceleration)
      // - easeInOutCubic: progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2 (slow start and end)
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic

      setAnimationProgress(eased);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const timer = setTimeout(animate, animationDelay);
    return () => clearTimeout(timer);
  }, [stats]);
  // Calculate hexagon points for the stat overlay
  const getHexagonPoints = (values: number[]): string => {
    const centerX = 150;
    const centerY = 150;
    const maxRadius = 120;
    const angleStep = (Math.PI * 2) / 6;

    return values
      .map((value, i) => {
        const angle = angleStep * i - Math.PI / 2;
        const radius = (value / 6) * maxRadius;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        return `${x},${y}`;
      })
      .join(' ');
  };

  // Get base hexagon points (max values)
  const basePoints = getHexagonPoints([6, 6, 6, 6, 6, 6]);

  // Get stat values for the filled polygon
  const statValues = statOrder.map((key) => rankToValue[stats[key]]);

  // Apply animation progress to stat values
  // This multiplies each stat by the animation progress (0 to 1)
  const animatedStatValues = statValues.map(
    (value) => value * animationProgress
  );
  const statPoints = getHexagonPoints(animatedStatValues);

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold text-slate-800 text-center mt-6 mb-6">
        {appleName} – {appleDate}
      </h2>

      <div className="flex flex-col lg:flex-row gap-8 justify-center items-center">
        {/* Chart Section - 80% width on desktop */}
        <div className="w-full lg:w-2/4 flex justify-center">
          <svg viewBox="-50 -50 400 400" className="w-full h-auto max-w-2xl">
            {/* Grid lines */}
            {[1, 2, 3, 4, 5, 6].map((level) => {
              const points = getHexagonPoints(Array(6).fill(level));
              return (
                <polygon
                  key={level}
                  points={points}
                  fill="none"
                  stroke="#cbd5e1"
                  strokeWidth="1"
                />
              );
            })}

            {/* Axis lines */}
            {statOrder.map((_, i) => {
              const angle = ((Math.PI * 2) / 6) * i - Math.PI / 2;
              const x = 150 + 120 * Math.cos(angle);
              const y = 150 + 120 * Math.sin(angle);
              return (
                <line
                  key={i}
                  x1="150"
                  y1="150"
                  x2={x}
                  y2={y}
                  stroke="#cbd5e1"
                  strokeWidth="1"
                />
              );
            })}

            {/* Base hexagon */}
            <polygon
              points={basePoints}
              fill="none"
              stroke="#94a3b8"
              strokeWidth="2"
            />

            <circle
              cx="150"
              cy="150"
              r="180"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="3"
            />

            {/* Stat overlay - ANIMATED */}
            <polygon
              points={statPoints}
              fill={accentColor}
              fillOpacity="0.3"
              stroke={accentColor}
              strokeWidth="3"
              strokeLinejoin="round"
              style={{ transition: 'all 0.05s ease-out' }}
            />

            {/* Stat labels */}
            {statOrder.map((key, i) => {
              const angle = ((Math.PI * 2) / 6) * i - Math.PI / 2;
              const x = 150 + 140 * Math.cos(angle);
              const y = 150 + 140 * Math.sin(angle);
              const isBottomHalf = Math.sin(angle) > 0;

              const rotationAngle = !isBottomHalf
                ? (angle * 180) / Math.PI + 90
                : (angle * 180) / Math.PI + -90;
              return (
                <g key={key} transform={`rotate(${rotationAngle}, ${x}, ${y})`}>
                  {/* Label */}
                  <text
                    x={x}
                    y={isBottomHalf ? y + 25 : y - 20}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className={`${key} text-sm font-semibold fill-slate-700 capitalize`}
                  >
                    {key}
                  </text>

                  {/* Apple emoji */}
                  <text
                    x={x}
                    y={isBottomHalf ? y - 5 : y + 10}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className={`text-4xl`}
                  >
                    🍎
                  </text>

                  {/* Rank on apple */}
                  <text
                    x={x}
                    y={isBottomHalf ? y - 5 : y + 10}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-sm font-bold fill-white"
                    style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.8))' }}
                  >
                    {stats[key]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Description Section - 20% width on desktop */}
        {description && (
          <div className="w-full lg:w-1/4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-slate-700 font-bold leading-relaxed whitespace-pre-line">
                <Image
                  className="mx-auto"
                  src="/apples/cosmic-crisp.png"
                  alt={`Image of ${appleName} apple`}
                  width={300}
                  height={300}
                />
                {description}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppleStatsChart;
