import { Music, Volume2, VolumeX } from 'lucide-react';
import { useRef, useState } from 'react';

export function MusicControl({ src = '/assets/music.mp3' }) {
  const [playing, setPlaying] = useState(false);
  const audio = useRef(null);
  const toggle = () => {
    if (!audio.current) audio.current = new Audio(src);
    if (playing) audio.current.pause();
    else audio.current.play().catch(() => {});
    setPlaying((value) => !value);
  };
  return <button className="music-control" onClick={toggle} aria-label={playing ? 'Pause music' : 'Play music'} title={playing ? 'Pause music' : 'Play music'}>{playing ? <Volume2 size={17} /> : <VolumeX size={17} />}<Music size={13} /></button>;
}
