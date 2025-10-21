// App.tsx
import CircularGradient from './CircularGradient';

export default function App() {
  return (
    <>
      {/* Default gradient - centered, medium size */}
      <CircularGradient centerColor={0x4f46e5} edgeColor="rgb(30, 27, 75)" />

      {/* Small gradient in top-left corner */}
      <CircularGradient
        centerColor="green"
        edgeColor="white"
        size={0.3}
        centerX={0.2}
        centerY={0.2}
      />

      {/* Large gradient in bottom-right corner */}
      <CircularGradient
        centerColor="rgb(255, 0, 0)"
        edgeColor="rgb(0, 0, 0)"
        size={0.9}
        centerX={0.8}
        centerY={0.8}
      />
    </>
  );
}
