import "./style/App.css";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier"; // Components for handling physics.
import { Suspense } from "react"; // Allows for using React components as fallback
import Experience from "./components/Experience";
import { Environment } from "@react-three/drei";

function App() {
  return (
    <div className="App">
      <Canvas>
        <Suspense fallback={null}>
          {" "}
          <Physics gravity={[0, -10, 0]}>
            {" "}
            <Experience className="experience" />
          </Physics>
          <Environment files={"./assets/hdr/poly_haven_studio_4k.hdr"} />{" "}
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
