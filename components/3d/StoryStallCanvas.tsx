'use client';

import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import ProceduralStall from './ProceduralStall';
import CanvasLoader from './CanvasLoader';

interface StoryStallCanvasProps {
  currentStage: number;
  progress: number;
  wireframeMode?: boolean;
  isOrbitMode?: boolean;
  parallaxStrength?: number;
}

// 6 Curated Cinematic Camera Waypoints for the Turnkey Fabrication Sequence
const CAMERA_PATH = [
  { pos: new THREE.Vector3(0.5, 8.4, 8.6), target: new THREE.Vector3(0, 0.4, 0) },      // Phase 1: High Subfloor Overview
  { pos: new THREE.Vector3(7.4, 4.8, 7.2), target: new THREE.Vector3(0, 1.8, 0) },      // Phase 2: Structural Truss Columns
  { pos: new THREE.Vector3(-6.5, 3.8, 5.2), target: new THREE.Vector3(-0.4, 1.9, -0.6) }, // Phase 3: Cantilevered Mezzanine & Fins
  { pos: new THREE.Vector3(-0.8, 2.4, 5.8), target: new THREE.Vector3(-0.8, 1.8, -1.0) }, // Phase 4: Panoramic Curved LED Wall
  { pos: new THREE.Vector3(5.0, 3.6, 5.6), target: new THREE.Vector3(0.4, 1.4, 0.6) },   // Phase 5: Kinetic Halo & Monolithic Desk
  { pos: new THREE.Vector3(7.4, 4.6, 8.8), target: new THREE.Vector3(0, 1.2, 0) }       // Phase 6: Full Turnkey Pavilion Showcase
];

function ContinuousCameraSpline({ 
  progress,
  isOrbitMode = false,
  parallaxStrength = 1.0 
}: { 
  progress: number;
  isOrbitMode?: boolean;
  parallaxStrength?: number;
}) {
  const currentLookAt = useRef(new THREE.Vector3(0, 1, 0));

  useFrame((state, delta) => {
    if (isOrbitMode) return;

    const scaled = Math.max(0, Math.min(0.999, progress)) * (CAMERA_PATH.length - 1);
    const index = Math.floor(scaled);
    const fraction = scaled - index;

    const p0 = CAMERA_PATH[index];
    const p1 = CAMERA_PATH[Math.min(index + 1, CAMERA_PATH.length - 1)];

    // Interpolate base camera waypoints along the spline
    const targetPos = new THREE.Vector3().lerpVectors(p0.pos, p1.pos, fraction);
    const targetLook = new THREE.Vector3().lerpVectors(p0.target, p1.target, fraction);

    // Responsive aspect-ratio scaling for mobile portrait vs desktop landscape
    const aspect = state.size.width / state.size.height;
    const isPortrait = aspect < 1.0;
    // On narrow mobile portrait screens, pull camera back proportionally so the entire 9.6m stall fits comfortably
    const mobileZoomFactor = isPortrait ? Math.min(1.85, 1.08 / Math.max(0.42, aspect)) : 1.0;
    targetPos.multiplyScalar(mobileZoomFactor);

    if (isPortrait) {
      targetPos.y += 0.75;
      targetLook.y += 0.35;
    }

    // Interactive cursor parallax + dynamic mobile cinematic breathing sway
    const { x, y } = state.pointer; // normalized [-1, 1]
    const t = state.clock.getElapsedTime();

    // On mobile (or idle), provide a rich living orbital parallax sway
    const swayAmplitude = isPortrait ? 0.42 : 0.14;
    const swayX = Math.sin(t * 0.75) * swayAmplitude;
    const swayY = Math.cos(t * 0.95) * (swayAmplitude * 0.65);

    // Real-time Parallax Displacement
    targetPos.x += (x * 1.5 + swayX) * parallaxStrength;
    targetPos.y += (-y * 1.1 + swayY) * parallaxStrength;
    targetPos.z += (-y * 0.5) * parallaxStrength;

    targetLook.x += (x * 0.45 + swayX * 0.35) * parallaxStrength;
    targetLook.y += (-y * 0.3 + swayY * 0.25) * parallaxStrength;

    // Smooth physics lerp
    state.camera.position.lerp(targetPos, Math.min(1, delta * 3.5));
    currentLookAt.current.lerp(targetLook, Math.min(1, delta * 3.5));
    state.camera.lookAt(currentLookAt.current);
  });

  return null;
}

