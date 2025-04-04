import { useMouseCapture } from "../behaviour/useMouseCapture";
import { useKeyboard } from "../behaviour/useKeyboard";
import { Player } from "./Player";
import { Walls } from "./Walls";
import Loader from "./Loader";

import Clock from "./Clock";
import { useState, useEffect } from "react";

function getInput(keyboard, mouse) {
  let [x, y, z] = [0, 0, 0];
  if (keyboard["s"]) z += 1.0;
  if (keyboard["z"]) z -= 1.0;
  if (keyboard["d"]) x += 1.0;
  if (keyboard["q"]) x -= 1.0;

  return {
    move: [x, y, z],
    look: [mouse.x / window.innerWidth, mouse.y / window.innerHeight],
  };
}

function Experience() {
  const keyboard = useKeyboard();
  const mouse = useMouseCapture();
  const [isRunning, setIsRunning] = useState(false);

  const [isReset, setIsReset] = useState(false);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        setIsReset(false);
        setIsRunning(true);
      }
      if (event.key === "r") {
        setIsReset(true);

        setIsRunning(false);
      }
      if (event.key === "p") {
        setIsReset(false);
        setIsRunning(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <group>
      <Clock
        color={"yellow"}
        position={[0, 122, 80]}
        scale={10}
        isRunning={isRunning}
        isReset={isReset}
      />
      {!isRunning && (
        <Loader
          text={"Enter | Start the game!"}
          color={"yellow"}
          position={[0, 150, 80]}
          scale={10}
        />
      )}
      <Player
        walk={isRunning ? 35000 : 0}
        input={() => getInput(keyboard, mouse)}
        isReset={isReset}
      />
      <Loader
        text={"P | Pause"}
        color={"white"}
        position={[520, 170, -400]}
        scale={17}
      />{" "}
      <Loader
        text={"R | Reset"}
        color={"white"}
        position={[-520, 170, -400]}
        scale={17}
      />
      <Walls />
    </group>
  );
}

export default Experience;
