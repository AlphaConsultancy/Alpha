import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, MeshWobbleMaterial, Icosahedron } from "@react-three/drei";
import * as THREE from "three";

const FloatingShape = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.2;
    }
  });

  return (
    <group>
      <Icosahedron ref={meshRef} args={[2.5, 1]} scale={1}>
        <meshBasicMaterial color="#d4a126" wireframe transparent opacity={0.1} />
      </Icosahedron>

      <Icosahedron args={[2.52, 2]} scale={1}>
        <MeshDistortMaterial
          color="#4a7bc7"
          speed={3}
          distort={0.4}
          radius={1}
          transparent
          opacity={0.05}
        />
      </Icosahedron>

      <Icosahedron args={[0.1, 1]} position={[2, 1, 0]}>
        <MeshWobbleMaterial color="#d4a126" speed={2} factor={0.5} />
      </Icosahedron>
      <Icosahedron args={[0.08, 1]} position={[-2, -1.5, 1]}>
        <MeshWobbleMaterial color="#4a7bc7" speed={3} factor={0.3} />
      </Icosahedron>
      <Icosahedron args={[0.12, 1]} position={[1, -2, -1]}>
        <MeshWobbleMaterial color="#d4a126" speed={1.5} factor={0.6} />
      </Icosahedron>
    </group>
  );
};

const ServiceScene3D = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep via-transparent to-navy-deep opacity-80" />
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#d4a126" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4a7bc7" />
        <FloatingShape />
      </Canvas>
    </div>
  );
};

export default ServiceScene3D;
