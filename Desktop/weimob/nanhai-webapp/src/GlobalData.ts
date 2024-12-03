import Taro from '@tarojs/taro'
import { getBottomHeight } from './modules/@wmeimob/utils/src/taro/getBottomHeight'
import { CommunityClassification } from './request/data-contracts';

export enum EGlobalDataKey {
  Tabs = 'tabs',
  DefaultColor = 'defaultColor',
  ActiveColor = 'activeColor',
  Logo = 'logo',
  Name = 'name',
  NoPhoneNoJump = 'noPhoneNoJump',
  BottomHeight = 'bottomHeight',
  CommonPageStyle = 'commonPageStyle',
  CommonInfo = 'commonInfo',
  UserInfo = 'userInfo',
  // 社区用户openid
  CommunityOpenId = 'communityOpenId',
  // 社区分类
  CommunityClassify = 'communityclassify'
}
interface IGlobalData {
  [EGlobalDataKey.Tabs]: Record<string, any>[],
  [EGlobalDataKey.DefaultColor]: string;
  [EGlobalDataKey.ActiveColor]: string;
  [EGlobalDataKey.Logo]: string;
  [EGlobalDataKey.Name]: string;
  [EGlobalDataKey.NoPhoneNoJump]: any
  [EGlobalDataKey.BottomHeight]: number
  [EGlobalDataKey.CommonPageStyle]: React.CSSProperties,
  [EGlobalDataKey.CommonInfo]: any,
  [EGlobalDataKey.UserInfo]: any,
  [EGlobalDataKey.CommunityOpenId]: string
  [EGlobalDataKey.CommunityClassify]: CommunityClassification[]
}

let globalData: IGlobalData = {
  logo: '',
  name: '',
  activeColor: '#CB0024',
  defaultColor: '#999999',
  bottomHeight: getBottomHeight(),
  commonPageStyle: {
    paddingBottom: getBottomHeight() + 'px'
  },
  noPhoneNoJump: [
    {
      url: '/pages/taber/mine/index'
    },
    {
      url: '/pages/shoppingCart/index'
    },
    {
      url: '/pages/mine/integral/index'
    }
  ],
  commonInfo: {},
  userInfo: {},
  communityOpenId: '',
  tabs: [],
  communityclassify: []
}

// let globalData = initGlobalData()

// get overload
export function getGlobalData<K extends keyof IGlobalData>(key: K): IGlobalData[K] {
  return globalData[key]
}

// export function getGlobalDataOnce<K extends keyof IGlobalData>(key: K) {
//   const data = globalData[key]
//   globalData[key] = initGlobalData()[key]
//   return data
// }

// set overload
export function setGlobalData<K extends keyof IGlobalData>(key: K, val: IGlobalData[K]): void;
export function setGlobalData(data: Partial<IGlobalData>): void;
export function setGlobalData(key: any, val?: any): any {
  if (typeof key === 'object') {
    globalData = { ...globalData, ...key };
  } else if (typeof key === 'string') {
    globalData[key] = val
  }
}
