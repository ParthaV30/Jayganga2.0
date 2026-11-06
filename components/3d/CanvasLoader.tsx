'use client';

import { Html, useProgress } from '@react-three/drei';

export default function CanvasLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center p-6 rounded-lg bg-[#FFFFFF] border border-[#777B70]/30 text-center select-none shadow-md">
        <div className="relative w-12 h-12 mb-3 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-[#D6D1C5]"></div>
          <div 
            className="absolute inset-0 rounded-full border-2 border-[#C65D36] border-t-transparent animate-spin"
            style={{ animationDuration: '1.0s' }}
          ></div>
          <span className="text-[11px] font-mono text-[#292B28] font-bold">{Math.round(progress)}%</span>
        </div>
        <p className="text-[10px] uppercase tracking-widest text-[#777B70] font-mono font-medium">
          Loading 3D Canvas
        </p>
      </div>
    </Html>
  );
}
