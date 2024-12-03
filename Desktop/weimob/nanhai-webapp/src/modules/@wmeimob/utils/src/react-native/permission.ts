import { PermissionsAndroid, Permission, Platform } from 'react-native';

export enum PermissionType {
  /**
   * 麦克风权限
   */
  RecordAudio,
  /**
   * 相机权限
   */
  Camera,
  /**
   * 获取读取和写入文件权限
   */
  WriteExternalStorage
}

const AndroidPermissions: { [key: string]: Permission } = {
  [PermissionType.RecordAudio]: 'android.permission.RECORD_AUDIO',
  [PermissionType.WriteExternalStorage]: 'android.permission.WRITE_EXTERNAL_STORAGE',
  [PermissionType.Camera]: 'android.permission.CAMERA'
}

/**
 * 申请权限
 *
 * @export
 * @param {PermissionType} type
 * @returns
 */
export function applyPermission(type: PermissionType) {
  if (Platform.OS === 'ios') {
    return new Promise(resolve => resolve());
  }
  return new Promise(resolve => {
    (async () => {
      const checked = await PermissionsAndroid.check(AndroidPermissions[type]);
      if (checked) {
        return resolve();
      }
      const granted = await PermissionsAndroid.request(AndroidPermissions[type]);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        resolve();
      }
    })()
  })
}

/**
 * 是否有权限
 *
 * @export
 * @returns {Promise<boolean>}
 */
export async function havePermission(type: PermissionType): Promise<boolean> {
  if (Platform.OS === 'ios') {
    return true;
  }
  const bl = await PermissionsAndroid.check(AndroidPermissions[type]);
  return bl;
}
