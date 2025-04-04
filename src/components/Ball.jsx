import { RigidBody } from "@react-three/rapier";

export function Ball({ position, color }) {
  return (
    <RigidBody
      colliders="ball"
      position={position}
      friction={1}
      restitution={0.5}
    >
      <mesh>
        <sphereGeometry args={[2, 24, 24, 8]} />{" "}
        <meshPhysicalMaterial color={color} metalness={0.5} roughness={1} />{" "}
      </mesh>
    </RigidBody>
  );
}
