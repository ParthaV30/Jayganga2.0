'use client';

import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import ProceduralStall from './ProceduralStall';
import CanvasLoader from './CanvasLoader';

interface StoryStallCanvasProps {
  currentStage: number; // 1 to 6
  progress: number; // 0 to 1
  wireframeMode?: boolean;
}

// 6 Key camera viewpoints calibrated for each fabrication phase
const CAMERA_PATH = [
  { pos: new THREE.Vector3(0, 8.8, 7.8), target: new THREE.Vector3(0, 0, 0) },         // 1: Foundation layout
  { pos: new THREE.Vector3(7.8, 5.5, 7.8), target: new THREE.Vector3(0, 1.4, 0) },       // 2: Truss framing
  { pos: new THREE.Vector3(-6.8, 4.2, 5.8), target: new THREE.Vector3(-0.5, 1.8, -0.8) },// 3: Walls & Mezzanine
  { pos: new THREE.Vector3(-1.0, 2.6, 6.2), target: new THREE.Vector3(-1.2, 2.0, -1.2) },// 4: LED screens & lights
  { pos: new THREE.Vector3(5.2, 3.4, 5.2), target: new THREE.Vector3(0.5, 1.2, 0.8) },   // 5: Signage & Reception
  { pos: new THREE.Vector3(7.2, 4.8, 8.6), target: new THREE.Vector3(0, 1.2, 0) }        // 6: Final completed booth
];

function ContinuousCameraSpline({ progress }: { progress: number }) {
  const currentLookAt = useRef(new THREE.Vector3(0, 1, 0));

  useFrame((state, delta) => {
    // Map continuous progress (0..1) along the 6 waypoints
    const scaled = Math.max(0, Math.min(0.999, progress)) * (CAMERA_PATH.length - 1);
    const index = Math.floor(scaled);
    const fraction = scaled - index;

    const p0 = CAMERA_PATH[index];
    const p1 = CAMERA_PATH[Math.min(index + 1, CAMERA_PATH.length - 1)];

    // Interpolate camera position
    const targetPos = new THREE.Vector3().lerpVectors(p0.pos, p1.pos, fraction);
    // Interpolate target lookAt
    const targetLook = new THREE.Vector3().lerpVectors(p0.target, p1.target, fraction);

    state.camera.position.lerp(targetPos, delta * 3.5);
    currentLookAt.current.lerp(targetLook, delta * 3.5);
    state.camera.lookAt(currentLookAt.current);
  });

  return null;
}

export default function StoryStallCanvas({ 
  currentStage, 
  progress,
  wireframeMode = false 
}: StoryStallCanvasProps) {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 8.8, 7.8], fov: 42 }}
        shadows
        gl={{ 
          antialias: true, 
          alpha: true, 
          powerPreference: 'high-performance' 
        }}
        dpr={[1, 1.8]}
      >
        <Suspense fallback={<CanvasLoader />}>
          <ambientLight intensity={0.4} />

          {/* Key warm gold spotlight */}
          <directionalLight
            position={[9, 15, 7]}
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

          {/* Cool blue fill sky light */}
          <directionalLight
            position={[-9, 7, -6]}
            intensity={0.8}
            color="#8baed6"
          />

          {/* Warm rim light */}
          <pointLight
            position={[0, 9, -5]}
            intensity={2.8}
            color="#d4af37"
            distance={18}
          />

          {/* Procedural Stall Model animated through continuous progress */}
          <ProceduralStall 
            stage={currentStage} 
            progress={progress} 
            isHero={false}
            wireframeMode={wireframeMode}
          />

          {/* Ground Contact Shadow */}
          <ContactShadows
            position={[0, -1.21, 0]}
            opacity={0.85}
            scale={22}
            blur={2.4}
            far={5}
            color="#000000"
          />

          {/* Smooth Continuous Camera Spline */}
          <ContinuousCameraSpline progress={progress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
