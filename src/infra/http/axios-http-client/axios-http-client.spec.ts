import axios from 'axios';
import { faker } from '@faker-js/faker';
import { HttpPostParams } from '~/data/protocols/http';
import { AxiosHttpClient } from './axios-http-client';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const makeRandomObject = (): Record<string, unknown> => {
  const obj: Record<string, unknown> = {};
  const keys = faker.datatype.number({ min: 1, max: 5 });
  for (let i = 0; i < keys; i++) {
    obj[faker.random.word()] = faker.random.word();
  }
  return obj;
};

const makeSut = (): AxiosHttpClient => new AxiosHttpClient();

const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: makeRandomObject(),
});

describe('AxiosHttpClient', () => {
  test('Should call axios post method with correct URL and body', async () => {
    const request = mockPostRequest();
    const sut = makeSut();
    await sut.post(request);

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });
});
