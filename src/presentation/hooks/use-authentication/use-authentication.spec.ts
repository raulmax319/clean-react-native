import '../../mocks/use-authentication.mock';
import { act, renderHook } from '@testing-library/react-hooks';
import {
  AuthenticationSpy,
  AuthenticationSpyRejection,
} from '~/presentation/mocks';
import { AuthenticationHook, useAuthentication } from './use-authentication';
import { Authentication } from '~/domain/usecases';

describe('Authentication Hook', () => {
  test('Should execute makeRequest', async () => {
    const auth = new AuthenticationSpy();

    jest
      .spyOn({ useAuthentication }, 'useAuthentication')
      .mockImplementationOnce(() => [
        false,
        jest.fn(() => {
          return Promise.resolve();
        }),
      ]);

    const { result } = renderHook<
      Authentication,
      ReturnType<AuthenticationHook>
    >(() => useAuthentication(auth));

    const [state, makeRequest] = result.current;

    await act(async () => {
      await makeRequest({
        email: 'mock@test.com',
        password: '123456',
      });
    });

    expect(state).toBe(false);
  });

  test('Should execute makeRequest with error', async () => {
    const auth = new AuthenticationSpyRejection();

    jest
      .spyOn({ useAuthentication }, 'useAuthentication')
      .mockImplementationOnce(() => [false, jest.fn()]);

    const { result } = renderHook<
      Authentication,
      ReturnType<AuthenticationHook>
    >(() => useAuthentication(auth));

    const [, makeRequest] = result.current;

    const params = {
      email: 'mock@test.com',
      password: '123456',
    };

    await act(async () => {
      try {
        await makeRequest(params);
      } catch (err) {
        expect(err.message).toBe(auth.error);
      }
    });
  });
});
