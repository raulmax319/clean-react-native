import {
  HttpPostClient,
  HttpPostParams,
} from '../protocols/http/http-post-client';
import { HttpResponse, HttpStatusCode } from '../protocols/http/http-response';

export class HttpPostClientSpy implements HttpPostClient {
  url?: string;
  body?: Record<string, unknown>;
  response: HttpResponse = {
    status: HttpStatusCode.noContent,
  };

  async post(params: HttpPostParams): Promise<HttpResponse> {
    const { url } = params;
    this.url = url;
    this.body = params.body;
    return Promise.resolve(this.response);
  }
}
