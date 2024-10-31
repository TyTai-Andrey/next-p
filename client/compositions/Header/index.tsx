// react
import {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

// next
import Link from "next/link";

// local imports
// components
import {
  Button,
  Container,
  LinksContainer,
} from "@compositions/Header/style";
import AsyncSelect from "@components/AsyncSelect";
import RegisterModal from "@modals/RegisterModal";
import { SpaceBetween } from "@components/Space";

// api
import GamesApi from "@api/GamesApi";

// hooks
import useAuth from "@hooks/useAuth";
import useGame from "@hooks/useGame";
import useModal from "@hooks/useModal";
import usePushRouter from "@hooks/usePushRouter";

// interfaces
import { isErrorResponse, isNotErrorResponse } from "@interfaces/checks";

type HeaderProps = {
  withSearch?: boolean;
}

const Header: FC<HeaderProps> = ({ withSearch }) => {
  const [isGameAdded, setIsGameAdded] = useState<null | boolean>(null);

  const { pushRouter } = usePushRouter();
  const { logout, token } = useAuth();
  const { openModal } = useModal();
  const { game } = useGame();

  const onSelect = useCallback((id: string | number) => {
    if (id) pushRouter(`/game/${id}`);
  }, [pushRouter]);

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

      if (isNotErrorResponse(res)) {
        setIsGameAdded(true);
      }
    }
  }, [game]);

  const removeGameHandler = useCallback(async () => {
    if (game) {
      const res = await GamesApi.removeGameById(game.id);

      if (isNotErrorResponse(res)) {
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
      if (!isErrorResponse(response)) {
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

  const fetch = async (search: string) => GamesApi.getList({ search });

  return (
    <Container>
      <SpaceBetween>
        <LinksContainer>
          <Link href="/">Games</Link>
        </LinksContainer>
        {withSearch && (
          <AsyncSelect
            dataToRender={(data: Game) => data.name}
            dataToValue={(data: Game) => data.id}
            fetch={fetch}
            onChange={onSelect}
          />
        )}
        {button}
        <Button onClick={token ? logout : onLogin}>{token ? "Logout" : "Login"}</Button>
      </SpaceBetween>
    </Container>
  );
};

export default Header;
