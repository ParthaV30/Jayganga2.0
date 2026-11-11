'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ProceduralStallProps {
  stage?: number;
  progress?: number;
  isHero?: boolean;
  wireframeMode?: boolean;
}

// Procedural texture generator for the architectural LED screen
function createDynamicScreenTexture() {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  ctx.fillStyle = '#202522';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return { texture, canvas, ctx };
}

// Helper component for triangulated box-truss tower in Graphite & Concrete
function BoxTruss({ 
  height = 4, 
  size = 0.35, 
  wireframe = false,
  color = "#202522",
  accentColor = "#777B70"
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
            metalness={0.75} 
            roughness={0.35} 
            wireframe={wireframe}
          />
        </mesh>
      ))}

      {/* Cross & Diagonal Lacing Bars */}
      {Array.from({ length: diagCount }).map((_, idx) => {
        const y = idx * 0.4 + 0.2;
        return (
          <group key={`diag-ring-${idx}`} position={[0, y, 0]}>
            <mesh position={[0, 0, -half]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.012, 0.012, size, 8]} />
              <meshStandardMaterial color={accentColor} metalness={0.7} roughness={0.4} wireframe={wireframe} />
            </mesh>
            <mesh position={[0, 0, half]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.012, 0.012, size, 8]} />
              <meshStandardMaterial color={accentColor} metalness={0.7} roughness={0.4} wireframe={wireframe} />
            </mesh>
            <mesh position={[-half, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.012, 0.012, size, 8]} />
              <meshStandardMaterial color={accentColor} metalness={0.7} roughness={0.4} wireframe={wireframe} />
            </mesh>
            <mesh position={[half, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.012, 0.012, size, 8]} />
              <meshStandardMaterial color={accentColor} metalness={0.7} roughness={0.4} wireframe={wireframe} />
            </mesh>
          </group>
        );
      })}

      {/* Cast Steel Floor Base Plate */}
      <mesh position={[0, 0.02, 0]} receiveShadow>
        <boxGeometry args={[size * 1.5, 0.04, size * 1.5]} />
        <meshStandardMaterial color="#777B70" metalness={0.8} roughness={0.3} wireframe={wireframe} />
      </mesh>
    </group>
  );
}

