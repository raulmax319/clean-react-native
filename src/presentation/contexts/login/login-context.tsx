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
};

export const LoginContext = React.createContext<LoginState>({} as LoginState);

export const LoginContextProvider: React.FC = ({ children }) => {
  const [loginState] = React.useState({
    isLoading: false,
  });

  const [errorState] = React.useState<ErrorState>({
    errorMessage: '',
    email: false,
    password: false,
  });

  const inputState = React.useRef<InputState>({
    email: '',
    password: '',
  }).current;

  return (
    <LoginContext.Provider value={{ ...loginState, inputState, errorState }}>
      {children}
    </LoginContext.Provider>
  );
};
