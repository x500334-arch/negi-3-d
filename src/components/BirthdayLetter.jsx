import { Html } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function BirthdayLetter({ open, onOpen, message }) {
  const group = useRef();
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.45) * 0.08;
    group.current.position.y = 0.1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
  });
  return (
    <group ref={group} position={[0, 0, 0]} onClick={onOpen}>
      <mesh>
        <boxGeometry args={[3.5, 2.3, 0.12]} />
        <meshStandardMaterial color="#331331" roughness={0.32} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0.03, 0.08]} rotation={[0, 0, Math.PI]}>
        <coneGeometry args={[2.2, 1.8, 3]} />
        <meshStandardMaterial color="#a83575" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.06, 0.14]}>
        <sphereGeometry args={[0.15, 16, 8]} />
        <meshStandardMaterial color="#f4bf64" emissive="#f4a9c9" emissiveIntensity={0.7} metalness={0.6} />
      </mesh>
      {open && <Html transform position={[0, 0, 0.42]} distanceFactor={3}>
        <article className="letter-paper"><small>FOR SOMEONE SPECIAL</small><p>{message}</p><b>with love, always</b></article>
      </Html>}
      <pointLight color="#ff91c9" intensity={open ? 1.6 : 0.35} distance={5} />
    </group>
  );
}
