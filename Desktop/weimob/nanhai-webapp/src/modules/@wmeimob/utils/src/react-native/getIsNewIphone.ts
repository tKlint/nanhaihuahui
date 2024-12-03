import { Dimensions } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { judgmentNewPhone } from '../common/judgmentNewPhone';

/**
 * 判断是不是新的下面有黑条的iphone
 *
 * @export
 * @returns
 */
export function getIsNewIphone() {
  const deviceId = DeviceInfo.getDeviceId();
  const { width, height } = Dimensions.get('window')
  return judgmentNewPhone(deviceId, width, height)
}
