// next
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";

// react
import {
  FC,
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
import usePushRouter from "@utils/usePushRouter";

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

  const [isVisibleUp, setIsVisibleUp] = useState(false);
  const [parentPlatformsValue, setParentPlatformsValue] = useState(
    parentPlatforms?.find(i => String(i.id) === query?.get("parent_platforms"))
      ?.name ?? "",
  );

  useEffect(() => {
    const onScroll = () => {
      const windowRelativeTop = Math.abs(
        document?.documentElement?.getBoundingClientRect()?.top || 0,
      );
      const windowRelativeBottom =
        document.documentElement.getBoundingClientRect().bottom;

      setIsVisibleUp(windowRelativeTop >= 1500);
      const go =
        windowRelativeBottom < document.documentElement.clientHeight + 1000;
      if (!error && !loading && go) dispatch(GamesActions.fetchGamesAsync());
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [loading, error]);

  return (
    <>
      <H1>Games</H1>
      <SpaceColumn>
        <SortButtons
          fields={[
            { field: "released", title: "Released" },
            { field: "rating", title: "Rating" },
          ]}
        />
        <Select
          items={parentPlatforms}
          onChange={(item, value) => {
            setParentPlatformsValue(item?.name ?? "");
            pushRouterQuery("parent_platforms", value);
          }}
          placeholder="Platforms"
          value={parentPlatformsValue}
        />
        <GameCardsList />
      </SpaceColumn>
      <GoUp isVisibleUp={isVisibleUp} />
    </>
  );
};

export default MainPage;
