import { merge, autobind } from "~/modules/@wmeimob/decorator/src/components";
import { guid } from "~/modules/@wmeimob/utils/src/other";
import Taro from '@tarojs/taro';

@autobind
export default class AliYunTaro {
  private getOssToken: () => Promise<any>

  constructor(config: {
    getOssToken: () => Promise<any>
  }) {
    this.getOssToken = config.getOssToken;
  }

  /**
   * 上传文件
   *
   * @param {string[]} fileList
   * @returns
   * @memberof AliYun
   */
  async upload(fileList: string[]) {
    const { content: { accessid, signature, policy, dir, host } } = await this.getOssTokenMerge();

    const reg = /^https/;

    return Promise.all(fileList.map(file => new Promise(resolve => {
      if (reg.test(file)) {
        resolve(file);
        return;
      }

      const formData = {
        // key: "${filename}",
        signature,
        OSSAccessKeyId: accessid,
        policy,
        key: `${dir}${guid()}.${file.substr(file.lastIndexOf(".") + 1)}`,
        'success_action_status': 200
      }
      Taro.uploadFile({
        url: host,
        filePath: file,
        name: 'file',
        formData,
        success() {
          resolve(`${host}/${formData.key}`);
        }
      })
    })));
  }

  @merge()
  private getOssTokenMerge() {
    return this.getOssToken();
  }
}

