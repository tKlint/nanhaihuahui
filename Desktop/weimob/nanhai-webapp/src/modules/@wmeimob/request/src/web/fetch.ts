import EventEmitter, { IFunction } from '~/modules/@wmeimob/event-emitter';
import { Result, IRequestOption, RequestEventEnum, IData, IResponse } from '../const';
import { normalizationUrl, validateStatus } from '../utils';

export interface RequestEventList extends IFunction {
  [RequestEventEnum.WillSend]: (params: IRequestOption) => void;
  [RequestEventEnum.DidMount]: (res: Response) => void;
}

export default class RequestFetch {
  eventEmitter = new EventEmitter<RequestEventList>();

  defaultOptions: IRequestOption = {
    showFailToast: false,
    isCatchFail: true
  };

  private baseUrl = ''

  private mockUrl

  constructor(baseUrl: string, mockUrl?: string) {
    this.baseUrl = baseUrl;
    this.mockUrl = mockUrl;
  }

  async request<T extends Result>(url: string, data: IData | string = {}, options: IRequestOption): Promise<IResponse<T>> {
    // if (typeof data === 'object') {
    //   data.appId = '10';
    // }

    const apiUrl = (options.isMock && this.mockUrl) ? this.mockUrl : this.baseUrl;

    let requestUrl = normalizationUrl(apiUrl, url);
    const requestOptions = { ...this.defaultOptions, ...options };
    const parameters = this.getParameters(options.method as string, data);
    requestUrl += parameters.url;
    const headers = this.getHeaders();
    const params: IRequestOption = {
      ...requestOptions,
      headers
    };

    if (parameters.body) {
      params.body = parameters.body;
    }

    if (!options.unWillSend) {
      await this.eventEmitter.emit(RequestEventEnum.WillSend, params);
    }

    let res: any;
    try {
      res = await fetch(requestUrl, params);
    } catch (error) {
      res = {
        status: 300,
        data: {
          error: {
            message: "网络请求失败，请检查您的网络。"
          }
        }
      } as any;
    }

    const returnData: any = await this.getData(res);
    res.data = returnData;
    res.content = returnData?.content

    try {
      await this.eventEmitter.emit(RequestEventEnum.DidMount, res);
    } catch (error) {
      throw res;
    }

    if (requestOptions.isCatchFail && !validateStatus(res.status)) {
      throw res;
    }

    return res;
  }

  /**
   * 获取参数
   *
   * @private
   * @param {string} method
   * @param {Data} data
   * @returns
   * @memberof APPfetch
   */
  private getParameters(method: string, data: IData | string) {
    let url = '';
    let body = '';
    if (data && (method === 'GET' || method === 'DELETE')) {
      const params = new URLSearchParams(data).toString();
      if (url.search(/\?/) === -1) {
        url += `?${params}`;
      } else {
        url += `&${params}`;
      }
    } else if (data !== undefined) {
      if (typeof data === 'string') {
        body = `"${data as any}"`;
      } else {
        body = JSON.stringify(data);
      }
    }
    return {
      url,
      body
    };
  }

  /**
   * 获取response 返回值
   *
   * @private
   * @param {Response} response
   * @returns {(Promise<string | Data>)}
   * @memberof ZDfetch
   */
  private async getData<T>(response: Response): Promise<T> {
    if (!response.clone) {
      return (response as any).data;
    }

    const responseClone = response.clone();
    const responseText = await responseClone.text();
    let data: any = {};
    try {
      if (
        responseText.indexOf('"') === 0 ||
        responseText.indexOf('{') === 0 ||
        responseText.indexOf('[') === 0
      ) {
        data = JSON.parse(responseText);
      } else {
        data = responseText;
      }
    } catch (er) {
      data = 'JSON parse 失败';
    }
    return data;
  }

  private getHeaders() {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const token = window.localStorage.getItem('Authorization')

    if (token) {
      headers.append('Authorization', token);
    }
    return headers;
  }
}
