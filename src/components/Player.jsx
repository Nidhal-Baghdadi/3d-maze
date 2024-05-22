import { useFrame, useThree } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { Vector3 } from "three";
import { Raycaster, Quaternion } from "three";
import { clamp, lerp } from "three/src/math/MathUtils";
import { useTexture } from "@react-three/drei";
// import { useLoader } from "@react-three/fiber";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import * as THREE from "three";

export const Player = ({
  walk = 3,
  input = () => ({ move: [0, 0, 0], look: [0, 0] }),
}) => {
  const api = useRef(null); // Reference to the RigidBody API provided by "@react-three/rapier".
  const mesh = useRef(); // Reference to the 3D mesh of the player character.
  const { scene, camera } = useThree(); // Get the 3D scene and camera provided by "@react-three/fiber".
  let phi = 0; // Horizontal angle of the camera's orientation.
  let theta = 0; // Vertical angle of the camera's orientation.

  // Declare reusable, non-persistent variables (avoiding recreation every frame).
  const speed = new Vector3(walk / 2, walk, walk); // Vector representing the player's movement speed.
  const offset = new Vector3(0, 0, 0); // Vector used to calculate the player's movement based on user input.
  const gaze = new Quaternion(); // Quaternion representing the direction the player character is looking at.
  const yaw = new Quaternion(0); // Quaternion controlling horizontal rotations of the player's camera.
  const pitch = new Quaternion(0); // Quaternion controlling vertical rotations of the player's camera.
  const cameraOffset = new Vector3(0, 155, 50); // Vector representing the offset of the camera from the player's position.
  const down = new Vector3(0, -1, 0); // Vector pointing downwards, used for raycasting to determine ground collision.
  const yAxis = new Vector3(0, 1, 0); // Vector representing the world's y-axis.
  const xAxis = new Vector3(1, 0, 0); // Vector representing the world's x-axis.
  const raycaster = new Raycaster(new Vector3(0, 0, 0), down, 0, 2); // Raycaster for ground collision detection.
  const slope = new Vector3(0, 1, 0); // Vector representing the slope of the ground surface.

  // Function to update the player's camera orientation based on user input.
  const updateOrientation = ([x, y]) => {
    const cameraSpeed = 3; // Speed factor for camera movement.
    const step = 0.3; // Step for smooth interpolation of camera orientation changes.
    phi = lerp(phi, -x * cameraSpeed, step); // Interpolate horizontal camera rotation.
    theta = lerp(theta, -y * cameraSpeed, step); // Interpolate vertical camera rotation.
    theta = clamp(theta, -Math.PI / 3, Math.PI / 3); // Clamp vertical rotation within limits.

    yaw.setFromAxisAngle(yAxis, phi); // Set the yaw quaternion based on horizontal rotation.
    pitch.setFromAxisAngle(xAxis, theta); // Set the pitch quaternion based on vertical rotation.
    gaze.multiplyQuaternions(yaw, pitch).normalize(); // Combine yaw and pitch to get the gaze direction.
  };
  const playerTextures = useTexture({
    map: "../assets/textures/player/fabric_pattern_07_col_1_4k.png",
    roughnessMap: "../assets/textures/player/fabric_pattern_07_rough_4k.jpg",
    normalMap: "../assets/textures/player/fabric_pattern_07_nor_gl_4k.jpg",
    aoMap: "../assets/textures/player/fabric_pattern_07_ao_4k.jpg",
  });

  useFrame(() => {
    if (!api.current || !mesh.current) return;
    const position = api.current.translation(); // Get the player's current position from the RigidBody API.
    const { move, look } = input(); // Get current player input, including movement and camera look direction.
    updateOrientation(look); // Update the player's camera orientation based on the camera look direction.

    // Filter the scene's children to get all walkable objects (excluding the player's mesh).
    const walkable = scene.children.filter(
      (o) => o.children[0]?.uuid !== mesh?.current?.uuid
    );

    raycaster.set(position, down);
    // Calculate the offset vector for player movement based on user input, speed, and orientation.
    offset.fromArray(move).normalize().multiply(speed).applyQuaternion(yaw);
    api.current.applyImpulse(offset, true);
    const newPosition = new THREE.Vector3(position.x, position.y, position.z);

    camera.position.lerp(
      newPosition.add(cameraOffset.clone().applyQuaternion(yaw)),
      0.25
    );

    camera.quaternion.copy(gaze);
    camera.far = 3000;
  });
  return (
    <RigidBody
      ref={api}
      position={[37.5, 20, 570]}
      friction={1}
      restitution={0.1}
      colliders="ball"
      gravityScale={4}
    >
      <mesh ref={mesh} userData={{ tag: "player" }} castShadow>
        <meshStandardMaterial {...playerTextures} />
        <sphereGeometry args={[10, 32, 32]} />
      </mesh>
    </RigidBody>
  );
};
