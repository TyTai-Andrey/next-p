// next
import { useRouter } from "next/router";

// react
import {
  FC,
  useCallback,
  useMemo,
} from "react";

// local imports
// components
import {
  Container,
  Image,
  Info,
  Link,
  StyledH1,
  StyledSpaceBetween,
} from "@compositions/GameCard/style";
import { SpaceBetween } from "@components/Space";

// images
import noImg from "@assets/noImg.jpg";

type GameCardProps = {
  game: Game;
  website?: string;
  priority?: boolean;
  minHeightImage?: number;
  withLink?: boolean;
}

const GameCard: FC<GameCardProps> = ({
  game,
  minHeightImage,
  priority,
  website,
  withLink,
}) => {
  const { push } = useRouter();
  const parentPlatforms = useMemo(() => game?.parent_platforms
    ?.map(({ platform }) => `${platform.name}`)
    ?.join(" "), [game?.parent_platforms]);

  const onLink = useCallback(() => {
    if (withLink) {
      push(`/game/${game.id}`);
    }
  }, [game.id, push, withLink]);

  return (
    <Container $withLink={withLink} onClick={onLink}>
      <Image
        $minHeightImage={minHeightImage}
        $noImg={!game?.background_image ? "true" : undefined}
        alt={game?.name}
        height={300}
        loading="eager"
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
