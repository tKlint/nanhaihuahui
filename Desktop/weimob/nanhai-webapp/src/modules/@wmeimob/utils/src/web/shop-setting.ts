import { get, post } from "~/components/request-mock";
import { upload } from "~/components/aliyun";
import { FrontendSettingKeyEnum } from "~/modules/@wmeimob/data-model/src/common/enums/FrontendSettingKeyEnum";
import { FrontendSettingValueDTO } from "~/modules/@wmeimob/data-model/src/common/FrontendSettingValueDTO";

/**
 * 根据key获取配置value
 *
 * @export
 * @template K
 * @param {K} key key
 * @returns
 */
export async function getSetting<K extends FrontendSettingKeyEnum>(key: K) {
  const { content } = await get('v1/frontendSetting/:key', { key });
  try {
    const data = await fetch(content.value).then(res => res.json());
    return data as FrontendSettingValueDTO[K];
  } catch (error) {
  }
  return null;
}

/**
 * 保存配置
 *
 * @export
 * @template K
 * @param {K} key 键
 * @param {string} value 值,可以是对象、数组
 * @returns
 */
export async function setSetting<K extends FrontendSettingKeyEnum>(key: K, value: any) {
  // 上传文件至阿里云
  const [path] = await upload([
    new File([JSON.stringify(value)], '.json', { type: 'application/json', lastModified: Date.now() })
  ]);
  return post('v1/frontendSetting', { key, value: path }).then(() => { })
}
