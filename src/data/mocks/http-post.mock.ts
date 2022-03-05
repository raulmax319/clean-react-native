import faker from '@faker-js/faker';
import { makeRandomObject } from '~/infra/mocks';
import { HttpPostParams } from '../protocols/http';

export const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: makeRandomObject(),
});
