import { useMouseCapture } from "../behaviour/useMouseCapture"; // Importing the hook for mouse input.
import { useKeyboard } from "../behaviour/useKeyboard"; // Importing the hook for keyboard i
import { Player } from "./Player"; // Importing the Player component to control the character.
import { Walls } from "./Walls"; // Importing the Walls component for creating walls and grounds.
import { Ball } from "./Ball"; // Importing the Ball component for creating phys
// Function to get player input from keyboard and mouse
function getInput(keyboard, mouse) {
  let [x, y, z] = [0, 0, 0];
  // Checking keyboard inputs to determine movement direction
  if (keyboard["s"]) z += 1.0; // Move backward
  if (keyboard["z"]) z -= 1.0; // Move forward
  if (keyboard["d"]) x += 1.0; // Move right
  if (keyboard["q"]) x -= 1.0; // Move left

  // Returning an object with the movement and look direction
  return {
    move: [x, y, z],
    look: [mouse.x / window.innerWidth, mouse.y / window.innerHeight], // Mouse look direction
  };
}

function Experience() {
  const keyboard = useKeyboard(); // Hook to get keyboard input
  const mouse = useMouseCapture(); // Hook to get mouse input

  return (
    <group>
      <Walls /> {/* Rendering walls and grounds */}
      <Player walk={20000} input={() => getInput(keyboard, mouse)} />{" "}
      {/* Creating the player character */}
    </group>
  );
}

export default Experience;
