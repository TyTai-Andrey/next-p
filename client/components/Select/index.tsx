// react
import React, { useCallback, useEffect } from "react";

// hooks
import useDropdown from "@hooks/useDropdown";

// components
import {
  Chevron,
  DropdownWrapper,
  SelectInput,
  StyledInputBase,
  TextInput,
} from "@components/Select/style";
import Option from "@components/Select/Option";
import Scrollbar from "@components/Scrollbar/Scrollbar";

// types
import type { PositionType } from "@hooks/useDropdown";
import type { SelectOptionProps } from "@components/Select/Option";

interface SelectProps {
  className?: string;
  children?: React.ReactNode;
  id?: string;
  name?: string;
  value?: number | string | null;
  label?: string;
  error?: boolean | string | null;
  autoFocus?: boolean;
  disabled?: boolean;
  onChange?: (value: string | number) => void;
  onInput?: (value: string) => void;
  onScroll?: (event: React.UIEvent) => void;
  onOpen?: () => void;
  onClose?: () => void;
  clearable?: boolean;
  defaultDisplayValue?: string | number | null;
  placementStyle?: "absolute" | "fixed";
  positionDropdown?: PositionType;
  offsetYDropdown?: number;
  variantError?: "default" | "minimal";
}

interface SelectType extends React.FC<SelectProps> {
  Option: typeof Option;
}

const Select: SelectType = ({
  children,
  className,
  clearable = true,
  defaultDisplayValue,
  disabled = false,
  error,
  id,
  label,
  name,
  offsetYDropdown = 0,
  onChange,
  onClose,
  onInput,
  onOpen,
  onScroll,
  placementStyle,
  positionDropdown = "bottom left",
  value,
  ...props
}) => {
  const $input = React.useRef(null);
  const $wrapper = React.useRef<HTMLDivElement>(null);

  const [trueValue, setTrueValue] =
    React.useState<string | number | undefined | null>(value || "");

  const [displayValue, setDisplayValue] = React.useState<string | number>(
    defaultDisplayValue || "",
  );
  const [hasSelectedItem, setHasSelectedItem] = React.useState<any>("");

  const width = React.useMemo(() => {
    if ($wrapper.current) {
      const rect = $wrapper.current.getBoundingClientRect();

      return rect.width;
    }

    return 0;
  }, [$wrapper.current?.offsetWidth]);

  const {
    close,
    Dropdown,
    isOpen,
    open,
  } = useDropdown({
    offsetY: offsetYDropdown + 2,
    onClose,
    onOpen,
    placementStyle,
    position: positionDropdown,
    ref: $wrapper,
  });

  const chevron = React.useMemo(() => {
    const handleClick = () => {
      if (trueValue) {
        if (isOpen) open();
        setHasSelectedItem("");
        setTrueValue(null);
        handleInput("");
        onChange?.(null!);
      }
    };

    const chevronClassNameWithoutValue = isOpen ? "fa-chevron-down" : "fa-chevron-up";
    const chevronClassName = trueValue ? "fa-xmark" : chevronClassNameWithoutValue;

    return (
      <Chevron onClick={handleClick}>
        <i className={`fa-solid ${chevronClassName}`} />
      </Chevron>
    );
  }, [isOpen, trueValue]);

  const handleSelect = useCallback((value: string | number, label: string) => {
    setTrueValue(value);
    setDisplayValue(label);
    onChange?.(value);
    setHasSelectedItem(value);
    close();
  }, [close, onChange]);

  const handleInput = useCallback((value: string) => {
    setHasSelectedItem(value);
    setDisplayValue(value);
    onInput?.(value);
  }, [onInput]);

  useEffect(() => {
    if (defaultDisplayValue) {
      setDisplayValue(defaultDisplayValue);
    }
  }, [defaultDisplayValue]);

  useEffect(() => {
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && (child?.props as any)?.value === value) {
        setDisplayValue((child?.props as any)?.label);
        setTrueValue((child?.props as any)?.value);
      }
    });
  }, [children]);

  useEffect(() => {
    if (!value) {
      setDisplayValue("");
      setTrueValue(null);
    }
  }, [value]);

  return (
    <StyledInputBase
      className={className}
      disabled={disabled}
      error={error}
      id={id}
      label={label}
      onClick={
        !disabled ?
          () => {
            if (!isOpen) open();
          } :
          undefined
      }
      ref={$wrapper}
      suffix={!disabled && clearable && chevron}
      value={displayValue}
    >
      {({ handleBlur, handleFocus }) => (
        <>
          <SelectInput
            id={id}
            name={name}
            value={trueValue || ""}
            {...props}
          />

          <TextInput
            disabled={disabled}
            onBlur={(e: any) => {
              if (!hasSelectedItem) {
                handleBlur(e);
              }
            }}
            onChange={event => handleInput(event.currentTarget.value)}
            onFocus={handleFocus}
            readOnly={!onInput || !!trueValue}
            ref={$input}
            title={String(displayValue)}
            value={displayValue || ""}
          />

          <Dropdown style={{ width }}>
            <DropdownWrapper>
              <Scrollbar onScroll={onScroll}>
                {React.Children.map(
                  children,
                  (child, index) => {
                    if (!React.isValidElement(child)) {
                      return null;
                    }

                    const onClick = (
                      value: string | number,
                      label: string,
                    ) => {
                      child?.props?.onClick?.();
                      handleSelect?.(value, label);
                    };

                    return React.cloneElement<SelectOptionProps>(
                      // @ts-ignore
                      child,
                      {
                        // eslint-disable-next-line react/no-array-index-key
                        key: `${child?.props?.value || child?.props?.label}_${index}`,
                        onClick,
                        selected: trueValue === child.props.value,
                      },
                    );
                  },
                )}
              </Scrollbar>
            </DropdownWrapper>
          </Dropdown>
        </>
      )}
    </StyledInputBase>
  );
};

Select.Option = Option;

export type { SelectProps };
export default Select;
