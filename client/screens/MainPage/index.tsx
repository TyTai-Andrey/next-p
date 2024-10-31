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
import useQueryObserver from "@hooks/useQueryObserver";

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
    Number(query?.get("parent_platforms")),
  );

  const onChange = useCallback((value: string | number) => {
    setParentPlatformsValue(Number(query?.get("parent_platforms")));
    pushRouterQuery("parent_platforms", value || undefined);
  }, [pushRouterQuery]);

  const onChangeQueryParentPlatforms = useCallback(
    () => Number(query?.get("parent_platforms")),
    [query],
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
          clearable
          onChange={onChange}
          value={parentPlatformsValue}
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
        <GameCardsList />
      </SpaceColumn>
      <GoUp />
    </>
  );
};

export default MainPage;
