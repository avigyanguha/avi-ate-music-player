import React from 'react';
import { Play, Pause, Rewind, FastForward } from 'lucide-react';
import { Song } from '../types/music';

interface MusicPlayerProps {
  currentTrack: Song;
  isPlaying: boolean;
  togglePlay: () => void;
  prevTrack: () => void;
  nextTrack: () => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  currentTrack,
  isPlaying,
  togglePlay,
  prevTrack,
  nextTrack,
}) => {
  return (
    <div className="relative flex items-center justify-between bg-white text-black pl-20 pr-10 py-5 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.5),0_0_40px_rgba(255,0,0,0.2)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.6),0_0_60px_rgba(255,0,0,0.3)] transition-shadow duration-500 w-full max-w-sm z-20">
      {/* Overlapping Circular Album Art / Vinyl */}
      <div 
        className={`absolute -left-6 w-28 h-28 rounded-full overflow-hidden shadow-2xl border-[6px] border-white transition-transform duration-1000 select-none ${
          isPlaying ? 'animate-[spin_10s_linear_infinite]' : ''
        }`}
      >
        <img 
          src={currentTrack.albumArt} 
          alt={currentTrack.title} 
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/covers/hob.jpg';
          }}
        />
        {/* Vinyl Inner Hole */}
        <div className="absolute inset-0 m-auto w-5 h-5 bg-black/20 rounded-full border border-white/50 backdrop-blur-sm"></div>
      </div>

      {/* Spacer for overlapping album art */}
      <div className="w-4"></div>

      {/* Primary Controls */}
      <div className="flex items-center justify-center gap-8 flex-1">
        <button 
          onClick={prevTrack}
          aria-label="Previous track"
          className="text-black/70 hover:text-black hover:scale-110 transition-all active:scale-95 cursor-pointer"
        >
          <Rewind size={22} fill="currentColor" />
        </button>
        
        <button 
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          className="text-black hover:scale-110 transition-all active:scale-95 cursor-pointer"
        >
          {isPlaying ? (
            <Pause size={32} fill="currentColor" />
          ) : (
            <Play size={32} fill="currentColor" />
          )}
        </button>
        
        <button 
          onClick={nextTrack}
          aria-label="Next track"
          className="text-black/70 hover:text-black hover:scale-110 transition-all active:scale-95 cursor-pointer"
        >
          <FastForward size={22} fill="currentColor" />
        </button>
      </div>
    </div>
  );
};
