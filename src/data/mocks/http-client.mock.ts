import {
  HttpPostClient,
  HttpPostParams,
} from '../protocols/http/http-post-client';

export class HttpPostClientSpy implements HttpPostClient {
  url?: string;
  body?: Record<string, unknown>;

  async post(params: HttpPostParams): Promise<void> {
    const { url } = params;
    this.url = url;
    this.body = params.body;
    return Promise.resolve();
  }
}
