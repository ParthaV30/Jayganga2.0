'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ProceduralStallProps {
  stage?: number; // 1 to 6
  progress?: number; // 0 to 1 (continuous)
  isHero?: boolean;
  wireframeMode?: boolean;
  activeCameraPreset?: string;
}

// Procedural texture generator for the high-end expo LED screen
function createDynamicScreenTexture() {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  // Initial draw
  ctx.fillStyle = '#070b14';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return { texture, canvas, ctx };
}

// Helper component for triangulated box-truss tower (real exhibition rigging standard)
function BoxTruss({ 
  height = 4, 
  size = 0.35, 
  wireframe = false,
  color = "#22222b",
  accentColor = "#c5a880"
}: { 
  height?: number; 
  size?: number; 
  wireframe?: boolean;
  color?: string;
  accentColor?: string;
}) {
  const half = size / 2;
  const chords = [
    [-half, -half],
    [half, -half],
    [-half, half],
    [half, half]
  ];

  const diagCount = Math.floor(height / 0.4);

  return (
    <group>
      {/* 4 Main Longitudinal Chords */}
      {chords.map(([cx, cz], i) => (
        <mesh key={`chord-${i}`} position={[cx, height / 2, cz]} castShadow>
          <cylinderGeometry args={[0.022, 0.022, height, 12]} />
          <meshStandardMaterial 
            color={color} 
            metalness={0.85} 
            roughness={0.25} 
            wireframe={wireframe}
          />
        </mesh>
      ))}

      {/* Cross & Diagonal Lacing Bars */}
      {Array.from({ length: diagCount }).map((_, idx) => {
        const y = idx * 0.4 + 0.2;
        return (
          <group key={`diag-ring-${idx}`} position={[0, y, 0]}>
            {/* Horizontal Perimeter Bracing */}
            <mesh position={[0, 0, -half]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.012, 0.012, size, 8]} />
              <meshStandardMaterial color={accentColor} metalness={0.8} roughness={0.3} wireframe={wireframe} />
            </mesh>
            <mesh position={[0, 0, half]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.012, 0.012, size, 8]} />
              <meshStandardMaterial color={accentColor} metalness={0.8} roughness={0.3} wireframe={wireframe} />
            </mesh>
            <mesh position={[-half, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.012, 0.012, size, 8]} />
              <meshStandardMaterial color={accentColor} metalness={0.8} roughness={0.3} wireframe={wireframe} />
            </mesh>
            <mesh position={[half, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.012, 0.012, size, 8]} />
              <meshStandardMaterial color={accentColor} metalness={0.8} roughness={0.3} wireframe={wireframe} />
            </mesh>
          </group>
        );
      })}

      {/* Cast Steel Floor Base Plate */}
      <mesh position={[0, 0.02, 0]} receiveShadow>
        <boxGeometry args={[size * 1.5, 0.04, size * 1.5]} />
        <meshStandardMaterial color="#c5a880" metalness={0.9} roughness={0.2} wireframe={wireframe} />
      </mesh>
    </group>
  );
}

// Horizontal Box Truss Beam
function HorizontalBeam({ 
  length = 8, 
  size = 0.35, 
  wireframe = false, 
  color = "#22222b" 
}: { 
  length?: number; 
  size?: number; 
  wireframe?: boolean; 
  color?: string; 
}) {
  const half = size / 2;
  return (
    <group>
      {/* 4 Chords */}
      {[-half, half].map((y, yi) =>
        [-half, half].map((z, zi) => (
          <mesh key={`beam-chord-${yi}-${zi}`} position={[0, y, z]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, length, 12]} />
            <meshStandardMaterial color={color} metalness={0.85} roughness={0.25} wireframe={wireframe} />
          </mesh>
        ))
      )}
      {/* Central Solid Structural Core */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[length, size * 0.7, size * 0.7]} />
        <meshStandardMaterial color="#16161c" metalness={0.7} roughness={0.4} wireframe={wireframe} />
      </mesh>
    </group>
  );
}

