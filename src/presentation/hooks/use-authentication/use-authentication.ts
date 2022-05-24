import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Authentication, AuthenticationParams } from '~/domain/usecases';

export type AuthenticationHook = (
  authentication: Authentication,
) => [boolean, (params: AuthenticationParams) => Promise<void>];

export const useAuthentication: AuthenticationHook = (authentication) => {
  const [loading, setLoading] = useState<boolean>(false);

  const makePostRequest = async (params: AuthenticationParams) => {
    try {
      setLoading(true);
      const response = await authentication.auth(params);
      void AsyncStorage.setItem('accessToken', response.accessToken);
    } catch (error) {
      throw error; // Error instance
    } finally {
      setLoading(false);
    }
  };

  return [loading, makePostRequest];
};
