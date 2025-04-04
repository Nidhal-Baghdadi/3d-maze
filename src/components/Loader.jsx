import React, { useRef } from "react";

import Banner from "./Banner";
import font from "../assets/fonts/gt.json";

export default function Loader(props) {
  const group = useRef();
  const { scale, position, text, color } = props;

  return (
    <group position={[0, 0, 0]}>
      <Banner
        text={text}
        color={color}
        position={position}
        scale={scale}
        font={font}
      />
    </group>
  );
}
