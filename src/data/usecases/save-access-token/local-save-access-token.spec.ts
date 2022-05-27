import faker from '@faker-js/faker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorageClient } from '~/infra/storage/async-storage-client';
import { LocalSaveAccessToken } from './local-save-access-token';

describe('LocalSaveAccessToken', () => {
  test('should call save method from storage with correct values', async () => {
    const storageClient = AsyncStorageClient.shared;
    const sut = new LocalSaveAccessToken(storageClient);

    const accessToken = faker.datatype.uuid();
    await sut.save(accessToken);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'access_token',
      accessToken,
    );
  });
});
