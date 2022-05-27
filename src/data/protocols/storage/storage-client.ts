export interface StorageClient {
  save<V>(key: string, value: V): Promise<boolean>;
  load<V>(key: string): Promise<V | null>;
  remove(key: string): Promise<void>;
  burn(): Promise<void>;
}
