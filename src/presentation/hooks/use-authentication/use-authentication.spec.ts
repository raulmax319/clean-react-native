import '../../mocks/use-authentication.mock';
import { act, renderHook } from '@testing-library/react-hooks';
import { AuthenticationSpy } from '~/presentation/mocks';
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
          // void AsyncStorage.setItem('accessToken', accessToken);
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
});
