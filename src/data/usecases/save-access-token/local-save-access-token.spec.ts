import faker from '@faker-js/faker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorageClient } from '~/infra/storage/async-storage-client';
import { LocalSaveAccessToken } from './local-save-access-token';

const makeSut = () => {
  const storageClient = AsyncStorageClient.shared;
  return new LocalSaveAccessToken(storageClient);
};

describe('LocalSaveAccessToken', () => {
  test('should call save method from storage with correct values', async () => {
    const sut = makeSut();

    const accessToken = faker.datatype.uuid();
    await sut.save(accessToken);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'access_token',
      accessToken,
    );
  });
});
