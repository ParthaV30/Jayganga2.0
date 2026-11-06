'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ProceduralStallProps {
  stage?: number; // 1 to 6
  progress?: number; // 0 to 1
  isHero?: boolean;
}

export default function ProceduralStall({ 
  stage = 6, 
  progress = 1, 
  isHero = false 
}: ProceduralStallProps) {
  const stallGroup = useRef<THREE.Group>(null);
  const screenMesh = useRef<THREE.Mesh>(null);
  const haloBanner = useRef<THREE.Group>(null);
  const turntable = useRef<THREE.Group>(null);

  // Subtle breathing / slow idle rotation for Hero
  useFrame((state, delta) => {
    if (isHero && stallGroup.current) {
      stallGroup.current.rotation.y += delta * 0.12;
    }
    if (haloBanner.current) {
      haloBanner.current.rotation.y -= delta * 0.2;
    }
    if (turntable.current) {
      turntable.current.rotation.y += delta * 0.4;
    }
    if (screenMesh.current && (screenMesh.current.material as THREE.MeshStandardMaterial)) {
      const mat = screenMesh.current.material as THREE.MeshStandardMaterial;
      const t = state.clock.getElapsedTime();
      mat.emissiveIntensity = 1.2 + Math.sin(t * 2) * 0.3;
    }
  });

  // Calculate visibility based on stage or progress
  const activeStage = stage || Math.min(6, Math.max(1, Math.floor(progress * 6) + 1));

  // Stage 1: Floor & Grid (always visible)
  const showStage1 = true;
  // Stage 2: Structural Framework
  const showStage2 = activeStage >= 2;
  // Stage 3: Walls & Panels
  const showStage3 = activeStage >= 3;
  // Stage 4: Lighting & Digital Displays
  const showStage4 = activeStage >= 4;
  // Stage 5: Signage & Branding
  const showStage5 = activeStage >= 5;
  // Stage 6: Finishing & Furniture
  const showStage6 = activeStage >= 6;

  return (
    <group ref={stallGroup} position={[0, -1.2, 0]}>
      {/* ============================================================== */}
      {/* STAGE 1: FOUNDATION FLOOR & LASER GRID */}
      {/* ============================================================== */}
      {showStage1 && (
        <group name="Stage1-Floor">
          {/* Main Raised Exhibition Platform (8m x 6m x 0.15m) */}
          <mesh position={[0, 0.08, 0]} receiveShadow>
            <boxGeometry args={[8.4, 0.16, 6.4]} />
            <meshStandardMaterial 
              color="#0d0d12" 
              roughness={0.4} 
              metalness={0.2} 
            />
          </mesh>

          {/* Chamfered Aluminum Edge Trim */}
          <mesh position={[0, 0.08, 3.22]}>
            <boxGeometry args={[8.44, 0.17, 0.04]} />
            <meshStandardMaterial color="#c5a880" metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.08, -3.22]}>
            <boxGeometry args={[8.44, 0.17, 0.04]} />
            <meshStandardMaterial color="#c5a880" metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[4.22, 0.08, 0]}>
            <boxGeometry args={[0.04, 0.17, 6.44]} />
            <meshStandardMaterial color="#c5a880" metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[-4.22, 0.08, 0]}>
            <boxGeometry args={[0.04, 0.17, 6.44]} />
            <meshStandardMaterial color="#c5a880" metalness={0.8} roughness={0.3} />
          </mesh>

          {/* Laser Boundary Lines & Grid */}
          <gridHelper 
            args={[8.2, 8, '#d4af37', '#252535']} 
            position={[0, 0.17, 0]} 
          />

          {/* Corner Leveling Pylons */}
          {([[-3.9, -2.9], [3.9, -2.9], [-3.9, 2.9], [3.9, 2.9]] as const).map(([x, z], i) => (
            <mesh key={`pylon-${i}`} position={[x, 0.25, z]}>
              <cylinderGeometry args={[0.12, 0.15, 0.35, 16]} />
              <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
            </mesh>
          ))}
        </group>
      )}

      {/* ============================================================== */}
      {/* STAGE 2: STRUCTURAL ALUMINUM / STEEL TRUSS FRAMEWORK */}
      {/* ============================================================== */}
      {showStage2 && (
        <group name="Stage2-Trusses">
          {/* 4 Heavy Vertical Box-Truss Columns */}
          {([[-3.6, -2.6], [3.6, -2.6], [-3.6, 2.6], [3.6, 2.6]] as const).map(([x, z], i) => (
            <group key={`col-${i}`} position={[x, 2, z]}>
              {/* 4 Chords */}
              <mesh position={[-0.15, 0, -0.15]} castShadow>
                <cylinderGeometry args={[0.03, 0.03, 3.8, 8]} />
                <meshStandardMaterial color="#2a2a32" metalness={0.85} roughness={0.3} />
              </mesh>
              <mesh position={[0.15, 0, -0.15]} castShadow>
                <cylinderGeometry args={[0.03, 0.03, 3.8, 8]} />
                <meshStandardMaterial color="#2a2a32" metalness={0.85} roughness={0.3} />
              </mesh>
              <mesh position={[-0.15, 0, 0.15]} castShadow>
                <cylinderGeometry args={[0.03, 0.03, 3.8, 8]} />
                <meshStandardMaterial color="#2a2a32" metalness={0.85} roughness={0.3} />
              </mesh>
              <mesh position={[0.15, 0, 0.15]} castShadow>
                <cylinderGeometry args={[0.03, 0.03, 3.8, 8]} />
                <meshStandardMaterial color="#2a2a32" metalness={0.85} roughness={0.3} />
              </mesh>
              {/* Base Plate */}
              <mesh position={[0, -1.85, 0]}>
                <boxGeometry args={[0.45, 0.06, 0.45]} />
                <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
              </mesh>
            </group>
          ))}

          {/* Overhead Gantry Box Trusses */}
          {/* Front & Back Beams */}
          <group position={[0, 3.9, -2.6]}>
            <mesh castShadow>
              <boxGeometry args={[7.4, 0.3, 0.3]} />
              <meshStandardMaterial color="#1e1e24" metalness={0.8} roughness={0.3} />
            </mesh>
          </group>
          <group position={[0, 3.9, 2.6]}>
            <mesh castShadow>
              <boxGeometry args={[7.4, 0.3, 0.3]} />
              <meshStandardMaterial color="#1e1e24" metalness={0.8} roughness={0.3} />
            </mesh>
          </group>
          {/* Side Cross Beams */}
          <group position={[-3.6, 3.9, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.3, 0.3, 5.2]} />
              <meshStandardMaterial color="#1e1e24" metalness={0.8} roughness={0.3} />
            </mesh>
          </group>
          <group position={[3.6, 3.9, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.3, 0.3, 5.2]} />
              <meshStandardMaterial color="#1e1e24" metalness={0.8} roughness={0.3} />
            </mesh>
          </group>
        </group>
      )}

      {/* ============================================================== */}
      {/* STAGE 3: WALLS, SLATTED PANELS & POLISHED FLOORING */}
      {/* ============================================================== */}
      {showStage3 && (
        <group name="Stage3-Walls">
          {/* Dark Architectural Parquet Floor Overlay */}
          <mesh position={[0, 0.17, 0]} receiveShadow>
            <boxGeometry args={[8.1, 0.02, 6.1]} />
            <meshStandardMaterial 
              color="#141419" 
              roughness={0.25} 
              metalness={0.15} 
            />
          </mesh>

          {/* Main Backwall (7.2m wide x 3.6m tall) */}
          <mesh position={[0, 1.95, -2.5]} castShadow receiveShadow>
            <boxGeometry args={[7.2, 3.6, 0.18]} />
            <meshStandardMaterial 
              color="#121217" 
              roughness={0.5} 
              metalness={0.2} 
            />
          </mesh>

          {/* Left Wing Curved Privacy Partition */}
          <mesh position={[-3.5, 1.8, -0.6]} rotation={[0, 0.3, 0]} castShadow>
            <boxGeometry args={[0.15, 3.3, 3.2]} />
            <meshStandardMaterial color="#191922" roughness={0.4} metalness={0.3} />
          </mesh>

          {/* Vertical Architectural Acoustic Timber Fins on Backwall */}
          {Array.from({ length: 18 }).map((_, idx) => (
            <mesh 
              key={`fin-${idx}`} 
              position={[-3.2 + idx * 0.38, 1.95, -2.38]} 
              castShadow
            >
              <boxGeometry args={[0.06, 3.4, 0.08]} />
              <meshStandardMaterial 
                color={idx % 4 === 0 ? "#c5a880" : "#24242e"} 
                roughness={0.35} 
                metalness={0.4} 
              />
            </mesh>
          ))}
        </group>
      )}

      {/* ============================================================== */}
      {/* STAGE 4: ILLUMINATIONS & DIGITAL LED VIDEO DISPLAYS */}
      {/* ============================================================== */}
      {showStage4 && (
        <group name="Stage4-LightingAndScreens">
          {/* Panoramic Curved Center LED Video Wall */}
          <mesh 
            ref={screenMesh} 
            position={[0, 2.1, -2.35]} 
            castShadow
          >
            <boxGeometry args={[4.4, 2.2, 0.06]} />
            <meshStandardMaterial 
              color="#0a192f" 
              emissive="#1a365d" 
              emissiveIntensity={1.3} 
              roughness={0.2}
            />
          </mesh>

          {/* Glowing Ambient Cyan/Gold LED Neon Edge Strips */}
          <mesh position={[0, 3.23, -2.34]}>
            <boxGeometry args={[4.46, 0.04, 0.08]} />
            <meshStandardMaterial 
              color="#f3e5ab" 
              emissive="#d4af37" 
              emissiveIntensity={3} 
            />
          </mesh>
          <mesh position={[0, 0.97, -2.34]}>
            <boxGeometry args={[4.46, 0.04, 0.08]} />
            <meshStandardMaterial 
              color="#f3e5ab" 
              emissive="#d4af37" 
              emissiveIntensity={3} 
            />
          </mesh>

          {/* Overhead Truss Spotlights */}
          {[-2.5, -0.8, 0.8, 2.5].map((xPos, idx) => (
            <group key={`spot-${idx}`} position={[xPos, 3.75, 1.2]} rotation={[0.4, 0, 0]}>
              {/* Can Housing */}
              <mesh>
                <cylinderGeometry args={[0.08, 0.12, 0.25, 16]} />
                <meshStandardMaterial color="#111115" metalness={0.9} roughness={0.2} />
              </mesh>
              {/* Glowing Lens */}
              <mesh position={[0, -0.13, 0]}>
                <circleGeometry args={[0.1, 16]} />
                <meshStandardMaterial 
                  color="#ffffff" 
                  emissive="#fff4cc" 
                  emissiveIntensity={4} 
                />
              </mesh>
              {/* Targeted Spotlight */}
              <spotLight
                position={[0, 0, 0]}
                target-position={[xPos * 0.6, 0, 0]}
                angle={0.45}
                penumbra={0.6}
                intensity={45}
                color="#fff6dd"
                castShadow
              />
            </group>
          ))}

          {/* Floor Uplight Glow Rings */}
          {[-3.2, 3.2].map((x, i) => (
            <mesh key={`uplight-${i}`} position={[x, 0.18, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.2, 0.28, 32]} />
              <meshStandardMaterial 
                color="#d4af37" 
                emissive="#d4af37" 
                emissiveIntensity={2.5} 
              />
            </mesh>
          ))}
        </group>
      )}

      {/* ============================================================== */}
      {/* STAGE 5: BRANDING, SIGNAGE & RECEPTION DESK */}
      {/* ============================================================== */}
      {showStage5 && (
        <group name="Stage5-Branding">
          {/* Floating Overhead Kinetic Circular Halo Banner */}
          <group ref={haloBanner} position={[0, 4.6, 0]}>
            <mesh castShadow>
              <torusGeometry args={[2.2, 0.22, 16, 48]} />
              <meshStandardMaterial 
                color="#0f0f14" 
                roughness={0.3} 
                metalness={0.8} 
              />
            </mesh>
            <mesh position={[0, 0, 0]}>
              <torusGeometry args={[2.22, 0.03, 16, 48]} />
              <meshStandardMaterial 
                color="#d4af37" 
                emissive="#d4af37" 
                emissiveIntensity={2} 
              />
            </mesh>
          </group>

          {/* 3D Backlit Brand Identity Header on Backwall */}
          <group position={[0, 3.4, -2.3]}>
            {/* Logo Backer Plate */}
            <mesh>
              <boxGeometry args={[2.6, 0.55, 0.08]} />
              <meshStandardMaterial color="#08080c" metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Glowing Logo Geometry (AURA Monogram block) */}
            <mesh position={[0, 0, 0.05]}>
              <boxGeometry args={[1.8, 0.22, 0.04]} />
              <meshStandardMaterial 
                color="#f3e5ab" 
                emissive="#d4af37" 
                emissiveIntensity={2.2} 
                metalness={0.8}
              />
            </mesh>
          </group>

          {/* Front Curved Reception Counter */}
          <group position={[0, 0.65, 1.8]}>
            {/* Main Desk Body */}
            <mesh castShadow receiveShadow>
              <boxGeometry args={[2.4, 0.95, 0.8]} />
              <meshStandardMaterial color="#121217" roughness={0.3} metalness={0.4} />
            </mesh>
            {/* Champagne Gold Countertop */}
            <mesh position={[0, 0.5, 0]} castShadow>
              <boxGeometry args={[2.46, 0.06, 0.86]} />
              <meshStandardMaterial color="#c5a880" metalness={0.9} roughness={0.2} />
            </mesh>
            {/* Backlit Front Recess */}
            <mesh position={[0, -0.05, 0.41]}>
              <boxGeometry args={[2.0, 0.4, 0.02]} />
              <meshStandardMaterial 
                color="#d4af37" 
                emissive="#d4af37" 
                emissiveIntensity={1.8} 
              />
            </mesh>
          </group>

          {/* Interactive Product Pedestals (Left & Right) */}
          <group position={[-2.4, 0.55, 0.8]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.35, 0.38, 0.85, 24]} />
              <meshStandardMaterial color="#16161f" metalness={0.6} roughness={0.3} />
            </mesh>
            {/* Illuminated Glass Plinth */}
            <mesh position={[0, 0.46, 0]}>
              <cylinderGeometry args={[0.32, 0.32, 0.08, 24]} />
              <meshStandardMaterial 
                color="#f3e5ab" 
                emissive="#d4af37" 
                emissiveIntensity={2} 
              />
            </mesh>
          </group>

          <group position={[2.4, 0.55, 0.8]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.35, 0.38, 0.85, 24]} />
              <meshStandardMaterial color="#16161f" metalness={0.6} roughness={0.3} />
            </mesh>
            <mesh position={[0, 0.46, 0]}>
              <cylinderGeometry args={[0.32, 0.32, 0.08, 24]} />
              <meshStandardMaterial 
                color="#f3e5ab" 
                emissive="#d4af37" 
                emissiveIntensity={2} 
              />
            </mesh>
          </group>
        </group>
      )}

      {/* ============================================================== */}
      {/* STAGE 6: FINAL DETAILS, LOUNGE FURNITURE & TURNTABLE */}
      {/* ============================================================== */}
      {showStage6 && (
        <group name="Stage6-LoungeAndHandover">
          {/* Executive VIP Discussion Pod (Right side) */}
          <group position={[2.1, 0.2, -0.8]}>
            {/* Low Frosted Glass Coffee Table */}
            <mesh position={[0, 0.25, 0]} castShadow>
              <cylinderGeometry args={[0.55, 0.55, 0.04, 32]} />
              <meshStandardMaterial 
                color="#ffffff" 
                roughness={0.1} 
                metalness={0.1} 
                transparent 
                opacity={0.8} 
              />
            </mesh>
            <mesh position={[0, 0.12, 0]}>
              <cylinderGeometry args={[0.08, 0.25, 0.24, 16]} />
              <meshStandardMaterial color="#c5a880" metalness={0.9} roughness={0.2} />
            </mesh>

            {/* Modernist Lounge Armchairs */}
            {[-0.8, 0.8].map((offset, i) => (
              <group key={`chair-${i}`} position={[offset, 0.15, 0]} rotation={[0, i === 0 ? 0.7 : -0.7, 0]}>
                {/* Seat Cushion */}
                <mesh position={[0, 0.22, 0]} castShadow>
                  <boxGeometry args={[0.55, 0.12, 0.55]} />
                  <meshStandardMaterial color="#0f0f14" roughness={0.7} />
                </mesh>
                {/* Backrest */}
                <mesh position={[0, 0.48, -0.22]} castShadow>
                  <boxGeometry args={[0.55, 0.42, 0.1]} />
                  <meshStandardMaterial color="#0f0f14" roughness={0.7} />
                </mesh>
                {/* Gold Legs */}
                <mesh position={[0, 0.1, 0]}>
                  <cylinderGeometry args={[0.25, 0.32, 0.2, 4]} />
                  <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
                </mesh>
              </group>
            ))}
          </group>

          {/* Hero Feature Showcase Turntable (Left side) */}
          <group ref={turntable} position={[-2.1, 0.2, -0.8]}>
            {/* Revolving Base Disc */}
            <mesh castShadow receiveShadow>
              <cylinderGeometry args={[1.1, 1.15, 0.14, 32]} />
              <meshStandardMaterial color="#1a1a24" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Gold Ring Trim */}
            <mesh position={[0, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.95, 1.05, 32]} />
              <meshStandardMaterial 
                color="#d4af37" 
                emissive="#d4af37" 
                emissiveIntensity={2} 
              />
            </mesh>
            {/* Architectural Abstract Trophy / Sculptural Product Object */}
            <mesh position={[0, 0.65, 0]} castShadow>
              <octahedronGeometry args={[0.42]} />
              <meshStandardMaterial 
                color="#f3e5ab" 
                metalness={0.95} 
                roughness={0.1} 
              />
            </mesh>
          </group>

          {/* Architectural Planter Box with Greenery */}
          <group position={[-3.6, 0.45, 1.8]}>
            <mesh castShadow>
              <boxGeometry args={[0.5, 0.6, 1.4]} />
              <meshStandardMaterial color="#111116" roughness={0.4} />
            </mesh>
            {/* Foliage Spheres */}
            {[-0.35, 0, 0.35].map((z, idx) => (
              <mesh key={`plant-${idx}`} position={[0, 0.42, z]} castShadow>
                <sphereGeometry args={[0.24, 12, 12]} />
                <meshStandardMaterial color="#1e3a24" roughness={0.8} />
              </mesh>
            ))}
          </group>
        </group>
      )}
    </group>
  );
}
