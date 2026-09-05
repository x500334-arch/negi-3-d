import { Points, PointMaterial } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function FloatingParticles({ count = 900, accent = false }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const data = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      data[i * 3] = (Math.random() - 0.5) * 22;
      data[i * 3 + 1] = (Math.random() - 0.5) * 15;
      data[i * 3 + 2] = (Math.random() - 0.5) * 20 - 3;
    }
    return data;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.012;
      ref.current.rotation.x = Math.sin(Date.now() * 0.00015) * 0.06;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial transparent color={accent ? '#ff83c4' : '#f6d9ff'} size={accent ? 0.055 : 0.035} sizeAttenuation depthWrite={false} opacity={0.72} />
    </Points>
  );
}
