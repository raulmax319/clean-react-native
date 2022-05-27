import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageClient } from '~/data/protocols/storage';

export class AsyncStorageClient implements StorageClient {
  static shared: StorageClient = new AsyncStorageClient();

  async save<V>(key: string, value: V): Promise<boolean> {
    try {
      if (!key || !value) throw new Error();

      await AsyncStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      return false;
    }
  }

  async load<V>(key: string): Promise<V> {
    try {
      const value = await AsyncStorage.getItem(key);

      if (!value) throw new Error();

      return JSON.parse(value);
    } catch (err) {
      return null;
    }
  }

  async remove(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  }

  async burn(): Promise<void> {
    await AsyncStorage.clear();
  }
}
