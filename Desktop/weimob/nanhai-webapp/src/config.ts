const isDevelopment = process.env.NODE_ENV === "development";

export const apiUrl = isDevelopment
  ? "http://nanhai.supercoojj.top"
  : "http://nanhai.supercoojj.top";

// 没有token时候跳转的页面。如果开启了静默授权不会跳转
export const loginUrl = "/pages/template/login/index";

// 启动静默授权
export const silentAuthorization = false;
// 静默授权地址
export const silentAuthorizationUrl = "";
export const aliyunOss =
  "http://wmm-mock.oss-cn-shanghai.aliyuncs.com/yiqingerchu-weapp";
export const aliyunAssets = aliyunOss;

export const aliyunOssTokenUrl =
  "http://47.103.40.50:3001/mock/31/aliyun/oss-token";
