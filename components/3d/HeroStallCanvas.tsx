'use client';

import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';
import ProceduralStall from './ProceduralStall';
import CanvasLoader from './CanvasLoader';
import { Eye, Layers, Compass, Maximize2, Sparkles, Box } from 'lucide-react';

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

    // Subtle pointer parallax
    const { x, y } = state.pointer;
    targetPos.x += x * 1.2;
    targetPos.y += -y * 0.8;

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
          className={`px-3 py-1.5 rounded-lg text-[11px] font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 border backdrop-blur-md ${
            wireframe
              ? 'bg-amber-400 text-black border-amber-300 font-bold shadow-lg shadow-amber-400/20'
              : 'bg-black/60 text-neutral-300 border-white/10 hover:text-white hover:bg-white/10'
          }`}
          title="Toggle Architectural Wireframe / CAD Mode"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{wireframe ? 'CAD Wireframe' : 'Photorealistic PBR'}</span>
        </button>

        {/* View Angle Presets */}
        <div className="hidden sm:flex items-center gap-1 p-1 rounded-lg bg-black/60 border border-white/10 backdrop-blur-md text-[11px] font-mono">
          {(['isometric', 'mezzanine', 'truss', 'topdown'] as const).map((key) => (
            <button
              key={key}
              onClick={() => {
                setActivePreset(key);
                setIsInteracting(false);
              }}
              className={`px-2.5 py-1 rounded-md uppercase transition-all ${
                activePreset === key
                  ? 'bg-white/20 text-amber-300 font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {key === 'isometric' ? 'Orbit' : key}
            </button>
          ))}
        </div>
      </div>

      {/* Viewport Technical Status Pill (Right Top) */}
      <div className="absolute top-4 right-4 z-20 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 backdrop-blur-md text-[10px] font-mono text-neutral-400 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>R3F // 60 FPS ENGINE</span>
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
            {/* Cinematic Lighting Rig */}
            <ambientLight intensity={0.4} />

            {/* Main Key Sun / Warm Lighting */}
            <directionalLight
              position={[9, 14, 7]}
              intensity={2.6}
              color="#fff4e0"
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

            {/* Cool Fill Sky Light */}
            <directionalLight
              position={[-9, 7, -6]}
              intensity={0.9}
              color="#8baed6"
            />

            {/* Rear Gold Architectural Rim Light */}
            <pointLight
              position={[0, 9, -5]}
              intensity={3.0}
              color="#d4af37"
              distance={20}
            />

            {/* Floating Dynamic Model */}
            <Float
              speed={1.2}
              rotationIntensity={0.12}
              floatIntensity={0.2}
              floatingRange={[-0.08, 0.08]}
            >
              <ProceduralStall 
                isHero={true} 
                stage={6} 
                progress={1} 
                wireframeMode={wireframe} 
              />
            </Float>

            {/* Realistic Contact Floor Shadow */}
            <ContactShadows
              position={[0, -1.21, 0]}
              opacity={0.88}
              scale={20}
              blur={2.5}
              far={5}
              color="#000000"
            />

            <SmoothCameraController 
              preset={activePreset} 
              userInteracting={isInteracting} 
            />

            {/* Interactive Orbit Controls with smooth damping */}
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              maxPolarAngle={Math.PI / 2.05}
              minPolarAngle={Math.PI / 5}
              rotateSpeed={0.65}
              dampingFactor={0.05}
              onStart={() => setIsInteracting(true)}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Bottom Architectural Framing Coordinate Tickers */}
      <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between pointer-events-none text-[10px] font-mono text-neutral-500">
        <div>[FOOTPRINT: 9.6M × 7.2M // 2-TIER MEZZANINE]</div>
        <div className="text-amber-400/80">DRAG TO ORBIT // SCROLL FOR FABRICATION SEQUENCE ↓</div>
        <div>[TOLERANCE: ±0.5MM]</div>
      </div>
    </div>
  );
}