export default function ProceduralStall({
  stage,
  progress = 1,
  isHero = false,
  wireframeMode = false
}: ProceduralStallProps) {
  const stallGroup = useRef<THREE.Group>(null);
  const haloRef = useRef<THREE.Group>(null);
  const turntableRef = useRef<THREE.Group>(null);
  const carSculptRef = useRef<THREE.Group>(null);
  const screenMesh = useRef<THREE.Mesh>(null);
  const laserScannerRef = useRef<THREE.Mesh>(null);

  // Dynamic LED Screen Canvas Animation
  const screenData = useMemo(() => createDynamicScreenTexture(), []);

  // Compute smooth continuous progress weights for each stage (0 to 1)
  const normProgress = progress !== undefined ? progress : (stage ? (stage - 1) / 5 : 1);

  // Smooth step helpers: s1=0..0.2, s2=0.15..0.4, s3=0.35..0.6, s4=0.55..0.8, s5=0.7..0.9, s6=0.85..1.0
  const easeStage = (min: number, max: number) => {
    return THREE.MathUtils.smoothstep(normProgress, min, max);
  };

  const w1 = easeStage(0.0, 0.15); // Floor & Foundation
  const w2 = easeStage(0.12, 0.35); // Truss Structure
  const w3 = easeStage(0.32, 0.55); // Walls & Mezzanine
  const w4 = easeStage(0.52, 0.75); // Lighting & LED Screens
  const w5 = easeStage(0.70, 0.90); // Signage & Reception
  const w6 = easeStage(0.85, 1.0);  // VIP Lounge, Furniture & Finishing

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Subtle gentle hero drift
    if (isHero && stallGroup.current) {
      stallGroup.current.rotation.y += delta * 0.08;
    }

    // Overhead Halo Kinetic Rotation
    if (haloRef.current) {
      haloRef.current.rotation.y -= delta * 0.25;
      haloRef.current.position.y = 4.8 + Math.sin(t * 1.5) * 0.08;
    }

    // Centerpiece Turntable Rotation
    if (turntableRef.current) {
      turntableRef.current.rotation.y += delta * 0.35;
    }

    // Laser Floor Scanner Bar
    if (laserScannerRef.current) {
      laserScannerRef.current.position.z = Math.sin(t * 1.8) * 3.2;
    }

    // Draw Live Kinetic Architectural Content onto LED Screen Canvas
    if (screenData && screenData.ctx) {
      const { ctx, canvas, texture } = screenData;
      // High-tech dark gradient backdrop
      ctx.fillStyle = '#060a12';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Moving architectural wave & grid lines
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 16) {
        const y = 256 + Math.sin((x * 0.015) + (t * 2)) * 60 + Math.cos((x * 0.03) - (t * 1.5)) * 30;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Digital Scan Overlay
      ctx.fillStyle = 'rgba(212, 175, 55, 0.08)';
      const scanY = (t * 140) % canvas.height;
      ctx.fillRect(0, scanY, canvas.width, 18);

      // Editorial Typography on screen
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px monospace';
      ctx.fillText('AURA FORGE PAVILION', 60, 140);
      ctx.fillStyle = '#d4af37';
      ctx.font = '22px monospace';
      ctx.fillText('PRECISION STRUCTURAL FABRICATION // 2026', 60, 180);

      texture.needsUpdate = true;
    }
  });

  return (
    <group ref={stallGroup} position={[0, -1.2, 0]}>
      {/* ============================================================== */}
      {/* STAGE 1: SUBFLOOR, LASER GRID & EXPANSION PLINTH */}
      {/* ============================================================== */}
      <group name="Stage1-Foundation" scale={[w1, 1, w1]}>
        {/* Main 9.6m x 7.2m Heavy Raised Exhibition Platform */}
        <mesh position={[0, 0.09, 0]} receiveShadow>
          <boxGeometry args={[9.6, 0.18, 7.2]} />
          <meshStandardMaterial 
            color="#0a0a0e" 
            roughness={0.35} 
            metalness={0.2} 
            wireframe={wireframeMode}
          />
        </mesh>

        {/* Brushed Champagne Gold Beveled Perimeter Edge Trim */}
        <mesh position={[0, 0.09, 3.62]}>
          <boxGeometry args={[9.64, 0.19, 0.04]} />
          <meshStandardMaterial color="#c5a880" metalness={0.9} roughness={0.2} wireframe={wireframeMode} />
        </mesh>
        <mesh position={[0, 0.09, -3.62]}>
          <boxGeometry args={[9.64, 0.19, 0.04]} />
          <meshStandardMaterial color="#c5a880" metalness={0.9} roughness={0.2} wireframe={wireframeMode} />
        </mesh>
        <mesh position={[4.82, 0.09, 0]}>
          <boxGeometry args={[0.04, 0.19, 7.24]} />
          <meshStandardMaterial color="#c5a880" metalness={0.9} roughness={0.2} wireframe={wireframeMode} />
        </mesh>
        <mesh position={[-4.82, 0.09, 0]}>
          <boxGeometry args={[0.04, 0.19, 7.24]} />
          <meshStandardMaterial color="#c5a880" metalness={0.9} roughness={0.2} wireframe={wireframeMode} />
        </mesh>

        {/* Architectural Laser Grid Lines */}
        <gridHelper 
          args={[9.4, 12, '#d4af37', '#222230']} 
          position={[0, 0.185, 0]} 
        />

        {/* Animated Laser Scanning Guide Beam */}
        <mesh ref={laserScannerRef} position={[0, 0.19, 0]}>
          <boxGeometry args={[9.4, 0.015, 0.03]} />
          <meshBasicMaterial color="#d4af37" transparent opacity={0.65} />
        </mesh>

        {/* 4 Corner Pylons with Hydraulic Leveling Indicators */}
        {[[-4.5, -3.3], [4.5, -3.3], [-4.5, 3.3], [4.5, 3.3]].map(([px, pz], i) => (
          <group key={`corner-pylon-${i}`} position={[px, 0.22, pz]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.16, 0.2, 0.38, 16]} />
              <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.15} wireframe={wireframeMode} />
            </mesh>
            <mesh position={[0, 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.1, 0.14, 16]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
          </group>
        ))}
      </group>

      {/* ============================================================== */}
      {/* STAGE 2: TRIANGULATED STRUCTURAL ALUMINUM BOX TRUSSES */}
      {/* ============================================================== */}
      <group 
        name="Stage2-Framework" 
        position={[0, (1 - w2) * 5, 0]} 
        scale={[1, w2, 1]}
      >
        {/* 4 Heavy Column Towers (4.4m tall) */}
        {[[-4.2, -3.0], [4.2, -3.0], [-4.2, 3.0], [4.2, 3.0]].map(([tx, tz], i) => (
          <group key={`truss-col-${i}`} position={[tx, 0.18, tz]}>
            <BoxTruss height={4.4} size={0.35} wireframe={wireframeMode} color="#1c1c24" />
          </group>
        ))}

        {/* Overhead Gantry Box Trusses */}
        {/* Front & Back Horizontal Bridge Trusses (Length 8.8m) */}
        <group position={[0, 4.58, -3.0]}>
          <HorizontalBeam length={8.8} size={0.35} wireframe={wireframeMode} color="#1c1c24" />
        </group>
        <group position={[0, 4.58, 3.0]}>
          <HorizontalBeam length={8.8} size={0.35} wireframe={wireframeMode} color="#1c1c24" />
        </group>
        {/* Lateral Cross Beams (Length 6.0m) */}
        <group position={[-4.2, 4.58, 0]} rotation={[0, Math.PI / 2, 0]}>
          <HorizontalBeam length={6.0} size={0.35} wireframe={wireframeMode} color="#1c1c24" />
        </group>
        <group position={[4.2, 4.58, 0]} rotation={[0, Math.PI / 2, 0]}>
          <HorizontalBeam length={6.0} size={0.35} wireframe={wireframeMode} color="#1c1c24" />
        </group>

        {/* Central Rigging Ring Anchor */}
        <mesh position={[0, 4.62, 0]}>
          <cylinderGeometry args={[0.8, 0.8, 0.12, 24]} />
          <meshStandardMaterial color="#c5a880" metalness={0.9} roughness={0.2} wireframe={wireframeMode} />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* STAGE 3: MEZZANINE UPPER DECK, WALLS, STAIRS & ACOUSTIC FINS */}
      {/* ============================================================== */}
      <group 
        name="Stage3-WallsAndMezzanine" 
        position={[0, (1 - w3) * -3, 0]} 
        scale={[w3, w3, w3]}
      >
        {/* Dark Architectural Stone Parquet Floor Overlay */}
        <mesh position={[0, 0.185, 0]} receiveShadow>
          <boxGeometry args={[9.4, 0.02, 7.0]} />
          <meshStandardMaterial 
            color="#131318" 
            roughness={0.22} 
            metalness={0.25} 
            wireframe={wireframeMode}
          />
        </mesh>

        {/* Monolithic Rear Wall (8.2m wide x 4.2m tall) */}
        <mesh position={[0, 2.2, -2.95]} castShadow receiveShadow>
          <boxGeometry args={[8.4, 4.2, 0.2]} />
          <meshStandardMaterial 
            color="#0d0d12" 
            roughness={0.6} 
            metalness={0.2} 
            wireframe={wireframeMode}
          />
        </mesh>

        {/* Vertical Acoustic Architectural Fluted Oak Timber Fins */}
        {Array.from({ length: 24 }).map((_, idx) => (
          <mesh 
            key={`fluted-fin-${idx}`} 
            position={[-3.8 + idx * 0.33, 2.2, -2.82]} 
            castShadow
          >
            <boxGeometry args={[0.07, 4.0, 0.09]} />
            <meshStandardMaterial 
              color={idx % 3 === 0 ? "#c5a880" : "#1f1f2a"} 
              roughness={0.3} 
              metalness={0.4} 
              wireframe={wireframeMode}
            />
          </mesh>
        ))}

        {/* Cantilevered Mezzanine VIP Platform (Right Half: 4.2m x 3.2m at Height 2.3m) */}
        <group position={[2.2, 2.3, -1.0]}>
          {/* Structural Steel I-Beam Floor Plate */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[4.2, 0.18, 3.4]} />
            <meshStandardMaterial color="#111116" roughness={0.3} metalness={0.6} wireframe={wireframeMode} />
          </mesh>

          {/* Tempered Smoked Glass Safety Balustrade */}
          <mesh position={[0, 0.6, 1.7]} castShadow>
            <boxGeometry args={[4.2, 1.05, 0.04]} />
            <meshStandardMaterial 
              color="#2a3342" 
              roughness={0.05} 
              metalness={0.1} 
              transparent 
              opacity={0.65} 
              wireframe={wireframeMode}
            />
          </mesh>
          <mesh position={[2.1, 0.6, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
            <boxGeometry args={[3.4, 1.05, 0.04]} />
            <meshStandardMaterial 
              color="#2a3342" 
              roughness={0.05} 
              metalness={0.1} 
              transparent 
              opacity={0.65} 
              wireframe={wireframeMode}
            />
          </mesh>

          {/* Polished Champagne Gold Top Handrail */}
          <mesh position={[0, 1.14, 1.7]}>
            <boxGeometry args={[4.24, 0.05, 0.06]} />
            <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.15} wireframe={wireframeMode} />
          </mesh>
          <mesh position={[2.1, 1.14, 0]} rotation={[0, Math.PI / 2, 0]}>
            <boxGeometry args={[3.44, 0.05, 0.06]} />
            <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.15} wireframe={wireframeMode} />
          </mesh>
        </group>

        {/* Floating Architectural Staircase to Mezzanine */}
        <group position={[-0.3, 0.18, -1.0]}>
          {Array.from({ length: 11 }).map((_, stepIdx) => {
            const sy = stepIdx * 0.19;
            const sz = stepIdx * 0.26;
            return (
              <group key={`step-${stepIdx}`} position={[0, sy, -sz + 1.2]}>
                {/* Floating Tread */}
                <mesh castShadow receiveShadow>
                  <boxGeometry args={[0.95, 0.06, 0.28]} />
                  <meshStandardMaterial color="#181822" roughness={0.3} metalness={0.5} wireframe={wireframeMode} />
                </mesh>
                {/* Gold LED Tread Glow */}
                <mesh position={[0, -0.035, 0.13]}>
                  <boxGeometry args={[0.95, 0.015, 0.02]} />
                  <meshStandardMaterial color="#d4af37" emissive="#d4af37" emissiveIntensity={3} />
                </mesh>
              </group>
            );
          })}
        </group>
      </group>

      {/* ============================================================== */}
      {/* STAGE 4: HIGH-BRIGHTNESS CURVED LED VIDEO WALL & PHOTOMETRICS */}
      {/* ============================================================== */}
      <group 
        name="Stage4-LightingAndLED" 
        position={[0, 0, 0]} 
        scale={[w4, w4, w4]}
      >
        {/* Ultra-Wide Panoramic Curved LED Video Screen (5.4m wide x 2.4m tall) */}
        <mesh 
          ref={screenMesh} 
          position={[-1.2, 2.3, -2.8]} 
          castShadow
        >
          <boxGeometry args={[5.2, 2.3, 0.08]} />
          {screenData?.texture ? (
            <meshStandardMaterial 
              map={screenData.texture} 
              emissive="#ffffff" 
              emissiveMap={screenData.texture} 
              emissiveIntensity={1.4} 
              roughness={0.2}
              wireframe={wireframeMode}
            />
          ) : (
            <meshStandardMaterial 
              color="#0d1b2a" 
              emissive="#1e3a8a" 
              emissiveIntensity={1.8} 
              wireframe={wireframeMode}
            />
          )}
        </mesh>

        {/* Ambient Gold LED Neon Surround Strips */}
        <mesh position={[-1.2, 3.48, -2.78]}>
          <boxGeometry args={[5.26, 0.05, 0.09]} />
          <meshStandardMaterial color="#f3e5ab" emissive="#d4af37" emissiveIntensity={3.5} />
        </mesh>
        <mesh position={[-1.2, 1.12, -2.78]}>
          <boxGeometry args={[5.26, 0.05, 0.09]} />
          <meshStandardMaterial color="#f3e5ab" emissive="#d4af37" emissiveIntensity={3.5} />
        </mesh>

        {/* 6 Suspended Professional Truss Spotlights */}
        {[-3.2, -1.8, -0.4, 1.2, 2.6, 3.8].map((lx, i) => (
          <group key={`truss-spotlight-${i}`} position={[lx, 4.4, 1.4]} rotation={[0.45, 0, 0]}>
            {/* Housing Can */}
            <mesh castShadow>
              <cylinderGeometry args={[0.09, 0.13, 0.28, 16]} />
              <meshStandardMaterial color="#0e0e12" metalness={0.9} roughness={0.2} wireframe={wireframeMode} />
            </mesh>
            {/* High-Lumen Emitter Lens */}
            <mesh position={[0, -0.14, 0]}>
              <circleGeometry args={[0.11, 16]} />
              <meshStandardMaterial color="#ffffff" emissive="#fff5db" emissiveIntensity={5} />
            </mesh>
            {/* Targeted Beam */}
            <spotLight
              position={[0, 0, 0]}
              target-position={[lx * 0.7, 0, 0]}
              angle={0.42}
              penumbra={0.7}
              intensity={55 * w4}
              color="#fff8e8"
              castShadow
            />
          </group>
        ))}

        {/* Floor Recessed Linear Uplight Channels */}
        <mesh position={[0, 0.19, -2.7]}>
          <boxGeometry args={[8.2, 0.01, 0.08]} />
          <meshStandardMaterial color="#d4af37" emissive="#d4af37" emissiveIntensity={3 * w4} />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* STAGE 5: KINETIC OVERHEAD HALO, MONOGRAM & RECEPTION */}
      {/* ============================================================== */}
      <group 
        name="Stage5-SignageAndBranding" 
        scale={[w5, w5, w5]}
      >
        {/* Kinetic Overhead Circular Suspended Halo Banner (Diameter 5.2m) */}
        <group ref={haloRef} position={[0, 4.8, 0]}>
          <mesh castShadow>
            <torusGeometry args={[2.5, 0.26, 16, 64]} />
            <meshStandardMaterial color="#0b0b10" metalness={0.85} roughness={0.2} wireframe={wireframeMode} />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <torusGeometry args={[2.52, 0.035, 16, 64]} />
            <meshStandardMaterial color="#f3e5ab" emissive="#d4af37" emissiveIntensity={3} />
          </mesh>
        </group>

        {/* 3D Backlit Brand Signage Monogram ("AURA") */}
        <group position={[-1.2, 3.8, -2.7]}>
          <mesh castShadow>
            <boxGeometry args={[3.2, 0.65, 0.09]} />
            <meshStandardMaterial color="#07070a" metalness={0.95} roughness={0.1} wireframe={wireframeMode} />
          </mesh>
          <mesh position={[0, 0, 0.06]}>
            <boxGeometry args={[2.4, 0.26, 0.04]} />
            <meshStandardMaterial 
              color="#ffffff" 
              emissive="#f3e5ab" 
              emissiveIntensity={2.8} 
              metalness={0.8}
            />
          </mesh>
        </group>

        {/* Monolithic Curved Reception Desk (Front Position [0, 0.7, 2.2]) */}
        <group position={[0, 0.7, 2.2]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[2.8, 1.0, 0.9]} />
            <meshStandardMaterial color="#111116" roughness={0.25} metalness={0.4} wireframe={wireframeMode} />
          </mesh>
          {/* Top Champagne Gold Counter */}
          <mesh position={[0, 0.52, 0]} castShadow>
            <boxGeometry args={[2.88, 0.07, 0.98]} />
            <meshStandardMaterial color="#c5a880" metalness={0.95} roughness={0.15} wireframe={wireframeMode} />
          </mesh>
          {/* Recessed Glowing Accent Panel */}
          <mesh position={[0, -0.05, 0.46]}>
            <boxGeometry args={[2.4, 0.45, 0.03]} />
            <meshStandardMaterial color="#d4af37" emissive="#d4af37" emissiveIntensity={2.2} />
          </mesh>
        </group>

        {/* Illuminated Touchscreen Kiosks (Flanking Reception Desk) */}
        {[-2.2, 2.2].map((kx, i) => (
          <group key={`kiosk-${i}`} position={[kx, 0.65, 2.0]} rotation={[0, i === 0 ? 0.3 : -0.3, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.45, 1.1, 0.35]} />
              <meshStandardMaterial color="#15151e" metalness={0.7} roughness={0.3} wireframe={wireframeMode} />
            </mesh>
            {/* Screen */}
            <mesh position={[0, 0.4, 0.18]} rotation={[-0.3, 0, 0]}>
              <boxGeometry args={[0.38, 0.28, 0.02]} />
              <meshStandardMaterial color="#f3e5ab" emissive="#d4af37" emissiveIntensity={2.0} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ============================================================== */}
      {/* STAGE 6: COMPLETED PAVILION — REVOLVING HERO SCULPTURE & VIP */}
      {/* ============================================================== */}
      <group 
        name="Stage6-FinishedPavilion" 
        scale={[w6, w6, w6]}
      >
        {/* Left Side: Motorized 360° Revolving Showcase Turntable */}
        <group ref={turntableRef} position={[-2.4, 0.2, 0.2]}>
          {/* Circular Rotating Platform Disc (Diameter 2.6m) */}
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[1.3, 1.35, 0.18, 36]} />
            <meshStandardMaterial color="#1a1a24" metalness={0.85} roughness={0.2} wireframe={wireframeMode} />
          </mesh>
          {/* Illuminated Perimeter Ring */}
          <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.15, 1.25, 36]} />
            <meshStandardMaterial color="#d4af37" emissive="#d4af37" emissiveIntensity={3} />
          </mesh>

          {/* Aerodynamic Sculptural Concept Centerpiece */}
          <group ref={carSculptRef} position={[0, 0.5, 0]}>
            <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
              <coneGeometry args={[0.7, 0.6, 6]} />
              <meshStandardMaterial 
                color="#e5c158" 
                metalness={0.95} 
                roughness={0.12} 
                wireframe={wireframeMode}
              />
            </mesh>
            <mesh position={[0, 0.4, 0]} castShadow>
              <octahedronGeometry args={[0.35]} />
              <meshStandardMaterial 
                color="#ffffff" 
                metalness={0.9} 
                roughness={0.1} 
                emissive="#f3e5ab" 
                emissiveIntensity={1.2}
                wireframe={wireframeMode}
              />
            </mesh>
          </group>
        </group>

        {/* Right Side: VIP Executive Discussion Lounge */}
        <group position={[2.4, 0.2, 0.2]}>
          {/* Low Circular Smoked Glass Coffee Table */}
          <mesh position={[0, 0.26, 0]} castShadow>
            <cylinderGeometry args={[0.6, 0.6, 0.04, 32]} />
            <meshStandardMaterial 
              color="#ffffff" 
              roughness={0.08} 
              metalness={0.1} 
              transparent 
              opacity={0.75} 
              wireframe={wireframeMode}
            />
          </mesh>
          <mesh position={[0, 0.13, 0]}>
            <cylinderGeometry args={[0.1, 0.28, 0.26, 16]} />
            <meshStandardMaterial color="#c5a880" metalness={0.9} roughness={0.2} wireframe={wireframeMode} />
          </mesh>

          {/* 3 Modernist Designer Lounge Chairs */}
          {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((angle, i) => {
            const cx = Math.cos(angle) * 0.95;
            const cz = Math.sin(angle) * 0.95;
            return (
              <group key={`lounge-chair-${i}`} position={[cx, 0.16, cz]} rotation={[0, -angle + Math.PI, 0]}>
                {/* Seat Cushion */}
                <mesh position={[0, 0.24, 0]} castShadow>
                  <boxGeometry args={[0.56, 0.12, 0.56]} />
                  <meshStandardMaterial color="#0e0e14" roughness={0.7} wireframe={wireframeMode} />
                </mesh>
                {/* Curved Backrest */}
                <mesh position={[0, 0.52, -0.22]} castShadow>
                  <boxGeometry args={[0.56, 0.45, 0.08]} />
                  <meshStandardMaterial color="#0e0e14" roughness={0.7} wireframe={wireframeMode} />
                </mesh>
                {/* Brushed Gold Leg Spiders */}
                <mesh position={[0, 0.11, 0]}>
                  <cylinderGeometry args={[0.26, 0.32, 0.22, 4]} />
                  <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.2} wireframe={wireframeMode} />
                </mesh>
              </group>
            );
          })}
        </group>

        {/* Biophilic Preserved Moss Planter Installations */}
        <group position={[-4.2, 0.5, 2.2]}>
          <mesh castShadow>
            <boxGeometry args={[0.5, 0.65, 1.6]} />
            <meshStandardMaterial color="#101015" roughness={0.4} wireframe={wireframeMode} />
          </mesh>
          {[-0.45, 0, 0.45].map((pz, idx) => (
            <mesh key={`moss-${idx}`} position={[0, 0.45, pz]} castShadow>
              <sphereGeometry args={[0.28, 14, 14]} />
              <meshStandardMaterial color="#1c3a26" roughness={0.85} wireframe={wireframeMode} />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
}
