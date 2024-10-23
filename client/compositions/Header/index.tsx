// react
import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

// next
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// local imports
// components
import {
  Button,
  Container,
  LinksContainer,
} from "@compositions/Header/style";
import RegisterModal from "@modals/RegisterModal";
import Search from "@components/Search";
import { SpaceBetween } from "@components/Space";

// api
import GamesApi from "@api/GamesApi";

// hooks
import useAuth from "@hooks/useAuth";
import useGame from "@hooks/useGame";
import useModal from "@hooks/useModal";
import usePushRouter from "@hooks/usePushRouter";

// interfaces
import { IsErrorResponse, IsNotErrorResponse } from "@interfaces/checks";

type HeaderProps = {
  withSearch?: boolean;
}

const Header: FC<HeaderProps> = ({ withSearch }) => {
  const [dropdownItems, setDropdownItems] = useState<Game[]>([]);
  const [isGameAdded, setIsGameAdded] = useState<null | boolean>(null);

  const { pushRouter } = usePushRouter();
  const query = useSearchParams();
  const { logout, token } = useAuth();
  const { openModal } = useModal();
  const { game } = useGame();

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const search = e?.target?.value;

    const response = await GamesApi.getList({ search });

    if (IsNotErrorResponse(response)) {
      setDropdownItems(response.results);
    }
  };

  const onSelect = useCallback(({ id }: { id: string }) => {
    setDropdownItems([]);
    if (id) pushRouter(`/game/${id}`);
  }, [pushRouter]);

  const onClear = useCallback(() => setDropdownItems([]), []);

  const onLogin = useCallback(() => {
    openModal(RegisterModal);
  }, [openModal]);

  const addGameHandler = useCallback(async () => {
    if (game) {
      const data = {
        name: game.name,
        rating: String(game.rating),
        released: game.released,
      };

      const res = await GamesApi.addGameById(game.id, data);

      if (IsNotErrorResponse(res)) {
        setIsGameAdded(true);
      }
    }
  }, [game]);

  const removeGameHandler = useCallback(async () => {
    if (game) {
      const res = await GamesApi.removeGameById(game.id);

      if (IsNotErrorResponse(res)) {
        setIsGameAdded(false);
      }
    }
  }, [game]);

  const button = useMemo(() => {
    if (isGameAdded === null || !token || !game) return null;
    if (isGameAdded) return <Button onClick={removeGameHandler}>Remove Game</Button>;
    return <Button onClick={addGameHandler}>Add Game</Button>;
  }, [addGameHandler, game, isGameAdded, removeGameHandler, token]);

  const intervalHandler = useCallback(async () => {
    if (game && token) {
      const response = await GamesApi.isGameAdded(game.id);
      if (!IsErrorResponse(response)) {
        setIsGameAdded(response.result);
      } else {
        setIsGameAdded(null);
      }
    }
  }, [game, token]);

  useEffect(() => {
    // TODO: add ws
    intervalHandler();
    const interval = setInterval(intervalHandler, 2500);

    return () => {
      clearInterval(interval);
    };
  }, [intervalHandler]);

  return (
    <Container>
      <SpaceBetween>
        <LinksContainer>
          <Link href="/">Games</Link>
        </LinksContainer>
        {withSearch && (
          <Search
            dropdownItems={dropdownItems}
            initValue={query?.get("search") ?? ""}
            onChange={onChange}
            onClear={onClear}
            onSelect={onSelect}
          />
        )}
        {button}
        <Button onClick={token ? logout : onLogin}>{token ? "Logout" : "Login"}</Button>
      </SpaceBetween>
    </Container>
  );
};

export default Header;
