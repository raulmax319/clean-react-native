import { HttpPostClient } from '~/data/protocols/http/http-post-client';
import { HttpStatusCode } from '~/data/protocols/http/http-response';
import { UnauthorizedError } from '~/domain/errors/unauthorized-error';
import { UnexpectedError } from '~/domain/errors/unexpected-error';
import { AccountModel } from '~/domain/models/account-model';
import { AuthenticationParams } from '~/domain/usecases/authentication';

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      AuthenticationParams,
      AccountModel
    >,
  ) {}

  async auth(params: AuthenticationParams): Promise<void> {
    const response = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });

    switch (response.status) {
      case HttpStatusCode.ok:
        break;
      case HttpStatusCode.unauthorized:
        throw new UnauthorizedError();
      default:
        throw new UnexpectedError();
    }
  }
}
