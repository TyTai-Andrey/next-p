// next
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";

// react
import {
  FC,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";

// local imports
// components
import GameCardsList from "@compositions/GameCardsList";
import H1 from "@components/H1";
import Select from "@components/Select";
import SortButtons from "@compositions/SortButtons";
import { SpaceColumn } from "@components/Space";

// store
import { getGamesError, getGamesLoading } from "@store/slices/games/selectors";
import GamesActions from "@store/slices/games/actions";

// utils
import { getParentPlatformsValue, sortButtonsFields } from "@screens/MainPage/utils";
import usePushRouter from "@utils/usePushRouter";
import useQueryObserver from "@utils/useQueryObserver";

const GoUp = dynamic(() => import("@components/GoUp"), { ssr: false });

interface MainPageProps {
  parentPlatforms: PlatformDetails[];
}

const MainPage: FC<MainPageProps> = ({ parentPlatforms }) => {
  const query = useSearchParams();
  const { pushRouterQuery } = usePushRouter();
  const dispatch = useDispatch();
  const loading = useSelector(getGamesLoading);
  const error = useSelector(getGamesError);

  const [parentPlatformsValue, setParentPlatformsValue] = useState(
    getParentPlatformsValue(parentPlatforms, query),
  );

  const onChange = useCallback((item?: PlatformDetails, value?: string) => {
    setParentPlatformsValue(item?.name ?? "");
    pushRouterQuery("parent_platforms", value);
  }, [pushRouterQuery]);

  const onChangeQueryParentPlatforms = useCallback(
    () => setParentPlatformsValue(getParentPlatformsValue(parentPlatforms, query)),
    [parentPlatforms],
  );

  useQueryObserver(onChangeQueryParentPlatforms, "parent_platforms");

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
          items={parentPlatforms}
          onChange={onChange}
          placeholder="Platforms"
          value={parentPlatformsValue}
        />
        <GameCardsList />
      </SpaceColumn>
      <GoUp />
    </>
  );
};

export default MainPage;
