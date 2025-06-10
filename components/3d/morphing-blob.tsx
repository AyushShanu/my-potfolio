"use client"

import { useRef, useState, useEffect, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { useSpring, animated } from "@react-spring/three"
import { useCursor } from "@react-three/drei"
import * as THREE from "three"
import { createNoise3D } from "simplex-noise"
import type { Mesh, BufferAttribute } from "three"

type FloatModelProps = {
    children: React.ReactNode
    rotationSpeed?: number
    floatIntensity?: number
    interactive?: boolean
    position?: [number, number, number]
    scale?: number | [number, number, number]
    onClick?: () => void
}

export function FloatModel({
    children,
    rotationSpeed = 0.4,
    floatIntensity = 1,
    interactive = false,
    position = [0, 0, 0],
    scale = 1,
    onClick,
}: FloatModelProps) {
    const modelRef = useRef<THREE.Group>(null)
    const [hovered, setHovered] = useState(false)

    useCursor(hovered && interactive)

    const { floatY } = useSpring({
        from: { floatY: 0 },
        to: async (next) => {
            while (true) {
                await next({ floatY: 0.1 * floatIntensity })
                await next({ floatY: -0.1 * floatIntensity })
            }
        },
        config: { tension: 120, friction: 14 },
    })

    const { scale: hoverScale } = useSpring({
        scale: hovered && interactive ? 1.1 : 1,
        config: { tension: 300, friction: 30 },
    })

    useFrame(() => {
        if (modelRef.current && !hovered) {
            modelRef.current.rotation.y += rotationSpeed * 0.01
        }
    })

    const eventHandlers = interactive
        ? {
            onPointerOver: () => setHovered(true),
            onPointerOut: () => setHovered(false),
            onClick,
        }
        : {}

    return (
        <animated.group
            ref={modelRef}
            position={position}
            scale={typeof scale === "number" ? [scale, scale, scale] : scale}
            {...eventHandlers}
        >
            {children}
        </animated.group>
    )
}

type MorphingBlobProps = {
    color?: string
    emissiveColor?: string
    emissiveIntensity?: number
    speed?: number
    complexity?: number
    scale?: number
    position?: [number, number, number]
    interactive?: boolean
    onClick?: () => void
}

export function MorphingBlob({
    color = "#7c3aed",
    emissiveColor = "#4c1d95",
    emissiveIntensity = 0.4,
    speed = 0.5,
    complexity = 3,
    scale = 1.5,
    position = [0, 0, 0],
    interactive = true,
    onClick = () => { },
}: MorphingBlobProps) {
    const meshRef = useRef<Mesh>(null)
    const [hovered, setHovered] = useState(false)
    const simplex = useRef<ReturnType<typeof createNoise3D> | null>(null)
    const originalPositions = useRef<Float32Array | null>(null)

    useEffect(() => {
        simplex.current = createNoise3D()
    }, [])

    const { morphIntensity, rotationSpeed } = useSpring({
        morphIntensity: hovered ? 0.8 : 0.3,
        rotationSpeed: hovered ? 0.2 : 0.1,
        config: { mass: 1, tension: 280, friction: 60 },
    })

  useEffect(() => {
  if (meshRef.current) {
    const geometry = meshRef.current.geometry;
    const positionAttr = geometry.getAttribute("position");

    const array = positionAttr.array;

    // ✅ Option 1: Safe type check
    if (array instanceof Float32Array) {
      originalPositions.current = array.slice();
    } else {
      console.warn("Position attribute array is not Float32Array");
      originalPositions.current = null;
    }
  }
}, []);
    useFrame(({ clock }) => {
        if (!meshRef.current || !originalPositions.current || !simplex.current) return

        const geometry = meshRef.current.geometry
        const positionAttr = geometry.getAttribute("position") as BufferAttribute
        const time = clock.getElapsedTime() * speed
        const currentIntensity = morphIntensity.get()

        for (let i = 0; i < positionAttr.count; i++) {
            const idx = i * 3
            const x = originalPositions.current[idx]
            const y = originalPositions.current[idx + 1]
            const z = originalPositions.current[idx + 2]

            const length = Math.sqrt(x * x + y * y + z * z)
            const nx = x / length
            const ny = y / length
            const nz = z / length

            const freq = complexity * (hovered ? 1.5 : 1)
            const noise = simplex.current(nx * freq + time, ny * freq + time, nz * freq + time)

            positionAttr.setXYZ(
                i,
                x + nx * noise * currentIntensity,
                y + ny * noise * currentIntensity,
                z + nz * noise * currentIntensity,
            )
        }

        positionAttr.needsUpdate = true
        geometry.computeVertexNormals()
    })

    const handlePointerOver = () => interactive && setHovered(true)
    const handlePointerOut = () => interactive && setHovered(false)

    // Avoid hydration issues by generating positions only once
    const particlePositions = useMemo(() => {
        return Array.from({ length: 20 }).map(() => {
            const theta = Math.random() * Math.PI * 2
            const phi = Math.acos(2 * Math.random() - 1)
            const radius = 1.2 + Math.random() * 0.3

            const x = radius * Math.sin(phi) * Math.cos(theta)
            const y = radius * Math.sin(phi) * Math.sin(theta)
            const z = radius * Math.cos(phi)

            return [x, y, z] as [number, number, number]
        })
    }, [])

    return (
        <FloatModel
            rotationSpeed={rotationSpeed.get()}
            floatIntensity={0.3}
            scale={scale}
            position={position}
            interactive={interactive}
            onClick={onClick}
        >
            <group>
                <mesh ref={meshRef} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut}>
                    <icosahedronGeometry args={[1, 20]} />
                    <meshPhysicalMaterial
                        color={color}
                        emissive={emissiveColor}
                        emissiveIntensity={emissiveIntensity}
                        metalness={0.8}
                        roughness={0.2}
                        clearcoat={0.8}
                        clearcoatRoughness={0.2}
                        envMapIntensity={1}
                    />
                </mesh>

                <mesh scale={0.6}>
                    <icosahedronGeometry args={[1, 6]} />
                    <meshPhysicalMaterial
                        color="#a78bfa"
                        emissive="#8b5cf6"
                        emissiveIntensity={0.6}
                        metalness={0.9}
                        roughness={0.1}
                        transparent
                        opacity={0.7}
                        side={THREE.DoubleSide}
                    />
                </mesh>

                {particlePositions.map(([x, y, z], i) => (
                    <mesh key={i} position={[x, y, z]} scale={0.03 + Math.random() * 0.03}>
                        <sphereGeometry />
                        <meshStandardMaterial color="#c4b5fd" emissive="#8b5cf6" emissiveIntensity={1} />
                    </mesh>
                ))}
            </group>
        </FloatModel>
    )
}

export default function MorphingBlobExample() {
    return (
        <div className="relative aspect-square md:aspect-auto md:h-[500px]">
            <div className="absolute inset-0 rounded-lg overflow-hidden bg-gradient-to-br from-accent/30 to-secondary/30 dark:from-accent/20 dark:to-primary/20">
                <MorphingBlob />
            </div>
        </div>
    )
}
