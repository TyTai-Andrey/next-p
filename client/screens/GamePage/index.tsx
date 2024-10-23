// react
import { FC } from "react";

// local imports
// components
import { Container, Description } from "@screens/GamePage/style";
import Gallery from "@compositions/Gallery";
import GameCard from "@compositions/GameCard";

interface GamePageProps {
  game: GameDetails;
  images: Screenshot[];
}

const GamePage: FC<GamePageProps> = ({ game, images }) => (
  <Container>
    <GameCard
      game={game}
      minHeightImage={300}
      priority
      website={game.website}
    />
    <Description>{game.description_raw}</Description>
    <Gallery gameName={game.name} images={images} />
  </Container>
);

export default GamePage;
