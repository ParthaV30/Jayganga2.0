'use client';

import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';
import ProceduralStall from './ProceduralStall';
import CanvasLoader from './CanvasLoader';

function CameraRig() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    // Smooth responsive camera parallax responding to cursor
    const { x, y } = state.pointer;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, x * 1.8 + 6, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, -y * 1.2 + 4.2, 0.05);
    state.camera.lookAt(0, 0.8, 0);
  });

  return <group ref={group} />;
}

export default function HeroStallCanvas() {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [6, 4.2, 8.5], fov: 42 }}
        shadows
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <Suspense fallback={<CanvasLoader />}>
          {/* Cinematic Studio Lighting */}
          <ambientLight intensity={0.4} />
          
          {/* Key warm gold spotlight */}
          <directionalLight
            position={[8, 12, 6]}
            intensity={2.2}
            color="#fff2db"
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={25}
            shadow-camera-left={-8}
            shadow-camera-right={8}
            shadow-camera-top={8}
            shadow-camera-bottom={-8}
            shadow-bias={-0.0001}
          />

          {/* Cool blue fill light */}
          <directionalLight
            position={[-8, 6, -6]}
            intensity={0.8}
            color="#9bb4d6"
          />

          {/* Warm rim light from behind */}
          <pointLight
            position={[0, 8, -6]}
            intensity={2.5}
            color="#d4af37"
            distance={18}
          />

          {/* Floating dynamic stall model */}
          <Float
            speed={1.4}
            rotationIntensity={0.15}
            floatIntensity={0.25}
            floatingRange={[-0.1, 0.1]}
          >
            <ProceduralStall isHero={true} stage={6} />
          </Float>

          {/* Realistic Floor Contact Shadow */}
          <ContactShadows
            position={[0, -1.21, 0]}
            opacity={0.85}
            scale={16}
            blur={2.4}
            far={4}
            color="#000000"
          />

          <CameraRig />

          {/* Orbit Controls with bounded angles */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2.05}
            minPolarAngle={Math.PI / 4.5}
            rotateSpeed={0.6}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
