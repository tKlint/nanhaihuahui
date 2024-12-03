import Taro from '@tarojs/taro';
import { getIsNewIphone } from "./getIsNewIphone";

/**
 * 获取状态栏高度
 */
export function getStatusBarHeight() {
  // eslint-disable-next-line no-nested-ternary
  return getIsNewIphone() ? 44 : Taro.getSystemInfoSync().statusBarHeight;
}
