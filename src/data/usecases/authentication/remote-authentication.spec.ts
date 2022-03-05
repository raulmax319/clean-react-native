import Chance from 'chance';
import { HttpPostClientSpy } from '~/data/mocks/http-client.mock';
import { mockAuthentication } from '~/domain/mocks/authentication.mock';
import { RemoteAuthentication } from './remote-authentication';

const faker = new Chance();

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy;
};

const makeSut = (url: string = faker.url()): SutTypes => {
  const httpPostClient = new HttpPostClientSpy();
  const sut = new RemoteAuthentication(url, httpPostClient);
  return {
    sut,
    httpPostClientSpy: httpPostClient,
  };
};

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with the correct URL', async () => {
    const url = faker.url();
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.auth(mockAuthentication());

    expect(httpPostClientSpy.url).toBe(url);
  });

  test('Should call HttpPostClient with the correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const authenticationParams = mockAuthentication();
    await sut.auth(authenticationParams);

    expect(httpPostClientSpy.body).toEqual(authenticationParams);
  });
});
