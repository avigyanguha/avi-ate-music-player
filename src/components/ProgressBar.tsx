import React from 'react';
import { formatTime } from '../utils/formatTime';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  progress: number;
  fallbackDuration?: string;
  seekProgress: (percentage: number) => void;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentTime,
  duration,
  progress,
  fallbackDuration = '0:00',
  seekProgress,
}) => {
  const formattedCurrentTime = formatTime(currentTime);
  const formattedDuration = duration > 0 ? formatTime(duration) : fallbackDuration;

  return (
    <div className="w-full flex items-center gap-4 group select-none">
      <span className="text-xs font-mono text-white/50 min-w-8 text-right">
        {formattedCurrentTime}
      </span>
      <div 
        role="slider"
        aria-label="Track progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
        tabIndex={0}
        className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden cursor-pointer relative transition-all group-hover:h-2.5"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const percent = (x / rect.width) * 100;
          seekProgress(percent);
        }}
      >
        <div 
          className="h-full bg-accent rounded-full relative transition-all duration-100"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
      </div>
      <span className="text-xs font-mono text-white/50 min-w-8">
        {formattedDuration}
      </span>
    </div>
  );
};
