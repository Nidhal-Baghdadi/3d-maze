import { useFrame, useThree } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { Raycaster, Quaternion } from "three";
import { clamp, lerp } from "three/src/math/MathUtils";
import { useTexture } from "@react-three/drei";

import * as THREE from "three";

export const Player = ({
  walk = 3,
  input = () => ({ move: [0, 0, 0], look: [0, 0] }),
  isReset,
}) => {
  const api = useRef(null);
  const mesh = useRef();
  const { scene, camera } = useThree();
  let phi = 0;
  let theta = 0;

  const speed = new Vector3(walk, walk, walk);
  const offset = new Vector3(0, 0, 0);
  const gaze = new Quaternion();
  const yaw = new Quaternion(0);
  const pitch = new Quaternion(0);
  const cameraOffset = new Vector3(0, 135, 60);
  const down = new Vector3(0, -1, 0);
  const yAxis = new Vector3(0, 1, 0);
  const xAxis = new Vector3(1, 0, 0);
  const raycaster = new Raycaster(new Vector3(0, 0, 0), down, 0, 2);
  const slope = new Vector3(0, 1, 0);

  const updateOrientation = ([x, y]) => {
    const cameraSpeed = 0.5;
    const step = 0.3;
    phi = lerp(phi, -x * cameraSpeed, step);
    theta = lerp(theta, -y * cameraSpeed, step);
    theta = clamp(theta, -Math.PI / 2, Math.PI / 3);

    yaw.setFromAxisAngle(yAxis, phi);
    pitch.setFromAxisAngle(xAxis, theta);
    gaze.multiplyQuaternions(yaw, pitch).normalize();
  };
  const playerTextures = useTexture({
    map: "../assets/textures/player/fabric_pattern_07_col_1_4k.png",
    roughnessMap: "../assets/textures/player/fabric_pattern_07_rough_4k.jpg",
    normalMap: "../assets/textures/player/fabric_pattern_07_nor_gl_4k.jpg",
    aoMap: "../assets/textures/player/fabric_pattern_07_ao_4k.jpg",
  });

  useEffect(() => {
    if (!api.current) return;

    if (isReset) {
      api.current.setTranslation({ x: 37.5, y: 20, z: 570 }, true);
    }
  }, [isReset]);

  useFrame(() => {
    if (!api.current || !mesh.current) return;
    const position = api.current.translation();

    const { move, look } = input();
    updateOrientation(look);

    const walkable = scene.children.filter(
      (o) => o.children[0]?.uuid !== mesh?.current?.uuid
    );

    raycaster.set(position, down);

    offset.fromArray(move).normalize().multiply(speed).applyQuaternion(yaw);

    api.current.applyImpulse(offset, true);
    const newPosition = new THREE.Vector3(position.x, position.y, position.z);

    camera.position.lerp(
      newPosition.add(cameraOffset.clone().applyQuaternion(yaw)),
      0.25
    );

    camera.quaternion.copy(gaze);
    camera.far = 3000;

    camera.updateProjectionMatrix();
  });
  return (
    <RigidBody
      ref={api}
      position={[37.5, 20, 570]}
      friction={1}
      restitution={0.22}
      colliders="ball"
      gravityScale={7}
    >
      <mesh ref={mesh} userData={{ tag: "player" }} castShadow>
        <meshStandardMaterial {...playerTextures} />
        <sphereGeometry args={[10, 32, 32]} />
      </mesh>
    </RigidBody>
  );
};
