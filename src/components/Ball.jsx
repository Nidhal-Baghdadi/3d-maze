import { RigidBody } from "@react-three/rapier";

// Ball component - represents a ball with physics simulation
export function Ball({ position, color }) {
  return (
    <RigidBody
      colliders="ball" // Type of collider shape for the ball (a sphere in this case)
      position={position} // Position of the ball in 3D space, passed as a prop
      friction={1} // Friction coefficient for physics interactions
      restitution={0.5} // Restitution (bounciness) coefficient for physics interactions
    >
      {/* 3D mesh representing the ball */}
      <mesh>
        <sphereGeometry args={[2, 24, 24, 8]} />{" "}
        {/* Sphere geometry with specified arguments */}
        <meshPhysicalMaterial
          color={color}
          metalness={0.5}
          roughness={1}
        />{" "}
        {/* Material for the mesh, showing the normals for shading */}
      </mesh>
    </RigidBody>
  );
}
