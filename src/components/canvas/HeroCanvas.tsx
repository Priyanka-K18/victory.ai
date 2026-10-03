import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface SceneProps {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}

const AICoreMesh: React.FC<SceneProps> = ({ mouse }) => {
  const outerRingRef = useRef<THREE.Group>(null);
  const midRingRef = useRef<THREE.Group>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);
  const wireCoreRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  // Floating satellite nodes
  const satellites = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      const radius = 2.4 + (i % 3) * 0.4;
      return {
        initialPos: [Math.cos(angle) * radius, (Math.sin(angle * 2) * 0.4), Math.sin(angle) * radius] as [number, number, number],
        speed: 0.5 + (i % 4) * 0.2,
        color: i % 2 === 0 ? '#38bdf8' : '#c084fc',
        size: 0.08 + (i % 3) * 0.03,
      };
    });
  }, []);

  useFrame((state, delta) => {
    const targetX = mouse.current.x * 0.6;
    const targetY = mouse.current.y * 0.4;

    // Smooth camera / group parallax
    if (outerRingRef.current) {
      outerRingRef.current.rotation.x += delta * 0.25;
      outerRingRef.current.rotation.y += delta * 0.35;
      outerRingRef.current.rotation.z += (targetX - outerRingRef.current.rotation.z) * 0.05;
    }

    if (midRingRef.current) {
      midRingRef.current.rotation.x -= delta * 0.3;
      midRingRef.current.rotation.y += delta * 0.45;
    }

    if (innerCoreRef.current) {
      // Pulse scale
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2.5) * 0.08;
      innerCoreRef.current.scale.set(scale, scale, scale);
      innerCoreRef.current.rotation.y += delta * 0.6;
    }

    if (wireCoreRef.current) {
      wireCoreRef.current.rotation.x -= delta * 0.4;
      wireCoreRef.current.rotation.y -= delta * 0.5;
    }

    if (lightRef.current) {
      lightRef.current.intensity = 2.5 + Math.sin(state.clock.elapsedTime * 3) * 0.8;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Luminescent Point Light */}
      <pointLight ref={lightRef} color="#38bdf8" intensity={3} distance={10} />
      <pointLight position={[0, 0, -2]} color="#a855f7" intensity={2} distance={8} />

      {/* Inner Dense Energy Nucleus */}
      <mesh ref={innerCoreRef}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial
          color="#00f2fe"
          emissive="#0284c7"
          emissiveIntensity={1.8}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Crystalline Wireframe Cage */}
      <mesh ref={wireCoreRef}>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={0.8}
          wireframe
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Middle Rotating Gimbal Torus */}
      <group ref={midRingRef}>
        <mesh>
          <torusGeometry args={[1.5, 0.02, 16, 100]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#9333ea"
            emissiveIntensity={1.5}
            transparent
            opacity={0.6}
          />
        </mesh>
      </group>

      {/* Outer Floating Coordinate Ring */}
      <group ref={outerRingRef}>
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[1.9, 0.015, 16, 100]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={1.2}
            transparent
            opacity={0.5}
          />
        </mesh>
      </group>

      {/* Orbiting Satellite Data Nodes */}
      {satellites.map((sat, idx) => (
        <Float key={idx} speed={sat.speed} rotationIntensity={1} floatIntensity={1.5}>
          <mesh position={sat.initialPos}>
            <octahedronGeometry args={[sat.size, 0]} />
            <meshStandardMaterial
              color={sat.color}
              emissive={sat.color}
              emissiveIntensity={1.2}
              roughness={0.2}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

const AmbientDust: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const count = 450;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const color1 = new THREE.Color('#38bdf8');
    const color2 = new THREE.Color('#c084fc');

    for (let i = 0; i < count; i++) {
      const radius = 2.5 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const mixed = color1.clone().lerp(color2, Math.random());
      col[i * 3] = mixed.r;
      col[i * 3 + 1] = mixed.g;
      col[i * 3 + 2] = mixed.b;
    }
    return [pos, col];
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04;
      pointsRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export const HeroCanvas: React.FC = () => {
  const mouse = useRef({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    mouse.current = { x, y };
  };

  return (
    <div 
      className="w-full h-full relative cursor-grab active:cursor-grabbing"
      onPointerMove={handlePointerMove}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <AICoreMesh mouse={mouse} />
        <AmbientDust />
      </Canvas>
    </div>
  );
};
