/* eslint-disable max-lines */
/* eslint-disable id-length */

import { ITaroRequestConfig } from "~/modules/@wmeimob/request/src/types/taro-type";
import {
  AuctionGoods,
  AuctionWorkGoodsDetailsAddDTO,
  Banner,
  CommunityClassification,
  CommunityCommentAddDTO,
  CommunityPostsAddDTO,
  CommunityPostsVO,
  ComplaintsSuggestionsAddDTO,
  ConfirmOrderReq,
  CouponDetail,
  Goods,
  GoodsClassify,
  GoodsDetailVo,
  GroupWork,
  JsPayResponse,
  LiveCategory,
  LiveRoomInfo,
  MallHomeSet,
  MyCouponListVO,
  Order,
  OrderGroupWorkItem,
  OrderGroupWorkItemAddDTO,
  OrderInfoResult,
  PageInfoBanner,
  PageInfoCommunityHotWords,
  PageInfoCommunityPosts,
  PageInfoGoods,
  PageInfoGroupWork,
  PageInfoLiveRoomInfo,
  PageInfoMyGoodsDetailVo,
  PageInfoPartnerManagementMerchant,
  PageInfoPartnerRebateInformation,
  PageInfoPartnerWithdrawalAudit,
  PageInfoPointsLogs,
  PageInfoStationLetter,
  PageInfoStore,
  PageInfoUserMutualConcern,
  PageInfoUserShopCartVO,
  PartnerManagement,
  PartnerOrdersRecordVO,
  PartnerPromotionConfig,
  PointsLogsAddDTO,
  PointsLogsVO,
  PopularSearchTerms,
  StationLetter,
  Store,
  StoreInfo,
  StoreUserFocusAddDTO,
  Type微信解密数据,
  User,
  UserApiActivityGetParams,
  UserApiActivityGoodsDetailGetParams,
  UserApiActivityGroupsGetParams,
  UserApiActivityGroupsShareGetParams,
  UserApiActivityPayGetParams,
  UserApiCommunityGetCommunityPostsByMeGetParams,
  UserApiCommunityGetCommunityPostsByMyCollectionGetParams,
  UserApiCommunityGetCommunityPostsByMyGiveGetParams,
  UserApiCommunityGetCommunityPostsGetParams,
  UserApiCommunitySelectGoodsGetParams,
  UserApiCommunityUpdateCommunityPostsByGiveNumberGetParams,
  UserApiCommunityUpdateCommunityPostsByGiveNumberPostParams,
  UserApiDisPartnerOrderRecordsGetParams,
  UserApiDisPartnerRichTextDetailGetParams,
  UserApiDisPartnerWithdrawRecordGetParams,
  UserApiGoodsDetailGetParams,
  UserApiGoodsGetParams,
  UserApiHomeRecommendedLiveRoomListsGetParams,
  UserApiLiveRoomGetParams,
  UserApiPopularSearchTermsGetParams,
  UserApiSettingUpdateUserAccountInformationPostParams,
  UserApiStoreGetParams,
  UserApiStoreGetStoreNoticeGetParams,
  UserAppointmentLiveRoomAddDTO,
  UserCollectionAddDTO,
  UserDetailInfoUpdateDTO,
  UserDetailInfoVO,
  UserReceivingAddress,
  UserReceivingAddressAddDTO,
  UserReceivingAddressUpdateDTO,
  UserSearchHistory,
  UserSetDTO,
  UserShopCartAddDTO,
  UserShopCartDeleteDTO,
  UserShopCartUpdateDTO,
  UserWithToken,
  WechatLogin
} from "./data-contracts";
import requestInstance from "./instance";

type RequestConfig = Omit<ITaroRequestConfig, "url" | "method">;

