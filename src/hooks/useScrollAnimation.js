import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation(onProgress) {
  const progressRef = useRef(0);

  useEffect(() => {
    const tween = gsap.to(progressRef, {
      current: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '#journey',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.4,
        onUpdate: (self) => {
          progressRef.current = self.progress;
          onProgress?.(self.progress);
        },
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [onProgress]);
}
