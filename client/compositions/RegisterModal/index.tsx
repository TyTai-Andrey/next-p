// react
import React, { useCallback, useState } from "react";

// local imports
// components
import {
  Button,
  Buttons,
  Error,
  Link,
  StyledH1,
  StyledInput,
  Text,
} from "@compositions/RegisterModal/style";
import Modal from "@components/Modal";

// types
import { IsErrorResponse } from "@interfaces/checks";
import type { ModalComponentProps } from "@compositions/ModalProvider";

// hooks
import useAuth from "@hooks/useAuth";

// api
import AuthApi from "@api/AuthApi";

const RegisterModal = ({
  handleClose,
  isOpen,
}: ModalComponentProps) => {
  const { setToken } = useAuth();
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setValue(e.target.value);
  }, []);

  const handleCancel = () => {
    handleClose();
  };
  const onSubmit = async () => {
    if (value.trim()) {
      const response = await AuthApi.login(value);
      if (!IsErrorResponse(response)) {
        if (response?.token) {
          setToken(response?.token);
          handleClose();
        }
      } else {
        setError((response.error as any)?.response?.data?.message);
      }
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancel}
      style={{
        minHeight: 150,
        padding: 20,
        width: 600,
      }}
    >
      <div>
        <StyledH1>Register</StyledH1>
        <div>
          <Text>Чтобы добавлять игры, вам нужно зарегистрироваться.</Text>
          <Text>Тут можно получить ваш логин:</Text>
          <Text>
            <Link href="https://t.me/portfolioAndreyBot" target="_blank">https://t.me/portfolioAndreyBot</Link>
          </Text>
          <StyledInput
            onChange={onChangeHandler}
            placeholder="Введите логин, который получите в боте"
            value={value}
          />
          {error && <Error>{error}</Error>}
          <Buttons>
            <Button onClick={onSubmit} type="submit">
              Submit
            </Button>
          </Buttons>
        </div>
      </div>
    </Modal>
  );
};

export default RegisterModal;
