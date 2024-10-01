// next
import Head from "next/head";

// react
import { FC } from "react";

// local imports
// api
import BaseApi from "@api/BaseApi";
import GamesApi from "@api/GamesApi";

// components
import GamePage from "@screens/GamePage";
import IsNotErrorResponse from "@interfaces/checks";

interface GameProps {
  game: GameDetails;
  screenshotsData: IListResult<Screenshot>;
}

const Game: FC<GameProps> = ({ game, screenshotsData }) => {
  const { results: images } = screenshotsData || { results: [] };
  return (
    <>
      <Head>
        <title>{`${game?.name} | Game`}</title>
        <meta content={game?.name} name="description" />
      </Head>
      <GamePage game={game} images={images} />
    </>
  );
};

export default Game;

type GetPathsIdsProps = (first?: boolean, url?: string) => Promise<{ params: { gameId: string } }[]>;

const getPathsIds: GetPathsIdsProps = async (first, url = "https://api.rawg.io/api/games") => {
  const data = await BaseApi.getList<IListResult<Game>>({
    baseURL: url,
    method: "GET",
    params: { page_size: 40 },
  });

  if (IsNotErrorResponse(data)) {
    const paths = data?.results?.map(i => ({ params: { gameId: String(i.id) } }));

    // !first - не хочу билдить себе 850 000+ страниц
    if (data.next && !first) {
      const add = await getPathsIds(true, data.next);
      return [...paths, ...add];
    }

    return paths;
  }

  return [];
};

export const getStaticPaths = async () => {
  const paths = await getPathsIds();
  return { fallback: "blocking", paths };
};

export const getStaticProps = async (ctx: any) => {
  const { params: { gameId } } = ctx;

  const game = await GamesApi.getGameById(gameId);
  const screenshotsData = await GamesApi.getScreenshotsGameById(gameId);

  return { props: { game, screenshotsData } };
};
