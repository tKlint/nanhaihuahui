import { useEffect, useState } from 'react';
import { IResponse } from '~/modules/@wmeimob/request/src/types/fetch-type';

export interface FetchOptions {
  init?: boolean
}

export function useFetch<T>(
  fetcher: (...arg: any[]) => Promise<any>,
  options?: FetchOptions
) {
  const _options = {
    init: true,
    ...options
  }

  const [loading, triggerLoading] = useState(false);
  const [res, setRes] = useState<IResponse<T> &  { content: any }>();

  const run: typeof fetcher = async (params: any) => {
    triggerLoading(true);

    const response = await fetcher(params);

    triggerLoading(false);
    setRes(response);

    return res;
  }

  useEffect(() => {
    if (!_options.init) return;

    run();
  }, [])

  return {
    loading,
    run,
    res: (res && res.content ? res.content : {}) as T,
    response: res ? res : {}
  }
}
