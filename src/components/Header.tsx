import React from 'react';
import { Song } from '../types/music';

interface HeaderProps {
  currentTrack: Song;
}

export const Header: React.FC<HeaderProps> = ({ currentTrack }) => {
  return (
    <header className="text-center space-y-4 relative z-10 select-none">
      <p className="text-accent font-mono tracking-[0.3em] uppercase text-sm font-bold animate-pulse">
        Now Playing
      </p>
      <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white drop-shadow-2xl transition-all duration-500">
        {currentTrack.title}
      </h1>
      <p className="text-2xl font-light tracking-widest text-white/70">
        {currentTrack.artist}
      </p>
    </header>
  );
};
