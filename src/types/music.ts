export type RepeatMode = 'off' | 'all' | 'one';

export interface Song {
  id: number;
  title: string;
  artist: string;
  albumArt: string;
  audioSrc: string;
  duration: string;
}
