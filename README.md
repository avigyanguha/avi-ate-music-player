# 🎵 Avi-ate Music Player

A sleek, modern music player web application crafted with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS v4**. Featuring a dark aesthetic, fluid animations, and a spinning vinyl pill controller.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.0-61dafb?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.0-646cff?logo=vite&logoColor=white)

---

## ✨ Features

- **💿 Vinyl Pill Player**: Interactive floating controller with a spinning album art vinyl disc animation that rotates during playback.
- **🎛️ Full Playback Controls**:
  - Play, pause, skip forward, and rewind.
  - Smooth seek scrubber bar with current timestamp and track duration.
  - Shuffle mode and cycleable repeat modes (*Repeat Off*, *Repeat All*, *Repeat One*).
- **🔊 Volume & Audio Management**: Precision volume slider with one-click quick mute / unmute.
- **❤️ Favorites & Queue Management**:
  - Mark tracks as favorites with immediate visual feedback.
  - Slide-out queue drawer / playlist sidebar to browse, select, and manage upcoming tracks.
- **✨ Dynamic Visual Atmosphere**:
  - Ambient radial glow gradient background.
  - Oversized background typography synced to the current song title.
  - Glassmorphic contextual options menu (quick song copy to clipboard, restart track, view queue).
- **📱 Responsive Layout**: Fully responsive interface adapted for desktop, tablet, and mobile viewport sizes.
- **📜 Legacy Version Included**: The original vanilla HTML/CSS/JS implementation is preserved in the `old_version/` directory for reference.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Linter & Formatter**: [oxfmt](https://oxc.rs/)

---

## 📁 Project Structure

```text
music_player/
├── public/
│   ├── covers/             # Album art images
│   ├── images/             # Visual assets
│   └── music/              # MP3 audio files
├── src/
│   ├── components/         # Modular UI components
│   │   ├── Header.tsx        # Track title and artist header
│   │   ├── MusicPlayer.tsx   # Pill controller with spinning vinyl disc
│   │   ├── ProgressBar.tsx   # Interactive seekbar and timestamps
│   │   ├── Sidebar.tsx       # Slide-out queue drawer
│   │   ├── SongList.tsx      # Track list item component
│   │   └── VolumeControl.tsx # Volume slider and mute toggle
│   ├── data/
│   │   └── songs.ts        # Playlist track metadata
│   ├── hooks/
│   │   └── useAudioPlayer.ts # Custom hook handling HTML5 Audio API & state
│   ├── types/
│   │   └── music.ts        # TypeScript interfaces & types
│   ├── utils/
│   │   └── formatTime.ts   # Audio duration/time formatting helper
│   ├── App.tsx             # Main application layout & state wiring
│   ├── index.css           # Tailwind v4 import & custom styles
│   └── main.tsx            # Application entrypoint
├── old_version/            # Original vanilla JS implementation
├── index.html              # HTML template
├── package.json            # Project dependencies & scripts
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher recommended) and `npm` or `pnpm` installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/avigyanguha/avi-ate-music-player.git
   cd avi-ate-music-player
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the URL printed in the terminal).

### Available Scripts

- `npm run dev` – Launch the Vite development server with Hot Module Replacement (HMR).
- `npm run build` – Compile TypeScript and generate the production bundle in `dist/`.
- `npm run preview` – Locally preview the production build.
- `npm run format` – Format code using `oxfmt`.

---

## 🎶 Adding Your Own Tracks

To add more songs to the player:

1. Place your audio file (`.mp3`) inside `public/music/`.
2. Place the corresponding album cover image inside `public/covers/`.
3. Open `src/data/songs.ts` and append a new song object:
   ```typescript
   {
     id: 4,
     title: 'Your Song Title',
     artist: 'Artist Name',
     albumArt: '/covers/your-cover.jpg',
     audioSrc: '/music/your-audio.mp3',
     duration: '3:45',
   }
   ```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).