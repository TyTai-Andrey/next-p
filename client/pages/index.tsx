// next
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from "next";
import Head from "next/head";
import { useRouter } from "next/router";

// react
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// local imports
import GamesApi from "@api/GamesApi";
import ParentPlatformsApi from "@api/ParentPlatformsApi";

// components
import MainPage from "@screens/MainPage";

// store
import { getGamesData, getGamesResult } from "@store/slices/games/selectors";
import GamesActions from "@store/slices/games/actions";
import RouterActions from "@store/slices/router/actions";
import getRouter from "@store/slices/router/selectors";

// interfaces
import { isNotErrorResponse } from "@interfaces/checks";

// pages
import type { ExtendedAppProps } from "@hocs/appWithRedux";

// store
import { RootState } from "@store/slices";

interface HomeProps {
  data: IListResult<Game>;
  parentPlatformsData: IListResult<PlatformDetails>;
}

const Home: FC<InferGetServerSidePropsType<typeof getServerSideProps>> & ExtendedAppProps = ({
  data,
  parentPlatformsData: { results: parentPlatforms },
}) => {
  const dispatch = useDispatch();
  const prevRouter = useSelector(getRouter);
  const router = useRouter();
  const result = useSelector(getGamesResult);
  const gameData = useSelector(getGamesData);

  useEffect(() => {
    if ((!!prevRouter && router.asPath !== prevRouter) || !result?.length) {
      dispatch(GamesActions.setGames(data));
    }
    dispatch(RouterActions.changeRouter(router.asPath));
  }, [router.asPath, result]);

  return (
    <>
      <Head>
        <title>Games</title>
        <meta content="Games" name="description" />
      </Head>
      <MainPage data={gameData ?? data} parentPlatforms={parentPlatforms} />
    </>
  );
};

Home.withSearchHeader = true;

export default Home;

export const getServerSideProps = async (ctx: GetServerSidePropsContext): Promise<
  GetServerSidePropsResult<HomeProps & { initialReduxState: PartialAll<RootState> }>
> => {
  const { query } = ctx;

  const data = await GamesApi.getList(query);
  const parentPlatformsData = await ParentPlatformsApi.getList();

  if (isNotErrorResponse(data) && isNotErrorResponse(parentPlatformsData)) {
    return {
      props: {
        data,
        initialReduxState: { games: { data } },
        parentPlatformsData,
      },
    };
  }
  return { notFound: true };
};
