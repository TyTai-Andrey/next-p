// next
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
import GamesActions from "@store/slices/games/actions";
import RouterActions from "@store/slices/router/actions";
import { getGamesResult } from "@store/slices/games/selectors";
import getRouter from "@store/slices/router/selectors";

interface HomeProps {
  data: IListResult<Game>;
  parentPlatformsData: IListResult<PlatformDetails>;
}

const Home: FC<HomeProps> = ({
  data,
  parentPlatformsData: { results: parentPlatforms },
}) => {
  const dispatch = useDispatch();
  const prevRouter = useSelector(getRouter);
  const router = useRouter();
  const result = useSelector(getGamesResult);

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
      <MainPage parentPlatforms={parentPlatforms} />
    </>
  );
};

// @ts-ignore
Home.withSearchHeader = true;

export default Home;

export const getServerSideProps = async (ctx: any) => {
  const { query } = ctx;
  const data = await GamesApi.getList(query);
  const parentPlatformsData = await ParentPlatformsApi.getList();

  return {
    props: {
      data,
      initialReduxState: { games: { data } },
      parentPlatformsData,
    },
  };
};
