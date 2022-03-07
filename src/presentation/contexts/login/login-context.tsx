import React from 'react';

export type LoginState = {
  isLoading: boolean;
  errorMessage: string;
};

export const LoginContext = React.createContext<LoginState>({} as LoginState);

export const LoginContextProvider: React.FC = ({ children }) => {
  const [loginState] = React.useState<LoginState>({
    isLoading: false,
    errorMessage: '',
  });

  return (
    <LoginContext.Provider value={loginState}>{children}</LoginContext.Provider>
  );
};
