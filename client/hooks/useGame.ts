// react
import { useContext } from "react";

// local imports
// components
import { GameContext } from "@providers/GameProvider";

const useGame = () => {
  const value = useContext(GameContext);

  return value;
};

export default useGame;
