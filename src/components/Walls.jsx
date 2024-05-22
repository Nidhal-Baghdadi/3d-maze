// Import necessary components from React and Three.js
import { RigidBody } from "@react-three/rapier"; // Component for rigid body physics simulation
import * as THREE from "three"; // Three.js library
import { useTexture } from "@react-three/drei";

// Function to convert an angle from degrees to radians
const angleToRadians = (angleInDeg) => (Math.PI / 180) * angleInDeg;

// Array of data defining the positions and rotations of walls
const mazeData = [
  {
    position: [175, 0, 500],
    rotation: [0, 0, 0],
    width: 250,
  },
  {
    position: [-237.5, 0, 500],
    rotation: [0, 0, 0],
    width: 525,
  },
  {
    position: [37.5, 50, 500],
    rotation: [0, 0, 0],
    width: 25,
    height: 50,
  },
  {
    position: [50, 0, 475],
    rotation: [0, angleToRadians(90), 0],
    width: 50,
  },
  {
    position: [-250, 0, 375],
    rotation: [0, angleToRadians(90), 0],
    width: 150,
  },
  {
    position: [-300, 0, 425],
    rotation: [0, angleToRadians(90), 0],
    width: 150,
  },
  {
    position: [-350, 0, 450],
    rotation: [0, angleToRadians(90), 0],
    width: 100,
  },
  {
    position: [-400, 0, 400],
    rotation: [0, angleToRadians(90), 0],
    width: 100,
  },
  {
    position: [-400, 0, 250],
    rotation: [0, angleToRadians(90), 0],
    width: 100,
  },
  {
    position: [-250, 0, 225],
    rotation: [0, angleToRadians(90), 0],
    width: 50,
  },
  {
    position: [-200, 0, 275],
    rotation: [0, angleToRadians(90), 0],
    width: 250,
  },
  {
    position: [-150, 0, 350],
    rotation: [0, angleToRadians(90), 0],
    width: 100,
  },
  {
    position: [-100, 0, 300],
    rotation: [0, 0, 0],
    width: 100,
  },
  {
    position: [-50, 0, 275],
    rotation: [0, angleToRadians(90), 0],
    width: 50,
  },
  {
    position: [-125, 0, 250],
    rotation: [0, 0, 0],
    width: 50,
  },
  {
    position: [-150, 0, 225],
    rotation: [0, angleToRadians(90), 0],
    width: 50,
  },
  {
    position: [-75, 0, 200],
    rotation: [0, 0, 0],
    width: 150,
  },
  {
    position: [-175, 0, 400],
    rotation: [0, 0, 0],
    width: 50,
  },
  {
    position: [-325, 0, 300],
    rotation: [0, 0, 0],
    width: 150,
  },

  {
    position: [-325, 0, 200],
    rotation: [0, 0, 0],
    width: 150,
  },
  {
    position: [-350, 0, 150],
    rotation: [0, 0, 0],
    width: 300,
  },
  {
    position: [-300, 0, 100],
    rotation: [0, 0, 0],
    width: 300,
  },
  {
    position: [-425, 0, 50],
    rotation: [0, 0, 0],
    width: 50,
  },
  {
    position: [-450, 0, 75],
    rotation: [0, angleToRadians(90), 0],
    width: 50,
  },
  {
    position: [-150, 0, 100],
    rotation: [0, angleToRadians(90), 0],
    width: 100,
  },
  {
    position: [-100, 0, 75],
    rotation: [0, angleToRadians(90), 0],
    width: 150,
  },
  {
    position: [0, 0, 150],
    rotation: [0, angleToRadians(90), 0],
    width: 100,
  },
  {
    position: [25, 0, 150],
    rotation: [0, 0, 0],
    width: 50,
  },
  {
    position: [75, 0, 200],
    rotation: [0, 0, 0],
    width: 50,
  },
  {
    position: [100, 0, 175],
    rotation: [0, angleToRadians(90), 0],
    width: 50,
  },
  {
    position: [50, 0, 275],
    rotation: [0, angleToRadians(90), 0],
    width: 150,
  },
  {
    position: [0, 0, 355],
    rotation: [0, angleToRadians(90), 0],
    width: 100,
  },
  {
    position: [100, 0, 355],
    rotation: [0, angleToRadians(90), 0],
    width: 100,
  },
  {
    position: [25, 0, 405],
    rotation: [0, 0, 0],
    width: 150,
  },
  {
    position: [-50, 0, 375],
    rotation: [0, 0, 0],
    width: 100,
  },
  {
    position: [-100, 0, 412.5],
    rotation: [0, angleToRadians(90), 0],
    width: 75,
  },
  {
    position: [50, 0, 250],
    rotation: [0, 0, 0],
    width: 200,
  },
  {
    position: [225, 0, 250],
    rotation: [0, 0, 0],
    width: 50,
  },
  {
    position: [225, 0, 150],
    rotation: [0, 0, 0],
    width: 50,
  },
  {
    position: [200, 0, 175],
    rotation: [0, angleToRadians(90), 0],
    width: 50,
  },
  {
    position: [250, 0, 200],
    rotation: [0, 0, 0],
    width: 100,
  },
  {
    position: [150, 0, 256.25],
    rotation: [0, angleToRadians(90), 0],
    width: 312.5,
  },
  {
    position: [200, 0, 330.75],
    rotation: [0, angleToRadians(90), 0],
    width: 161.5,
  },
  {
    position: [250, 0, 330.75],
    rotation: [0, angleToRadians(90), 0],
    width: 50,
  },
  {
    position: [275, 0, 355.75],
    rotation: [0, 0, 0],
    width: 50,
  },
  {
    position: [200, 0, 412.5],
    rotation: [0, 0, 0],
    width: 100,
  },
  {
    position: [-50, 0, 75],
    rotation: [0, angleToRadians(90), 0],
    width: 50,
  },
  {
    position: [100, 0, 100],
    rotation: [0, 0, 0],
    width: 300,
  },
  {
    position: [150, 0, 50],
    rotation: [0, 0, 0],
    width: 300,
  },
  {
    position: [-100, 0, 150],
    rotation: [0, 0, 0],
    width: 100,
  },
  {
    position: [-250, 0, 75],
    rotation: [0, angleToRadians(90), 0],
    width: 50,
  },
  {
    position: [-200, 0, 25],
    rotation: [0, angleToRadians(90), 0],
    width: 50,
  },
  {
    position: [-300, 0, 25],
    rotation: [0, angleToRadians(90), 0],
    width: 50,
  },
  {
    position: [-325, 0, 0],
    rotation: [0, 0, 0],
    width: 350,
  },
  {
    position: [100, 0, 0],
    rotation: [0, 0, 0],
    width: 400,
  },
  {
    position: [-300, 0, 250],
    rotation: [0, 0, 0],
    width: 100,
  },
  {
    position: [-350, 0, 350],
    rotation: [0, 0, 0],
    width: 100,
  },
  {
    position: [300, 0, 250],
    rotation: [0, angleToRadians(90), 0],
    width: 500,
  },
  {
    position: [-500, 0, 250],
    rotation: [0, angleToRadians(90), 0],
    width: 500,
  },
  {
    position: [-25, 0, 450],
    rotation: [0, 0, 0],
    width: 450,
  },
];

