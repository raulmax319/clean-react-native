import { useState } from 'react';
import { HttpPostClient } from '~/data/protocols/http';
import { RemoteAuthentication } from '~/data/usecases/authentication/remote-authentication';
import { AccountModel } from '~/domain/models';
import { AuthenticationParams } from '~/domain/usecases';

type RequestFn = (params: AuthenticationParams) => Promise<AccountModel>;

type Request = (client: HttpPostClient) => [boolean, RequestFn];

export const useAuthentication: Request = (client) => {
  const [loading, setLoading] = useState<boolean>(false);
  const authentication = new RemoteAuthentication(
    'https://run.mocky.io/v3/993f16e1-53d9-4449-8987-88eef648f67a',
    client,
  );

  const makePostRequest = async (params: AuthenticationParams) => {
    try {
      setLoading(true);
      const response = await authentication.auth(params);

      return response;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  };

  return [loading, makePostRequest];
};
