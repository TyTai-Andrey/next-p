// next
import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import Head from "next/head";

// react
import { FC, useEffect } from "react";

// local imports
// api
import BaseApi from "@api/BaseApi";
import GamesApi from "@api/GamesApi";

// components
import GamePage from "@screens/GamePage";

// types
import { isNotErrorResponse } from "@interfaces/checks";

// hooks
import useGame from "@hooks/useGame";

// pages
import type { ExtendedAppProps } from "@hocs/appWithRedux";

interface GameProps {
  game: GameDetails;
  screenshotsData: IListResult<Screenshot>;
}

const Game: FC<GameProps> & ExtendedAppProps = ({ game, screenshotsData }) => {
  const { results: images } = screenshotsData || { results: [] };
  const { setGame } = useGame();

  useEffect(() => {
    setGame(game);

    return () => {
      setGame(null);
    };
  }, [game]);

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

const getPathsIds: GetPathsIdsProps = async (first, url = `${process.env.NEXT_PUBLIC_API_GAME_BASE_URL}/games`) => {
  const data = await BaseApi.getList<IListResult<Game>>({
    baseURL: url,
    method: "GET",
    params: { page_size: 40 },
  });

  if (isNotErrorResponse(data)) {
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

export const getStaticProps = async (ctx: GetStaticPropsContext<{ gameId: string }>): Promise<GetStaticPropsResult<GameProps>> => {
  const gameId = ctx.params?.gameId;

  if (gameId) {
    const [game, screenshotsData] = await Promise.all([
      GamesApi.getGameById(gameId),
      GamesApi.getScreenshotsGameById(gameId),
    ]);

    if (isNotErrorResponse(game) && isNotErrorResponse(screenshotsData)) {
      return { props: { game, screenshotsData } };
    }
  }

  return { notFound: true };
};
