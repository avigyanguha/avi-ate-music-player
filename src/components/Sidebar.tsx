import React from 'react';
import { X, ListMusic, Music, Disc3, Sparkles } from 'lucide-react';
import { Song } from '../types/music';
import { SongList } from './SongList';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  playlist: Song[];
  currentIndex: number;
  isPlaying: boolean;
  selectTrack: (index: number) => void;
  favorites?: Record<number, boolean>;
  toggleFavorite?: (id: number) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  playlist,
  currentIndex,
  isPlaying,
  selectTrack,
  favorites = {},
  toggleFavorite,
}) => {
  if (!isOpen) return null;

  return (
    <aside 
      aria-label="Playlist Sidebar"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
    >
      <div className="w-full max-w-lg bg-neutral-950/95 border border-white/15 backdrop-blur-2xl rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] animate-slide-up space-y-4">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 select-none">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent">
              <ListMusic size={20} />
            </div>
            <div>
              <h3 className="font-bold text-white text-base tracking-wide font-sans flex items-center gap-2">
                Queue & Playlist
              </h3>
              <p className="text-xs text-white/50 font-mono">
                {playlist.length} Tracks • Local Library
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            aria-label="Close playlist"
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* List of Tracks */}
        <div className="max-h-72 overflow-y-auto">
          <SongList 
            playlist={playlist}
            currentIndex={currentIndex}
            isPlaying={isPlaying}
            selectTrack={selectTrack}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            onTrackSelected={onClose}
          />
        </div>

        {/* Footer info */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/40 select-none">
          <span className="flex items-center gap-1.5">
            <Disc3 size={13} className="text-accent animate-spin" />
            AVI-ATE Audio Engine
          </span>
          <span>Lossless Local Audio</span>
        </div>
      </div>
    </aside>
  );
};
