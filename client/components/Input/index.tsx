// react
import React, { FC } from "react";

// local imports
// components
import InputBase from "@components/Input/InputBase";
import Root from "@components/Input/style";

type InputHTMLType = "number" | "text" | "password" | "phone" | "email" | "tel"

interface InputProps {
  id?: string;
  name?: string;
  value?: number | string;
  label?: string;
  placeholder?: string;
  type?: InputHTMLType;
  error?: boolean | string | null;
  autoFocus?: boolean;
  disabled?: boolean;
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
  maxLength?: number;
  pattern?: string;
  onFocus?: (event?: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event?: React.ChangeEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.FormEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = React.forwardRef(
  (
    {
      autoFocus,
      disabled,
      error,
      id,
      label,
      maxLength,
      name,
      onBlur,
      onChange,
      onFocus,
      onKeyDown,
      pattern,
      placeholder,
      prefix,
      suffix,
      type = "text",
      value,
      ...props
    },
    ref,
  ) => (
    <InputBase
      disabled={disabled}
      error={error}
      id={id}
      label={label}
      onBlur={onBlur}
      onFocus={onFocus}
      placeholder={placeholder}
      prefix={prefix}
      suffix={suffix}
      value={value || ""}
    >
      {({ handleBlur, handleFocus }) => (
        <Root
          {...props}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={autoFocus}
          disabled={disabled}
          id={id}
          maxLength={maxLength}
          name={name}
          onBlur={handleBlur}
          onChange={onChange}
          onFocus={handleFocus}
          onKeyDown={onKeyDown}
          pattern={pattern}
          placeholder={placeholder}
          ref={ref as React.ForwardedRef<HTMLInputElement>}
          type={type}
          value={value || ""}
        />
      )}
    </InputBase>
  ),
);

export default Input;
