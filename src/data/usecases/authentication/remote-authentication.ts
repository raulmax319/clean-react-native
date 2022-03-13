import { HttpPostClient, HttpStatusCode } from '~/data/protocols/http';
import { UnauthorizedError, UnexpectedError } from '~/domain/errors';
import { AccountModel } from '~/domain/models';
import { Authentication, AuthenticationParams } from '~/domain/usecases';

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient,
  ) {}

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    const response = await this.httpPostClient.post<
      AuthenticationParams,
      AccountModel
    >({
      url: this.url,
      body: params,
    });

    switch (response.status) {
      case HttpStatusCode.ok:
        return response.body;
      case HttpStatusCode.unauthorized:
        throw new UnauthorizedError();
      default:
        throw new UnexpectedError();
    }
  }
}
