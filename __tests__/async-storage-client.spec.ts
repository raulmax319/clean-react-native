import { faker } from '@faker-js/faker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorageClient } from '~/infra/storage';

const makeSut = () => AsyncStorageClient.shared;

const test_key = 'any_key';
const test_object = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};

describe('AsyncStorage', () => {
  afterEach(() => jest.clearAllMocks());

  test('should save correctly on async storage', async () => {
    const sut = makeSut();

    await sut.save(test_key, test_object);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      test_key,
      JSON.stringify(test_object),
    );
  });

  test('should load correctly given a key', async () => {
    const sut = makeSut();

    const value = await sut.load(test_key);

    expect(value).toEqual(test_object);
  });

  test('should remove a key on async storage', async () => {
    const sut = makeSut();

    await sut.remove(test_key);

    expect(AsyncStorage.removeItem).toHaveBeenCalledWith(test_key);
  });

  test('should return falsy if key does not exists', async () => {
    const sut = makeSut();

    const value = await sut.load(test_key);

    expect(value).toBeFalsy();
  });

  test('should return falsy if key does not exists', async () => {
    const sut = makeSut();

    const value = await sut.load(faker.database.column());

    expect(value).toBeFalsy();
  });

  test('should fail when trying to save without a key or value', async () => {
    const sut = makeSut();

    const result = await sut.save(null, null);
    const result2 = await sut.save('null', null);

    expect(result).toBe(false);
    expect(result2).toBe(false);
  });

  test('should burn everything on async storage', async () => {
    const sut = makeSut();

    await sut.save(test_key, test_object);
    await sut.save(test_key, JSON.stringify(test_object));

    await sut.burn();

    expect(AsyncStorage.clear).toHaveBeenCalled();
  });
});
