# Midnight Birthday Journey

A cinematic, scroll-driven birthday experience built with React, Three.js, React Three Fiber, Drei, GSAP, and Vite.

## Run

Requires Node.js 18+.

```bash
npm install
npm run dev
```

## Personalize

Edit `birthdayConfig` in `src/App.jsx`. Add optional media files at:

- `public/assets/photo1.jpg` through `photo5.jpg`
- `public/assets/music.mp3`

Missing photos gracefully fall back to an in-scene placeholder so the journey still works while content is being prepared.
