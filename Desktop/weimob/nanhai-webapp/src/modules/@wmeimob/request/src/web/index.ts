import { IRequestOption, RequestEventEnum, IAPI, IResponse, Result, IResponseInterceptorFunction, IRequestInterceptorFunction } from '../const';
import TaroRequest from './fetch';
import { autobind } from '~/modules/@wmeimob/decorator/src/components';
import { paserDynamicPath } from '../utils';

interface IConfig {
  apiUrl: string
  mockApiUrl: string
}

@autobind
export default class RequestWeb<P extends IAPI> {
  config: {
    apiUrl: string
    mockApiUrl: string
  }

  requestObj: TaroRequest

  // 请求拦截器
  resquestInterceptor: IRequestInterceptorFunction[] = [];

  // 响应拦截器
  responseInterceptor: IResponseInterceptorFunction[] = [];

  constructor(config: IConfig) {
    this.config = config;
    this.requestObj = new TaroRequest(config.apiUrl, config.mockApiUrl);
    this.initRequestLifecycle();
  }

  get<T extends keyof P['APIGet'] & string>(url: T, data?: P['APIGet'][T]['params'] | string, option: IRequestOption = {}) {
    return this.request<P['APIGet'][T]['data']>(url, data, { method: 'GET', ...option });
  }

  post<T extends keyof P['APIPost'] & string>(url: T, data?: P['APIPost'][T]['params'] | string, option: IRequestOption = {}) {
    return this.request<P['APIPost'][T]['data']>(url, data, { method: 'POST', ...option });
  }

  put<T extends keyof P['APIPut'] & string>(url: T, data?: P['APIPut'][T]['params'] | string, option: IRequestOption = {}) {
    return this.request<P['APIPut'][T]['data']>(url, data, { method: 'PUT', ...option });
  }

  del<T extends keyof P['APIDelete'] & string>(url: T, data?: P['APIDelete'][T]['params'] | string, option: IRequestOption = {}) {
    return this.request<P['APIDelete'][T]['data']>(url, data, { method: 'DELETE', ...option });
  }

  request<T extends { content: any }>(path: string, data?: any, option: IRequestOption = {}) {
    const { url, data: parseDdata } = paserDynamicPath(path, data);
    return this.requestObj.request<T>(url, parseDdata, option);
  }

  /**
   * 注册请求拦截器函数
   * @param fn 拦截器函数
   */
  registerRequestInterceptor(fn: IRequestInterceptorFunction) {
    this.resquestInterceptor.push(fn);
  }

  /**
   * 注册响应拦截器函数
   * @param fn 拦截器函数
   */
  registerResponseInterceptor(fn: IResponseInterceptorFunction) {
    this.responseInterceptor.push(fn);
  }

  /**
   * 生命周期初始化
   *
   * @export
   */
  private initRequestLifecycle() {
    this.requestObj.eventEmitter.addListener(RequestEventEnum.WillSend, this.requestWillMount as any);
    this.requestObj.eventEmitter.addListener(RequestEventEnum.DidMount, this.requestDidMount as any);
  }

  /**
   * 请求发送开始 可修改请求参数
   *
   * @export
   * @param {(Taro.request.Param<string | any>)} params
   */
  private requestWillMount(params: IRequestOption) {
    this.resquestInterceptor.forEach(fn => fn(params))
  }

  private async requestDidMount(response: IResponse<Result>) {
    this.responseInterceptor.forEach(fn => fn(response));
  }
}
