export enum HttpStatusCode {
  ok = 200,
  unauthorized = 401,
  noContent = 204,
}

export type HttpResponse = {
  status: HttpStatusCode;
  body?: Record<string, unknown>;
};
