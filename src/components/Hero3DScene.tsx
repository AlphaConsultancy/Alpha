import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

const InteractiveShatterSphere = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse, viewport } = useThree();
  const [scrollY, setScrollY] = useState(typeof window !== 'undefined' ? window.scrollY : 0);

  // Responsive particle count based on device power/size
  const isMobile = viewport.width < 5;
  const particleCount = useMemo(() => isMobile ? 3500 : 7000, [isMobile]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Generate perfected Alpha logo positions
  const generateLogoPositions = (count: number) => {
    const positions = new Float32Array(count * 3);
    const scale = isMobile ? 2.8 : 3.8;

    for (let i = 0; i < count; i++) {
      const type = Math.random();
      let x = 0, y = 0, z = 0;

      if (type < 0.2) { // Outer Circle
        const angle = Math.random() * Math.PI * 2;
        const r = scale * 1.05 + (Math.random() - 0.5) * 0.05;
        x = Math.cos(angle) * r;
        y = Math.sin(angle) * r;
        z = (Math.random() - 0.5) * 0.08;
      } else if (type < 0.5) { // Left Slanted Bar
        const t = Math.random();
        const thickness = (isMobile ? 0.45 : 0.6) * (1 - t * 0.4);
        const offset = (Math.random() - 0.5) * thickness;
        x = THREE.MathUtils.lerp(-scale * 0.42, 0, t) + offset;
        y = THREE.MathUtils.lerp(-scale * 0.5, scale * 0.7, t);
        z = (Math.random() - 0.5) * 0.15;
      } else if (type < 0.8) { // Right Slanted Bar
        const t = Math.random();
        const thickness = (isMobile ? 0.45 : 0.6) * (1 - t * 0.4);
        const offset = (Math.random() - 0.5) * thickness;
        x = THREE.MathUtils.lerp(scale * 0.42, 0, t) + offset;
        y = THREE.MathUtils.lerp(-scale * 0.5, scale * 0.7, t);
        z = (Math.random() - 0.5) * 0.15;
      } else if (type < 0.92) { // Crossbar
        const t = Math.random();
        x = THREE.MathUtils.lerp(-scale * 0.25, scale * 0.25, t);
        y = -scale * 0.12 + (Math.random() - 0.5) * 0.28;
        z = (Math.random() - 0.5) * 0.12;
      } else { // Peak Fill
        const t = Math.random();
        x = (Math.random() - 0.5) * 0.3;
        y = THREE.MathUtils.lerp(scale * 0.45, scale * 0.7, t);
        z = (Math.random() - 0.5) * 0.1;
      }

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    return positions;
  };

  const [spherePositions, logoPositions, currentPositions, velocities] = useMemo(() => {
    const sphere = new Float32Array(particleCount * 3);
    const logo = generateLogoPositions(particleCount);
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
    return [sphere, logo, curr, vels];
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
    const targetY = isMobile ? (transitionProgress * -5) : 0; // Glide down on mobile

    pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, targetX, 0.12);
    pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, targetY, 0.12);

    const rotationSpeed = 0.001 * Math.max(0, 1 - transitionProgress * 1.5);
    pointsRef.current.rotation.y += rotationSpeed;

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

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      const px = positions[idx];
      const py = positions[idx + 1];
      const pz = positions[idx + 2];

      // Optimized Interaction: Bounding box check before distance calculation
      const dx = px - mx;
      const dy = py - my;
      const dz = pz - mz;

      if (Math.abs(dx) < 2.5 && Math.abs(dy) < 2.5) { // Cheap pre-check
        const distSq = dx * dx + dy * dy + dz * dz;
        if (distSq < rSq) {
          const d = Math.sqrt(distSq);
          const force = (Math.sqrt(rSq) - d) / Math.sqrt(rSq);
          const push = force * 0.3;
          velocities[idx] += (dx / d) * push;
          velocities[idx + 1] += (dy / d) * push;
          velocities[idx + 2] += (dz / d) * push;
        }
      }

      const tX = THREE.MathUtils.lerp(spherePositions[idx], logoPositions[idx], transitionProgress);
      const tY = THREE.MathUtils.lerp(spherePositions[idx + 1], logoPositions[idx + 1], transitionProgress);
      const tZ = THREE.MathUtils.lerp(spherePositions[idx + 2], logoPositions[idx + 2], transitionProgress);

      velocities[idx] += (tX - px) * 0.08;
      velocities[idx + 1] += (tY - py) * 0.08;
      velocities[idx + 2] += (tZ - pz) * 0.08;

      velocities[idx] *= 0.82;
      velocities[idx + 1] *= 0.82;
      velocities[idx + 2] *= 0.82;

      positions[idx] += velocities[idx];
      positions[idx + 1] += velocities[idx + 1];
      positions[idx + 2] += velocities[idx + 2];
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    const material = pointsRef.current.material as THREE.PointsMaterial;
    material.size = (isMobile ? 0.03 : 0.04) + (transitionProgress * 0.016);
    material.opacity = 0.85 + (transitionProgress * 0.1);
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
        opacity={0.85}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const Hero3DScene = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={60} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#0ea5e9" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />

        <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.3}>
          <InteractiveShatterSphere />
        </Float>
      </Canvas>
    </div>
  );
};

export default Hero3DScene;
