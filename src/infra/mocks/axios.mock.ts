import { faker } from '@faker-js/faker';
import axios from 'axios';

export const makeRandomObject = (): Record<string, unknown> => {
  const obj: Record<string, unknown> = {};
  const keys = faker.datatype.number({ min: 1, max: 5 });
  for (let i = 0; i < keys; i++) {
    obj[faker.random.word()] = faker.random.word();
  }
  return obj;
};

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.post.mockResolvedValue({
    data: makeRandomObject(),
    status: faker.datatype.number(),
  });

  return mockedAxios;
};
