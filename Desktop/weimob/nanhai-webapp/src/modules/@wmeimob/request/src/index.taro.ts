/**
 * request实例。此入口基于Taro.request api进行封装。支持Taro端使用
 */
import TaroRequest from './core/TaroRequest';
import { ITaroRequestConfig, ITaroResponse } from './types/taro-type';
import { IRequestOption } from './types';
import { createInstance } from './helper/createInstance';

export interface ITaroInstance extends Omit<TaroRequest, 'request'> {
  create: (config?: IRequestOption) => ITaroInstance;
  <T>(config: ITaroRequestConfig): Promise<ITaroResponse<T>>;
}

function create(config: IRequestOption = {}) {
  const ins = createInstance(config, TaroRequest, ['getErrorData']) as ITaroInstance;
  ins.create = create;
  return ins;
}

const instance = create();

export default instance;
