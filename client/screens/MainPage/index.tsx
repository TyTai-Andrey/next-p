// next
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";

// react
import {
  FC,
  useCallback,
  useEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";

// local imports
// components
import GameCardsList from "@compositions/GameCardsList";
import H1 from "@components/Texts";
import Select from "@components/Select";
import SortButtons from "@compositions/SortButtons";
import { SpaceColumn } from "@components/Space";

// store
import { getGamesError, getGamesLoading } from "@store/slices/games/selectors";
import GamesActions from "@store/slices/games/actions";

// utils
import sortButtonsFields from "@screens/MainPage/utils";

// hooks
import usePushRouter from "@hooks/usePushRouter";

const GoUp = dynamic(() => import("@components/GoUp"), { ssr: false });

interface MainPageProps {
  data: IListResult<Game>;
  parentPlatforms: PlatformDetails[];
}

const MainPage: FC<MainPageProps> = ({ data, parentPlatforms }) => {
  const query = useSearchParams();
  const { pushRouterQuery } = usePushRouter();
  const dispatch = useDispatch();
  const loading = useSelector(getGamesLoading);
  const error = useSelector(getGamesError);

  const onChange = useCallback((value: string | number) => {
    pushRouterQuery("parent_platforms", value || undefined);
  }, [pushRouterQuery]);

  useEffect(() => {
    const scrollHandler = () => {
      const rect = document?.documentElement?.getBoundingClientRect();
      const windowRelativeBottom = rect?.bottom;

      const fetchAdditionalGames =
        windowRelativeBottom < (document.documentElement.clientHeight + 1000);
      if (!error && !loading && fetchAdditionalGames) dispatch(GamesActions.fetchGamesAsync());
    };

    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [loading, error]);

  return (
    <>
      <H1>Games</H1>
      <SpaceColumn>
        <SortButtons
          fields={sortButtonsFields}
        />
        <Select
          clearable
          onChange={onChange}
          value={Number(query?.get("parent_platforms"))}
        >
          {
            parentPlatforms.map(i => (
              <Select.Option
                key={i.id}
                label={i.name}
                value={i.id}
              />
            ),
            )
          }
        </Select>
        <GameCardsList initData={data.results} />
      </SpaceColumn>
      <GoUp />
    </>
  );
};

export default MainPage;
