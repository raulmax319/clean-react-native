import { HttpResponse } from './http-response';

export type HttpPostParams<T> = {
  url: string;
  body?: T;
};

export interface HttpPostClient {
  post<P, R>(params: HttpPostParams<P>): Promise<HttpResponse<R>>;
}
