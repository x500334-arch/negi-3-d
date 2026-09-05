import { Environment, Float, Sparkles } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { BirthdayCake } from './BirthdayCake';
import { BirthdayLetter } from './BirthdayLetter';
import { BirthdayText } from './BirthdayText';
import { FloatingParticles } from './FloatingParticles';
import { GiftBox } from './GiftBox';
import { PhotoGallery } from './PhotoGallery';

function CameraRig({ progress, pointer, isMobile }) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3());
  useFrame((_, delta) => {
    const scene = progress < 0.2 ? 0 : progress < 0.4 ? 1 : progress < 0.58 ? 2 : progress < 0.78 ? 3 : progress < 0.92 ? 4 : 5;
    const positions = isMobile ? [[0, 0.1, 10], [0, 0, 9], [0, 0.2, 8], [0, 0, 8.5], [0, 0.3, 8], [0, 0, 12]] : [[0, 0.1, 11], [0, 0.2, 10], [0, 0.4, 8], [0, 0.3, 8.5], [0, 0.4, 8], [0, 0, 13]];
    const [x, y, z] = positions[scene];
    target.current.set(x + pointer.x * 0.45, y + pointer.y * 0.25, z);
    camera.position.lerp(target.current, 1 - Math.pow(0.001, delta));
    camera.lookAt(0, scene === 1 ? 0.4 : scene === 4 ? 0.5 : 0, 0);
  });
  return null;
}

export function Scene({ progress, pointer, isMobile, photos, letterMessage, letterOpen, giftOpen, cakeBlown, onLetterOpen, onGiftOpen, onCakeBlowOut }) {
  const intro = progress < 0.24 || progress > 0.91;
  const memories = progress > 0.13 && progress < 0.45;
  const letter = progress > 0.32 && progress < 0.63;
  const gift = progress > 0.5 && progress < 0.82;
  const cake = progress > 0.69;
  return <Canvas dpr={[1, 1.6]} camera={{ position: [0, 0, 11], fov: 42 }} gl={{ antialias: true }}>
    <color attach="background" args={['#0c0713']} />
    <fog attach="fog" args={['#0c0713', 8, 25]} />
    <ambientLight intensity={0.35} color="#e6b6de" />
    <pointLight position={[-6, 4, 3]} color="#a84dca" intensity={9} distance={14} />
    <pointLight position={[6, -2, 1]} color="#fa4f9f" intensity={7} distance={12} />
    <CameraRig progress={progress} pointer={pointer} isMobile={isMobile} />
    <FloatingParticles count={isMobile ? 360 : 900} />
    <FloatingParticles count={isMobile ? 90 : 220} accent />
    <Sparkles count={isMobile ? 80 : 180} scale={[18, 12, 12]} size={2} speed={0.18} color="#ffbbdc" />
    <Environment preset="night" />
    {intro && <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.25}><BirthdayText position={[0, 0.5, 0]} size={isMobile ? 0.75 : 1.15}>HAPPY BIRTHDAY</BirthdayText></Float>}
    {memories && <PhotoGallery photos={photos} />}
    {letter && <Float speed={0.8} rotationIntensity={0.12} floatIntensity={0.35}><BirthdayLetter open={letterOpen} onOpen={onLetterOpen} message={letterMessage} /></Float>}
    {gift && <Float speed={0.7} rotationIntensity={0.06} floatIntensity={0.2}><GiftBox open={giftOpen} onOpen={onGiftOpen} /></Float>}
    {cake && <BirthdayCake blownOut={cakeBlown} onBlowOut={onCakeBlowOut} />}
  </Canvas>;
}
