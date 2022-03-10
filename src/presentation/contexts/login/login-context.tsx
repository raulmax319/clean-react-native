import React from 'react';

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
  const [loginState] = React.useState({
    isLoading: false,
  });

  const [errorState] = React.useState<ErrorState>({
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
    return;
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
