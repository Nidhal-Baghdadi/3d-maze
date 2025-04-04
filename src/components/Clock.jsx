import React, { useState, useEffect } from "react";

import Banner from "./Banner";
import font from "../assets/fonts/gt.json";

export default function Clock(props) {
  const { scale, position, color, isRunning, isReset } = props;

  const [elapsedTime, setElapsedTime] = useState("Time: 00:00");
  const [count, setCount] = useState(0);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 1000); // Update every 1000ms (1 second)
    } else {
      // Reset the count if the game is reset
      if (isReset) {
        clearInterval(intervalId);
        setCount(0);
      }
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning, isReset]);

  useEffect(() => {
    const minutes = Math.floor(count / 60);
    const remainingSeconds = Math.floor(count % 60);

    setElapsedTime(
      `Time: ${minutes.toString().padStart(2, "0")}:${remainingSeconds
        .toString()
        .padStart(2, "0")}`
    );
  }, [count]);

  return (
    <group position={[0, 0, 0]}>
      <Banner
        text={elapsedTime}
        color={color}
        position={position}
        scale={scale}
        font={font}
      />
    </group>
  );
}
