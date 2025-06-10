"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { useSpring, animated } from "@react-spring/three"
import { useCursor } from "@react-three/drei"
import * as THREE from "three"
import { createNoise3D } from "simplex-noise"

// Reusing your existing FloatModel component
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
    position = [0, 0, 0] as [number, number, number],
    scale = 1,
    onClick,
}: FloatModelProps) {
    const modelRef = useRef<THREE.Group>(null)
    const [hovered, setHovered] = useState(false)

    useCursor(hovered && interactive)

    // Set up floating animation
    const { rotation, floatY } = useSpring({
        from: { rotation: [0, 0, 0], floatY: 0 },
        to: async (next) => {
            while (true) {
                await next({ floatY: 0.1 * floatIntensity })
                await next({ floatY: -0.1 * floatIntensity })
            }
        },
        config: { tension: 120, friction: 14 },
    })

    // Set up hover effect
    const { scale: hoverScale } = useSpring({
        scale: hovered && interactive ? 1.1 : 1,
        config: { tension: 300, friction: 30 },
    })

    // Rotate model
    useFrame((state) => {
        if (modelRef.current && !hovered) {
            modelRef.current.rotation.y += rotationSpeed * 0.01
        }
    })

    // Handle mouse events if interactive
    const eventHandlers = interactive
        ? {
            onPointerOver: () => setHovered(true),
            onPointerOut: () => setHovered(false),
            onClick: onClick,
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

// Advanced Morphing Blob
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
}) {
    const meshRef = useRef<THREE.Mesh>(null)
    const [hovered, setHovered] = useState(false)
    const simplex = useRef<((x: number, y: number, z: number) => number) | null>(null)
    const originalPositions = useRef<Float32Array | null>(null)

    // Initialize simplex noise
    useEffect(() => {
        simplex.current = createNoise3D()
    }, [])

    // Spring animation for hover state
    const { morphIntensity, rotationSpeed } = useSpring({
        morphIntensity: hovered ? 0.8 : 0.3,
        rotationSpeed: hovered ? 0.2 : 0.1,
        config: { mass: 1, tension: 280, friction: 60 },
    })

    // Store original vertex positions
    useEffect(() => {
        if (meshRef.current) {
            const geometry = meshRef.current.geometry
            const positionAttribute = geometry.getAttribute("position")
            originalPositions.current = new Float32Array(positionAttribute.array.slice())
        }
    }, [])

    // Animate the blob
    useFrame(({ clock }) => {
        if (meshRef.current && originalPositions.current && simplex.current) {
            const geometry = meshRef.current.geometry
            const positionAttribute = geometry.getAttribute("position")
            const time = clock.getElapsedTime() * speed

            // Get the current morph intensity from the spring
            const currentMorphIntensity = morphIntensity.get()

            // Apply noise to each vertex
            for (let i = 0; i < positionAttribute.count; i++) {
                const idx = i * 3
                const x = originalPositions.current[idx]
                const y = originalPositions.current[idx + 1]
                const z = originalPositions.current[idx + 2]

                // Calculate normalized direction vector
                const length = Math.sqrt(x * x + y * y + z * z)
                const nx = x / length
                const ny = y / length
                const nz = z / length

                // Apply different noise frequencies based on hover state
                const noiseFreq = complexity * (hovered ? 1.5 : 1)

                // Generate noise value
                const noise = simplex.current(nx * noiseFreq + time, ny * noiseFreq + time, nz * noiseFreq + time)

                // Apply noise to vertex
                positionAttribute.setXYZ(
                    i,
                    x + nx * noise * currentMorphIntensity,
                    y + ny * noise * currentMorphIntensity,
                    z + nz * noise * currentMorphIntensity,
                )
            }

            positionAttribute.needsUpdate = true
            geometry.computeVertexNormals()
        }
    })

    // Handle hover events
    const handlePointerOver = () => {
        if (interactive) setHovered(true)
    }

    const handlePointerOut = () => {
        if (interactive) setHovered(false)
    }

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
                {/* Main morphing blob */}
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

                {/* Inner core with opposite animation */}
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

                {/* Particle system around the blob */}
                {Array.from({ length: 20 }).map((_, i) => {
                    const theta = Math.random() * Math.PI * 2
                    const phi = Math.acos(2 * Math.random() - 1)
                    const radius = 1.2 + Math.random() * 0.3

                    const x = radius * Math.sin(phi) * Math.cos(theta)
                    const y = radius * Math.sin(phi) * Math.sin(theta)
                    const z = radius * Math.cos(phi)

                    return (
                        <mesh key={i} position={[x, y, z]} scale={0.03 + Math.random() * 0.03}>
                            <sphereGeometry />
                            <meshStandardMaterial color="#c4b5fd" emissive="#8b5cf6" emissiveIntensity={1} />
                        </mesh>
                    )
                })}
            </group>
        </FloatModel>
    )
}

// Example usage component
export default function MorphingBlobExample() {
    return (
        <div className="relative aspect-square md:aspect-auto md:h-[500px]">
            <div className="absolute inset-0 rounded-lg overflow-hidden bg-gradient-to-br from-accent/30 to-secondary/30 dark:from-accent/20 dark:to-primary/20">
                <MorphingBlob />
            </div>
        </div>
    )
}
