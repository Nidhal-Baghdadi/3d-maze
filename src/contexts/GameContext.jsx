import React, { createContext, useState, useContext, useEffect } from "react";

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const resetGame = () => {
    setIsHover(true);
    setIsReset(true);
    setIsRunning(false);
  };

  const startGame = () => {
    setIsHover(false);
    setIsRunning(true);
    setIsReset(false);
  };

  const pauseGame = () => {
    setIsHover(true);
    setIsRunning(false);
    setIsReset(false);
  };

  return (
    <GameContext.Provider
      value={{
        isRunning,
        setIsRunning,
        isReset,
        setIsReset,
        resetGame,
        startGame,
        pauseGame,
        isHover,
        setIsHover,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
