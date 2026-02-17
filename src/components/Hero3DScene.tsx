import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

const InteractiveShatterSphere = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse, viewport } = useThree();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const particleCount = 4500; // Increased particle count for better density

  // Base positions and velocities
  const [originalPositions, currentPositions, velocities] = useMemo(() => {
    const orig = new Float32Array(particleCount * 3);
    const curr = new Float32Array(particleCount * 3);
    const vels = new Float32Array(particleCount * 3);

    const radius = 2.6; // Decreased sphere radius to fit better

    for (let i = 0; i < particleCount; i++) {
      // Create a sphere distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      orig[i * 3] = x;
      orig[i * 3 + 1] = y;
      orig[i * 3 + 2] = z;

      curr[i * 3] = x;
      curr[i * 3 + 1] = y;
      curr[i * 3 + 2] = z;

      vels[i * 3] = 0;
      vels[i * 3 + 1] = 0;
      vels[i * 3 + 2] = 0;
    }
    return [orig, curr, vels];
  }, []);

  const tempVec = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

    // Get mouse world position at z=0 (depth of the sphere's origin roughly)
    tempVec.set(
      (state.mouse.x * state.viewport.width) / 2,
      (state.mouse.y * state.viewport.height) / 2,
      0
    );

    // Precisely convert mouse world position to pointsRef local position
    // This handles all parent transforms (scroll, Float, etc.) automatically
    pointsRef.current.worldToLocal(tempVec);
    const mx = tempVec.x;
    const my = tempVec.y;
    const mz = tempVec.z;

    // Precise transition logic: move sphere to the left as we scroll
    // Clamp scroll for the sphere position so it 'freezes' after transition
    // We want it to glide horizontally but NOT move down.
    const clampedScroll = Math.min(scrollY, 600); // Shorter transition for 1vh-ish sections
    const transitionProgress = clampedScroll / 600;
    const targetX = transitionProgress * -4.2; // Move further left
    const targetY = 0; // Keep vertically centered in the fixed container

    // Smooth lerp to targets
    pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, targetX, 0.1);
    pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, targetY, 0.1);
    pointsRef.current.rotation.y += 0.001;

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;

      const px = positions[idx];
      const py = positions[idx + 1];
      const pz = positions[idx + 2];

      // Calculate distance to local mouse position
      const dx = px - mx;
      const dy = py - my;
      const dz = pz - mz;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      // Interaction radius - Reduced for a more subtle effect
      const interactRadius = 1.8;

      if (dist < interactRadius) {
        // Shatter effect: push away - Reduced force
        const force = (interactRadius - dist) / interactRadius;
        const push = force * 0.25;

        velocities[idx] += (dx / dist) * push;
        velocities[idx + 1] += (dy / dist) * push;
        velocities[idx + 2] += (dz / dist) * push;
      }

      // Return force (Rebuild)
      const rx = originalPositions[idx] - px;
      const ry = originalPositions[idx + 1] - py;
      const rz = originalPositions[idx + 2] - pz;

      velocities[idx] += rx * 0.04;
      velocities[idx + 1] += ry * 0.04;
      velocities[idx + 2] += rz * 0.04;

      // Friction
      velocities[idx] *= 0.88;
      velocities[idx + 1] *= 0.88;
      velocities[idx + 2] *= 0.88;

      // Update positions
      positions[idx] += velocities[idx];
      positions[idx + 1] += velocities[idx + 1];
      positions[idx + 2] += velocities[idx + 2];
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
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