const boxData = [
  {
    position: [0, -7, 0],
    rotation: [angleToRadians(-90), 0, 0],
    width: 2000,
    height: 2000,
    color: "#fff",
    emissive: "#000",
    nature: "floor",
  },
  {
    position: [0, 350, 0],
    rotation: [angleToRadians(90), 0, 0],
    width: 2000,
    height: 2000,
    nature: "ceiling",
  },
  {
    position: [1000, 171.5, 0],
    rotation: [0, angleToRadians(90), 0],
    width: 2000,
    height: 357,
  },
  {
    position: [-1000, 171.5, 0],
    rotation: [0, angleToRadians(90), 0],
    width: 2000,
    height: 357,
  },
  {
    position: [0, 171.5, 1000],
    rotation: [0, 0, 0],
    width: 2000,
    height: 357,
  },
  {
    position: [0, 171.5, -1000],
    rotation: [0, 0, 0],
    width: 2000,
    height: 357,
  },
];

// Walls component - creates walls and grounds using RigidBody components
export function Walls() {
  const floorTextures = useTexture({
    map: "../assets/textures/floor/diagonal_parquet_diff_4k.jpg",
    displacementMap: "../assets/textures/floor/diagonal_parquet_disp_4k.png",
    roughnessMap: "../assets/textures/floor/diagonal_parquet_rough_4k.jpg",
    aoMap: "../assets/textures/floor/diagonal_parquet_ao_4k.jpg",
  });
  const ceilingTextures = useTexture({
    map: "../assets/textures/ceiling/fabric_pattern_05_col_01_4k.png",
    roughnessMap: "../assets/textures/ceiling/fabric_pattern_05_rough_4k.jpg",
    normalMap: "../assets/textures/ceiling/fabric_pattern_05_nor_gl_4k.jpg",
  });
  const wallTextures = useTexture({
    map: "../assets/textures/wall/wood_cabinet_worn_long_diff_4k.jpg",
    displacementMap:
      "../assets/textures/wall/wood_cabinet_worn_long_disp_4k.png",
    roughnessMap: "../assets/textures/wall/wood_cabinet_worn_long_rough_4k.jpg",
    normalMap: "../assets/textures/wall/wood_cabinet_worn_long_nor_gl_4k.jpg",
    aoMap: "../assets/textures/wall/wood_cabinet_worn_long_ao_4k.jpg",
  });
  return (
    <>
      {/* Use data array to create multiple walls */}
      {mazeData.map((item) => (
        <RigidBody
          colliders="cuboid" // Type of collider shape for the wall (a cuboid in this case)
          lockTranslations // Lock translations to prevent movement during physics simulation
          lockRotations // Lock rotations to prevent unwanted rotations during physics simulation
          position={item.position} // Position of the wall in 3D space
          rotation={item.rotation} // Rotation of the wall in 3D space
          restitution={0.2}
        >
          {/* 3D mesh representing the wall */}
          <mesh>
            <boxGeometry
              args={[
                item.width,
                item.height != undefined ? item.height : 150,
                2,
              ]}
            />{" "}
            {/* Plane geometry with specified dimensions */}
            <meshStandardMaterial
              side={THREE.DoubleSide}
              {...wallTextures}
              transparent={
                item.transparent != undefined ? item.transparent : false
              }
              opacity={item.opacity != undefined ? item.opacity : 1}
              roughness={item.roughness != undefined ? item.roughness : 1}
              metalness={item.metalness != undefined ? item.metalness : 0}
            />{" "}
            {/* Material for the mesh */}
          </mesh>
        </RigidBody>
      ))}
<RigidBody
        colliders="cuboid" // Type of collider shape for the wall (a cuboid in this case)
        lockTranslations // Lock translations to prevent movement during physics simulation
        lockRotations // Lock rotations to prevent unwanted rotations during physics simulation
        position={[-100, 75, 250]} // Position of the wall in 3D space
        rotation={[angleToRadians(90), 0, 0]} // Rotation of the wall in 3D space
        restitution={0.2}
      >
        <mesh>
          <boxGeometry args={[800, 500]} />{" "}
          <meshPhysicalMaterial
            side={THREE.DoubleSide}
            color={"#fff"}
            transmission={1}
            opacity={1}
            roughness={0}
            metalness={0}
            ior={1.5}
            specularIntensity={1}
            specularColor={"#fff"}
            envMapIntensity={1}
          />{" "}
        </mesh>
      </RigidBody>
      <RigidBody
        colliders="cuboid" // Type of collider shape for the wall (a cuboid in this case)
        lockTranslations // Lock translations to prevent movement during physics simulation
        lockRotations // Lock rotations to prevent unwanted rotations during physics simulation
        position={[194.335, 172, 750]} // Position of the wall in 3D space
        rotation={[0, angleToRadians(-60), 0]} // Rotation of the wall in 3D space
        restitution={0.2}
      >
        {/* 3D mesh representing the wall */}
        <mesh>
          <boxGeometry args={[577.5, 354]} />{" "}
          {/* Plane geometry with specified dimensions */}
          <meshPhysicalMaterial
            side={THREE.DoubleSide}
            color={"#fff"}
            transmission={1}
            opacity={1}
            roughness={0}
            metalness={0}
            ior={1.5}
            thickness={0.1}
            specularIntensity={1}
            specularColor={"#fff"}
            envMapIntensity={1}
          />{" "}
          {/* Material for the mesh */}
        </mesh>
      </RigidBody>
      <RigidBody
        colliders="cuboid" // Type of collider shape for the wall (a cuboid in this case)
        lockTranslations // Lock translations to prevent movement during physics simulation
        lockRotations // Lock rotations to prevent unwanted rotations during physics simulation
        position={[-119.335, 173, 750]} // Position of the wall in 3D space
        rotation={[0, angleToRadians(60), 0]} // Rotation of the wall in 3D space
        restitution={0.2}
      >
        {/* 3D mesh representing the wall */}
        <mesh>
          <boxGeometry args={[577.5, 354]} />{" "}
          {/* Plane geometry with specified dimensions */}
          <meshPhysicalMaterial
            side={THREE.DoubleSide}
            color={"#fff"}
            transmission={1}
            opacity={1}
            roughness={0}
            metalness={0}
            ior={1.5}
            thickness={0.1}
            specularIntensity={1}
            specularColor={"#fff"}
            envMapIntensity={1}
          />{" "}
          {/* Material for the mesh */}
        </mesh>
      </RigidBody>
      {/* Create a ground using another RigidBody component */}
      {boxData.map((item) => (
        <RigidBody
          colliders="cuboid" // Type of collider shape for the ground (a cuboid in this case)
          lockTranslations={true} // Lock translations to prevent movement during physics simulation
          lockRotations // Lock rotations to prevent unwanted rotations during physics simulation
          position={item.position} // Position of the ground in 3D space
          rotation={item.rotation} // Rotation of the ground in 3D space
          friction={0.5}
        >
          {/* 3D mesh representing the ground */}
          <mesh>
            {" "}
            {/* Allow the ground to receive shadows */}
            <boxGeometry args={[item.width, item.height, 5]} />{" "}
            {/* Plane geometry with specified dimensions */}
            <meshStandardMaterial
              side={THREE.DoubleSide}
              {...(item.nature == "floor" ? floorTextures : ceilingTextures)}
            />{" "}
            {/* Material for the mesh */}
          </mesh>
        </RigidBody>
      ))}
      {/* Create a point light to illuminate the scene */}
      <pointLight position={[0, 10, 0]} /> {/* Position of the point light */}
    </>
  );
}
