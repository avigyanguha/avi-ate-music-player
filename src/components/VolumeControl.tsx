import React from 'react';
import { Volume2, Volume1, VolumeX } from 'lucide-react';

interface VolumeControlProps {
  volume: number;
  isMuted: boolean;
  toggleMute: () => void;
  setVolume: (val: number) => void;
}

export const VolumeControl: React.FC<VolumeControlProps> = ({
  volume,
  isMuted,
  toggleMute,
  setVolume,
}) => {
  return (
    <div className="flex items-center gap-3 select-none">
      <button 
        onClick={toggleMute}
        aria-label={isMuted || volume === 0 ? 'Unmute' : 'Mute'}
        className="hover:text-white transition-colors hover:scale-110 cursor-pointer"
      >
        {isMuted || volume === 0 ? (
          <VolumeX size={20} className="text-white/40" />
        ) : volume < 50 ? (
          <Volume1 size={20} />
        ) : (
          <Volume2 size={20} />
        )}
      </button>
      <div 
        role="slider"
        aria-label="Volume level"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={isMuted ? 0 : Math.round(volume)}
        tabIndex={0}
        className="w-24 h-1.5 bg-white/10 rounded-full cursor-pointer relative group/vol transition-all hover:h-2"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          setVolume(Math.max(0, Math.min(100, (x / rect.width) * 100)));
        }}
      >
        <div 
          className="h-full bg-white rounded-full transition-all duration-75 relative" 
          style={{ width: `${isMuted ? 0 : volume}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-accent rounded-full shadow opacity-0 group-hover/vol:opacity-100 transition-opacity"></div>
        </div>
      </div>
    </div>
  );
};
