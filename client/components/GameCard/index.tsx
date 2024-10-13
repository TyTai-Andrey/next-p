// react
import { FC, useMemo } from "react";

// local imports
// components
import {
  Container,
  Image,
  Info,
  Link,
  StyledH1,
  StyledSpaceBetween,
} from "@components/GameCard/style";
import { SpaceBetween } from "@components/Space";

// images
import noImg from "@assets/noImg.jpg";

type GameCardProps = {
  game: Game;
  website?: string;
  priority?: boolean;
  minHeightImage?: number;
}

const GameCard: FC<GameCardProps> = ({
  game,
  minHeightImage,
  priority,
  website,
}) => {
  const parentPlatforms = useMemo(() => game?.parent_platforms
    ?.map(({ platform }) => `${platform.name}`)
    ?.join(" "), [game?.parent_platforms]);

  return (
    <Container>
      <Image
        alt={game?.name}
        height={300}
        loading="eager"
        minHeightImage={minHeightImage}
        noimg={!game?.background_image ? "true" : undefined}
        priority={priority}
        sizes="100vw"
        src={game?.background_image ?? noImg}
        width={300}
      />
      <Info>
        {website ? (
          <Link href={website} target="_blank">
            {game?.name}
          </Link>
        ) : (
          <StyledH1 title={game?.name}>{game?.name}</StyledH1>
        )}
        <StyledSpaceBetween title={parentPlatforms}>
          {parentPlatforms}
        </StyledSpaceBetween>
        <SpaceBetween>
          {game?.rating ? <div>rating: {game?.rating}</div> : <div />}
          {game?.released ? <div>released: {game?.released}</div> : <div />}
        </SpaceBetween>
      </Info>
    </Container>
  );
};

export default GameCard;
