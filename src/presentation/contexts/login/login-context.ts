import { createContext, useContext } from 'react';

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
  errorState: ErrorState;
};

export const LoginContext = createContext<LoginState>({
  isLoading: false,
} as LoginState);

export const useLoginContext = () => useContext(LoginContext);
