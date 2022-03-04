import { HttpPostClientSpy } from '../../mocks/http-client.mock';
import { RemoteAuthentication } from './remote-authentication';

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy;
};

const makeSut = (url: string = 'any_url'): SutTypes => {
  const httpPostClient = new HttpPostClientSpy();
  const sut = new RemoteAuthentication(url, httpPostClient);
  return {
    sut,
    httpPostClientSpy: httpPostClient,
  };
};

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with the correct URL', async () => {
    const url = 'any_other_url';
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.auth();

    expect(httpPostClientSpy.url).toBe(url);
  });
});
