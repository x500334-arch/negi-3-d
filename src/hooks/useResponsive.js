import { useEffect, useState } from 'react';

export function useResponsive() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 720);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 720);
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return { isMobile };
}
