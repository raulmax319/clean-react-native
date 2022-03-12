import React from 'react';
import { Authentication } from '~/domain/usecases';
import { Validation } from '~/presentation/protocols/validation';

export type ErrorState = {
  email: boolean;
  password: boolean;
  errorMessage: string;
};

export type InputState = {
  email: string;
  password: string;
};

export type LoginState = {
  isLoading: boolean;
  inputState: InputState;
  errorState: ErrorState;
  handleInput: (value: Record<string, string>) => void;
  handleSubmit: () => Promise<void>;
};

type Props = {
  validation: Validation;
  authentication: Authentication;
};

export const LoginContext = React.createContext<LoginState>({} as LoginState);

export const useLoginContext = () => React.useContext(LoginContext);

export const LoginContextProvider: React.FC<Props> = ({
  children,
  validation,
  authentication,
}) => {
  const [loginState, setLoginState] = React.useState({
    isLoading: false,
  });

  const [errorState, setErrorState] = React.useState<ErrorState>({
    errorMessage: '',
    email: false,
    password: false,
  });

  const [inputState, setInputState] = React.useState<InputState>({
    email: '',
    password: '',
  });

  const handleInput = (value: Record<string, string>) =>
    setInputState((prev) => ({ ...prev, ...value }));

  const handleSubmit = async () => {
    try {
      setLoginState((prev) => ({ ...prev, isLoading: true }));
      const emailError = validation.validate('email', inputState.email);
      const passwordError = validation.validate(
        'password',
        inputState.password,
      );

      if (emailError || passwordError) {
        setErrorState((prev) => ({
          ...prev,
          email: !!emailError,
          password: !!passwordError,
        }));
        throw new Error(emailError || passwordError);
      }

      const _response = await authentication.auth(inputState);
    } catch (err) {
      setLoginState((prev) => ({ ...prev, isLoading: false }));
      setErrorState((prev) => ({
        ...prev,
        errorMessage: err.message,
      }));
    }
  };

  return (
    <LoginContext.Provider
      value={{
        ...loginState,
        inputState,
        errorState,
        handleInput,
        handleSubmit,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
