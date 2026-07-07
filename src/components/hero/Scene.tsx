"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { buildGraph } from "./graph";

const AMBER = new THREE.Color("#ffb454");
const AMBER_BRIGHT = new THREE.Color("#ffd9a0");
const LINE = new THREE.Color("#232a31");

function Graph() {
  const { nodes, edges } = useMemo(() => buildGraph(120, 180, 6), []);
  const group = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const scanY = useRef(7);
  const [activeLabels, setActiveLabels] = useState<
    { id: number; x: number; y: number; z: number; label: string; t: number }[]
  >([]);

  const { pointer } = useThree();

  // base geometries built once
  const { positions, sizes, baseColors, linePositions } = useMemo(() => {
    const positions = new Float32Array(nodes.length * 3);
    const sizes = new Float32Array(nodes.length);
    const baseColors = new Float32Array(nodes.length * 3);
    nodes.forEach((n, i) => {
      positions[i * 3] = n.x;
      positions[i * 3 + 1] = n.y;
      positions[i * 3 + 2] = n.z;
      sizes[i] = n.big ? 0.12 : 0.06;
      baseColors[i * 3] = AMBER.r;
      baseColors[i * 3 + 1] = AMBER.g;
      baseColors[i * 3 + 2] = AMBER.b;
    });
    const linePositions = new Float32Array(edges.length * 6);
    edges.forEach((e, i) => {
      const a = nodes[e.a];
      const b = nodes[e.b];
      linePositions[i * 6] = a.x;
      linePositions[i * 6 + 1] = a.y;
      linePositions[i * 6 + 2] = a.z;
      linePositions[i * 6 + 3] = b.x;
      linePositions[i * 6 + 4] = b.y;
      linePositions[i * 6 + 5] = b.z;
    });
    return { positions, sizes, baseColors, linePositions };
  }, [nodes, edges]);

  const colorAttr = useRef<THREE.BufferAttribute>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    // slow drift/rotation
    group.current.rotation.y += delta * 0.02;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.06;

    // mouse parallax — ease camera tilt (max ~3deg)
    const cam = state.camera;
    const targetX = pointer.x * 0.5;
    const targetY = pointer.y * 0.4;
    cam.position.x += (targetX - cam.position.x) * 0.04;
    cam.position.y += (targetY - cam.position.y) * 0.04;
    cam.lookAt(0, 0, 0);

    // scan plane sweeps top -> bottom every ~8s
    scanY.current -= delta * (14 / 8);
    if (scanY.current < -7) scanY.current = 7;

    // flash nodes near the scan plane; collect labels
    const colors = colorAttr.current;
    if (colors) {
      const arr = colors.array as Float32Array;
      const newLabels: typeof activeLabels = [];
      for (let i = 0; i < nodes.length; i++) {
        const ny = nodes[i].y;
        const dist = Math.abs(ny - scanY.current);
        if (dist < 0.35) {
          arr[i * 3] = AMBER_BRIGHT.r;
          arr[i * 3 + 1] = AMBER_BRIGHT.g;
          arr[i * 3 + 2] = AMBER_BRIGHT.b;
          if (nodes[i].big && newLabels.length < 4) {
            newLabels.push({
              id: i,
              x: nodes[i].x,
              y: nodes[i].y,
              z: nodes[i].z,
              label: nodes[i].label,
              t: state.clock.elapsedTime,
            });
          }
        } else {
          arr[i * 3] = baseColors[i * 3];
          arr[i * 3 + 1] = baseColors[i * 3 + 1];
          arr[i * 3 + 2] = baseColors[i * 3 + 2];
        }
      }
      colors.needsUpdate = true;
      if (newLabels.length) {
        setActiveLabels((prev) => {
          const kept = prev.filter((p) => state.clock.elapsedTime - p.t < 0.6);
          const ids = new Set(kept.map((k) => k.id));
          return [...kept, ...newLabels.filter((n) => !ids.has(n.id))].slice(-6);
        });
      }
    }
  });

  const scanRef = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (scanRef.current) scanRef.current.position.y = scanY.current;
  });

  return (
    <group ref={group}>
      {/* edges */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
            count={linePositions.length / 3}
          />
        </bufferGeometry>
        <lineBasicMaterial color={LINE} transparent opacity={0.4} />
      </lineSegments>

      {/* nodes */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={nodes.length}
          />
          <bufferAttribute
            ref={colorAttr}
            attach="attributes-color"
            args={[baseColors.slice(), 3]}
            count={nodes.length}
          />
          <bufferAttribute attach="attributes-size" args={[sizes, 1]} count={nodes.length} />
        </bufferGeometry>
        <pointsMaterial
          vertexColors
          size={0.1}
          sizeAttenuation
          transparent
          opacity={0.95}
          depthWrite={false}
        />
      </points>

      {/* scan plane */}
      <mesh ref={scanRef} position={[0, scanY.current, 0]}>
        <planeGeometry args={[16, 0.5]} />
        <meshBasicMaterial color={AMBER} transparent opacity={0.08} side={THREE.DoubleSide} />
      </mesh>

      {/* revealed labels */}
      {activeLabels.map((l) => (
        <Html key={l.id} position={[l.x, l.y, l.z]} center zIndexRange={[10, 0]}>
          <span className="pointer-events-none select-none whitespace-nowrap font-mono text-[9px] text-phosphor/80">
            {l.label}
          </span>
        </Html>
      ))}
    </group>
  );
}

export default function Scene({ active = true }: { active?: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 14], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <Graph />
    </Canvas>
  );
}
