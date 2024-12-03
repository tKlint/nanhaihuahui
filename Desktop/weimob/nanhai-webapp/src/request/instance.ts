import { apiUrl, loginUrl, silentAuthorizationUrl, silentAuthorization } from "~/config";
import Taro from '@tarojs/taro'
import Request from "~/modules/@wmeimob/request/src/index.taro";

const instance = Request.create({ baseUrl: apiUrl });

/** 合并函数 */
function merge(cb, delay = 200) {
  let promise: Promise<any> | null
  let timeout: any
  let resloveHandle
  let state = 0;
  return () => {
    if (timeout) {
      clearTimeout(timeout)
    }

    if (state === 0) {
      timeout = setTimeout(async () => {
        state = 1;
        const result = await cb()
        resloveHandle(result)
        promise = null
        state = 0
      }, delay)
    }

    if (!promise) {
      promise = new Promise(resolve => (resloveHandle = resolve))
    }

    return promise
  }
}

const getToken = merge(async () => {
  const { code } = await Taro.login()
  return instance.post(silentAuthorizationUrl, { code }, { skipInterceptor: 'request' })
})

// 请求拦截器
instance.requestInterceptors.use(async requestConfig => {
  let token = Taro.getStorageSync('token')
  // 静默授权
  if (!token && silentAuthorization) {
    const { data } = await getToken()
    token = data // 赋值token
    Taro.setStorageSync('token', token)
  }

  requestConfig.headers = requestConfig.headers || {}
  requestConfig.headers.Authorization = token
  return requestConfig
})

// 响应拦截器
instance.responseInterceptors.use((res) => {
  const { statusCode, data = {}, href } = res
  let description: string | null = null
  // console.log(res, 'res')

  if (data.code === 403) {
    Taro.removeStorageSync('token')
    Taro.navigateTo({ url: loginUrl })
    throw new Error()
  }

  if (statusCode === 200 && data.code !== 0) {
    description = data.msg
  } else if (statusCode < 200 || statusCode >= 300) {
    if (statusCode && statusCode > 0) {
      description = `url:${href},statusCode:${statusCode}`
    } else if (statusCode && statusCode === -1) {
      description = '网络请求失败，请检查您的网络。'
    } else {
      description = '未知错误，万分抱歉！'
    }
  }

  if (description !== null) {
    Taro.showToast({ icon: 'none', title: description })
    throw new Error()
  }

  return res
})

instance.responseInterceptors.use(({ data }) => data)

export default instance
