import Chance from 'chance';
import { AuthenticationParams } from '../usecases/authentication';

const faker = new Chance();

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.email(),
  password: faker.string(),
});
