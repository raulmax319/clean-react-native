import { useState } from 'react';
import { LocalSaveAccessToken } from '~/data/usecases/save-access-token';
import { Authentication, AuthenticationParams } from '~/domain/usecases';
import { AsyncStorageClient } from '~/infra/storage';

export type AuthenticationHook = (
  authentication: Authentication,
) => [boolean, (params: AuthenticationParams) => Promise<void>];

export const useAuthentication: AuthenticationHook = (authentication) => {
  const [loading, setLoading] = useState<boolean>(false);

  const makePostRequest = async (params: AuthenticationParams) => {
    try {
      setLoading(true);
      const response = await authentication.auth(params);
      const lsat = new LocalSaveAccessToken(AsyncStorageClient.shared);

      await lsat.save(response.accessToken);
    } catch (error) {
      throw error; // Error instance
    } finally {
      setLoading(false);
    }
  };

  return [loading, makePostRequest];
};
