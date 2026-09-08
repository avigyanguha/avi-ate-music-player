import React from 'react';
import { Heart, Music2 } from 'lucide-react';
import { Song } from '../types/music';

interface SongListProps {
  playlist: Song[];
  currentIndex: number;
  isPlaying: boolean;
  selectTrack: (index: number) => void;
  favorites?: Record<number, boolean>;
  toggleFavorite?: (id: number) => void;
  onTrackSelected?: () => void;
}

export const SongList: React.FC<SongListProps> = ({
  playlist,
  currentIndex,
  isPlaying,
  selectTrack,
  favorites = {},
  toggleFavorite,
  onTrackSelected,
}) => {
  return (
    <div className="space-y-2 overflow-y-auto pr-1">
      {playlist.map((song, idx) => {
        const isSelected = idx === currentIndex;
        const isFav = !!favorites[song.id];

        return (
          <div
            key={song.id}
            onClick={() => {
              selectTrack(idx);
              if (onTrackSelected) onTrackSelected();
            }}
            className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all ${
              isSelected 
                ? 'bg-accent/20 border border-accent/40 text-white shadow-lg' 
                : 'bg-white/5 hover:bg-white/10 text-white/80 border border-transparent'
            }`}
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-white/10">
                <img 
                  src={song.albumArt} 
                  alt={song.title} 
                  className="w-full h-full object-cover" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/covers/hob.jpg';
                  }}
                />
                {isSelected && isPlaying && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-accent animate-ping"></span>
                  </div>
                )}
              </div>
              <div className="truncate">
                <p className={`font-semibold text-sm truncate ${isSelected ? 'text-accent' : 'text-white'}`}>
                  {song.title}
                </p>
                <p className="text-xs text-white/50 truncate font-light">
                  {song.artist}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {toggleFavorite && (
                <button
                  type="button"
                  aria-label={isFav ? 'Unfavorite' : 'Favorite'}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(song.id);
                  }}
                  className={`p-1.5 rounded-full hover:bg-white/10 transition-all ${
                    isFav ? 'text-accent fill-accent' : 'text-white/40 hover:text-white'
                  }`}
                >
                  <Heart size={15} fill={isFav ? 'currentColor' : 'none'} />
                </button>
              )}
              <span className="text-xs font-mono text-white/40">
                {song.duration}
              </span>
              {isSelected && (
                <span className="text-xs font-mono uppercase tracking-wider text-accent font-bold px-2 py-0.5 rounded-md bg-accent/10 border border-accent/30 hidden sm:inline-block">
                  Active
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
