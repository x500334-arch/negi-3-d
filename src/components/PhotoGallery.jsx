import { Html } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const photos = ['/assets/photo1.jpg', '/assets/photo2.jpg', '/assets/photo3.jpg', '/assets/photo4.jpg', '/assets/photo5.jpg'];
const fallback = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="640" height="800" viewBox="0 0 640 800"%3E%3Crect width="640" height="800" fill="%231a1027"/%3E%3Ccircle cx="480" cy="160" r="180" fill="%23e35b9a" opacity=".35"/%3E%3Cpath d="M0 610 Q200 430 370 630 T640 560 V800 H0Z" fill="%234b2364"/%3E%3Ctext x="50%" y="52%" fill="%23fce6f2" font-family="serif" font-size="34" text-anchor="middle"%3Eyour memory here%3C/text%3E%3C/svg%3E';

function PhotoCard({ src, position, rotation, index }) {
  const group = useRef();
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.z = rotation[2] + Math.sin(state.clock.elapsedTime * 0.7 + index) * 0.035;
    group.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.08;
  });

  return (
    <group ref={group} position={position} rotation={rotation}>
      <mesh position={[0, 0, -0.08]}>
        <boxGeometry args={[2.55, 3.2, 0.16]} />
        <meshStandardMaterial color="#28152f" roughness={0.28} metalness={0.5} />
      </mesh>
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[2.25, 2.9]} />
        <meshBasicMaterial color="#120b19" />
      </mesh>
      <Html transform position={[0, 0, 0.04]} distanceFactor={2.9} occlude>
        <div className="photo-card">
          <img src={src} alt={`Memory ${index + 1}`} onError={(event) => { event.currentTarget.src = fallback; }} />
          <span>0{index + 1}</span>
        </div>
      </Html>
      <pointLight color="#ff6caf" intensity={0.4} distance={3} position={[0, 0, 0.4]} />
    </group>
  );
}

export function PhotoGallery({ visible = true, photos: photoSources = photos }) {
  if (!visible) return null;
  const layout = [
    [[-3.5, 0.8, -1], [0.08, -0.12, -0.1]],
    [[-1.1, -0.6, -0.6], [-0.08, 0.08, 0.06]],
    [[1.65, 0.6, -1.1], [0.04, -0.07, -0.08]],
    [[4, -0.5, -0.2], [-0.07, 0.04, 0.12]],
    [[0.1, 2.5, -2], [0.14, 0.01, 0.03]],
  ];
  return <group>{photoSources.map((photo, index) => <PhotoCard key={photo} src={photo} position={layout[index % layout.length][0]} rotation={layout[index % layout.length][1]} index={index} />)}</group>;
}
