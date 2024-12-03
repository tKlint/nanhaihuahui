import Taro, { nextTick } from '@tarojs/taro';

/**
 * 生成唯一标识符
 *
 * @export
 * @returns
 */
export function guid() {
  return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
}
function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

export const isNewIphone = getisNewIphone();

/**
 * 判断是否是新iphone
 *
 * @export
 * @returns
 */
function getisNewIphone() {
  const { model, screenWidth, screenHeight } = Taro.getSystemInfoSync();

  let isNewPhone = /(iPhone (X|11|12|13|14|15|16))|(unknown.*iPhone)/.test(model);

  if (isNewPhone) {
    // 判断是否为iphone SE,1334 x 750 像素分辨率
    isNewPhone = !(screenWidth === 375 && screenHeight === 667);
  }
  return isNewPhone;
}

/**
 * 查询元素大小
 *
 * @export
 * @param {string} name
 * @param {*} scope
 * @returns
 */
export function selectRect(name: string, scope: any) {
  return new Promise<Taro.NodesRef.BoundingClientRectCallbackResult>((resolve) => {
    nextTick(() => {
      const query = Taro.createSelectorQuery().in(scope);
      query.select(name).boundingClientRect((res) => {
        resolve(res as Taro.NodesRef.BoundingClientRectCallbackResult);
      }).exec();
    })
  });
}

/**
 * 获取枚举的key
 *
 * @export
 * @param {*} obj
 * @returns
 */
export function enumKeys(obj: any) {
  const list: string[] = [];

  for (const key in Object.keys(obj)) {
    if (obj.hasOwnProperty(key)) {
      const element = obj[key];
      if (typeof element !== 'number') {
        list.push(element)
      }
    }
  }
  return list;
}

/**
 * 验证是否必填
 *
 */
export function validateRequired(value: any) {
  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    return true
  }
}
