import { faker } from '@faker-js/faker';
import { HttpPostParams } from '~/data/protocols/http';
import { makeRandomObject } from './axios.mock';

export const mockPostRequest = (): HttpPostParams<unknown> => ({
  url: faker.internet.url(),
  body: makeRandomObject(),
});
