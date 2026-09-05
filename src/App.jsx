import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ChevronRight, Sparkles } from 'lucide-react';
import { Scene } from './components/Scene';
import { MusicControl } from './components/MusicControl';
import { useResponsive } from './hooks/useResponsive';
import { useScrollAnimation } from './hooks/useScrollAnimation';

export const birthdayConfig = {
  name: 'FRIEND_NAME',
  title: 'HAPPY BIRTHDAY',
  letter: 'You make ordinary days feel like little constellations.',
  giftMessage: 'YOUR SURPRISE',
  finalMessage: 'Hope your day is as amazing as you are.',
  photos: ['/assets/photo1.jpg', '/assets/photo2.jpg', '/assets/photo3.jpg', '/assets/photo4.jpg', '/assets/photo5.jpg'],
  music: '/assets/music.mp3',
};

function JourneyCopy({ progress, letterOpen, giftOpen, cakeBlown }) {
  if (progress < 0.12) return <div className="copy copy-intro"><p className="eyebrow"><Sparkles size={13} /> A LITTLE MIDNIGHT MAGIC</p><h1>{birthdayConfig.title}</h1><p>Someone special deserves a special surprise...</p></div>;
  if (progress < 0.38) return <div className="copy copy-left"><p className="eyebrow">CHAPTER 01 / THE ARCHIVE</p><h2>Some moments are worth keeping <em>forever.</em></h2><p>Drift through the little scenes that made the years feel golden.</p></div>;
  if (progress < 0.58) return <div className="copy copy-right"><p className="eyebrow">CHAPTER 02 / A NOTE FOR YOU</p><h2>{letterOpen ? 'A few words, meant only for you.' : 'There is a note waiting in the dark.'}</h2><p>{letterOpen ? 'Read slowly. Let the good things land.' : 'Tap the envelope to open it.'}</p></div>;
  if (progress < 0.76) return <div className="copy copy-left"><p className="eyebrow">CHAPTER 03 / KEEP GOING</p><h2>{giftOpen ? birthdayConfig.giftMessage : "There's still one more thing..."}</h2><p>{giftOpen ? 'A little brightness, wrapped up just for you.' : 'The best surprises are never in a hurry.'}</p></div>;
  if (progress < 0.92) return <div className="copy copy-center"><p className="eyebrow">CHAPTER 04 / MAKE A WISH</p><h2>{cakeBlown ? 'The wish is on its way.' : 'Make a wish...'}</h2><p>{cakeBlown ? 'Keep something beautiful for yourself.' : 'Tap the cake when you are ready.'}</p></div>;
  return <div className="copy copy-final"><p className="eyebrow"><Sparkles size={13} /> THE LAST FRAME</p><h1>{birthdayConfig.title}</h1><p>{birthdayConfig.finalMessage}</p><span className="signature">- with all the good things</span></div>;
}

export default function App() {
  const { isMobile } = useResponsive();
  const [progress, setProgress] = useState(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [letterOpen, setLetterOpen] = useState(false);
  const [giftOpen, setGiftOpen] = useState(false);
  const [cakeBlown, setCakeBlown] = useState(false);
  const raf = useRef(0);

  useScrollAnimation(setProgress);
  useEffect(() => {
    const onPointerMove = (event) => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => setPointer({ x: (event.clientX / window.innerWidth - 0.5) * 2, y: (event.clientY / window.innerHeight - 0.5) * -2 }));
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => { window.removeEventListener('pointermove', onPointerMove); cancelAnimationFrame(raf.current); };
  }, []);

  return <main id="journey">
    <div className="scene-shell"><Scene progress={progress} pointer={pointer} isMobile={isMobile} photos={birthdayConfig.photos} letterMessage={birthdayConfig.letter} letterOpen={letterOpen} giftOpen={giftOpen} cakeBlown={cakeBlown} onLetterOpen={() => setLetterOpen(true)} onGiftOpen={() => setGiftOpen(true)} onCakeBlowOut={() => setCakeBlown(true)} /></div>
    <header className="topbar"><span className="brand-mark">M / 26</span><span className="topbar-note">A birthday journey for {birthdayConfig.name}</span><MusicControl src={birthdayConfig.music} /></header>
    <JourneyCopy progress={progress} letterOpen={letterOpen} giftOpen={giftOpen} cakeBlown={cakeBlown} />
    <div className="scroll-cue"><span>{progress < 0.97 ? 'SCROLL TO TRAVEL' : 'THE END, FOR NOW'}</span>{progress < 0.97 ? <ArrowDown size={14} /> : <ChevronRight size={14} />}</div>
    <div className="progress-line"><span style={{ transform: `scaleX(${progress})` }} /></div>
    <div className="journey-spacer" />
  </main>;
}
