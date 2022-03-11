import React from 'react';
import { LoginValidation } from '~/presentation/screens/login/login-validation';

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
  handleSubmit: () => void;
};

export const LoginContext = React.createContext<LoginState>({} as LoginState);

export const useLoginContext = () => React.useContext(LoginContext);

export const LoginContextProvider: React.FC = ({ children }) => {
  const validation = new LoginValidation();

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

  const handleSubmit = () => {
    setLoginState((prev) => ({ ...prev, isLoading: true }));
    const errorMessage = validation.validate('email', inputState.email);

    setErrorState((prev) => ({
      ...prev,
      errorMessage,
      email: !!errorMessage,
    }));
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
