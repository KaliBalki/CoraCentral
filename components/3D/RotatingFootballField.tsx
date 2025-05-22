"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Define types for Line component props
interface LineProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  args?: [number, number];
  color?: string;
}

const Line = ({ position, rotation = [0, 0, 0], args = [8, 0.1], color = "white" }: LineProps) => (
  <mesh position={position} rotation={rotation}>
    <planeGeometry args={args} />
    <meshBasicMaterial color={color} side={THREE.DoubleSide} />
  </mesh>
);

// Define types for Rectangle component props
interface RectangleProps {
  position: [number, number, number];
  size: [number, number];
  color?: string;
}

const Rectangle = ({ position, size, color = "white" }: RectangleProps) => (
  <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
    <planeGeometry args={size} />
    <meshBasicMaterial color={color} wireframe={false} side={THREE.DoubleSide} />
  </mesh>
);

// Define types for CircleLine component props
interface CircleLineProps {
  radius: number;
  position: [number, number, number];
}

const CircleLine = ({ radius, position }: CircleLineProps) => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={position}>
    <ringGeometry args={[radius - 0.05, radius, 64]} />
    <meshBasicMaterial color="white" side={THREE.DoubleSide} />
  </mesh>
);

// Define types for Goal component props
interface GoalProps {
  z: number;
}

const Goal = ({ z }: GoalProps) => (
  <group position={[0, 0.02, z]}>
    {/* Goal base line */}
    <Line position={[0, 0, 0]} args={[2.6, 0.1]} />
    {/* Goal posts */}
    <Line position={[-1.3, 0.6, 0.3]} args={[0.1, 1.2]} />
    <Line position={[1.3, 0.6, 0.3]} args={[0.1, 1.2]} />
    {/* Goal crossbar */}
    <Line position={[0, 1.2, 0.3]} args={[2.6, 0.1]} />
    {/* Goal net (simplified mesh of vertical and horizontal lines) */}
    {[...Array(5)].map((_, i) => (
      <Line
        key={"netv" + i}
        position={[-1.3 + i * 0.65, 0.6, 0.6]}
        args={[0.1, 1]}
      />
    ))}
    {[...Array(3)].map((_, i) => (
      <Line
        key={"neth" + i}
        position={[0, 0.3 + i * 0.3, 0.6]}
        args={[2.6, 0.1]}
      />
    ))}
  </group>
);

const RotatingFootballField = () => {
  return (
    <Canvas camera={{ position: [0, 8, 12], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 15, 10]} intensity={1.5} />
      <OrbitControls autoRotate autoRotateSpeed={1.2} enableZoom={false} />

      {/* Field */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 5]} />
        <meshStandardMaterial color="#208020" side={THREE.DoubleSide} />
      </mesh>

      {/* Outer field lines */}
      <Line position={[0, 0.01, 0]} args={[8, 0.15]} />
      <Line position={[-4, 0.01, 0]} args={[0.15, 5]} />
      <Line position={[4, 0.01, 0]} args={[0.15, 5]} />
      <Line position={[0, 0.01, -2.5]} args={[8, 0.15]} />
      <Line position={[0, 0.01, 2.5]} args={[8, 0.15]} />

      {/* Halfway line */}
      <Line position={[0, 0.02, 0]} args={[8, 0.1]} />

      {/* Center circle */}
      <CircleLine radius={0.75} position={[0, 0.03, 0]} />

      {/* Penalty areas */}
      <Rectangle position={[0, 0.02, -1.75]} size={[3.5, 1.2]} />
      <Rectangle position={[0, 0.02, 1.75]} size={[3.5, 1.2]} />

      {/* Penalty spots */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, -1.1]}>
        <circleGeometry args={[0.07, 32]} />
        <meshBasicMaterial color="white" side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 1.1]}>
        <circleGeometry args={[0.07, 32]} />
        <meshBasicMaterial color="white" side={THREE.DoubleSide} />
      </mesh>

      {/* Goals */}
      <Goal z={-2.5} />
      <Goal z={2.5} />
    </Canvas>
  );
};

export default RotatingFootballField;