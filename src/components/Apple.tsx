import React from 'react';

// TypeScript types
type StatRank = 'E' | 'D' | 'C' | 'B' | 'A' | 'S';

interface AppleStat {
  label: string;
  rank: StatRank;
}

interface AppleStats {
  crunchiness: AppleStat;
  sweetness: AppleStat;
  durability: AppleStat;
  crispiness: AppleStat;
  vibes: AppleStat;
  appleal: AppleStat;
}

interface AppleStatsChartProps {
  appleName: string;
  stats: AppleStats;
  accentColor?: string;
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
  stats,
  accentColor = '#ef4444',
}) => {
  const statOrder: (keyof AppleStats)[] = [
    'sweetness',
    'crunchiness',
    'vibes',
    'durability',
    'crispiness',
    'appleal',
  ];

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
  const statValues = statOrder.map((key) => rankToValue[stats[key].rank]);
  const statPoints = getHexagonPoints(statValues);

  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-800 text-center">
        {appleName}
      </h2>

      <div className="flex flex-col md:flex-row gap-8 items-center w-[50vw]">
        {/* Hexagonal Chart */}
        <svg viewBox="-50 -50 400 400" className="w-full h-auto shrink-0">
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

          {/* Stat overlay */}
          <polygon
            points={statPoints}
            fill={accentColor}
            fillOpacity="0.3"
            stroke={accentColor}
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Stat labels */}
          {statOrder.map((key, i) => {
            const angle = ((Math.PI * 2) / 6) * i - Math.PI / 2;
            const x = 150 + 140 * Math.cos(angle);
            const y = 150 + 140 * Math.sin(angle);
            const isBottomHalf = Math.sin(angle) > 0;

            // Only rotate top half labels
            const rotationAngle = !isBottomHalf
              ? (angle * 180) / Math.PI + 90
              : (angle * 180) / Math.PI + -90;
            return (
              <g key={key} transform={`rotate(${rotationAngle}, ${x}, ${y})`}>
                {/* Label */}
                <text
                  x={x}
                  y={isBottomHalf ? y + 25 : y - 15}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={`${stats[
                    key
                  ].label.toLowerCase()} text-sm font-semibold fill-slate-700`}
                >
                  {stats[key].label}
                </text>

                {/* Apple emoji */}
                <text
                  x={x}
                  y={isBottomHalf ? y - 5 : y + 15}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={`text-4xl`}
                >
                  🍎
                </text>

                {/* Rank on apple */}
                <text
                  x={x}
                  y={isBottomHalf ? y - 5 : y + 15}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-sm font-bold fill-white"
                  style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.8))' }}
                >
                  {stats[key].rank}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

// Example usage with hardcoded data
export default function App() {
  const honeycrispStats: AppleStats = {
    crunchiness: { label: 'Crunchiness', rank: 'S' },
    sweetness: { label: 'Sweetness', rank: 'A' },
    durability: { label: 'Durability', rank: 'C' },
    crispiness: { label: 'Crispiness', rank: 'A' },
    vibes: { label: 'Vibes', rank: 'E' },
    appleal: { label: 'Appleal', rank: 'A' },
  };

  return (
    <div className="min-h-screen bg-slate-200 p-8 flex items-center justify-center">
      <AppleStatsChart
        appleName="Honeycrisp"
        stats={honeycrispStats}
        accentColor="#ec1d25"
      />
    </div>
  );
}
