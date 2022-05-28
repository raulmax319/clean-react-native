import { StorageClient } from '~/data/protocols/storage';
import { SaveAccessToken } from '~/domain/usecases';

export class LocalSaveAccessToken implements SaveAccessToken {
  constructor(private readonly storageClient: StorageClient) {}

  async save(accessToken: string): Promise<void> {
    await this.storageClient.save('access_token', accessToken);
  }
}
