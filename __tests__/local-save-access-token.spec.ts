import faker from '@faker-js/faker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorageClient } from '~/infra/storage';
import { LocalSaveAccessToken } from '~/data/usecases/save-access-token/local-save-access-token';

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

  test('should throw if storageClient throws', async () => {
    const sut = makeSut();
    jest
      .spyOn(AsyncStorageClient.shared, 'save')
      .mockRejectedValueOnce(new Error());

    const promise = sut.save(faker.datatype.uuid());
    await expect(promise).rejects.toThrow(new Error());
  });
});
