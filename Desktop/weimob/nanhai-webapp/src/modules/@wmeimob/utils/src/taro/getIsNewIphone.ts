import Taro from '@tarojs/taro';
import { judgmentNewPhone } from '../common/judgmentNewPhone';

/**
 * 判断是否是新iphone
 *
 * @export
 * @returns
 */
export function getIsNewIphone() {
  const { model, screenWidth, screenHeight } = Taro.getSystemInfoSync();
  return judgmentNewPhone(model, screenWidth, screenHeight);
}
