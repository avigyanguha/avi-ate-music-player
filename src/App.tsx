import React, { useState, useRef, useEffect } from 'react';
import { 
  Heart, 
  Shuffle, 
  Repeat, 
  Repeat1, 
  ListMusic, 
  MoreHorizontal, 
  Check, 
  RotateCcw, 
  Music2 
} from 'lucide-react';
import { playlist } from './data/songs';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import { Header } from './components/Header';
import { MusicPlayer } from './components/MusicPlayer';
import { ProgressBar } from './components/ProgressBar';
import { VolumeControl } from './components/VolumeControl';
import { Sidebar } from './components/Sidebar';

export default function App() {
  const {
    currentTrack,
    currentIndex,
    isPlaying,
    currentTime,
    duration,
    progress,
    volume,
    isMuted,
    repeatMode,
    isShuffle,
    favorites,
    isFavorite,
    togglePlay,
    nextTrack,
    prevTrack,
    selectTrack,
    seekProgress,
    setVolume,
    toggleMute,
    toggleShuffle,
    cycleRepeatMode,
    toggleFavorite,
  } = useAudioPlayer(playlist);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close contextual menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleCopyTrack = () => {
    navigator.clipboard.writeText(`${currentTrack.title} - ${currentTrack.artist}`);
    setCopiedToast(true);
    setIsMenuOpen(false);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  return (
    <div className="w-screen h-screen absolute inset-0 flex items-center justify-center overflow-hidden bg-black text-foreground selection:bg-accent selection:text-white">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-700/80 via-red-950/90 to-black/95"></div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center relative z-10 p-8 w-full max-w-5xl mx-auto h-full">
        
        {/* Quirky Typographic Background for current song */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-10 select-none">
          <h2 
            className="text-[15vw] font-black tracking-tighter whitespace-nowrap text-transparent transition-all duration-700" 
            style={{ WebkitTextStroke: '2px rgba(255,255,255,0.8)' }}
          >
            {currentTrack.title}
          </h2>
        </div>

        <div className="flex flex-col items-center justify-center w-full max-w-4xl gap-16 relative">
          
          {/* Header Component */}
          <Header currentTrack={currentTrack} />

          {/* Music Player Component (The Pill Control) */}
          <MusicPlayer 
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            togglePlay={togglePlay}
            prevTrack={prevTrack}
            nextTrack={nextTrack}
          />

          {/* Additional Player Utilities */}
          <div className="flex flex-col items-center w-full max-w-md gap-6 z-10">
            
            {/* Progress Bar Component */}
            <ProgressBar 
              currentTime={currentTime}
              duration={duration}
              progress={progress}
              fallbackDuration={currentTrack.duration}
              seekProgress={seekProgress}
            />

            {/* Bottom Actions Row */}
            <div className="flex items-center justify-between w-full text-white/50 relative">
              {/* Left group: Shuffle & Heart */}
              <div className="flex items-center gap-4">
                <button 
                  onClick={toggleShuffle}
                  aria-label={isShuffle ? 'Disable shuffle' : 'Enable shuffle'}
                  title={isShuffle ? 'Shuffle enabled' : 'Shuffle disabled'}
                  className={`transition-all hover:scale-110 cursor-pointer ${
                    isShuffle ? 'text-accent drop-shadow-[0_0_8px_rgba(255,51,51,0.6)]' : 'hover:text-white'
                  }`}
                >
                  <Shuffle size={20} />
                </button>
                <button 
                  onClick={() => toggleFavorite(currentTrack.id)}
                  aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                  title={isFavorite ? 'Favorited' : 'Add to favorites'}
                  className={`transition-all hover:scale-110 cursor-pointer ${
                    isFavorite ? 'text-accent fill-accent scale-110 drop-shadow-[0_0_8px_rgba(255,51,51,0.6)]' : 'hover:text-accent'
                  }`}
                >
                  <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
                </button>
              </div>

              {/* Middle group: Volume Control Component */}
              <VolumeControl 
                volume={volume}
                isMuted={isMuted}
                toggleMute={toggleMute}
                setVolume={setVolume}
              />

              {/* Right group: Repeat, Sidebar Playlist toggle, More options */}
              <div className="flex items-center gap-4 relative">
                <button 
                  onClick={cycleRepeatMode}
                  aria-label={`Repeat mode: ${repeatMode}`}
                  title={`Repeat: ${repeatMode}`}
                  className={`transition-all hover:scale-110 cursor-pointer ${
                    repeatMode !== 'off' 
                      ? 'text-accent drop-shadow-[0_0_8px_rgba(255,51,51,0.6)]' 
                      : 'hover:text-white'
                  }`}
                >
                  {repeatMode === 'one' ? <Repeat1 size={20} /> : <Repeat size={20} />}
                </button>

                <button 
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  aria-label="Open playlist queue"
                  title="View playlist"
                  className={`transition-all hover:scale-110 cursor-pointer ${
                    isSidebarOpen ? 'text-white scale-110' : 'hover:text-white'
                  }`}
                >
                  <ListMusic size={20} />
                </button>

                {/* More Options dropdown trigger */}
                <div className="relative" ref={menuRef}>
                  <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="More options"
                    title="More options"
                    className={`transition-all hover:scale-110 cursor-pointer ${
                      isMenuOpen ? 'text-white scale-110' : 'hover:text-white'
                    }`}
                  >
                    <MoreHorizontal size={20} />
                  </button>

                  {/* Contextual Menu Popover */}
                  {isMenuOpen && (
                    <div className="absolute right-0 bottom-8 mb-2 w-52 bg-neutral-900/95 border border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-2 z-50 text-xs animate-slide-up text-white/80 space-y-1 select-none">
                      <button 
                        onClick={handleCopyTrack}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/10 hover:text-white flex items-center gap-2.5 transition-colors cursor-pointer"
                      >
                        <Check size={14} className="text-accent" />
                        <span>Copy song info</span>
                      </button>
                      
                      <button 
                        onClick={() => {
                          seekProgress(0);
                          setIsMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/10 hover:text-white flex items-center gap-2.5 transition-colors cursor-pointer"
                      >
                        <RotateCcw size={14} className="text-accent" />
                        <span>Restart track</span>
                      </button>

                      <button 
                        onClick={() => {
                          setIsSidebarOpen(true);
                          setIsMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/10 hover:text-white flex items-center gap-2.5 transition-colors cursor-pointer"
                      >
                        <Music2 size={14} className="text-accent" />
                        <span>View queue ({playlist.length} songs)</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Sidebar Component (Queue & Playlist Drawer) */}
      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        playlist={playlist}
        currentIndex={currentIndex}
        isPlaying={isPlaying}
        selectTrack={selectTrack}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />

      {/* Copy Toast Notification */}
      {copiedToast && (
        <div className="fixed top-6 z-50 px-4 py-2 bg-neutral-900/90 border border-accent/40 text-white text-xs rounded-full shadow-2xl backdrop-blur-md animate-fade-in flex items-center gap-2 select-none">
          <Check size={14} className="text-accent" />
          <span>Track details copied to clipboard!</span>
        </div>
      )}
    </div>
  );
}
