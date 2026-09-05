import { Text } from '@react-three/drei';

export function BirthdayText({ children, position, size = 0.7, color = '#fff3f2', anchorX = 'center' }) {
  return (
    <Text
      position={position}
      font="https://fonts.gstatic.com/s/playfairdisplay/v37/nuFvD-vYSZviVYUb_rj3ij__anPXDTzYgA.woff2"
      fontSize={size}
      maxWidth={8}
      anchorX={anchorX}
      anchorY="middle"
      color={color}
      outlineColor="#ff77b8"
      outlineWidth={0.012}
      letterSpacing={0.02}
      material-toneMapped={false}
    >
      {children}
    </Text>
  );
}
