/**
 * request实例。此入口基于fetch api进行封装。支持web、RN端使用
 */
import FetchRequest from './core/FetchRequest';
import { IRequestConfig, IResponse } from './types/fetch-type';
import { IRequestOption } from './types';
import { createInstance } from './helper/createInstance';

export interface IInstance extends Omit<FetchRequest, 'request'> {
  create(config?: IRequestOption): IInstance;
  <T>(config: IRequestConfig): Promise<IResponse<T>>;
}

function create(config: IRequestOption = {}) {
  const ins = createInstance(config, FetchRequest, ['request', 'mergeResponse', 'getErrorResponse', 'getResponseData']) as IInstance;
  ins.create = create;
  return ins;
}

const instance = create();

export default instance;

