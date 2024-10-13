// react
import {
  ChangeEvent,
  FC,
  useCallback,
  useState,
} from "react";

// next
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// local imports
// components
import { Container, LinksContainer } from "@components/Header/style";
import Search from "@components/Search";
import { SpaceBetween } from "@components/Space";

// api
import GamesApi from "@api/GamesApi";

// hooks
import usePushRouter from "@hooks/usePushRouter";

// interfaces
import IsNotErrorResponse from "@interfaces/checks";

type HeaderProps = {
  withSearch?: boolean;
}

const Header: FC<HeaderProps> = ({ withSearch }) => {
  const [dropdownItems, setDropdownItems] = useState<Game[]>([]);
  const { pushRouter } = usePushRouter();
  const query = useSearchParams();

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
      </SpaceBetween>
    </Container>
  );
};

export default Header;
