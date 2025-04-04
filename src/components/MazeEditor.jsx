import { useState } from "react";
import { Stage, Layer, Line, Circle } from "react-konva";

const MazeEditor = () => {
  const [lines, setLines] = useState([]);
  const [dots, setDots] = useState([]);

  const gridSize = 15;

  const isStraightLine = (dot1, dot2) => {
    return dot1.x === dot2.x || dot1.y === dot2.y;
  };

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.evt;

    if (dots.length >= 1) {
      const lastDot = dots[dots.length - 1];
      const newDot = {
        x: Math.round(offsetX / gridSize) * gridSize,
        y: Math.round(offsetY / gridSize) * gridSize,
      };

      if (isStraightLine(lastDot, newDot)) {
        setDots((prevDots) => [...prevDots, newDot]);
      }
    } else {
      setDots((prevDots) => [
        ...prevDots,
        {
          x: Math.round(offsetX / gridSize) * gridSize,
          y: Math.round(offsetY / gridSize) * gridSize,
        },
      ]);
    }
  };

  const handleMouseUp = () => {
    if (dots.length > 1) {
      setLines([...lines, dots]);
      setDots([]);
    }
  };

  // Function to create grid lines
  const createGrid = () => {
    const rows = 930 / gridSize;
    const columns = 1200 / gridSize;
    const grid = [];

    for (let i = 0; i < rows; i++) {
      grid.push(
        <Line
          key={`row-${i}`}
          points={[0, i * gridSize, 1200, i * gridSize]}
          stroke="grey"
          strokeWidth={3}
        />
      );
    }

    for (let j = 0; j < columns; j++) {
      grid.push(
        <Line
          key={`column-${j}`}
          points={[j * gridSize, 0, j * gridSize, 930]}
          stroke="grey"
          strokeWidth={3}
        />
      );
    }

    return grid;
  };

  return (
    <Stage
      width={1200}
      height={930}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <Layer>
        {createGrid()}
        {dots.map((dot, index) => (
          <Circle key={index} x={dot.x} y={dot.y} radius={3} fill="black" />
        ))}
        {lines.map((line, index) => (
          <Line
            key={index}
            points={line.flatMap((dot) => [dot.x, dot.y])}
            stroke="black"
            strokeWidth={5}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default MazeEditor;
