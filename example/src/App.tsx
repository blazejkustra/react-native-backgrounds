// App.tsx
import CircularGradient from './CircularGradient';

export default function App() {
  return (
    <>
      <CircularGradient centerColor={0x4f46e5} edgeColor="rgb(30, 27, 75)" />
      <CircularGradient centerColor="green" edgeColor="white" />
      <CircularGradient centerColor="rgb(255, 0, 0)" edgeColor="rgb(0, 0, 0)" />
    </>
  );
}
