import AliYunTaro from "~/modules/@wmeimob/aliyun/src/taro";
import { aliyunOssTokenUrl } from "~/config";
import * as request from "~/request";

const { upload } = new AliYunTaro({
  getOssToken: () => request({ url: aliyunOssTokenUrl })
});

export { upload }
