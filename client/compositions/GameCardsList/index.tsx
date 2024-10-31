// react
import { useSelector } from "react-redux";

// local imports
// store
import { getGamesResult } from "@store/slices/games/selectors";

// components
import Container from "@compositions/GameCardsList/style";
import GameCard from "@compositions/GameCard";

const GameCardsList = () => {
  const data = useSelector(getGamesResult);

  return (
    <Container>
      {data?.map(game => (
        <GameCard game={game} key={game.id} withLink />
      ))}
    </Container>
  );
};

export default GameCardsList;
