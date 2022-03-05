import Chance from 'chance';
import { HttpPostClientSpy } from '~/data/mocks';
import { HttpStatusCode } from '~/data/protocols/http';
import { UnauthorizedError, UnexpectedError } from '~/domain/errors';
import { mockAccountModel, mockAuthentication } from '~/domain/mocks';
import { AccountModel } from '~/domain/models';
import { AuthenticationParams } from '~/domain/usecases';
import { RemoteAuthentication } from './remote-authentication';

const faker = new Chance();

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>;
};

const makeSut = (url: string = faker.url()): SutTypes => {
  const httpPostClient = new HttpPostClientSpy<
    AuthenticationParams,
    AccountModel
  >();
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

  test('Should throw UnauthorizedError if HttpPostClient returns 401', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      status: HttpStatusCode.unauthorized,
    };
    const promise = sut.auth(mockAuthentication());

    await expect(promise).rejects.toThrow(new UnauthorizedError());
  });

  test('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      status: HttpStatusCode.badRequest,
    };
    const promise = sut.auth(mockAuthentication());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      status: HttpStatusCode.serverError,
    };
    const promise = sut.auth(mockAuthentication());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      status: HttpStatusCode.badRequest,
    };
    const promise = sut.auth(mockAuthentication());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should return an AccountModel if HttpPostClient returns 200', async () => {
    const { sut, httpPostClientSpy } = makeSut();

    const httpResult = mockAccountModel();
    httpPostClientSpy.response = {
      status: HttpStatusCode.ok,
      body: httpResult,
    };
    const response = await sut.auth(mockAuthentication());

    expect(response).toEqual(httpResult);
  });
});
