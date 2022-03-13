import axios from 'axios';
import {
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
} from '~/data/protocols/http';

export class AxiosHttpClient implements HttpPostClient {
  async post<P, R>(params: HttpPostParams<P>): Promise<HttpResponse<R>> {
    const res = await axios.post(params.url, params.body);
    return {
      status: res.status,
      body: res.data,
    };
  }
}
