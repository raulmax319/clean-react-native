// Types

export interface LoginState {
  email: string;
  password: string;
}

export interface LoginAction extends LoginState {
  type: LoginActionTypes;
}

export const initialLoginState: LoginState = {
  email: '',
  password: '',
};

export enum LoginActionTypes {
  SET_EMAIL = 'login/set-email',
  SET_PASSWORD = 'login/set-password',
}

// Action creators

export function setEmail(email: string): LoginAction {
  return {
    ...initialLoginState,
    type: LoginActionTypes.SET_EMAIL,
    email: email,
  };
}

export function setPassword(password: string): LoginAction {
  return {
    ...initialLoginState,
    type: LoginActionTypes.SET_PASSWORD,
    password: password,
  };
}

// Reducer

export const login = (
  state: LoginState = initialLoginState,
  action: LoginAction,
) => {
  switch (action.type) {
    case LoginActionTypes.SET_EMAIL:
      return { ...state, email: action.email };
    case LoginActionTypes.SET_PASSWORD:
      return { ...state, password: action.password };
    default:
      return state;
  }
};
