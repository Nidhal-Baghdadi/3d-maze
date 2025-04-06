import { useFrame, useThree } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useRef, useEffect } from "react";
import { Vector3 } from "three";
import {
  useTexture,
  useKeyboardControls,
  PointerLockControls,
} from "@react-three/drei";
import * as THREE from "three";
import { useGame } from "../contexts/GameContext";

const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();

export const Player = () => {
  const api = useRef(null);
  const mesh = useRef();
  const { camera } = useThree();
  const { resetGame, startGame, pauseGame, isRunning, isHover, setIsHover } =
    useGame();
  const [, get] = useKeyboardControls();
  const pointerLockRef = useRef();
  const cameraOffset = new Vector3(0, 135, 60);
  const cameraOffsetInGame = new Vector3(0, 22, 0);

  const playerTextures = useTexture({
    map: "../assets/textures/player/plastered_wall_04_diff_1k.jpg",
    roughnessMap: "../assets/textures/player/plastered_wall_04_rough_1k.jpg",
    normalMap: "../assets/textures/player/plastered_wall_04_nor_gl_1k.jpg",
    aoMap: "../assets/textures/player/plastered_wall_04_ao_1k.jpg",
  });

  useFrame((state) => {
    if (!api.current || !mesh.current) return;

    const { forward, backward, left, right, enter, pause, reset, hover } =
      get();

    frontVector.set(0, 0, backward - forward);

    sideVector.set(left - right, 0, 0);
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(100)
      .applyQuaternion(state.camera.quaternion);

    if (isRunning) {
      api.current.setLinvel({ x: direction.x, y: 0, z: direction.z });
    }
    if (hover && !isHover) {
      setIsHover(true);
    }
    if (reset) {
      api.current.setTranslation({ x: 37.5, y: 20, z: 570 }, true);
      resetGame();
    }
    if (pause) {
      pauseGame();
    }

    if (enter && !isRunning) {
      startGame();
    }

    const position = api.current.translation();

    const newPosition = new THREE.Vector3(position.x, position.y, position.z);
    if (hover) {
      camera.position.lerp(newPosition.add(cameraOffset.clone()), 0.5);
    } else {
      camera.position.lerp(newPosition.add(cameraOffsetInGame.clone()), 0.5);
    }

    camera.far = 3000;

    camera.updateProjectionMatrix();
  });
  return (
    <>
      <PointerLockControls ref={pointerLockRef} />
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
    </>
  );
};
