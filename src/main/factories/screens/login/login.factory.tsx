import React from 'react';

import Login from '~/presentation/screens/login';
import { makeRemoteAuthentication } from '~/main/factories/usecases/authentication/remote-authentication.factory';
import { makeLoginValidation } from '~/main/factories/validation/login';

export const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
    />
  );
};
