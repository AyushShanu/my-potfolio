"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "next-themes";

type GeometricParticlesProps = {
    count?: number;
    color?: string;
    size?: number;
    speed?: number;
};

export function GeometricParticles({
    count = 100,
    color = "#ffffff",
    size = 0.2,
    speed = 0.2,
}: GeometricParticlesProps) {
    const mesh = useRef<THREE.InstancedMesh>(null);
    const { theme } = useTheme();

    // Create particles data
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const position = new THREE.Vector3(
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10
            );
            const rotation = new THREE.Euler(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );
            const scale = Math.random() * 0.5 + 0.5;
            const rotationSpeed = {
                x: (Math.random() - 0.5) * 0.01 * speed,
                y: (Math.random() - 0.5) * 0.01 * speed,
                z: (Math.random() - 0.5) * 0.01 * speed,
            };
            temp.push({ position, rotation, scale, rotationSpeed });
        }
        return temp;
    }, [count, speed]);

    // Create geometry
    const geometry = useMemo(() => {
        return new THREE.IcosahedronGeometry(size, 0);
    }, [size]);

    // Animation
    useFrame(() => {
  const instance = mesh.current;
  if (!instance) return;

  particles.forEach((particle, i) => {
    particle.rotation.x += particle.rotationSpeed.x;
    particle.rotation.y += particle.rotationSpeed.y;
    particle.rotation.z += particle.rotationSpeed.z;

    const matrix = new THREE.Matrix4();
    matrix.compose(
      particle.position,
      new THREE.Quaternion().setFromEuler(particle.rotation),
      new THREE.Vector3(particle.scale, particle.scale, particle.scale)
    );

    instance.setMatrixAt(i, matrix); // ✅ Type-safe
  });

  instance.instanceMatrix.needsUpdate = true; // ✅ Type-safe
});

    const particleColor = theme === "dark" ? "#6366f1" : "#8b5cf6";

    return (
        <instancedMesh ref={mesh} args={[geometry, undefined, count]}>
            <meshStandardMaterial
                color={color || particleColor}
                roughness={0.5}
                metalness={0.2}
                transparent
                opacity={0.7}
            />
        </instancedMesh>
    );
}