"use client";

import { ReactNode, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

type CanvasContainerProps = {
  children: ReactNode;
  interactive?: boolean;
  controls?: boolean;
  cameraPosition?: [number, number, number];
  cameraFov?: number;
  className?: string;
};

export function CanvasContainer({
  children,
  interactive = false,
  controls = false,
  cameraPosition = [0, 0, 5],
  cameraFov = 50,
  className = "",
}: CanvasContainerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <div className={`canvas-container ${interactive ? "canvas-interactive" : ""} ${className}`}>
      <Canvas
        ref={canvasRef}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ pointerEvents: interactive ? "auto" : "none" }}
      >
        <PerspectiveCamera
          makeDefault
          position={cameraPosition}
          fov={cameraFov}
          near={0.1}
          far={1000}
        />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        {children}
        {controls && <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          rotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
        />}
      </Canvas>
    </div>
  );
}