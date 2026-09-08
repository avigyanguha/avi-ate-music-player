import { useState, useRef, useEffect, useCallback } from 'react';
import { Song, RepeatMode } from '../types/music';

const FAVORITES_STORAGE_KEY = 'avi_ate_favorites';

export function useAudioPlayer(playlist: Song[]) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(70);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>('off');
  const [isShuffle, setIsShuffle] = useState(false);
  const [favorites, setFavorites] = useState<Record<number, boolean>>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = playlist[currentIndex] || playlist[0];

  // Initialize audio element once
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;
    audio.volume = volume / 100;

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Update src when track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    audio.src = currentTrack.audioSrc;
    audio.load();

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Playback prevented:', err);
          setIsPlaying(false);
        });
      }
    }
  }, [currentIndex]);

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      if (!isNaN(audio.duration) && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      if (repeatMode === 'one') {
        audio.currentTime = 0;
        audio.play().catch(console.warn);
      } else {
        nextTrack();
      }
    };

    const handleError = (e: Event) => {
      console.error('Audio error occurred:', e);
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [repeatMode, currentIndex, isShuffle, playlist]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Playback error:', err);
        setIsPlaying(false);
      });
    }
  }, [isPlaying]);

  const getNextIndex = useCallback(() => {
    if (playlist.length <= 1) return 0;
    if (isShuffle) {
      let randomIndex = Math.floor(Math.random() * playlist.length);
      while (randomIndex === currentIndex && playlist.length > 1) {
        randomIndex = Math.floor(Math.random() * playlist.length);
      }
      return randomIndex;
    }
    if (currentIndex >= playlist.length - 1) {
      return 0;
    }
    return currentIndex + 1;
  }, [currentIndex, isShuffle, playlist.length]);

  const nextTrack = useCallback(() => {
    if (repeatMode === 'off' && !isShuffle && currentIndex === playlist.length - 1) {
      // reached end of playlist without repeat
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      setIsPlaying(false);
      return;
    }
    const nextIdx = getNextIndex();
    setCurrentIndex(nextIdx);
    setIsPlaying(true);
  }, [currentIndex, isShuffle, repeatMode, getNextIndex, playlist.length]);

  const prevTrack = useCallback(() => {
    const audio = audioRef.current;
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }
    if (isShuffle) {
      const nextIdx = getNextIndex();
      setCurrentIndex(nextIdx);
    } else {
      setCurrentIndex((prev) => (prev <= 0 ? playlist.length - 1 : prev - 1));
    }
    setIsPlaying(true);
  }, [isShuffle, getNextIndex, playlist.length]);

  const selectTrack = useCallback((index: number) => {
    if (index >= 0 && index < playlist.length) {
      setCurrentIndex(index);
      setIsPlaying(true);
    }
  }, [playlist.length]);

  const seekProgress = useCallback((percentage: number) => {
    const audio = audioRef.current;
    if (!audio || isNaN(audio.duration)) return;
    const clamped = Math.max(0, Math.min(100, percentage));
    const targetTime = (clamped / 100) * audio.duration;
    audio.currentTime = targetTime;
    setCurrentTime(targetTime);
  }, []);

  const setVolume = useCallback((val: number) => {
    const clamped = Math.max(0, Math.min(100, val));
    setVolumeState(clamped);
    if (audioRef.current) {
      audioRef.current.volume = clamped / 100;
    }
    if (clamped === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
      setPrevVolume(clamped);
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (isMuted || volume === 0) {
      const target = prevVolume > 0 ? prevVolume : 70;
      setVolume(target);
    } else {
      setPrevVolume(volume);
      setVolume(0);
    }
  }, [isMuted, volume, prevVolume, setVolume]);

  const toggleShuffle = useCallback(() => {
    setIsShuffle((prev) => !prev);
  }, []);

  const cycleRepeatMode = useCallback(() => {
    setRepeatMode((prev) => {
      if (prev === 'off') return 'all';
      if (prev === 'all') return 'one';
      return 'off';
    });
  }, []);

  const toggleFavorite = useCallback((id: number) => {
    setFavorites((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.warn('Failed to persist favorite:', err);
      }
      return updated;
    });
  }, []);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const isFavorite = !!favorites[currentTrack?.id];

  return {
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
  };
}
