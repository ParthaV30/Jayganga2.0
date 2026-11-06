'use client';

import { Html, useProgress } from '@react-three/drei';

export default function CanvasLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10 text-center select-none">
        <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-white/10"></div>
          <div 
            className="absolute inset-0 rounded-full border-2 border-amber-400 border-t-transparent animate-spin"
            style={{ animationDuration: '1.2s' }}
          ></div>
          <span className="text-xs font-mono text-amber-300 font-semibold">{Math.round(progress)}%</span>
        </div>
        <p className="text-xs uppercase tracking-widest text-neutral-400 font-medium">
          Rendering 3D Stall
        </p>
      </div>
    </Html>
  );
}

