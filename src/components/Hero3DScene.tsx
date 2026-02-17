import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

const InteractiveShatterSphere = ({ isMobile }: { isMobile: boolean }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse, viewport } = useThree();
  const [scrollY, setScrollY] = useState(typeof window !== 'undefined' ? window.scrollY : 0);

  // Responsive particle count - significantly reduced for performance
  const particleCount = useMemo(() => isMobile ? 1200 : 3500, [isMobile]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [spherePositions, currentPositions, velocities] = useMemo(() => {
    const sphere = new Float32Array(particleCount * 3);
    const curr = new Float32Array(particleCount * 3);
    const vels = new Float32Array(particleCount * 3);

    const radius = isMobile ? 2.2 : 2.8;
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      sphere[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      sphere[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      sphere[i * 3 + 2] = radius * Math.cos(phi);
      curr[i * 3] = sphere[i * 3];
      curr[i * 3 + 1] = sphere[i * 3 + 1];
      curr[i * 3 + 2] = sphere[i * 3 + 2];
      vels[i * 3] = 0; vels[i * 3 + 1] = 0; vels[i * 3 + 2] = 0;
    }
    return [sphere, curr, vels];
  }, [particleCount, isMobile]);

  const tempVec = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const scrollMax = 900;
    const rawProgress = Math.min(scrollY, scrollMax) / scrollMax;
    const transitionProgress = rawProgress < 0.5
      ? 16 * Math.pow(rawProgress, 5)
      : 1 - Math.pow(-2 * rawProgress + 2, 5) / 2;

    // Responsive target alignment
    const targetX = isMobile ? 0 : transitionProgress * -4.5;
    const targetY = isMobile ? (transitionProgress * -5) : 0;

    pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, targetX, 0.1);
    pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, targetY, 0.1);

    // Constant elegant rotation
    pointsRef.current.rotation.y += 0.001;

    tempVec.set(
      (state.mouse.x * state.viewport.width) / 2,
      (state.mouse.y * state.viewport.height) / 2,
      0
    );
    pointsRef.current.worldToLocal(tempVec);

    const mx = tempVec.x;
    const my = tempVec.y;
    const mz = tempVec.z;
    const rSq = Math.pow(1.8 + (transitionProgress * 0.7), 2);
    const repulsionStrength = isMobile ? 0.2 : 0.3;

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      const px = positions[idx];
      const py = positions[idx + 1];
      const pz = positions[idx + 2];

      const tX = spherePositions[idx];
      const tY = spherePositions[idx + 1];
      const tZ = spherePositions[idx + 2];

      // Optimized Interaction: Bounding box check before distance calculation
      const dx = px - mx;
      const dy = py - my;
      const dz = pz - mz;

      // Only calculate interaction if close enough
      if (Math.abs(dx) < 2.0 && Math.abs(dy) < 2.0) {
        const distSq = dx * dx + dy * dy + dz * dz;
        if (distSq < rSq) {
          const d = Math.sqrt(distSq);
          const force = (Math.sqrt(rSq) - d) / Math.sqrt(rSq);
          const push = force * repulsionStrength;
          velocities[idx] += (dx / d) * push;
          velocities[idx + 1] += (dy / d) * push;
          velocities[idx + 2] += (dz / d) * push;
        }
      }

      // Return to origin force
      const distToTargetSq = Math.pow(tX - px, 2) + Math.pow(tY - py, 2) + Math.pow(tZ - pz, 2);

      // Skip expensive math if already very close and velocities are low
      if (distToTargetSq > 0.0001 || Math.abs(velocities[idx]) > 0.01) {
        velocities[idx] += (tX - px) * 0.08;
        velocities[idx + 1] += (tY - py) * 0.08;
        velocities[idx + 2] += (tZ - pz) * 0.08;

        velocities[idx] *= 0.8;
        velocities[idx + 1] *= 0.8;
        velocities[idx + 2] *= 0.8;

        positions[idx] += velocities[idx];
        positions[idx + 1] += velocities[idx + 1];
        positions[idx + 2] += velocities[idx + 2];
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    const material = pointsRef.current.material as THREE.PointsMaterial;
    material.size = (isMobile ? 0.03 : 0.04) + (transitionProgress * 0.01);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={currentPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#0ea5e9"
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

const Hero3DScene = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        dpr={isMobile ? 1 : [1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true
        }}
        style={{ background: "transparent" }}
        camera={{ position: [0, 0, 8], fov: 60 }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#0ea5e9" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />

        <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.3}>
          <InteractiveShatterSphere isMobile={isMobile} />
        </Float>
      </Canvas>
    </div>
  );
};

export default Hero3DScene;
