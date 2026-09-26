import React from 'react';

interface CircularProgressProps {
  progress: number; // 0 to 1
  size?: number; // Used for coordinate calculation only
  strokeWidth?: number;
  children?: React.ReactNode;
  color?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  progress,
  size = 280,
  strokeWidth = 12,
  children,
  color = "text-orange-500"
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - progress * circumference;

  return (
    // Explicit sizing prevents SVG expansion under all viewport and loading conditions
    <div 
      className="relative flex items-center justify-center w-full h-full max-w-[280px] max-h-[280px] aspect-square mx-auto"
      style={{ maxWidth: `${size}px`, maxHeight: `${size}px`, width: '100%', aspectRatio: '1 / 1' }}
    >
      <svg
        className="transform -rotate-90 w-full h-full block"
        viewBox={`0 0 ${size} ${size}`}
        style={{ width: '100%', height: '100%', maxWidth: `${size}px`, maxHeight: `${size}px` }}
      >
        <circle
          className="text-white/10"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={`${color} transition-all duration-500 ease-in-out`}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-2 sm:p-4">
        <div className="pointer-events-auto flex flex-col items-center justify-center max-w-[85%] text-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CircularProgress;