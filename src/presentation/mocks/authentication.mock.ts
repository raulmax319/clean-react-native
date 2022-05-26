import faker from '@faker-js/faker';
import { mockAccountModel } from '~/domain/mocks';
import { AccountModel } from '~/domain/models';
import { Authentication, AuthenticationParams } from '~/domain/usecases';

export class AuthenticationSpy implements Authentication {
  params: AuthenticationParams;
  accountModel = mockAccountModel();

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params;
    return Promise.resolve(this.accountModel);
  }
}

export class AuthenticationSpyRejection implements Authentication {
  error: string;

  async auth(_: AuthenticationParams): Promise<AccountModel> {
    this.error = faker.random.words();

    return Promise.reject(new Error(this.error));
  }
}
