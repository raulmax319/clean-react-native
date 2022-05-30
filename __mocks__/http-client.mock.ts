import {
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
  HttpStatusCode,
} from '~/data/protocols/http';

export class HttpPostClientSpy<B, R> implements HttpPostClient {
  url?: string;
  body?: B;
  response: HttpResponse<R> = {
    status: HttpStatusCode.ok,
  };

  async post<_B = B, _R = R>(
    params: HttpPostParams<_B>,
  ): Promise<HttpResponse<_R>> {
    this.url = params.url;
    this.body = params.body as unknown as B;
    return Promise.resolve(this.response as unknown as HttpResponse<_R>);
  }
}
