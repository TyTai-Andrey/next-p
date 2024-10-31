// react
import React from "react";

// local imports
// components
import Root from "@components/Select/Option/style";

interface SelectOptionProps {
  selected?: boolean;
  disabled?: boolean;
  value: string | number;
  label: string;
  onClick?: (value: string | number, label: string) => void;
  key?: string | number;
  style?: React.CSSProperties;
}

const Option: React.FC<SelectOptionProps> = ({
  disabled,
  key,
  label,
  onClick,
  selected,
  style,
  value,
}) => {
  const handleClick = React.useCallback(() => {
    if (!disabled) {
      onClick?.(value, label);
    }
  }, [disabled]);

  return (
    <Root
      $disabled={disabled}
      $selected={selected}
      key={key}
      onClick={handleClick}
      style={style}
      title={label}
    >
      {label}
    </Root>
  );
};

export type { SelectOptionProps };
export default Option;
