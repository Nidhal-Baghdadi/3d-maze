import "./style/App.css";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense } from "react";
import Experience from "./components/Experience";
import { Environment, Loader as Loader2 } from "@react-three/drei";

import { Color } from "three";

import Loader from "./components/Loader";

function App() {
  return (
    <div className="App">
      <Canvas>
        <Suspense
          fallback={
            <Loader
              scale={0.1}
              position={[0, 0, 0]}
              text={"A few more seconds!"}
              color={new Color("darkgoldenrod")}
            />
          }
        >
          <Physics gravity={[0, -20, 0]}>
            <Experience className="experience" />
          </Physics>
        </Suspense>
        <ambientLight color={"dodgerblue"} intensity={1} />
        <Environment files={"./assets/hdr/metro_vijzelgracht_1k.hdr"} />
      </Canvas>
      <Loader2 dataInterpolation={(p) => `Loading ${p.toFixed(2)}%`} />
    </div>
  );
}

export default App;