// 3D Parallax Reference Grid & Datum Markers at Depth
function ParallaxDatumEnvironment() {
  return (
    <group position={[0, -1.2, 0]}>
      {/* Outer Datum Plane for visual speed contrast */}
      <gridHelper 
        args={[36, 36, '#292B28', '#1a1d1b']} 
        position={[0, -0.06, 0]} 
      />

      {/* Hall Blueprint Coordinate Anchor Points */}
      {[[-7.5, -5.5], [7.5, -5.5], [-7.5, 5.5], [7.5, 5.5]].map(([x, z], i) => (
        <group key={`ref-datum-${i}`} position={[x, 0, z]}>
          <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.22, 0.28, 16]} />
            <meshBasicMaterial color="#C65D36" opacity={0.35} transparent />
          </mesh>
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.006, 0.006, 1.0, 4]} />
            <meshBasicMaterial color="#777B70" opacity={0.3} transparent />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// 3D Visual Stage Beacon Callout (Shows exactly where construction is happening)
const STAGE_BEACONS: Record<number, { pos: [number, number, number] }> = {
  1: { pos: [0, -0.9, 3.6] },      // Stage 1: Floor
  2: { pos: [4.2, 2.2, 2.8] },     // Stage 2: Truss
  3: { pos: [2.2, 2.4, -0.8] },    // Stage 3: VIP Room & Walls
  4: { pos: [-1.2, 2.6, -2.4] },   // Stage 4: LED Screen
  5: { pos: [0, 0.9, 2.2] },       // Stage 5: Reception Desk & Branding
  6: { pos: [0, 0.6, 1.6] },       // Stage 6: Finished Lounge
};

function ActiveStageBeacon({ stage }: { stage: number }) {
  const beacon = STAGE_BEACONS[stage] || STAGE_BEACONS[1];
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = beacon.pos[1] + Math.sin(t * 3.0) * 0.08;
    groupRef.current.quaternion.copy(state.camera.quaternion);
  });

  return (
    <group ref={groupRef} position={[beacon.pos[0], beacon.pos[1], beacon.pos[2]]}>
      {/* Central Glowing Pin Indicator */}
      <mesh>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshBasicMaterial color="#C65D36" />
      </mesh>
      {/* Pulsing Concentric Radar Rings */}
      <mesh>
        <ringGeometry args={[0.14, 0.20, 24]} />
        <meshBasicMaterial color="#C65D36" transparent opacity={0.65} side={THREE.DoubleSide} />
      </mesh>
      <mesh>
        <ringGeometry args={[0.26, 0.30, 24]} />
        <meshBasicMaterial color="#FFFFFF" transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export default function StoryStallCanvas({ 
  currentStage, 
  progress,
  wireframeMode = false,
  isOrbitMode = false,
  parallaxStrength = 1.0
}: StoryStallCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={containerRef}
      className={`w-full h-full relative select-none ${
        isOrbitMode ? 'cursor-grab active:cursor-grabbing touch-none' : 'pointer-events-auto touch-pan-y'
      }`}
      style={{ touchAction: isOrbitMode ? 'none' : 'pan-y' }}
    >
      <Canvas
        camera={{ position: [0.5, 8.4, 8.6], fov: 45 }}
        shadows
        gl={{ 
          antialias: true, 
          alpha: true, 
          powerPreference: 'high-performance' 
        }}
        dpr={[1, 1.75]}
        style={{
          touchAction: isOrbitMode ? 'none' : 'pan-y',
          pointerEvents: isOrbitMode ? 'auto' : 'none'
        }}
        eventSource={containerRef}
      >
        <Suspense fallback={<CanvasLoader />}>
          <ambientLight intensity={0.7} color="#FAF8F5" />

          {/* Clean High-Contrast Studio Lighting */}
          <directionalLight
            position={[8, 15, 7]}
            intensity={2.3}
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
            intensity={0.65}
            color="#F2EFE8"
          />

          <pointLight
            position={[0, 8, -5]}
            intensity={1.3}
            color="#FFFFFF"
            distance={18}
          />

          {/* Deep Architectural Parallax Ground */}
          <ParallaxDatumEnvironment />

          {/* Active 3D Callout Beacon at Focal Point */}
          <ActiveStageBeacon stage={currentStage} />

          {/* 3D Stall Geometry with dynamic stage assembly */}
          <ProceduralStall 
            stage={currentStage} 
            progress={progress} 
            isHero={false}
            wireframeMode={wireframeMode}
          />

          {/* Soft Ground Contact Shadow */}
          <ContactShadows
            position={[0, -1.21, 0]}
            opacity={0.7}
            scale={24}
            blur={2.4}
            far={5}
            color="#141715"
          />

          {/* Camera Animation & Parallax Spline */}
          <ContinuousCameraSpline 
            progress={progress} 
            isOrbitMode={isOrbitMode} 
            parallaxStrength={parallaxStrength} 
          />

          {/* Optional Free Orbit Controls */}
          {isOrbitMode && (
            <OrbitControls 
              enableDamping 
              dampingFactor={0.06} 
              maxPolarAngle={Math.PI / 2 + 0.04} 
              minDistance={4.5} 
              maxDistance={22}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
