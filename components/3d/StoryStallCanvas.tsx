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
}

// Camera positions mapped to the 6 stages for dynamic cinematic camera travel
const STAGE_CAMERAS = [
  { pos: new THREE.Vector3(0, 8.5, 7.5), target: new THREE.Vector3(0, 0, 0) },      // 1: Foundation layout
  { pos: new THREE.Vector3(7.5, 5.2, 7.5), target: new THREE.Vector3(0, 1.2, 0) },    // 2: Truss framing
  { pos: new THREE.Vector3(-6.2, 3.8, 6.2), target: new THREE.Vector3(0, 1.5, -0.5) },// 3: Wall assembly
  { pos: new THREE.Vector3(0, 2.8, 6.5), target: new THREE.Vector3(0, 1.8, -1.0) },    // 4: Lighting & screens
  { pos: new THREE.Vector3(5.2, 3.2, 5.2), target: new THREE.Vector3(0, 1.2, 0.8) },  // 5: Branding & Reception
  { pos: new THREE.Vector3(6.8, 4.5, 8.2), target: new THREE.Vector3(0, 1.0, 0) }     // 6: Final completed booth
];

function CameraFlightController({ stage }: { stage: number }) {
  const index = Math.min(Math.max(1, stage), 6) - 1;
  const targetCam = STAGE_CAMERAS[index];
  const currentLookAt = useRef(new THREE.Vector3(0, 1, 0));

  useFrame((state, delta) => {
    // Smooth lerp for camera position
    state.camera.position.lerp(targetCam.pos, delta * 3.2);

    // Smooth lerp for target lookAt
    currentLookAt.current.lerp(targetCam.target, delta * 3.2);
    state.camera.lookAt(currentLookAt.current);
  });

  return null;
}

export default function StoryStallCanvas({ currentStage, progress }: StoryStallCanvasProps) {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 8.5, 7.5], fov: 45 }}
        shadows
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <Suspense fallback={<CanvasLoader />}>
          <ambientLight intensity={0.45} />
          
          <directionalLight
            position={[9, 14, 7]}
            intensity={2.4}
            color="#fff3e0"
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={25}
            shadow-camera-left={-8}
            shadow-camera-right={8}
            shadow-camera-top={8}
            shadow-camera-bottom={-8}
          />

          <directionalLight
            position={[-8, 6, -6]}
            intensity={0.7}
            color="#8faecc"
          />

          <pointLight
            position={[0, 7, -4]}
            intensity={2.2}
            color="#d4af37"
            distance={15}
          />

          {/* Procedural Stall animated through the 6 stages */}
          <ProceduralStall 
            stage={currentStage} 
            progress={progress} 
            isHero={false} 
          />

          <ContactShadows
            position={[0, -1.21, 0]}
            opacity={0.8}
            scale={18}
            blur={2.2}
            far={4}
            color="#000000"
          />

          <CameraFlightController stage={currentStage} />
        </Suspense>
      </Canvas>
    </div>
  );
}
