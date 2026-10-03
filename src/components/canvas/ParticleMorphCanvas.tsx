import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export type MorphState = 
  | 'AI' 
  | 'CODING' 
  | 'VIDEO' 
  | 'DESIGN' 
  | 'BUSINESS' 
  | 'DATA' 
  | 'AUTOMATION' 
  | 'CAREER';

interface ParticleMorphProps {
  currentState: MorphState;
}

const PARTICLE_COUNT = 1400;

// Generators for parametric 3D particle positions
function generateTargetPositions(state: MorphState, count: number): Float32Array {
  const arr = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const idx = i * 3;
    const progress = i / count;

    switch (state) {
      case 'AI': {
        // Neural Pulsing Sphere
        const radius = 1.8 + Math.sin(i * 12) * 0.15;
        const theta = Math.acos(2 * progress - 1);
        const phi = Math.sqrt(count * Math.PI) * progress * 8;
        arr[idx] = radius * Math.sin(theta) * Math.cos(phi);
        arr[idx + 1] = radius * Math.sin(theta) * Math.sin(phi);
        arr[idx + 2] = radius * Math.cos(theta);
        break;
      }
      case 'CODING': {
        // Digital Matrix Grid Matrix
        const cols = 35;
        const col = i % cols;
        const row = Math.floor(i / cols);
        arr[idx] = (col - cols / 2) * 0.12;
        arr[idx + 1] = (row - (count / cols) / 2) * 0.12;
        arr[idx + 2] = Math.sin(col * 0.4 + row * 0.2) * 0.35;
        break;
      }
      case 'VIDEO': {
        // 16:9 Cinematic Video Viewport with Play Center
        if (i < count * 0.65) {
          // Perimeter & frame
          const perimeterT = (i / (count * 0.65)) * 4;
          const w = 2.4;
          const h = 1.35;
          if (perimeterT < 1) {
            arr[idx] = -w + perimeterT * 2 * w;
            arr[idx + 1] = h;
          } else if (perimeterT < 2) {
            arr[idx] = w;
            arr[idx + 1] = h - (perimeterT - 1) * 2 * h;
          } else if (perimeterT < 3) {
            arr[idx] = w - (perimeterT - 2) * 2 * w;
            arr[idx + 1] = -h;
          } else {
            arr[idx] = -w;
            arr[idx + 1] = -h + (perimeterT - 3) * 2 * h;
          }
          arr[idx + 2] = (Math.random() - 0.5) * 0.15;
        } else {
          // Center play triangle
          const triT = (i - count * 0.65) / (count * 0.35);
          arr[idx] = -0.4 + triT * 0.9;
          arr[idx + 1] = (1 - triT) * (Math.random() - 0.5) * 1.0;
          arr[idx + 2] = (Math.random() - 0.5) * 0.1;
        }
        break;
      }
      case 'DESIGN': {
        // Fibonacci Golden Ratio 3D Spiral
        const angle = i * 0.15;
        const r = Math.pow(1.0025, i) * 0.08;
        arr[idx] = Math.cos(angle) * r * 0.7;
        arr[idx + 1] = Math.sin(angle) * r * 0.7;
        arr[idx + 2] = (progress - 0.5) * 2.2;
        break;
      }
      case 'BUSINESS': {
        // Ascending 3D Growth Bars
        const barIndex = i % 5;
        const barHeight = 0.5 + barIndex * 0.5;
        const xOffset = (barIndex - 2) * 0.8;
        arr[idx] = xOffset + (Math.random() - 0.5) * 0.35;
        arr[idx + 1] = -1.2 + Math.random() * barHeight;
        arr[idx + 2] = (Math.random() - 0.5) * 0.35;
        break;
      }
      case 'DATA': {
        // 3D Neural Network / Multi-layer Vector Graph
        const layer = i % 4;
        const x = (layer - 1.5) * 1.3;
        const nodeInLayer = Math.floor(i / 4) % 15;
        const y = (nodeInLayer - 7) * 0.28;
        const z = Math.sin(nodeInLayer * 1.5 + layer) * 0.8;
        arr[idx] = x + (Math.random() - 0.5) * 0.1;
        arr[idx + 1] = y + (Math.random() - 0.5) * 0.1;
        arr[idx + 2] = z;
        break;
      }
      case 'AUTOMATION': {
        // Infinity Möbius / Double Helix Loop
        const t = progress * Math.PI * 4;
        const scale = 2.0 / (3 - Math.cos(2 * t));
        arr[idx] = scale * Math.cos(t) * 1.6;
        arr[idx + 1] = scale * (Math.sin(2 * t) / 2) * 1.6;
        arr[idx + 2] = Math.sin(t * 2) * 0.7;
        break;
      }
      case 'CAREER': {
        // Radiant Starburst Constellation / Ascension
        const r = 0.2 + Math.pow(Math.random(), 0.5) * 2.2;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        arr[idx] = r * Math.sin(phi) * Math.cos(theta);
        arr[idx + 1] = r * Math.cos(phi) + 0.3; // slightly elevated
        arr[idx + 2] = r * Math.sin(phi) * Math.sin(theta);
        break;
      }
    }
  }

  return arr;
}

const ParticleCloud: React.FC<ParticleMorphProps> = ({ currentState }) => {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Current interpolated positions
  const currentPos = useRef<Float32Array>(generateTargetPositions('AI', PARTICLE_COUNT));
  // Target positions to interpolate toward
  const targetPos = useRef<Float32Array>(generateTargetPositions(currentState, PARTICLE_COUNT));

  useEffect(() => {
    targetPos.current = generateTargetPositions(currentState, PARTICLE_COUNT);
  }, [currentState]);

  const [initialPositions, colors] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);
    const c1 = new THREE.Color('#38bdf8');
    const c2 = new THREE.Color('#c084fc');
    const c3 = new THREE.Color('#2dd4bf');

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = i * 3;
      pos[idx] = (Math.random() - 0.5) * 4;
      pos[idx + 1] = (Math.random() - 0.5) * 4;
      pos[idx + 2] = (Math.random() - 0.5) * 4;

      const factor = i / PARTICLE_COUNT;
      const mixed = factor < 0.5 ? c1.clone().lerp(c2, factor * 2) : c2.clone().lerp(c3, (factor - 0.5) * 2);
      col[idx] = mixed.r;
      col[idx + 1] = mixed.g;
      col[idx + 2] = mixed.b;
    }
    return [pos, col];
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const geometry = pointsRef.current.geometry;
    const posAttr = geometry.attributes.position as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;

    // Smooth lerp speed (faster response with natural damping)
    const lerpFactor = Math.min(delta * 4.5, 0.2);

    for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
      currentPos.current[i] += (targetPos.current[i] - currentPos.current[i]) * lerpFactor;
      posArray[i] = currentPos.current[i];
    }

    posAttr.needsUpdate = true;

    // Gentle global rotation
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.12;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.15;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[initialPositions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export const ParticleMorphCanvas: React.FC<ParticleMorphProps> = ({ currentState }) => {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <ParticleCloud currentState={currentState} />
      </Canvas>
    </div>
  );
};
