// vendor imports
import React from "react";

// local imports
// components
import {
  Control,
  Error,
  Label,
  Root,
  Suffix,
  Wrapper,
} from "./style";

interface ChildrenProps {
  handleFocus: (
    event: React.FocusEvent<HTMLInputElement & HTMLTextAreaElement>,
  ) => void;
  handleBlur: (
    event: React.FocusEvent<HTMLInputElement & HTMLTextAreaElement>,
  ) => void;
}

interface InputBaseProps {
  children?: (props: ChildrenProps) => React.ReactElement;
  className?: any;
  id?: string;
  value?: number | string;
  label?: string;
  placeholder?: string;
  error?: boolean | string | null;
  disabled?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  onFocus?: (
    event?: React.FocusEvent<HTMLInputElement & HTMLTextAreaElement>,
  ) => void;
  onBlur?: (
    event?: React.FocusEvent<HTMLInputElement & HTMLTextAreaElement>,
  ) => void;
  onClick?: () => void;
  title?: string;
}

const InputBase: React.ForwardRefExoticComponent<
  InputBaseProps & React.RefAttributes<HTMLDivElement>
> = React.forwardRef(
  (
    {
      children,
      className,
      disabled,
      error,
      id,
      label,
      onBlur,
      onClick,
      onFocus,
      placeholder,
      suffix,
      title = "",
      value,
    },
    ref,
  ) => {
    const [focused, setFocused] = React.useState(false);

    const handleFocus = (
      event: React.FocusEvent<HTMLInputElement & HTMLTextAreaElement>,
    ) => {
      setFocused(true);
      onFocus?.(event);
    };

    const handleBlur = (
      event: React.FocusEvent<HTMLInputElement & HTMLTextAreaElement>,
    ) => {
      setFocused(false);
      onBlur?.(event);
    };

    return (
      <Root
        className={className}
        onClick={onClick}
        ref={ref}
      >
        <Control
          $failed={!!error}
          $focused={focused}
          htmlFor={id}
        >
          <Wrapper
            $isLabel={!!label}
          >
            {label && (
              <Label
                $disabled={disabled}
                $failed={!!error}
                $focused={typeof value === "number" || !!value || !!placeholder || focused}
                title={title}
              >
                {label}
              </Label>
            )}

            {children?.({ handleBlur, handleFocus })}
          </Wrapper>

          {suffix && <Suffix>{suffix}</Suffix>}
        </Control>

        {error && <Error>{error}</Error>}
      </Root>
    );
  },
);

export default InputBase;