export const API = {
  /**
   * No description
   * @name POST /user/api/home/updateAppointment
   * @summary 直播间-添加-取消预约
   * @tags 首页
   * @response `200` `PointsLogsAddDTO` OK |  `201` `PointsLogsAddDTO` Created |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/home/updateAppointment_POST": (data: UserAppointmentLiveRoomAddDTO, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/home/updateAppointment`,
      method: "POST",
      data,
      ...options
    }) as unknown as Promise<{ data?: PointsLogsAddDTO; code?: number }>,
  /**
   * No description
   * @name GET /user/api/community/getCommunityClassification
   * @summary 社区-分类
   * @tags (JC)社区
   * @response `200` `(CommunityClassification)[]` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/community/getCommunityClassification_GET": (
    params: Record<string, any> = {},
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/user/api/community/getCommunityClassification`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<{ data?: CommunityClassification[]; code?: number }>,
  /**
   * No description
   * @name DELETE /user/api/userSearchHistory
   * @summary 清空搜索历史
   * @tags 用户搜索历史表管理
   * @response `200` `PointsLogsAddDTO` OK |  `204` `PointsLogsAddDTO` No Content |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden
   */
  "/user/api/userSearchHistory_DELETE": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/userSearchHistory`,
      method: "DELETE",
      params,
      ...options
    }) as unknown as Promise<{ data?: PointsLogsAddDTO; code?: number }>,
  /**
   * No description
   * @name GET /user/api/userSearchHistory
   * @summary 查询搜索历史(不分页)
   * @tags 用户搜索历史表管理
   * @response `200` `(UserSearchHistory)[]` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/userSearchHistory_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/userSearchHistory`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<{ data?: UserSearchHistory[]; code?: number }>,
  /**
   * No description
   * @name GET /user/api/home/recommended/liveRooms
   * @summary 优选直播间列表
   * @tags 首页
   * @response `200` `(LiveRoomInfo)[]` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/home/recommended/liveRooms_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/home/recommended/liveRooms`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<{ data?: LiveRoomInfo[]; code?: number }>,
  /**
   * No description
   * @name GET /user/api/activity/groups
   * @summary 我的拼团
   * @tags 拼团
   * @response `200` `(OrderGroupWorkItem)[]` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/activity/groups_GET": (query: UserApiActivityGroupsGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/activity/groups`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<{ data?: OrderGroupWorkItem[]; code?: number }>,
  /**
   * No description
   * @name POST /user/api/setting/addUserReceivingAddress
   * @summary 设置-收货地址-新增地址
   * @tags (JC)设置/积分
   * @response `200` `PointsLogsAddDTO` OK |  `201` `PointsLogsAddDTO` Created |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/setting/addUserReceivingAddress_POST": (data: UserReceivingAddressAddDTO, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/setting/addUserReceivingAddress`,
      method: "POST",
      data: data,
      ...options
    }) as unknown as Promise<{ data?: PointsLogsAddDTO; code?: number }>,
  /**
   * No description
   * @name GET /user/api/shoppingCart/getShoppingCatList
   * @summary 购物车-列表信息
   * @tags (JC)购物车
   * @response `200` `PageInfoUserShopCartVO` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/shoppingCart/getShoppingCatList_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/shoppingCart/getShoppingCatList`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<{ data?: PageInfoUserShopCartVO; code?: number }>,
  /**
   * No description
   * @name POST /user/api/shoppingCart/getShoppingCatList
   * @summary 购物车-添加购物车
   * @tags (JC)购物车
   * @response `200` `PointsLogsAddDTO` OK |  `201` `PointsLogsAddDTO` Created |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/shoppingCart/getShoppingCatList_POST": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/shoppingCart/getShoppingCatList`,
      method: "POST",
      params,
      ...options
    }) as unknown as Promise<{ data?: PointsLogsAddDTO; code?: number }>,
  /**
   * No description
   * @name POST /user/api/store/focusOrNot/{id}
   * @summary 关注/取消关注
   * @tags 首页-店铺
   * @response `200` `PointsLogsAddDTO` OK |  `201` `PointsLogsAddDTO` Created |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/store/focusOrNot/{id}_POST": (id: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/store/focusOrNot/${id}`,
      method: "POST",
      ...options
    }) as unknown as Promise<{ data?: PointsLogsAddDTO; code?: number }>,
  /**
   * No description
   * @name POST /user/api/community/insertForCommunityComment
   * @summary 社区-发表你的看法
   * @tags (JC)社区
   * @response `200` `PointsLogsAddDTO` OK |  `201` `PointsLogsAddDTO` Created |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/community/insertForCommunityComment_POST": (data: CommunityCommentAddDTO, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/community/insertForCommunityComment`,
      method: "POST",
      data: data,
      ...options
    }) as unknown as Promise<{ data?: PointsLogsAddDTO; code?: number }>,
  /**
   * No description
   * @name POST /user/api/community/updateUserByPersonalProfile
   * @summary 社区-玩家社区-当前人简介修改
   * @tags (JC)社区
   * @response `200` `PointsLogsAddDTO` OK |  `201` `PointsLogsAddDTO` Created |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/community/updateUserByPersonalProfile_POST": (
    data: UserDetailInfoUpdateDTO,
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/user/api/community/updateUserByPersonalProfile`,
      method: "POST",
      data: data,
      ...options
    }) as unknown as Promise<{ data?: PointsLogsAddDTO; code?: number }>,
  /**
   * @description focusStatus:粉丝状态(0相互未关注,等待当前用户点击[关注]   1相互已关注,为[互相关注]状态)
   * @name GET /user/api/community/getCommunityPostsByMyFollow
   * @summary 社区-玩家社区-我关注的
   * @tags (JC)社区
   * @response `200` `PageInfoUserMutualConcern` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/community/getCommunityPostsByMyFollow_GET": (
    params: Record<string, any> = {},
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/user/api/community/getCommunityPostsByMyFollow`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<{ data?: PageInfoUserMutualConcern; code?: number }>,
  /**
   * No description
   * @name GET /user/api/dis/partner/withdraw/record
   * @summary 城市合伙人中心-提现记录列表
   * @tags 分销
   * @response `200` `PageInfoPartnerWithdrawalAudit` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/dis/partner/withdraw/record_GET": (
    query: UserApiDisPartnerWithdrawRecordGetParams,
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/user/api/dis/partner/withdraw/record`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<{ data?: PageInfoPartnerWithdrawalAudit; code?: number }>,
  /**
   * No description
   * @name GET /user/api/community/selectGoods
   * @summary 社区-发布-选择商品
   * @tags (JC)社区
   * @response `200` `PageInfoGoods` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/community/selectGoods_GET": (query: UserApiCommunitySelectGoodsGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/community/selectGoods`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<{ data?: PageInfoGoods; code?: number }>,
  /**
   * No description
   * @name GET /user/api/community/getCommunityPostsByMyCollection
   * @summary 社区-玩家社区-我收藏的
   * @tags (JC)社区
   * @response `200` `PageInfoCommunityPosts` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/community/getCommunityPostsByMyCollection_GET": (
    query: UserApiCommunityGetCommunityPostsByMyCollectionGetParams,
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/user/api/community/getCommunityPostsByMyCollection`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<{ data?: PageInfoCommunityPosts; code?: number }>,
  /**
   * No description
   * @name POST /user/api/shoppingCart/collectionShoppingCatInfo
   * @summary 购物车-收藏购物车的商品
   * @tags (JC)购物车
   * @response `200` `PointsLogsAddDTO` OK |  `201` `PointsLogsAddDTO` Created |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/shoppingCart/collectionShoppingCatInfo_POST": (data: UserCollectionAddDTO, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/shoppingCart/collectionShoppingCatInfo`,
      method: "POST",
      data: data,
      ...options
    }) as unknown as Promise<{ data?: PointsLogsAddDTO; code?: number }>,
  /**
   * No description
   * @name POST /user/api/dis/tobe/partner
   * @summary 成为城市合伙人
   * @tags 分销
   * @response `200` `PointsLogsAddDTO` OK |  `201` `PointsLogsAddDTO` Created |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/dis/tobe/partner_POST": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/dis/tobe/partner`,
      method: "POST",
      params,
      ...options
    }) as unknown as Promise<{ data?: PointsLogsAddDTO; code?: number }>,
  /**
   * No description
   * @name PUT /user/api/user/getMyCollection
   * @summary (JC)我的收藏
   * @tags 用户相关
   * @response `200` `PageInfoMyGoodsDetailVo` OK |  `201` `PointsLogsAddDTO` Created |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/user/getMyCollection_PUT": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/user/getMyCollection`,
      method: "PUT",
      params,
      ...options
    }) as unknown as Promise<{ data?: PageInfoMyGoodsDetailVo; code?: number }>,
  /**
   * No description
   * @name GET /user/api/community/getCommunityPostsByMyGive
   * @summary 社区-玩家社区-我点赞的
   * @tags (JC)社区
   * @response `200` `PageInfoCommunityPosts` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/community/getCommunityPostsByMyGive_GET": (
    query: UserApiCommunityGetCommunityPostsByMyGiveGetParams,
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/user/api/community/getCommunityPostsByMyGive`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<{ data?: PageInfoCommunityPosts; code?: number }>,
  /**
   * No description
   * @name POST /user/api/setting/addComplaintsSuggestions
   * @summary 设置-意见反馈
   * @tags (JC)设置/积分
   * @response `200` `PointsLogsAddDTO` OK |  `201` `PointsLogsAddDTO` Created |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/setting/addComplaintsSuggestions_POST": (data: ComplaintsSuggestionsAddDTO, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/setting/addComplaintsSuggestions`,
      method: "POST",
      data: data,
      ...options
    }) as unknown as Promise<{ data?: PointsLogsAddDTO; code?: number }>,
  /**
   * No description
   * @name POST /user/api/setting/addPointsLogsByComplaintsSuggestions
   * @summary 签到
   * @tags (JC)设置/积分
   * @response `200` `PointsLogsAddDTO` OK |  `201` `PointsLogsAddDTO` Created |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/setting/addPointsLogsByComplaintsSuggestions_POST": (
    data: PointsLogsAddDTO,
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/user/api/setting/addPointsLogsByComplaintsSuggestions`,
      method: "POST",
      data: data,
      ...options
    }) as unknown as Promise<{ data?: PointsLogsAddDTO; code?: number }>,
  /**
   * No description
   * @name GET /user/api/activity/groups/share/
   * @summary 超值拼团-分享页面
   * @tags 拼团
   * @response `200` `GroupWork` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/activity/groups/share/_GET": (query: UserApiActivityGroupsShareGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/activity/groups/share/`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<{ data?: GroupWork; code?: number }>,
  /**
   * No description
   * @name GET /user/api/home/recommended/liveRoomLists
   * @summary 分类下的直播间列表
   * @tags 首页
   * @response `200` `(LiveRoomInfo)[]` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/home/recommended/liveRoomLists_GET": (
    query: UserApiHomeRecommendedLiveRoomListsGetParams,
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/user/api/home/recommended/liveRoomLists`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<{ data?: LiveRoomInfo[]; code?: number }>,
  /**
   * No description
   * @name POST /user/api/setting/updateUserAccountInformation
   * @summary 设置-账户信息-修改
   * @tags (JC)设置/积分
   * @response `200` `PointsLogsAddDTO` OK |  `201` `PointsLogsAddDTO` Created |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/setting/updateUserAccountInformation_POST": (
    query: UserApiSettingUpdateUserAccountInformationPostParams,
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/user/api/setting/updateUserAccountInformation`,
      method: "POST",
      params: query,
      ...options
    }) as unknown as Promise<{ data?: PointsLogsAddDTO; code?: number }>,
  /**
   * No description
   * @name GET /user/api/community/updateCommunityPostsByGiveNumber
   * @summary 社区-帖子点赞/关注/观看/收藏操作
   * @tags (JC)社区
   * @response `200` `PointsLogsAddDTO` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/community/updateCommunityPostsByGiveNumber_GET": (
    query: UserApiCommunityUpdateCommunityPostsByGiveNumberGetParams,
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/user/api/community/updateCommunityPostsByGiveNumber`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<{ data?: PointsLogsAddDTO; code?: number }>,
  /**
   * No description
   * @name POST /user/api/community/updateCommunityPostsByGiveNumber
   * @summary 社区-帖子点赞/关注/观看/收藏操作
   * @tags (JC)社区
   * @response `200` `PointsLogsAddDTO` OK |  `201` `PointsLogsAddDTO` Created |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/community/updateCommunityPostsByGiveNumber_POST": (
    query: UserApiCommunityUpdateCommunityPostsByGiveNumberPostParams,
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/user/api/community/updateCommunityPostsByGiveNumber`,
      method: "POST",
      params: query,
      ...options
    }) as unknown as Promise<{ data?: PointsLogsAddDTO; code?: number }>,
  /**
   * No description
   * @name GET /user/api/messageCenter/getStationLetterInfo
   * @summary 消息中心-站内信
   * @tags (JC)消息中心
   * @response `200` `PageInfoStationLetter` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/messageCenter/getStationLetterInfo_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/messageCenter/getStationLetterInfo`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<{ data?: PageInfoStationLetter; code?: number }>,
  /**
   * No description
   * @name POST /user/api/store/detail/
   * @summary 商家信息-写评价
   * @tags 首页-店铺
   * @response `200` `PointsLogsAddDTO` OK |  `201` `PointsLogsAddDTO` Created |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/store/detail/_POST": (data: StoreUserFocusAddDTO, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/store/detail/`,
      method: "POST",
      data: data,
      ...options
    }) as unknown as Promise<{ data?: PointsLogsAddDTO; code?: number }>,
  /**
   * No description
   * @name GET /user/api/messageCenter/{id}
   * @summary 消息中心-站内信详情
   * @tags (JC)消息中心
   * @response `200` `StationLetter` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/messageCenter/{id}_GET": (id: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/messageCenter/${id}`,
      method: "GET",
      ...options
    }) as unknown as Promise<{ data?: StationLetter; code?: number }>,
  /**
   * No description
   * @name GET /user/api/store/coupons/{id}
   * @summary 优惠券-领取更多-列表
   * @tags 首页-店铺
   * @response `200` `(CouponDetail)[]` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/store/coupons/{id}_GET": (id: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/store/coupons/${id}`,
      method: "GET",
      ...options
    }) as unknown as Promise<{ data?: CouponDetail[]; code?: number }>,
  /**
   * No description
   * @name POST /user/api/shoppingCart/deleteShoppingCatInfo
   * @summary 购物车-删除购物车购买的商品
   * @tags (JC)购物车
   * @response `200` `PointsLogsAddDTO` OK |  `201` `PointsLogsAddDTO` Created |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/shoppingCart/deleteShoppingCatInfo_POST": (data: UserShopCartDeleteDTO, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/shoppingCart/deleteShoppingCatInfo`,
      method: "POST",
      data: data,
      ...options
    }) as unknown as Promise<{ data?: PointsLogsAddDTO; code?: number }>,
  /**
   * No description
   * @name GET /user/api/store/{id}
   * @summary 门店详情-banner/优惠券/商品
   * @tags 首页-店铺
   * @response `200` `MallHomeSet` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/store/{id}_GET": (id: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/store/${id}`,
      method: "GET",
      ...options
    }) as unknown as Promise<{ data?: MallHomeSet; code?: number }>,
  /**
   * No description
   * @name GET /user/api/liveRoom
   * @summary 搜索直播
   * @tags 直播
   * @response `200` `PageInfoLiveRoomInfo` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/liveRoom_GET": (query: UserApiLiveRoomGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/liveRoom`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<{ data?: PageInfoLiveRoomInfo; code?: number }>,
  /**
   * No description
   * @name GET /user/api/dis/partner/order/condition
   * @summary 城市合伙人中心-订单记录(商家列表)
   * @tags 分销
   * @response `200` `PartnerOrdersRecordVO` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/dis/partner/order/condition_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/dis/partner/order/condition`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<{ data?: PartnerOrdersRecordVO; code?: number }>,
  /**
   * No description
   * @name GET /user/api/setting/getUserReceivingAddress
   * @summary 设置-收货地址-地址列表
   * @tags (JC)设置/积分
   * @response `200` `(UserReceivingAddress)[]` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/setting/getUserReceivingAddress_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/setting/getUserReceivingAddress`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<{ data?: UserReceivingAddress[]; code?: number }>,
  /**
   * No description
   * @name GET /user/api/dis/partner/order/records
   * @summary 城市合伙人中心-订单记录
   * @tags 分销
   * @response `200` `PageInfoPartnerRebateInformation` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/dis/partner/order/records_GET": (
    query: UserApiDisPartnerOrderRecordsGetParams,
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/user/api/dis/partner/order/records`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<{ data?: PageInfoPartnerRebateInformation; code?: number }>,
  /**
   * No description
   * @name POST /user/api/community/
   * @summary 社区-发布[图片/视频]
   * @tags (JC)社区
   * @response `200` `PointsLogsAddDTO` OK |  `201` `PointsLogsAddDTO` Created |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/community/_POST": (data: CommunityPostsAddDTO, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/community/`,
      method: "POST",
      data: data,
      ...options
    }) as unknown as Promise<{ data?: PointsLogsAddDTO; code?: number }>,
  /**
   * No description
   * @name GET /user/api/community/
   * @summary 社区-热搜榜
   * @tags (JC)社区
   * @response `200` `PageInfoCommunityHotWords` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/community/_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/community/`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<{ data?: PageInfoCommunityHotWords; code?: number }>,
  /**
   * No description
   * @name GET /user/api/store/getStoreNotice
   * @summary (JC)商家公告
   * @tags 首页-店铺
   * @response `200` `PageInfoStore` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/store/getStoreNotice_GET": (query: UserApiStoreGetStoreNoticeGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/store/getStoreNotice`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<{ data?: PageInfoStore; code?: number }>,
  /**
   * @description focusStatus:粉丝状态(0相互未关注,等待当前用户点击[关注]   1相互已关注,为[互相关注]状态)
   * @name GET /user/api/community/getCommunityPostsByMyFocus
   * @summary 社区-玩家社区-我的粉丝
   * @tags (JC)社区
   * @response `200` `PageInfoUserMutualConcern` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/community/getCommunityPostsByMyFocus_GET": (
    params: Record<string, any> = {},
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/user/api/community/getCommunityPostsByMyFocus`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<{ data?: PageInfoUserMutualConcern; code?: number }>,
  /**
   * No description
   * @name GET /user/api/home/primary/goods
   * @summary 自营商城-好物推荐列表
   * @tags 首页
   * @response `200` `(Goods)[]` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/home/primary/goods_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/home/primary/goods`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<{ data?: Goods[]; code?: number }>,
  /**
   * No description
   * @name POST /user/api/shoppingCart/addShoppingCatInfo
   * @summary 购物车-添加购物车
   * @tags (JC)购物车
   * @response `200` `PointsLogsAddDTO` OK |  `201` `PointsLogsAddDTO` Created |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/shoppingCart/addShoppingCatInfo_POST": (data: UserShopCartAddDTO, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/shoppingCart/addShoppingCatInfo`,
      method: "POST",
      data: data,
      ...options
    }) as unknown as Promise<{ data?: PointsLogsAddDTO; code?: number }>,
  /**
   * No description
   * @name GET /user/api/community/getCommunityBanner
   * @summary 社区-轮播图获取
   * @tags (JC)社区
   * @response `200` `PageInfoBanner` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/community/getCommunityBanner_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/community/getCommunityBanner`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<{ data?: PageInfoBanner; code?: number }>,
  /**
   * @description id为getCommunityPostsByMyFollow
   * @name POST /user/api/community/removeUserMutualConcernForWechat/{id}
   * @summary 社区-玩家社区-我关注的-取消关注
   * @tags (JC)社区
   * @response `200` `PointsLogsAddDTO` OK |  `201` `PointsLogsAddDTO` Created |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/community/removeUserMutualConcernForWechat/{id}_POST": (id: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/community/removeUserMutualConcernForWechat/${id}`,
      method: "POST",
      ...options
    }) as unknown as Promise<{ data?: PointsLogsAddDTO; code?: number }>,
  /**
   * No description
   * @name POST /user/api/order/confirmOrder
   * @summary 确认订单信息
   * @tags 订单
   * @response `200` `OrderInfoResult` OK |  `201` `PointsLogsAddDTO` Created |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/order/confirmOrder_POST": (data: ConfirmOrderReq, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/order/confirmOrder`,
      method: "POST",
      data: data,
      ...options
    }) as unknown as Promise<{ data?: OrderInfoResult; code?: number }>,
  /**
   * No description
   * @name POST /user/api/auctionGoods/insertForPrice
   * @summary 出价
   * @tags 拍卖商品
   * @response `200` `PointsLogsAddDTO` OK |  `201` `PointsLogsAddDTO` Created |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/auctionGoods/insertForPrice_POST": (data: AuctionWorkGoodsDetailsAddDTO, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/auctionGoods/insertForPrice`,
      method: "POST",
      data: data,
      ...options
    }) as unknown as Promise<{ data?: PointsLogsAddDTO; code?: number }>,
  /**
   * No description
   * @name GET /user/api/setting/getIntegralDescription
   * @summary 积分-积分说明[暂未实现]
   * @tags (JC)设置/积分
   * @response `200` `PointsLogsVO` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/setting/getIntegralDescription_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/setting/getIntegralDescription`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<{ data?: PointsLogsVO; code?: number }>,
  /**
   * No description
   * @name GET /user/api/home/primary/banners
   * @summary 自营商城-banner列表
   * @tags 首页
   * @response `200` `(Banner)[]` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/home/primary/banners_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/home/primary/banners`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<{ data?: Banner[]; code?: number }>,
  /**
   * No description
   * @name GET /user/api/user/userInfo
   * @summary 查询用户详情
   * @tags 用户相关
   * @response `200` `User` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/user/userInfo_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/user/userInfo`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<{ data?: User; code?: number }>,
  /**
   * No description
   * @name PUT /user/api/user/userInfo
   * @summary 设置用户信息
   * @tags 用户相关
   * @response `200` `PointsLogsAddDTO` OK |  `201` `PointsLogsAddDTO` Created |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/user/userInfo_PUT": (data: UserSetDTO, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/user/userInfo`,
      method: "PUT",
      data: data,
      ...options
    }) as unknown as Promise<{ data?: PointsLogsAddDTO; code?: number }>,
  /**
   * No description
   * @name GET /user/api/activity/goods/sku/{goodsNo}
   * @summary 超值拼团-商品规格详情(点击开团后可选的规格)
   * @tags 拼团
   * @response `200` `Goods` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/activity/goods/sku/{goodsNo}_GET": (goodsNo: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/activity/goods/sku/${goodsNo}`,
      method: "GET",
      ...options
    }) as unknown as Promise<{ data?: Goods; code?: number }>,
  /**
   * No description
   * @name GET /user/api/community/getCommunityPostsByMe
   * @summary 社区-玩家社区-我发布的
   * @tags (JC)社区
   * @response `200` `PageInfoCommunityPosts` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/community/getCommunityPostsByMe_GET": (
    query: UserApiCommunityGetCommunityPostsByMeGetParams,
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/user/api/community/getCommunityPostsByMe`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<{ data?: PageInfoCommunityPosts; code?: number }>,
  /**
   * No description
   * @name GET /user/api/community/getUserByUserNo/{userNo}
   * @summary 社区-玩家社区-当前人简介获取
   * @tags (JC)社区
   * @response `200` `UserDetailInfoVO` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/community/getUserByUserNo/{userNo}_GET": (userNo: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/community/getUserByUserNo/${userNo}`,
      method: "GET",
      ...options
    }) as unknown as Promise<{ data?: UserDetailInfoVO; code?: number }>,
  /**
   * No description
   * @name POST /user/api/auth/miniLogin
   * @summary 微信小程序授权登录
   * @tags 登录注册
   * @response `200` `UserWithToken` OK |  `201` `PointsLogsAddDTO` Created |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/auth/miniLogin_POST": (data: WechatLogin, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/auth/miniLogin`,
      method: "POST",
      data: data,
      ...options
    }) as unknown as Promise<{ data?: UserWithToken; code?: number }>,
  /**
   * No description
   * @name GET /user/api/dis/partner/detail
   * @summary 城市合伙人中心-统计结果
   * @tags 分销
   * @response `200` `PartnerManagement` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/dis/partner/detail_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/dis/partner/detail`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<{ data?: PartnerManagement; code?: number }>,
  /**
   * No description
   * @name GET /user/api/home/recommended/liveBanner
   * @summary 分类下的直播banner
   * @tags 首页
   * @response `200` `(Banner)[]` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/home/recommended/liveBanner_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/home/recommended/liveBanner`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<{ data?: Banner[]; code?: number }>,
  /**
   * No description
   * @name GET /user/api/activity/groups/order/{orderNo}
   * @summary 我的拼团订单详情
   * @tags 拼团
   * @response `200` `Order` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/activity/groups/order/{orderNo}_GET": (orderNo: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/activity/groups/order/${orderNo}`,
      method: "GET",
      ...options
    }) as unknown as Promise<{ data?: Order; code?: number }>,
  /**
   * No description
   * @name POST /user/api/store/coupons/{couponNo}
   * @summary （店铺内）优惠券-领取
   * @tags 首页-店铺
   * @response `200` `PointsLogsAddDTO` OK |  `201` `PointsLogsAddDTO` Created |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/store/coupons/{couponNo}_POST": (couponNo: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/store/coupons/${couponNo}`,
      method: "POST",
      ...options
    }) as unknown as Promise<{ data?: PointsLogsAddDTO; code?: number }>,
  /**
   * No description
   * @name GET /user/api/store/
   * @summary 列表-排序(分页)
   * @tags 首页-店铺
   * @response `200` `PageInfoStore` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/store/_GET": (query: UserApiStoreGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/store/`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<{ data?: PageInfoStore; code?: number }>,
  /**
   * No description
   * @name POST /user/api/shoppingCart/updateShoppingCatInfo
   * @summary 购物车-修改购物车购买数量
   * @tags (JC)购物车
   * @response `200` `PointsLogsAddDTO` OK |  `201` `PointsLogsAddDTO` Created |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/shoppingCart/updateShoppingCatInfo_POST": (data: UserShopCartUpdateDTO, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/shoppingCart/updateShoppingCatInfo`,
      method: "POST",
      data: data,
      ...options
    }) as unknown as Promise<{ data?: PointsLogsAddDTO; code?: number }>,
  /**
   * No description
   * @name GET /user/api/activity/goods/detail/
   * @summary 超值拼团-商品详情
   * @tags 拼团
   * @response `200` `GroupWork` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/activity/goods/detail/_GET": (query: UserApiActivityGoodsDetailGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/activity/goods/detail/`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<{ data?: GroupWork; code?: number }>,
  /**
   * No description
   * @name GET /user/api/goods
   * @summary 搜索商品
   * @tags 商品
   * @response `200` `PageInfoGoods` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/goods_GET": (query: UserApiGoodsGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/goods`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<{ data?: PageInfoGoods; code?: number }>,
  /**
   * No description
   * @name GET /user/api/myCoupon/
   * @summary 优惠券信息列表
   * @tags (JC)我的优惠券
   * @response `200` `MyCouponListVO` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/myCoupon/_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/myCoupon/`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<{ data?: MyCouponListVO; code?: number }>,
  /**
   * No description
   * @name GET /user/api/dis/partner/detail/record
   * @summary 城市合伙人中心-最近30天记录
   * @tags 分销
   * @response `200` `PageInfoPartnerRebateInformation` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/dis/partner/detail/record_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/dis/partner/detail/record`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<{ data?: PageInfoPartnerRebateInformation; code?: number }>,
  /**
   * No description
   * @name GET /user/api/auctionGoods/auctionGoods/{goodsNo}
   * @summary 拍卖商品详情
   * @tags 拍卖商品
   * @response `200` `AuctionGoods` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/auctionGoods/auctionGoods/{goodsNo}_GET": (goodsNo: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/auctionGoods/auctionGoods/${goodsNo}`,
      method: "GET",
      ...options
    }) as unknown as Promise<{ data?: AuctionGoods; code?: number }>,
  /**
   * No description
   * @name GET /user/api/store/businesscard/{id}
   * @summary 商家信息-店铺名片
   * @tags 首页-店铺
   * @response `200` `Store` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/store/businesscard/{id}_GET": (id: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/store/businesscard/${id}`,
      method: "GET",
      ...options
    }) as unknown as Promise<{ data?: Store; code?: number }>,
  /**
   * No description
   * @name GET /user/api/messageCenter/getCommunityCommentAndPosts
   * @summary 消息中心-评论与点赞[暂未完整实现]
   * @tags (JC)消息中心
   * @response `200` `PageInfoStationLetter` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/messageCenter/getCommunityCommentAndPosts_GET": (
    params: Record<string, any> = {},
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/user/api/messageCenter/getCommunityCommentAndPosts`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<{ data?: PageInfoStationLetter; code?: number }>,
  /**
   * @description <br>1.isGive-当前用户是否点赞(0否1是)<br>2.isFollow-当前用户是否关注(0否1是)<br>3.isCollection-当前用户是否收藏(0否1是)<br>4.isViews-当前用户是否观看(0否1是)
   * @name GET /user/api/community/getCommunityPosts
   * @summary 社区帖子-列表(含搜索)
   * @tags (JC)社区
   * @response `200` `PageInfoCommunityPosts` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/community/getCommunityPosts_GET": (
    query: UserApiCommunityGetCommunityPostsGetParams,
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/user/api/community/getCommunityPosts`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<{ data?: PageInfoCommunityPosts; code?: number }>,
  /**
   * No description
   * @name POST /user/api/activity/join
   * @summary 超值拼团-加入拼团（生成订单及预订单编号-返回值未完成）
   * @tags 拼团
   * @response `200` `JsPayResponse` OK |  `201` `PointsLogsAddDTO` Created |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/activity/join_POST": (data: OrderGroupWorkItemAddDTO, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/activity/join`,
      method: "POST",
      data: data,
      ...options
    }) as unknown as Promise<{ data?: JsPayResponse; code?: number }>,
  /**
   * No description
   * @name GET /user/api/store/storeinfo/detail/{id}
   * @summary 商家信息-企业资质
   * @tags 首页-店铺
   * @response `200` `StoreInfo` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/store/storeinfo/detail/{id}_GET": (id: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/store/storeinfo/detail/${id}`,
      method: "GET",
      ...options
    }) as unknown as Promise<{ data?: StoreInfo; code?: number }>,
  /**
   * No description
   * @name POST /user/api/user/savePhone
   * @summary 微信解析用户手机号并保存
   * @tags 用户相关
   * @response `200` `PointsLogsAddDTO` OK |  `201` `PointsLogsAddDTO` Created |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/user/savePhone_POST": (data: Type微信解密数据, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/user/savePhone`,
      method: "POST",
      data: data,
      ...options
    }) as unknown as Promise<{ data?: PointsLogsAddDTO; code?: number }>,
  /**
   * No description
   * @name GET /user/api/dis/partner/richText/detail
   * @summary 城市合伙人-(合伙人/须知/邀请规则/提现说明)
   * @tags 分销
   * @response `200` `PartnerPromotionConfig` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/dis/partner/richText/detail_GET": (
    query: UserApiDisPartnerRichTextDetailGetParams,
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/user/api/dis/partner/richText/detail`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<{ data?: PartnerPromotionConfig; code?: number }>,
  /**
   * No description
   * @name GET /user/api/setting/getPointsLogsByComplaintsSuggestions
   * @summary 签到日历
   * @tags (JC)设置/积分
   * @response `200` `PageInfoPointsLogs` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/setting/getPointsLogsByComplaintsSuggestions_GET": (
    params: Record<string, any> = {},
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/user/api/setting/getPointsLogsByComplaintsSuggestions`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<{ data?: PageInfoPointsLogs; code?: number }>,
  /**
   * No description
   * @name GET /user/api/dis/partner/store/list
   * @summary 城市合伙人中心-我的商户列表
   * @tags 分销
   * @response `200` `PageInfoPartnerManagementMerchant` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/dis/partner/store/list_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/dis/partner/store/list`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<{ data?: PageInfoPartnerManagementMerchant; code?: number }>,
  /**
   * No description
   * @name GET /user/api/activity/pay
   * @summary 超值拼团-微信支付(生成预支付订单-返回值未完成)
   * @tags 拼团
   * @response `200` `JsPayResponse` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/activity/pay_GET": (query: UserApiActivityPayGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/activity/pay`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<{ data?: JsPayResponse; code?: number }>,
  /**
   * No description
   * @name GET /user/api/goods/detail
   * @summary 查询商品详情
   * @tags 商品
   * @response `200` `GoodsDetailVo` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/goods/detail_GET": (query: UserApiGoodsDetailGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/goods/detail`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<{ data?: GoodsDetailVo; code?: number }>,
  /**
   * No description
   * @name GET /user/api/dis/partner/invite
   * @summary 城市合伙人中心-邀请开店
   * @tags 分销
   * @response `200` `PartnerManagement` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/dis/partner/invite_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/dis/partner/invite`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<{ data?: PartnerManagement; code?: number }>,
  /**
   * No description
   * @name GET /user/api/activity/
   * @summary 超值拼团-列表筛选
   * @tags 拼团
   * @response `200` `PageInfoGroupWork` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/activity/_GET": (query: UserApiActivityGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/activity/`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<{ data?: PageInfoGroupWork; code?: number }>,
  /**
   * No description
   * @name PUT /user/api/setting/modifyUserReceivingAddress
   * @summary 设置-收货地址-修改地址
   * @tags (JC)设置/积分
   * @response `200` `PointsLogsAddDTO` OK |  `201` `PointsLogsAddDTO` Created |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/setting/modifyUserReceivingAddress_PUT": (
    data: UserReceivingAddressUpdateDTO,
    options: RequestConfig = {}
  ) =>
    requestInstance({
      url: `/user/api/setting/modifyUserReceivingAddress`,
      method: "PUT",
      data: data,
      ...options
    }) as unknown as Promise<{ data?: PointsLogsAddDTO; code?: number }>,
  /**
   * No description
   * @name GET /user/api/home/banners
   * @summary banner列表
   * @tags 首页
   * @response `200` `(Banner)[]` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/home/banners_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/home/banners`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<{ data?: Banner[]; code?: number }>,
  /**
   * No description
   * @name GET /user/api/setting/getMyIntegral
   * @summary 积分
   * @tags (JC)设置/积分
   * @response `200` `PointsLogsVO` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/setting/getMyIntegral_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/setting/getMyIntegral`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<{ data?: PointsLogsVO; code?: number }>,
  /**
   * No description
   * @name GET /user/api/setting/getUserAccountInformation
   * @summary 设置-账户信息
   * @tags (JC)设置/积分
   * @response `200` `User` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/setting/getUserAccountInformation_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/setting/getUserAccountInformation`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<{ data?: User; code?: number }>,
  /**
   * No description
   * @name GET /user/api/goodsClassify
   * @summary 查询全部分类
   * @tags 商品分类列表
   * @response `200` `(GoodsClassify)[]` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/goodsClassify_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/goodsClassify`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<{ data?: GoodsClassify[]; code?: number }>,
  /**
   * No description
   * @name GET /user/api/community/getCommunityBanner/{id}
   * @summary 社区-轮播图详情
   * @tags (JC)社区
   * @response `200` `Banner` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/community/getCommunityBanner/{id}_GET": (id: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/community/getCommunityBanner/${id}`,
      method: "GET",
      ...options
    }) as unknown as Promise<{ data?: Banner; code?: number }>,
  /**
   * No description
   * @name GET /user/api/store/detail/{id}
   * @summary 商家信息-详情
   * @tags 首页-店铺
   * @response `200` `Store` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/store/detail/{id}_GET": (id: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/store/detail/${id}`,
      method: "GET",
      ...options
    }) as unknown as Promise<{ data?: Store; code?: number }>,
  /**
   * No description
   * @name GET /user/api/home/primary/categoryList
   * @summary 直播分类列表
   * @tags 首页
   * @response `200` `(LiveCategory)[]` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/home/primary/categoryList_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/home/primary/categoryList`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<{ data?: LiveCategory[]; code?: number }>,
  /**
   * No description
   * @name DELETE /user/api/setting/removeUserReceivingAddress/{id}
   * @summary 设置-收货地址-删除地址
   * @tags (JC)设置/积分
   * @response `200` `PointsLogsAddDTO` OK |  `204` `PointsLogsAddDTO` No Content |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden
   */
  "/user/api/setting/removeUserReceivingAddress/{id}_DELETE": (id: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/setting/removeUserReceivingAddress/${id}`,
      method: "DELETE",
      ...options
    }) as unknown as Promise<{ data?: PointsLogsAddDTO; code?: number }>,
  /**
   * No description
   * @name GET /user/api/community/getCommunityPosts/{id}
   * @summary 社区-帖子详情
   * @tags (JC)社区
   * @response `200` `CommunityPostsVO` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/community/getCommunityPosts/{id}_GET": (id: string, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/community/getCommunityPosts/${id}`,
      method: "GET",
      ...options
    }) as unknown as Promise<{ data?: CommunityPostsVO; code?: number }>,
  /**
   * No description
   * @name GET /user/api/home/recommended/goods
   * @summary 好物推荐列表
   * @tags 首页
   * @response `200` `(Goods)[]` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/home/recommended/goods_GET": (params: Record<string, any> = {}, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/home/recommended/goods`,
      method: "GET",
      params,
      ...options
    }) as unknown as Promise<{ data?: Goods[]; code?: number }>,
  /**
   * No description
   * @name GET /user/api/popularSearchTerms/
   * @summary 查询热门搜索词信息(不分页 最大8个)
   * @tags 热门搜索词管理
   * @response `200` `(PopularSearchTerms)[]` OK |  `401` `PointsLogsAddDTO` Unauthorized |  `403` `PointsLogsAddDTO` Forbidden |  `404` `PointsLogsAddDTO` Not Found
   */
  "/user/api/popularSearchTerms/_GET": (query: UserApiPopularSearchTermsGetParams, options: RequestConfig = {}) =>
    requestInstance({
      url: `/user/api/popularSearchTerms/`,
      method: "GET",
      params: query,
      ...options
    }) as unknown as Promise<{ data?: PopularSearchTerms[]; code?: number }>
};
