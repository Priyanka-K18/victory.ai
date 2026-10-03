import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

export interface ConstellationNode {
  id: string;
  name: string;
  level: number; // 1 to 10
  category: string;
  position: [number, number, number];
  color: string;
}

const NODES_DATA: ConstellationNode[] = [
  { id: 'python', name: 'PYTHON', level: 8, category: 'Code', position: [-1.8, 1.2, 0], color: '#38bdf8' },
  { id: 'ai-tools', name: 'AI TOOLS', level: 9, category: 'Intelligence', position: [0, 1.8, 0.4], color: '#00f2fe' },
  { id: 'prompting', name: 'PROMPTING', level: 9, category: 'Core', position: [1.8, 1.1, -0.2], color: '#f59e0b' },
  { id: 'web-dev', name: 'WEB DEV', level: 8, category: 'Frontend', position: [-1.4, -0.5, 0.3], color: '#818cf8' },
  { id: 'design', name: 'DESIGN / UI', level: 7, category: 'Creative', position: [0, -1.2, 0.5], color: '#c084fc' },
  { id: 'video', name: 'GEN VIDEO', level: 6, category: 'Cinematics', position: [1.6, -0.6, -0.3], color: '#f43f5e' },
  { id: 'automation', name: 'AUTOMATION', level: 8, category: 'Agents', position: [0.2, 0.1, 0.1], color: '#2dd4bf' },
];

// Graph connections (edges)
const CONNECTIONS: [number, number][] = [
  [0, 1], // Python -> AI Tools
  [1, 2], // AI Tools -> Prompting
  [0, 3], // Python -> Web Dev
  [3, 4], // Web Dev -> Design
  [2, 5], // Prompting -> Video
  [4, 5], // Design -> Video
  [1, 6], // AI Tools -> Automation
  [6, 3], // Automation -> Web Dev
  [6, 2], // Automation -> Prompting
];

interface ConstellationSceneProps {
  onSelectNode: (node: ConstellationNode) => void;
  selectedNodeId: string;
}

const ConstellationScene: React.FC<ConstellationSceneProps> = ({ onSelectNode, selectedNodeId }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Build edge line segments
  const linePositions = useMemo(() => {
    const points: number[] = [];
    CONNECTIONS.forEach(([startIdx, endIdx]) => {
      const p1 = NODES_DATA[startIdx].position;
      const p2 = NODES_DATA[endIdx].position;
      points.push(p1[0], p1[1], p1[2], p2[0], p2[1], p2[2]);
    });
    return new Float32Array(points);
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Constellation Edge Lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Nodes */}
      {NODES_DATA.map((node) => {
        const isSelected = selectedNodeId === node.id;
        const isHovered = hoveredNode === node.id;
        const nodeSize = 0.08 + (node.level / 10) * 0.08;

        return (
          <group 
            key={node.id} 
            position={node.position}
            onClick={(e) => {
              e.stopPropagation();
              onSelectNode(node);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredNode(node.id);
            }}
            onPointerOut={() => setHoveredNode(null)}
          >
            {/* Pulsing Outer Halo if selected or hovered */}
            {(isSelected || isHovered) && (
              <mesh>
                <sphereGeometry args={[nodeSize * 2.2, 16, 16]} />
                <meshBasicMaterial
                  color={node.color}
                  transparent
                  opacity={0.25}
                  wireframe
                />
              </mesh>
            )}

            {/* Core Star Node */}
            <mesh>
              <sphereGeometry args={[nodeSize, 24, 24]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={isSelected || isHovered ? 2.2 : 1.2}
                roughness={0.2}
              />
            </mesh>

            {/* 3D Label */}
            <Text
              position={[0, nodeSize + 0.16, 0]}
              fontSize={0.13}
              color={isSelected ? '#ffffff' : '#94a3b8'}
              anchorX="center"
              anchorY="bottom"
              font="https://fonts.gstatic.com/s/spacegrotesk/v16/V8mDoQDjQSkFtoMM3T6r8E7mF71Q-g.woff2"
            >
              {node.name}
            </Text>
          </group>
        );
      })}
    </group>
  );
};

export const ConstellationCanvas: React.FC<{
  onSelectNode: (node: ConstellationNode) => void;
  selectedNodeId: string;
}> = ({ onSelectNode, selectedNodeId }) => {
  return (
    <div className="w-full h-full relative cursor-pointer">
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[0, 2, 4]} intensity={1.5} color="#38bdf8" />
        <ConstellationScene 
          onSelectNode={onSelectNode} 
          selectedNodeId={selectedNodeId} 
        />
      </Canvas>
    </div>
  );
};
