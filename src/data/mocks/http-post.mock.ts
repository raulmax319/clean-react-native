import faker from '@faker-js/faker';
import { makeRandomObject } from '~/infra/mocks';
import { HttpPostParams } from '~/data/protocols/http';

export const mockPostRequest = (): HttpPostParams<unknown> => ({
  url: faker.internet.url(),
  body: makeRandomObject(),
});
