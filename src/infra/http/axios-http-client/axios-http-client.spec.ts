import axios from 'axios';
import Chance from 'chance';

import { AxiosHttpClient } from './axios-http-client';

const faker = new Chance();

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AxiosHttpClient', () => {
  test('Should call axios with correct URL', async () => {
    const url = faker.url();
    const sut = new AxiosHttpClient();
    await sut.post({ url });

    expect(mockedAxios).toHaveBeenCalledWith(url);
  });
});
