import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function BirthdayCake({ blownOut, onBlowOut }) {
  const group = useRef();
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.25;
  });
  return (
    <group ref={group} position={[0, -0.7, 0]} onClick={onBlowOut}>
      <mesh position={[0, -0.35, 0]}><cylinderGeometry args={[2.5, 2.7, 0.45, 48]} /><meshStandardMaterial color="#dfa6be" roughness={0.34} /></mesh>
      <mesh position={[0, 0.25, 0]}><cylinderGeometry args={[2.1, 2.2, 1.15, 48]} /><meshStandardMaterial color="#ffd5e4" roughness={0.52} /></mesh>
      <mesh position={[0, 0.86, 0]}><torusGeometry args={[1.75, 0.18, 16, 48]} /><meshStandardMaterial color="#f4b7ce" roughness={0.38} /></mesh>
      {[[-0.9, 1.35, 0], [0, 1.42, 0], [0.9, 1.35, 0]].map((position, index) => <group key={index} position={position}>
        <mesh><cylinderGeometry args={[0.07, 0.07, 0.8, 12]} /><meshStandardMaterial color="#e8b866" metalness={0.55} /></mesh>
        {!blownOut && <mesh position={[0, 0.5, 0]}><sphereGeometry args={[0.16, 12, 8]} /><meshBasicMaterial color="#ffb24d" /></mesh>}
      </group>)}
      {!blownOut && <pointLight color="#ffad55" intensity={4} distance={7} position={[0, 2, 1]} />}
    </group>
  );
}
