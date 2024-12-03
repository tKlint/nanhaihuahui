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

export function guidShort() {
  return guid().replace(/-/g, "");
}

/**
 * 获取文件大小字符串
 *
 * @export
 * @param {(number | string)} fileSize
 * @returns
 */
export function getFileSizeText(fileSize: number | string) {
  const size = Number(fileSize);
  if (size < 1024) {
    return size + 'b';
  } else if (size < 1024 * 1024) {
    return (size / 1024).toFixed(2) + 'kb';
  } else if (size < 1024 * 1024 * 1024) {
    return (size / 1024 / 1024).toFixed(2) + 'mb';
  }

  return (size / 1024 / 1024 / 1024).toFixed(2) + 'g';
}

/**
 * 粘贴板内容
 *
 * @export
 */
export function setClipValue(value: string) {
  const createInput = document.createElement('input');
  createInput.value = value;
  document.body.appendChild(createInput);
  createInput.style.position = 'fixed';
  createInput.style.left = '10000px';
  createInput.style.top = '10000px';
  createInput.select();
  document.execCommand("Copy");
  document.body.removeChild(createInput);
}

/**
 * 根据值查找key
 *
 * @export
 * @param {{ [key: string]: any }} obj
 * @param {*} value
 * @returns
 */
export function findObjectKey(obj: { [key: string]: any }, value: any) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const element = obj[key];
      if (element === value) {
        return key;
      }
    }
  }
}

/**
 *  获取枚举所有的key 枚举值不为字符串时失效
 *
 * @export
 * @param {*} obj
 * @returns
 */
export function getEnumKeys(obj: any) {
  const list: string[] = [];

  for (const key in Object.keys(obj)) {
    if (obj.hasOwnProperty(key)) {
      const element = obj[key];
      if (typeof element !== 'number') {
        list.push(element);
      }
    }
  }
  return list;
}

/**
 * 遍历值为数值的枚举key值
 *
 * @export
 * @template T
 * @param {*} object
 */
export function getNumberEnumKeys<T extends Object>(object: T) {
  const keys: Array<keyof T> = [];
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      if (isNaN(parseInt(key, 10))) {
        keys.push(key);
      }
    }
  }
  return keys;
}

/**
 * 遍历值为数值的枚举value值
 *
 * @export
 * @template T
 * @param {T} object
 * @returns
 */
export function getNumberEnumValues<T extends Object>(object: T) {
  return getNumberEnumKeys(object).map(key => object[key]);
}

/**
 * 获取短数字
 *
 * @export
 * @param {number} num
 * @returns
 */
export function getShortNumber(num: number) {
  let unit = '';
  let shortNumber = num;

  if (num > 10000) {
    shortNumber = shortNumber / 10000;
    unit = 'w';
  } else if (num > 1000) {
    shortNumber = shortNumber / 1000;
    unit = 'k';
  }

  if (unit) {
    return ((shortNumber).toFixed(1) + unit).replace('.0', '');
  }
  return shortNumber;
}

/**
 * 睡眠，用于异步函数里面的延迟触发下一步
 *
 * @author dingjia
 * @file index.ts
 */

export function sleep(delay = 1000): Promise<any> {
  return new Promise(resolve => setTimeout(resolve, delay));
}

/**
 * 合并对象,如果值相同返回原对象
 *
 * @export
 * @template T
 * @param {T} prevObj
 * @param {Partial<T>} partialObj
 * @returns {T}
 */
export function concatObj<T>(prevObj: T, partialObj: Partial<T>): T {
  let newObj = prevObj;
  for (const key in partialObj) {
    if (Object.prototype.hasOwnProperty.call(newObj, key)) {
      const element = partialObj[key];
      if (newObj[key] !== element) {
        newObj = { ...newObj, [key]: element }
      }
    }
  }
  return newObj;
}

/**
 * hex转Rgba
 *
 * @export
 * @param {string} hex
 * @param {number} opacity
 * @returns
 */
export function hexToRgba(hex: string, opacity: number) {
  return [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16), opacity]
}
