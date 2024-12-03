import { Dimensions, NativeModules, Platform, StatusBar } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { judgmentNewPhone } from '../common/judgmentNewPhone';
/**
 * 屏幕宽度
 * @export
 */
const window = Dimensions.get('window');
export const windowWidth = window.width;
export const windowHeight = window.height;

/**
 * 判断是不是新的下面有黑条的iphone
 *
 * @deprecated 已废弃。请使用外面的函数
 * @export
 * @returns
 */
export function getIsNewIphone() {
  const deviceId = DeviceInfo.getDeviceId();;
  return judgmentNewPhone(deviceId, windowWidth, windowHeight)
}

/**
 * 查询元素大小
 *
 * @export
 * @param {string} name
 * @param {*} scope
 * @returns
 */
export function selectRect(layoutEvent: React.RefObject<unknown>): Promise<{
  left: number,
  top: number,
  right: number,
  bottom: number,
  width: number,
  height: number
}> {
  return new Promise((resolve) => {
    // 页面打开有个动画所有不准要延迟
    setTimeout(() => {
      NativeModules.UIManager.measure(layoutEvent, (_x, _y, width, height, left, top, right) => {
        resolve({
          left,
          top,
          right: windowWidth - left,
          bottom: windowHeight - top,
          width,
          height
        });
      })
    }, 200)
  });
}

/**
 * 获取状态栏高度
 * @deprecated 已废弃。请使用外面的函数
 */
export function getStatusBarHeight() {
  // eslint-disable-next-line no-nested-ternary
  return getIsNewIphone() ? 44 : Platform.OS === 'ios' ? 20 : StatusBar.currentHeight!;
}
