import React, {
  ReactNode,
  createContext,
  useMemo,
  useState,
} from "react";

type IGameContext = {
  game: Game | null;
  setGame: React.Dispatch<React.SetStateAction<Game | null>>;
};

const GameContext = createContext<IGameContext>({
  game: null,
  setGame: () => { },
});

const GameProvider = ({ children }: { children: ReactNode }) => {
  const [game, setGame] = useState<Game | null>(null);

  const value = useMemo(() => ({ game, setGame }), [game, setGame]);

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

export { GameContext };
export default GameProvider;