// Horizontal Box Truss Beam
function HorizontalBeam({ 
  length = 8, 
  size = 0.35, 
  wireframe = false, 
  color = "#202522" 
}: { 
  length?: number; 
  size?: number; 
  wireframe?: boolean; 
  color?: string; 
}) {
  const half = size / 2;
  return (
    <group>
      {[-half, half].map((y, yi) =>
        [-half, half].map((z, zi) => (
          <mesh key={`beam-chord-${yi}-${zi}`} position={[0, y, z]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, length, 12]} />
            <meshStandardMaterial color={color} metalness={0.75} roughness={0.35} wireframe={wireframe} />
          </mesh>
        ))
      )}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[length, size * 0.7, size * 0.7]} />
        <meshStandardMaterial color="#292B28" metalness={0.65} roughness={0.45} wireframe={wireframe} />
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
  const turntableRef = useRef<THREE.Group>(null);
  const carSculptRef = useRef<THREE.Group>(null);
  const screenMesh = useRef<THREE.Mesh>(null);
  const laserScannerRef = useRef<THREE.Mesh>(null);

  const screenData = useMemo(() => createDynamicScreenTexture(), []);

  const normProgress = progress !== undefined ? progress : (stage ? (stage - 1) / 5 : 1);

  const easeStage = (min: number, max: number) => {
    return THREE.MathUtils.smoothstep(normProgress, min, max);
  };

  const w1 = easeStage(0.0, 0.15);
  const w2 = easeStage(0.12, 0.35);
  const w3 = easeStage(0.32, 0.55);
  const w4 = easeStage(0.52, 0.75);
  const w5 = easeStage(0.70, 0.90);
  const w6 = easeStage(0.85, 1.0);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (isHero && stallGroup.current) {
      stallGroup.current.rotation.y += delta * 0.08;
    }

    if (turntableRef.current) {
      turntableRef.current.rotation.y += delta * 0.3;
    }

    if (laserScannerRef.current) {
      laserScannerRef.current.position.z = Math.sin(t * 1.5) * 3.2;
    }

    if (screenData && screenData.ctx) {
      const { ctx, canvas, texture } = screenData;
      // High-tech dark backdrop
      ctx.fillStyle = '#161917';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Subtle architectural grid background
      ctx.strokeStyle = 'rgba(119, 123, 112, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
      }
      ctx.stroke();

      // Animated live exhibition audio-visual spectrum bars
      ctx.fillStyle = '#C65D36';
      for (let b = 0; b < 24; b++) {
        const barH = 20 + Math.sin(t * 4 + b * 0.4) * 16 + Math.cos(t * 2 + b * 0.6) * 12;
        ctx.fillRect(60 + b * 18, 420 - barH, 10, barH);
      }

      // Glowing accent line
      ctx.strokeStyle = '#C65D36';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(60, 220);
      ctx.lineTo(960, 220);
      ctx.stroke();

      // Primary Brand Name & Trade Show Messaging
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '900 38px sans-serif';
      ctx.fillText('JAYGANGA EXHIBITIONS', 60, 130);

      ctx.fillStyle = '#C65D36';
      ctx.font = 'bold 20px monospace';
      ctx.fillText('TURNKEY STALL FABRICATION // 2026', 60, 175);

      ctx.fillStyle = '#D6D1C5';
      ctx.font = '16px monospace';
      ctx.fillText('HALL 4 • BOOTH B-12 • 120 SQM ISLAND • 100% EXPO READY', 60, 260);

      texture.needsUpdate = true;
    }
  });

  return (
    <group ref={stallGroup} position={[0, -1.2, 0]}>
      {/* ============================================================== */}
      {/* STAGE 1: SUBFLOOR, LASER GRID & PLINTH */}
      {/* ============================================================== */}
      <group name="Stage1-Foundation" scale={[w1, 1, w1]}>
        {/* Main 9.6m x 7.2m Platform in Warm Ivory / Stone Plinth */}
        <mesh position={[0, 0.09, 0]} receiveShadow>
          <boxGeometry args={[9.6, 0.18, 7.2]} />
          <meshStandardMaterial 
            color="#D6D1C5" 
            roughness={0.6} 
            metalness={0.1} 
            wireframe={wireframeMode}
          />
        </mesh>

        {/* Concrete Perimeter Edge Trim */}
        <mesh position={[0, 0.09, 3.62]}>
          <boxGeometry args={[9.64, 0.19, 0.04]} />
          <meshStandardMaterial color="#777B70" metalness={0.6} roughness={0.4} wireframe={wireframeMode} />
        </mesh>
        <mesh position={[0, 0.09, -3.62]}>
          <boxGeometry args={[9.64, 0.19, 0.04]} />
          <meshStandardMaterial color="#777B70" metalness={0.6} roughness={0.4} wireframe={wireframeMode} />
        </mesh>
        <mesh position={[4.82, 0.09, 0]}>
          <boxGeometry args={[0.04, 0.19, 7.24]} />
          <meshStandardMaterial color="#777B70" metalness={0.6} roughness={0.4} wireframe={wireframeMode} />
        </mesh>
        <mesh position={[-4.82, 0.09, 0]}>
          <boxGeometry args={[0.04, 0.19, 7.24]} />
          <meshStandardMaterial color="#777B70" metalness={0.6} roughness={0.4} wireframe={wireframeMode} />
        </mesh>

        {/* Clean Architectural Grid Lines */}
        <gridHelper 
          args={[9.4, 12, '#202522', '#777B70']} 
          position={[0, 0.185, 0]} 
        />

        {/* Subtle Laser Guide Bar in Burnt Orange */}
        <mesh ref={laserScannerRef} position={[0, 0.19, 0]}>
          <boxGeometry args={[9.4, 0.015, 0.03]} />
          <meshBasicMaterial color="#C65D36" transparent opacity={0.7} />
        </mesh>

        {/* 4 Corner Pylons in Graphite & Concrete */}
        {[[-4.5, -3.3], [4.5, -3.3], [-4.5, 3.3], [4.5, 3.3]].map(([px, pz], i) => (
          <group key={`corner-pylon-${i}`} position={[px, 0.22, pz]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.16, 0.2, 0.38, 16]} />
              <meshStandardMaterial color="#202522" metalness={0.8} roughness={0.3} wireframe={wireframeMode} />
            </mesh>
            <mesh position={[0, 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.1, 0.14, 16]} />
              <meshBasicMaterial color="#C65D36" />
            </mesh>
          </group>
        ))}
      </group>

      {/* ============================================================== */}
      {/* STAGE 2: TRIANGULATED STRUCTURAL BOX TRUSSES */}
      {/* ============================================================== */}
      <group 
        name="Stage2-Framework" 
        position={[0, (1 - w2) * 5, 0]} 
        scale={[1, w2, 1]}
      >
        {/* 4 Column Towers (Graphite #202522) */}
        {[[-4.2, -3.0], [4.2, -3.0], [-4.2, 3.0], [4.2, 3.0]].map(([tx, tz], i) => (
          <group key={`truss-col-${i}`} position={[tx, 0.18, tz]}>
            <BoxTruss height={4.4} size={0.35} wireframe={wireframeMode} color="#202522" accentColor="#777B70" />
          </group>
        ))}

        {/* Overhead Gantry Box Trusses */}
        <group position={[0, 4.58, -3.0]}>
          <HorizontalBeam length={8.8} size={0.35} wireframe={wireframeMode} color="#202522" />
        </group>
        <group position={[0, 4.58, 3.0]}>
          <HorizontalBeam length={8.8} size={0.35} wireframe={wireframeMode} color="#202522" />
        </group>
        <group position={[-4.2, 4.58, 0]} rotation={[0, Math.PI / 2, 0]}>
          <HorizontalBeam length={6.0} size={0.35} wireframe={wireframeMode} color="#202522" />
        </group>
        <group position={[4.2, 4.58, 0]} rotation={[0, Math.PI / 2, 0]}>
          <HorizontalBeam length={6.0} size={0.35} wireframe={wireframeMode} color="#202522" />
        </group>

        {/* Central Anchor Node in Concrete */}
        <mesh position={[0, 4.62, 0]}>
          <cylinderGeometry args={[0.8, 0.8, 0.12, 24]} />
          <meshStandardMaterial color="#777B70" metalness={0.7} roughness={0.3} wireframe={wireframeMode} />
        </mesh>

        {/* Real-World Venue Ceiling Rigging Cables (Trade Show Hall Roof Anchors) */}
        {[[-4.2, -3.0], [4.2, -3.0], [-4.2, 3.0], [4.2, 3.0]].map(([rx, rz], i) => (
          <mesh key={`rigging-cable-${i}`} position={[rx, 8.5, rz]}>
            <cylinderGeometry args={[0.008, 0.008, 8.0, 6]} />
            <meshStandardMaterial color="#777B70" metalness={0.9} roughness={0.2} wireframe={wireframeMode} />
          </mesh>
        ))}
      </group>

      {/* ============================================================== */}
      {/* STAGE 3: MEZZANINE, STONE WALLS & TIMBER FINS */}
      {/* ============================================================== */}
      <group 
        name="Stage3-WallsAndMezzanine" 
        position={[0, (1 - w3) * -3, 0]} 
        scale={[w3, w3, w3]}
      >
        {/* Floor Cladding in Warm Ivory & Stone */}
        <mesh position={[0, 0.185, 0]} receiveShadow>
          <boxGeometry args={[9.4, 0.02, 7.0]} />
          <meshStandardMaterial 
            color="#202522" 
            roughness={0.4} 
            metalness={0.1} 
            wireframe={wireframeMode}
          />
        </mesh>

        {/* Rear Feature Wall in Graphite */}
        <mesh position={[0, 2.2, -2.95]} castShadow receiveShadow>
          <boxGeometry args={[8.4, 4.2, 0.2]} />
          <meshStandardMaterial 
            color="#202522" 
            roughness={0.5} 
            metalness={0.15} 
            wireframe={wireframeMode}
          />
        </mesh>

        {/* Vertical Fluted Timber Fins in Stone & Concrete */}
        {Array.from({ length: 24 }).map((_, idx) => (
          <mesh 
            key={`fluted-fin-${idx}`} 
            position={[-3.8 + idx * 0.33, 2.2, -2.82]} 
            castShadow
          >
            <boxGeometry args={[0.07, 4.0, 0.09]} />
            <meshStandardMaterial 
              color={idx % 4 === 0 ? "#C65D36" : (idx % 2 === 0 ? "#D6D1C5" : "#777B70")} 
              roughness={0.4} 
              metalness={0.2} 
              wireframe={wireframeMode}
            />
          </mesh>
        ))}

        {/* Cantilevered Mezzanine Platform */}
        <group position={[2.2, 2.3, -1.0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[4.2, 0.18, 3.4]} />
            <meshStandardMaterial color="#292B28" roughness={0.4} metalness={0.5} wireframe={wireframeMode} />
          </mesh>

          {/* Clean Clear/Smoked Architectural Glass Balustrade */}
          <mesh position={[0, 0.6, 1.7]} castShadow>
            <boxGeometry args={[4.2, 1.05, 0.04]} />
            <meshStandardMaterial 
              color="#D6D1C5" 
              roughness={0.1} 
              metalness={0.1} 
              transparent 
              opacity={0.5} 
              wireframe={wireframeMode}
            />
          </mesh>
          <mesh position={[2.1, 0.6, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
            <boxGeometry args={[3.4, 1.05, 0.04]} />
            <meshStandardMaterial 
              color="#D6D1C5" 
              roughness={0.1} 
              metalness={0.1} 
              transparent 
              opacity={0.5} 
              wireframe={wireframeMode}
            />
          </mesh>

          {/* Handrail in Graphite */}
          <mesh position={[0, 1.14, 1.7]}>
            <boxGeometry args={[4.24, 0.05, 0.06]} />
            <meshStandardMaterial color="#202522" metalness={0.8} roughness={0.2} wireframe={wireframeMode} />
          </mesh>
          <mesh position={[2.1, 1.14, 0]} rotation={[0, Math.PI / 2, 0]}>
            <boxGeometry args={[3.44, 0.05, 0.06]} />
            <meshStandardMaterial color="#202522" metalness={0.8} roughness={0.2} wireframe={wireframeMode} />
          </mesh>
        </group>

        {/* Floating Staircase */}
        <group position={[-0.3, 0.18, -1.0]}>
          {Array.from({ length: 11 }).map((_, stepIdx) => {
            const sy = stepIdx * 0.19;
            const sz = stepIdx * 0.26;
            return (
              <group key={`step-${stepIdx}`} position={[0, sy, -sz + 1.2]}>
                <mesh castShadow receiveShadow>
                  <boxGeometry args={[0.95, 0.06, 0.28]} />
                  <meshStandardMaterial color="#202522" roughness={0.4} metalness={0.3} wireframe={wireframeMode} />
                </mesh>
                <mesh position={[0, -0.035, 0.13]}>
                  <boxGeometry args={[0.95, 0.015, 0.02]} />
                  <meshStandardMaterial color="#C65D36" />
                </mesh>
              </group>
            );
          })}
        </group>
      </group>

      {/* ============================================================== */}
      {/* STAGE 4: ARCHITECTURAL LED WALL & PHOTOMETRIC LIGHTS */}
      {/* ============================================================== */}
      <group 
        name="Stage4-LightingAndLED" 
        scale={[w4, w4, w4]}
      >
        {/* LED Video Wall */}
        <mesh 
          ref={screenMesh} 
          position={[-1.2, 2.3, -2.8]} 
          castShadow
        >
          <boxGeometry args={[5.2, 2.3, 0.08]} />
          {screenData?.texture ? (
            <meshStandardMaterial 
              map={screenData.texture} 
              roughness={0.3}
              wireframe={wireframeMode}
            />
          ) : (
            <meshStandardMaterial 
              color="#202522" 
              wireframe={wireframeMode}
            />
          )}
        </mesh>

        {/* Clean Frame Trim in Concrete */}
        <mesh position={[-1.2, 3.48, -2.78]}>
          <boxGeometry args={[5.26, 0.05, 0.09]} />
          <meshStandardMaterial color="#777B70" metalness={0.5} roughness={0.4} />
        </mesh>
        <mesh position={[-1.2, 1.12, -2.78]}>
          <boxGeometry args={[5.26, 0.05, 0.09]} />
          <meshStandardMaterial color="#777B70" metalness={0.5} roughness={0.4} />
        </mesh>

        {/* 6 Overhead Truss Spotlights (Warm neutral light, no colored tint) */}
        {[-3.2, -1.8, -0.4, 1.2, 2.6, 3.8].map((lx, i) => (
          <group key={`truss-spotlight-${i}`} position={[lx, 4.4, 1.4]} rotation={[0.45, 0, 0]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.09, 0.13, 0.28, 16]} />
              <meshStandardMaterial color="#202522" metalness={0.8} roughness={0.3} wireframe={wireframeMode} />
            </mesh>
            <mesh position={[0, -0.14, 0]}>
              <circleGeometry args={[0.11, 16]} />
              <meshStandardMaterial color="#FFFFFF" emissive="#FFF9F0" emissiveIntensity={2.5} />
            </mesh>
            <spotLight
              position={[0, 0, 0]}
              target-position={[lx * 0.7, 0, 0]}
              angle={0.42}
              penumbra={0.7}
              intensity={45 * w4}
              color="#FFF9F0"
              castShadow
            />
          </group>
        ))}
      </group>

      {/* ============================================================== */}
      {/* STAGE 5: BRANDING, RECEPTION DESK & KIOSKS */}
      {/* ============================================================== */}
      <group 
        name="Stage5-SignageAndBranding" 
        scale={[w5, w5, w5]}
      >
        {/* Monogram Block in Graphite & Pure White */}
        <group position={[-1.2, 3.8, -2.7]}>
          <mesh castShadow>
            <boxGeometry args={[3.2, 0.65, 0.09]} />
            <meshStandardMaterial color="#202522" metalness={0.8} roughness={0.2} wireframe={wireframeMode} />
          </mesh>
          <mesh position={[0, 0, 0.06]}>
            <boxGeometry args={[2.4, 0.26, 0.04]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
          </mesh>
        </group>

        {/* Monolithic Reception Desk in Graphite & Stone Countertop */}
        <group position={[0, 0.7, 2.2]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[2.8, 1.0, 0.9]} />
            <meshStandardMaterial color="#202522" roughness={0.35} metalness={0.3} wireframe={wireframeMode} />
          </mesh>
          <mesh position={[0, 0.52, 0]} castShadow>
            <boxGeometry args={[2.88, 0.07, 0.98]} />
            <meshStandardMaterial color="#D6D1C5" metalness={0.2} roughness={0.4} wireframe={wireframeMode} />
          </mesh>
          {/* Subtle Burnt Orange Recess */}
          <mesh position={[0, -0.05, 0.46]}>
            <boxGeometry args={[2.4, 0.45, 0.03]} />
            <meshStandardMaterial color="#C65D36" />
          </mesh>
        </group>

        {/* Clean Kiosks */}
        {[-2.2, 2.2].map((kx, i) => (
          <group key={`kiosk-${i}`} position={[kx, 0.65, 2.0]} rotation={[0, i === 0 ? 0.3 : -0.3, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.45, 1.1, 0.35]} />
              <meshStandardMaterial color="#202522" metalness={0.6} roughness={0.4} wireframe={wireframeMode} />
            </mesh>
            <mesh position={[0, 0.4, 0.18]} rotation={[-0.3, 0, 0]}>
              <boxGeometry args={[0.38, 0.28, 0.02]} />
              <meshStandardMaterial color="#D6D1C5" roughness={0.2} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ============================================================== */}
      {/* STAGE 6: FINISHED PAVILION & VIP LOUNGE */}
      {/* ============================================================== */}
      <group 
        name="Stage6-FinishedPavilion" 
        scale={[w6, w6, w6]}
      >
        {/* Left Side: Revolving Centerpiece Turntable */}
        <group ref={turntableRef} position={[-2.4, 0.2, 0.2]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[1.3, 1.35, 0.18, 36]} />
            <meshStandardMaterial color="#202522" metalness={0.7} roughness={0.3} wireframe={wireframeMode} />
          </mesh>
          <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.15, 1.25, 36]} />
            <meshStandardMaterial color="#C65D36" />
          </mesh>

          {/* Sculptural Aerodynamic Centerpiece in Stone & Graphite */}
          <group ref={carSculptRef} position={[0, 0.5, 0]}>
            <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
              <coneGeometry args={[0.7, 0.6, 6]} />
              <meshStandardMaterial 
                color="#D6D1C5" 
                metalness={0.5} 
                roughness={0.3} 
                wireframe={wireframeMode}
              />
            </mesh>
            <mesh position={[0, 0.4, 0]} castShadow>
              <octahedronGeometry args={[0.35]} />
              <meshStandardMaterial 
                color="#202522" 
                metalness={0.7} 
                roughness={0.2} 
                wireframe={wireframeMode}
              />
            </mesh>
          </group>
        </group>

        {/* Right Side: VIP Executive Discussion Lounge */}
        <group position={[2.4, 0.2, 0.2]}>
          {/* Glass Coffee Table */}
          <mesh position={[0, 0.26, 0]} castShadow>
            <cylinderGeometry args={[0.6, 0.6, 0.04, 32]} />
            <meshStandardMaterial 
              color="#FFFFFF" 
              roughness={0.1} 
              metalness={0.1} 
              transparent 
              opacity={0.65} 
              wireframe={wireframeMode}
            />
          </mesh>
          <mesh position={[0, 0.13, 0]}>
            <cylinderGeometry args={[0.1, 0.28, 0.26, 16]} />
            <meshStandardMaterial color="#777B70" metalness={0.6} roughness={0.3} wireframe={wireframeMode} />
          </mesh>

          {/* Modernist Lounge Armchairs in Graphite with Concrete Legs */}
          {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((angle, i) => {
            const cx = Math.cos(angle) * 0.95;
            const cz = Math.sin(angle) * 0.95;
            return (
              <group key={`lounge-chair-${i}`} position={[cx, 0.16, cz]} rotation={[0, -angle + Math.PI, 0]}>
                <mesh position={[0, 0.24, 0]} castShadow>
                  <boxGeometry args={[0.56, 0.12, 0.56]} />
                  <meshStandardMaterial color="#202522" roughness={0.6} wireframe={wireframeMode} />
                </mesh>
                <mesh position={[0, 0.52, -0.22]} castShadow>
                  <boxGeometry args={[0.56, 0.45, 0.08]} />
                  <meshStandardMaterial color="#202522" roughness={0.6} wireframe={wireframeMode} />
                </mesh>
                <mesh position={[0, 0.11, 0]}>
                  <cylinderGeometry args={[0.26, 0.32, 0.22, 4]} />
                  <meshStandardMaterial color="#777B70" metalness={0.6} roughness={0.3} wireframe={wireframeMode} />
                </mesh>
              </group>
            );
          })}
        </group>

        {/* Biophilic Preserved Moss Planters in Concrete */}
        <group position={[-4.2, 0.5, 2.2]}>
          <mesh castShadow>
            <boxGeometry args={[0.5, 0.65, 1.6]} />
            <meshStandardMaterial color="#777B70" roughness={0.5} wireframe={wireframeMode} />
          </mesh>
          {[-0.45, 0, 0.45].map((pz, idx) => (
            <mesh key={`moss-${idx}`} position={[0, 0.45, pz]} castShadow>
              <sphereGeometry args={[0.28, 14, 14]} />
              <meshStandardMaterial color="#354238" roughness={0.9} wireframe={wireframeMode} />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
}
