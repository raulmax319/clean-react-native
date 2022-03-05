import Chance from 'chance';
import { AccountModel } from '../models';
import { AuthenticationParams } from '../usecases';

const faker = new Chance();

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.email(),
  password: faker.string(),
});

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.guid(),
});
