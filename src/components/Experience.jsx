import { KeyboardControls } from "@react-three/drei";
import { Player } from "./Player";
import { Walls } from "./Walls";
import Loader from "./Loader";
import Clock from "./Clock";
import { useGame } from "../contexts/GameContext";

function Experience() {
  const { isRunning, isReset } = useGame();

  return (
    <group>
      <Clock color={"yellow"} position={[0, 122, 80]} scale={10} />
      {!isRunning && (
        <Loader
          text={"Enter | Start the game!"}
          color={"yellow"}
          position={[0, 150, 80]}
          scale={10}
        />
      )}
      <KeyboardControls
        map={[
          { name: "forward", keys: ["ArrowUp", "z", "Z"] },
          { name: "backward", keys: ["ArrowDown", "s", "S"] },
          { name: "left", keys: ["ArrowLeft", "q", "Q"] },
          { name: "right", keys: ["ArrowRight", "d", "D"] },
          { name: "reset", keys: ["r", "R"] },
          { name: "pause", keys: ["p", "P"] },
          { name: "enter", keys: ["Enter"] },
          { name: "hover", keys: ["h", "H"] },
        ]}
      >
        <Player />
      </KeyboardControls>
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
      <Loader
        text={"H | Hover"}
        color={"white"}
        position={[37.5, 35, 522]}
        scale={2}
      />
      <Walls />
    </group>
  );
}

export default Experience;
