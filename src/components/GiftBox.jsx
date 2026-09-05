import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function GiftBox({ open, onOpen }) {
  const lid = useRef();
  useFrame((_, delta) => {
    if (!lid.current) return;
    const target = open ? -0.8 : 0;
    lid.current.rotation.z += (target - lid.current.rotation.z) * delta * 3;
    lid.current.position.y += ((open ? 1.5 : 1.05) - lid.current.position.y) * delta * 3;
  });
  return (
    <group position={[0, -0.6, 0]} onClick={onOpen}>
      <mesh><boxGeometry args={[3.4, 2.1, 3.1]} /><meshStandardMaterial color="#68204e" roughness={0.25} metalness={0.35} /></mesh>
      <mesh ref={lid} position={[0, 1.05, 0]}><boxGeometry args={[3.65, 0.35, 3.35]} /><meshStandardMaterial color="#b23876" roughness={0.22} metalness={0.5} /></mesh>
      <mesh position={[0, 0, 0]}><boxGeometry args={[0.38, 2.2, 3.16]} /><meshStandardMaterial color="#e9b75d" roughness={0.25} metalness={0.7} emissive="#6b2d3c" emissiveIntensity={0.3} /></mesh>
      <mesh position={[0, 1.25, 0]}><boxGeometry args={[3.7, 0.22, 0.38]} /><meshStandardMaterial color="#e9b75d" metalness={0.7} /></mesh>
      {open && <pointLight color="#ffd275" intensity={6} distance={8} position={[0, 1, 0]} />}
    </group>
  );
}
