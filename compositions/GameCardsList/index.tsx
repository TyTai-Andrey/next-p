// next
import Link from "next/link";

// react
import { useSelector } from "react-redux";

// local imports
import { getGamesResult } from "@store/slices/games/selectors";
// components
import Container from "@compositions/GameCardsList/style";
import GameCard from "@components/GameCard";

const GameCardsList = () => {
  const data = useSelector(getGamesResult);
  return (
    <Container>
      {data?.map(game => (
        <Link href={`/game/${game.id}`} key={game.id}>
          <GameCard game={game} />
        </Link>
      ))}
    </Container>
  );
};

export default GameCardsList;
