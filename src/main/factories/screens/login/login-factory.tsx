import React from 'react';
import { RemoteAuthentication } from '~/data/usecases';
import { AxiosHttpClient } from '~/infra/http/axios-http-client/axios-http-client';
import Login from '~/presentation/screens/login';
import { ValidationComposite } from '~/validation/validators';
import { ValidationBuilder } from '~/validation/validators/builder/validation-builder';

export const makeLogin: React.FC = () => {
  const url = 'http://fordevs.herokuapp.com/api/login';
  const axiosHttpClient = new AxiosHttpClient();
  const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient);
  const validationComposite = new ValidationComposite([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(5).build(),
  ]);

  return (
    <Login
      authentication={remoteAuthentication}
      validation={validationComposite}
    />
  );
};
