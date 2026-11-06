'use client';

import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';
import ProceduralStall from './ProceduralStall';
import CanvasLoader from './CanvasLoader';
import { Layers } from 'lucide-react';

const CAMERA_PRESETS: Record<string, { pos: [number, number, number]; target: [number, number, number] }> = {
  isometric: { pos: [7.2, 5.0, 9.2], target: [0, 1.0, 0] },
  mezzanine: { pos: [4.2, 3.8, 3.8], target: [2.0, 2.3, -1.0] },
  truss: { pos: [-5.2, 4.6, 5.2], target: [0, 3.8, 0] },
  topdown: { pos: [0.1, 11.5, 2.0], target: [0, 0, 0] }
};

function SmoothCameraController({ 
  preset, 
  userInteracting 
}: { 
  preset: string; 
  userInteracting: boolean 
}) {
  const currentLookAt = useRef(new THREE.Vector3(0, 1.0, 0));

  useFrame((state, delta) => {
    if (userInteracting) return;

    const targetConfig = CAMERA_PRESETS[preset] || CAMERA_PRESETS.isometric;
    const targetPos = new THREE.Vector3(...targetConfig.pos);
    const targetLook = new THREE.Vector3(...targetConfig.target);

    const { x, y } = state.pointer;
    targetPos.x += x * 1.0;
    targetPos.y += -y * 0.6;

    state.camera.position.lerp(targetPos, delta * 2.5);
    currentLookAt.current.lerp(targetLook, delta * 2.5);
    state.camera.lookAt(currentLookAt.current);
  });

  return null;
}

export default function HeroStallCanvas() {
  const [wireframe, setWireframe] = useState(false);
  const [activePreset, setActivePreset] = useState<string>('isometric');
  const [isInteracting, setIsInteracting] = useState(false);

  return (
    <div className="w-full h-full relative group">
      {/* 3D Viewport HUD Control Overlay */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 pointer-events-auto">
        {/* Render Mode Toggle */}
        <button
          onClick={() => setWireframe(!wireframe)}
          className={`px-3 py-1.5 rounded text-[11px] font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5 border ${
            wireframe
              ? 'bg-[#C65D36] text-[#FFFFFF] border-[#C65D36] font-medium'
              : 'bg-[#FFFFFF] text-[#292B28] border-[#777B70]/30 hover:bg-[#D6D1C5]'
          }`}
          title="Toggle Architectural CAD Wireframe Mode"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{wireframe ? 'CAD Wireframe' : 'PBR Model'}</span>
        </button>

        {/* View Angle Presets */}
        <div className="hidden sm:flex items-center gap-1 p-0.5 rounded bg-[#FFFFFF] border border-[#777B70]/30 text-[11px] font-mono">
          {(['isometric', 'mezzanine', 'truss', 'topdown'] as const).map((key) => (
            <button
              key={key}
              onClick={() => {
                setActivePreset(key);
                setIsInteracting(false);
              }}
              className={`px-2.5 py-1 rounded uppercase transition-colors ${
                activePreset === key
                  ? 'bg-[#202522] text-[#FFFFFF] font-medium'
                  : 'text-[#777B70] hover:text-[#292B28]'
              }`}
            >
              {key === 'isometric' ? 'Orbit' : key}
            </button>
          ))}
        </div>
      </div>

      {/* Viewport Status Pill (Right Top) */}
      <div className="absolute top-4 right-4 z-20 hidden md:flex items-center gap-2 px-3 py-1.5 rounded bg-[#FFFFFF] border border-[#777B70]/30 text-[10px] font-mono text-[#777B70] pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C65D36]" />
        <span>R3F // ARCHITECTURAL CANVAS</span>
      </div>

      {/* Main 3D WebGL Canvas */}
      <div className="w-full h-full cursor-grab active:cursor-grabbing">
        <Canvas
          camera={{ position: [7.2, 5.0, 9.2], fov: 40 }}
          shadows
          gl={{ 
            antialias: true, 
            alpha: true, 
            powerPreference: 'high-performance'
          }}
          dpr={[1, 1.8]}
        >
          <Suspense fallback={<CanvasLoader />}>
            {/* Natural Architectural Studio Lighting */}
            <ambientLight intensity={0.65} color="#FAF8F5" />

            {/* Main Key Studio Light */}
            <directionalLight
              position={[8, 14, 7]}
              intensity={2.2}
              color="#FFFFFF"
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
              shadow-camera-far={26}
              shadow-camera-left={-9}
              shadow-camera-right={9}
              shadow-camera-top={9}
              shadow-camera-bottom={-9}
              shadow-bias={-0.0001}
            />

            {/* Soft Fill Light */}
            <directionalLight
              position={[-8, 6, -6]}
              intensity={0.6}
              color="#F2EFE8"
            />

            {/* Subtle Neutral Backlight */}
            <pointLight
              position={[0, 8, -5]}
              intensity={1.2}
              color="#FFFFFF"
              distance={18}
            />

            <Float
              speed={1.0}
              rotationIntensity={0.08}
              floatIntensity={0.15}
              floatingRange={[-0.06, 0.06]}
            >
              <ProceduralStall 
                isHero={true} 
                stage={6} 
                progress={1} 
                wireframeMode={wireframe} 
              />
            </Float>

            {/* Neutral Floor Contact Shadow */}
            <ContactShadows
              position={[0, -1.21, 0]}
              opacity={0.65}
              scale={20}
              blur={2.5}
              far={5}
              color="#202522"
            />

            <SmoothCameraController 
              preset={activePreset} 
              userInteracting={isInteracting} 
            />

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              maxPolarAngle={Math.PI / 2.05}
              minPolarAngle={Math.PI / 5}
              rotateSpeed={0.6}
              dampingFactor={0.05}
              onStart={() => setIsInteracting(true)}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Bottom Technical Tickers */}
      <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between pointer-events-none text-[10px] font-mono text-[#777B70]">
        <div>[FOOTPRINT: 9.6M × 7.2M // 2-TIER MEZZANINE]</div>
        <div className="text-[#202522]">DRAG TO ROTATE // SCROLL FOR FABRICATION SEQUENCE ↓</div>
        <div>[TOLERANCE: ±0.5MM]</div>
      </div>
    </div>
  );
}
