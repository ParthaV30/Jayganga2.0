'use client';

import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import ProceduralStall from './ProceduralStall';
import CanvasLoader from './CanvasLoader';

interface StoryStallCanvasProps {
  currentStage: number;
  progress: number;
  wireframeMode?: boolean;
}

const CAMERA_PATH = [
  { pos: new THREE.Vector3(0, 8.8, 7.8), target: new THREE.Vector3(0, 0, 0) },
  { pos: new THREE.Vector3(7.8, 5.5, 7.8), target: new THREE.Vector3(0, 1.4, 0) },
  { pos: new THREE.Vector3(-6.8, 4.2, 5.8), target: new THREE.Vector3(-0.5, 1.8, -0.8) },
  { pos: new THREE.Vector3(-1.0, 2.6, 6.2), target: new THREE.Vector3(-1.2, 2.0, -1.2) },
  { pos: new THREE.Vector3(5.2, 3.4, 5.2), target: new THREE.Vector3(0.5, 1.2, 0.8) },
  { pos: new THREE.Vector3(7.2, 4.8, 8.6), target: new THREE.Vector3(0, 1.2, 0) }
];

function ContinuousCameraSpline({ progress }: { progress: number }) {
  const currentLookAt = useRef(new THREE.Vector3(0, 1, 0));

  useFrame((state, delta) => {
    const scaled = Math.max(0, Math.min(0.999, progress)) * (CAMERA_PATH.length - 1);
    const index = Math.floor(scaled);
    const fraction = scaled - index;

    const p0 = CAMERA_PATH[index];
    const p1 = CAMERA_PATH[Math.min(index + 1, CAMERA_PATH.length - 1)];

    const targetPos = new THREE.Vector3().lerpVectors(p0.pos, p1.pos, fraction);
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
          <ambientLight intensity={0.65} color="#FAF8F5" />

          {/* Clean Neutral Studio Lighting */}
          <directionalLight
            position={[8, 15, 7]}
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

          <directionalLight
            position={[-8, 6, -6]}
            intensity={0.6}
            color="#F2EFE8"
          />

          <pointLight
            position={[0, 8, -5]}
            intensity={1.2}
            color="#FFFFFF"
            distance={18}
          />

          <ProceduralStall 
            stage={currentStage} 
            progress={progress} 
            isHero={false}
            wireframeMode={wireframeMode}
          />

          <ContactShadows
            position={[0, -1.21, 0]}
            opacity={0.65}
            scale={22}
            blur={2.4}
            far={5}
            color="#202522"
          />

          <ContinuousCameraSpline progress={progress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
