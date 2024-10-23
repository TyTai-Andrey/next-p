import { FC } from "react";

type DropdownItemProps = {
  name: string;
  onSelectHandler: () => void;
}

const DropdownItem: FC<DropdownItemProps> = ({
  name,
  onSelectHandler,
}) => (
  <li onClick={onSelectHandler}>
    {name}
  </li>
);

export default DropdownItem;
