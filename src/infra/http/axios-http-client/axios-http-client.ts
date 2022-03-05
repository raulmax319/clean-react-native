import axios from 'axios';
import {
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
} from '~/data/protocols/http';

export class AxiosHttpClient implements HttpPostClient<unknown, unknown> {
  async post(params: HttpPostParams<unknown>): Promise<HttpResponse<unknown>> {
    const res = await axios.post(params.url, params.body);
    return {
      status: res.status,
      body: res.data,
    };
  }
}
