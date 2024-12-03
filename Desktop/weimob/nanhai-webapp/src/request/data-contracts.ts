/**
 * 用户个人简介
 */
export interface UserDetailInfoUpdateDTO {
  /** 个人简介 */
  personalProfile?: string;

  /** 用户全局唯一编号 */
  userNo?: string;
}

export interface StoreUserFocusAddDTO {
  /**
   * 售后服务-评分
   * @format int32
   */
  afterSale: number;

  /**
   * 店铺ID
   * @format int32
   */
  id: number;

  /**
   * 品质相符-评分
   * @format int32
   */
  quality: number;

  /**
   * 服务态度-评分
   * @format int32
   */
  serviceAttitude: number;
}

/**
 * 社区评论管理-基础添加请求参数
 */
export interface CommunityCommentAddDTO {
  /** 评论内容 */
  content?: string;

  /** 评论人头像 */
  headImg?: string;

  /** 评论人昵称 */
  name?: string;

  /** 评论人openID */
  openId?: string;

  /**
   * 帖子ID
   * @format int32
   */
  postsId?: number;

  /** 发帖名称 */
  postsName?: string;
}

/**
 * 城市合伙人-全部商家列表/合计金额
 */
export interface PartnerOrdersRecordVO {
  /** 全部商家列表 */
  storeList?: StoreInfo[];

  /** 马上提现(合计) */
  total?: number;
}

/**
 * 直播间信息
 */
export interface LiveRoomInfo {
  /**
   * 主播id
   * @format int32
   * @example 1
   */
  anchorId?: number;

  /** 主播姓名 */
  anchorName?: string;

  /** 主播头像 */
  anchorPhoto?: string;

  /**
   * 直播开始时间
   * @format date-time
   */
  beginTime?: string;

  /**
   * 精品直播主键
   * @format int32
   * @example 1
   */
  id?: number;

  /**
   * 是否预约 0 未预约 1已预约
   * @format int32
   */
  isInvalid?: number;

  /** 封面图片 */
  logoPic?: string;

  /** HTTP拉流地址 */
  pullUrl?: string;

  /** 推流地址 */
  pushUrl?: string;

  /** 直播间标题 */
  roomTitle?: string;

  /**
   * 直播状态：0-初始化 1-直播中 2-已结束
   * @format int32
   */
  status?: number;

  /** 店铺地址 */
  storeAddress?: string;

  /** 店铺名称 */
  storeName?: string;
}

/**
 * 用户预约直播表-基础添加请求参数
 */
export interface UserAppointmentLiveRoomAddDTO {
  /**
   * 是否预约 0 未预约 1已预约
   * @format int32
   */
  isInvalid: number;

  /** 直播间ID */
  liveroomid: string;
}

/**
 * 确认订单响应项
 */
export interface OrderResultItem {
  /** 优惠劵总金额 */
  couponPrice?: number;

  /** 抵扣金额 */
  deductionPrice?: number;

  /** 折扣金额 */
  discountPrice?: number;

  /** 商品表 */
  goods?: Goods;

  /** 商品sku详情 */
  goodsSkuDetail?: GoodsSkuDetail;
  orderGoodsNo?: string;

  /**
   * 购买数量
   * @format int32
   * @example 1
   */
  quantity?: number;

  /**
   * 购物车id(非购物车过来不传)
   * @format int32
   * @example 购物车id
   */
  shopId?: number;

  /** 商品单价(商品项销售价) */
  skuPrice?: number;

  /** 商品总价(商品项销售价/预售价 * 数量) */
  totalGoodsPrice?: number;
}

/**
 * 我的优惠券返回体
 */
export interface MyCouponListVO {
  /** 已失效的优惠券 */
  invalidCouponList?: CouponInfoVO[];

  /** 未使用的优惠券 */
  unUsedCouponList?: CouponInfoByStoreVO[];

  /** 已使用的优惠券 */
  usedCouponList?: CouponInfoVO[];
}

/**
 * 确认订单响应项
 */
export interface OrderStoreResult {
  /** 优惠劵总金额 */
  couponPrice?: number;

  /** 抵扣金额 */
  deductionPrice?: number;

  /** 运费 */
  deliveryAmount?: number;

  /** 折扣金额 */
  discountPrice?: number;

  /** 订单编号 */
  orderNo?: string;

  /** 备注 */
  remark?: string;

  /** 确认订单响应 */
  resultItems?: OrderResultItem[];

  /** 门店表 */
  store?: Store;

  /**
   * 小计
   * @example 1
   */
  subtotal?: number;

  /** 合计 */
  sumPrice?: number;

  /**
   * 商品总价
   * @example 1
   */
  totalGoodsPrice?: number;
}

/**
 * 拍卖商品表
 */
export interface AuctionGoods {
  /** 拍卖记录 */
  auctionWorkGoodsDetails?: AuctionWorkGoodsDetailsDTO[];

  /**
   * 活动id
   * @format int32
   * @example 1
   */
  auctionWorkId?: number;

  /** 商品图片列表 */
  bannerImgUrls?: string;

  /** 商品详情 */
  detail?: string;

  /**
   * 活动结束时间
   * @format date-time
   */
  endTime?: string;

  /** 活动结束时间 单位秒 */
  endTimeString?: string;

  /** 商品名称 */
  goodsName?: string;

  /** 商品编码 */
  goodsNo?: string;

  /** 拍卖商品规格列表 */
  goodsSpecs?: GoodsSpecRelation[];

  /**
   * 商品id
   * @format int32
   * @example 1
   */
  id?: number;

  /** 起拍价 */
  minimumPrice?: number;

  /** 加价幅度 */
  minimumPrisePrice?: number;

  /**
   * 活动开始时间
   * @format date-time
   */
  startTime?: string;

  /** 活动开始时间 单位秒 */
  startTimeString?: string;

  /**
   * 活动状态 0未开始 1活动中 2 已结束
   * @format int32
   * @example 1
   */
  status?: number;

  /** 门店表 */
  store?: Store;

  /**
   * 店铺id
   * @format int32
   * @example 1
   */
  storeId?: number;

  /** 店铺logo */
  storeLogo?: string;

  /** 店铺名称 */
  storeName?: string;

  /** 用户收货地址 */
  userReceivingAddress?: UserReceivingAddress;
}

export interface PageInfoCommunityPosts {
  /** @format int32 */
  endRow?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  list?: CommunityPosts[];

  /** @format int32 */
  navigateFirstPage?: number;

  /** @format int32 */
  navigateLastPage?: number;

  /** @format int32 */
  navigatePages?: number;
  navigatepageNums?: number[];

  /** @format int32 */
  nextPage?: number;

  /** @format int32 */
  pageNum?: number;

  /** @format int32 */
  pageSize?: number;

  /** @format int32 */
  pages?: number;

  /** @format int32 */
  prePage?: number;

  /** @format int32 */
  size?: number;

  /** @format int32 */
  startRow?: number;

  /** @format int64 */
  total?: number;
}

/**
 * 城市合伙人-推广海报配置
 */
export interface PartnerPromotionPosterConfig {
  /**
   * 创建时间
   * @format date-time
   */
  gmtCreate?: string;

  /**
   * 修改时间
   * @format date-time
   */
  gmtModified?: string;

  /**
   * @format int32
   * @example 1
   */
  id?: number;

  /**
   * 删除状态 0 未删除 1 删除
   * @format int32
   */
  isDel?: number;

  /**
   * 展示状态 0展示 1不展示
   * @format int32
   */
  isShow?: number;

  /** 海报图片(仅限一张) */
  posterImage?: string;

  /** 海报名称 */
  posterName?: string;

  /**
   * 排序
   * @format int32
   * @example 1
   */
  sort?: number;
}

/**
 * 社区热搜词配置
 */
export interface CommunityHotWords {
  /**
   * 区域id
   * @format int32
   * @example 1
   */
  areaId?: number;

  /** 区域名称 */
  areaName?: string;

  /**
   * 创建时间
   * @format date-time
   */
  gmtCreate?: string;

  /**
   * 修改时间
   * @format date-time
   */
  gmtModified?: string;

  /** 热搜词 */
  hotWords?: string;

  /** 热搜指数 */
  hotWordsIndex?: string;

  /**
   * @format int32
   * @example 1
   */
  id?: number;

  /**
   * 删除状态(0正常1删除)
   * @format int32
   * @example 1
   */
  isDel?: number;

  /**
   * 展示状态(0展示1不展示)
   * @format int32
   * @example 1
   */
  showStarus?: number;

  /**
   * 排序
   * @format int32
   * @example 1
   */
  sort?: number;
}

export interface PageInfoBanner {
  /** @format int32 */
  endRow?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  list?: Banner[];

  /** @format int32 */
  navigateFirstPage?: number;

  /** @format int32 */
  navigateLastPage?: number;

  /** @format int32 */
  navigatePages?: number;
  navigatepageNums?: number[];

  /** @format int32 */
  nextPage?: number;

  /** @format int32 */
  pageNum?: number;

  /** @format int32 */
  pageSize?: number;

  /** @format int32 */
  pages?: number;

  /** @format int32 */
  prePage?: number;

  /** @format int32 */
  size?: number;

  /** @format int32 */
  startRow?: number;

  /** @format int64 */
  total?: number;
}

/**
 * 商家中心资料
 */
export interface StoreInfo {
  /** 公司地址 */
  area?: string;

  /** 详细地址 */
  areaDetail?: string;

  /**
   * 1 商家 2 自营商家
   * @format int32
   */
  attributionType?: number;

  /**
   * 审核状态 0 未审核 1 审核通过 2 审核拒绝
   * @format int32
   */
  auditStatus?: number;

  /**
   * 审核时间
   * @format date-time
   */
  auditStatusTime?: string;

  /** 审核人id */
  auditUserId?: string;

  /** 审核人姓名 */
  auditUserName?: string;

  /** 执照编号 */
  businessLicenseNo?: string;

  /** 营业执照图片 */
  businessLicensePic?: string;

  /**
   * 证书期限-结束时间
   * @format date-time
   */
  certificateDeadlineEnd?: string;

  /**
   * 证书期限-开始时间
   * @format date-time
   */
  certificateDeadlineStart?: string;

  /** 公司类型 */
  companyType?: string;

  /** 联系方式 */
  contactNumber?: string;

  /** 联系人 */
  contactor?: string;

  /**
   * 成立时间
   * @format date-time
   */
  establishedTime?: string;

  /**
   * 创建时间
   * @format date-time
   */
  gmtCreate?: string;

  /**
   * 最后修改时间
   * @format date-time
   */
  gmtModified?: string;

  /**
   * 公司ID
   * @format int32
   * @example 1
   */
  id?: number;

  /** 身份证 */
  idCard?: string;

  /** 身份证反面 */
  idCardPicDown?: string;

  /** 身份证正面 */
  idCardPicUp?: string;

  /** 邀请码 */
  inviteCode?: string;

  /** 邀请人编号 */
  inviteUserNo?: string;

  /**
   * 删除状态(默认0未删除1删除)
   * @format int32
   */
  isDel?: number;

  /** 法人信息 */
  legalPerson?: string;

  /**
   * 法人性别 0 男 1 女
   * @format int32
   */
  legalPersonGender?: number;

  /** 公司logo */
  logo?: string;

  /** 主营行业 */
  mainIndustry?: string;

  /**
   * 保证金 0 未缴纳 1 已缴纳
   * @format int32
   */
  marginStatus?: number;

  /** 公司名称 */
  name?: string;

  /** 注册资金 */
  registeredCapital?: string;

  /** 登记机关 */
  registrationAuthority?: string;

  /** 备注 */
  remark?: string;

  /** 商家编号 */
  storeInfoNo?: string;

  /** 商家店铺编号 */
  storeNo?: string;

  /** 年营业额 */
  turnover?: string;
}

export interface GrantedAuthority {
  authority?: string;
}

/**
 * 商品表
 */
export interface Goods {
  /**
   * 商品实际销量
   * @format int32
   * @example 1
   */
  actualSales?: number;

  /**
   * 归属类型 1 商家 2 自营商家
   * @format int32
   */
  attributionType?: number;

  /** @format int32 */
  auctionWorkId?: number;

  /** 商品图片列表 */
  bannerImgUrls?: string;

  /**
   * 商品基础销量(虚拟)
   * @format int32
   * @example 1
   */
  baseSales?: number;

  /**
   * 商品类型id 如 3
   * @format int32
   * @example 1
   */
  classifyId?: number;

  /** 商品类型辅助回显与查询id，/分隔  /1/2/3 */
  classifyIdText?: string;
  classifyIds?: number[];

  /** 商品类型名称集合 */
  classifyTexts?: string[];

  /** 商品封面 */
  coverImgUrl?: string;

  /** 商品详情 */
  detail?: string;

  /**
   * 运费模板id
   * @format int32
   * @example 1
   */
  freightId?: number;

  /**
   * 创建时间
   * @format date-time
   */
  gmtCreate?: string;

  /**
   * 修改时间
   * @format date-time
   */
  gmtModified?: string;

  /** 商品名称 */
  goodsName?: string;

  /** 商品编号 */
  goodsNo?: string;
  goodsNos?: string[];

  /** 商品简述 */
  goodsSketch?: string;

  /** 商品规格详情 */
  goodsSkuDetailList?: GoodsSkuDetail[];

  /** 商品规格信息 */
  goodsSkuDetails?: GoodsSkuDetail[];

  /** 商品-规格引用 */
  goodsSpecList?: GoodsSpec[];

  /** 拍卖商品规格列表 */
  goodsSpecs?: GoodsSpecRelation[];

  /**
   * 商品类型 0 普通商品 1 拼团活动商品 2 拍卖商品
   * @format int32
   */
  goodsType?: number;
  goodsTypes?: number[];

  /** @format int32 */
  groupWorkId?: number;
  highestPrice?: number;

  /**
   * @format int32
   * @example 1
   */
  id?: number;

  /**
   * 是否删除 0 否 1是
   * @format int32
   */
  isDel?: number;

  /**
   * 商品是否被选择 0 未选择 1 已选择
   * @format int32
   */
  isSelected?: number;

  /**
   * 是否上架 0 否 1是
   * @format int32
   */
  isShelved?: number;

  /** 起拍价/普通商品为最低价 */
  minimumPrice?: number;

  /** 加价幅度/普通商品为最低划线价 */
  minimumPrisePrice?: number;

  /** 商品原价 */
  originPrice?: number;

  /** 商品价格 */
  salesPrice?: number;

  /**
   * 排序 降序
   * @format int32
   * @example 1
   */
  sort?: number;

  /**
   * 总库存
   * @format int32
   */
  stock?: number;

  /**
   * 商品所属店铺ID
   * @format int32
   */
  storeId?: number;

  /** 所属商家 */
  storeInfoName?: string;

  /**
   * 商品所属店铺名称
   * @format int32
   */
  storeName?: number;

  /** 店铺编号 */
  storeNo?: string;
  storeNos?: string[];

  /** @format int32 */
  totalSales?: number;
}

/**
 * 商品详情页面
 */
export interface MyGoodsDetailVo {
  /**
   * 商品实际销量
   * @format int32
   * @example 1
   */
  actualSales?: number;

  /** 商品封面 */
  coverImgUrl?: string;

  /** 商品ID */
  goodsId?: string;

  /** 商品名称 */
  goodsName?: string;

  /** 商品No */
  goodsNo?: string;

  /**
   * 是否失效 0 未失效 1 失效
   * @format int32
   */
  isInvalid?: number;

  /** 划线价 */
  marketPrice?: number;

  /** 零售价 */
  salesPrice?: number;

  /** sku名称 */
  skuName?: string;

  /** 商品规格SKU */
  skuNo?: string;

  /** 店铺ID */
  storeId?: string;

  /** 店铺名称 */
  storeName?: string;

  /** 店铺No */
  storeNo?: string;
}

/**
 * 城市合伙人-合伙人管理
 */
export interface PartnerManagement {
  /** 累计获得佣金 */
  allCommission?: number;

  /**
   * 累计推广商家数
   * @format int32
   * @example 1
   */
  allNumberCurrently?: number;

  /** 累计提现佣金 */
  allWithdrawalCommission?: number;

  /** 当前佣金 */
  commission?: number;

  /**
   * 创建时间
   * @format date-time
   */
  gmtCreate?: string;

  /**
   * 修改时间
   * @format date-time
   */
  gmtModified?: string;

  /**
   * @format int32
   * @example 1
   */
  id?: number;

  /** 城市合伙人邀请码 */
  inviteCode?: string;

  /** 用户手机号 */
  mobile?: string;

  /** 昵称 */
  name?: string;

  /**
   * 当前推广商家数
   * @format int32
   * @example 1
   */
  numberCurrently?: number;

  /** 合伙人用户微信openID */
  openId?: string;

  /**
   * 开通时间-开通城市合伙人的时间
   * @format date-time
   */
  openingTime?: string;

  /** 海报图片列表 */
  pics?: PartnerPromotionPosterConfig[];

  /**
   * 状态(0启用1禁用)
   * @format int32
   */
  status?: number;
}

/**
 * 积分返回
 */
export interface PointsLogsVO {
  /** 当前积分 */
  integral?: number;

  /** 积分历史记录 */
  pointsLogsList?: PointsLogs[];
}

/**
 * 用户个人简介
 */
export interface UserDetailInfoByOpenIdDTO {
  /** 微信openID */
  openId?: string;
}

/**
 * 商品详情页面
 */
export interface GoodsDetailVo {
  /**
   * 收藏人数
   * @format int32
   */
  collectNum?: number;

  /** 商品优惠券 */
  couponDetails?: CouponDetail[];

  /** 商品表 */
  goods?: Goods;

  /** 是否收藏 */
  isCollect?: boolean;

  /** 门店表 */
  store?: Store;
}

/**
 * 用户互相关注
 */
export interface UserMutualConcern {
  /** 粉丝状态 */
  focusStatus?: string;

  /** 头像(对方) */
  headImgB?: string;

  /**
   * @format int32
   * @example 1
   */
  id?: number;

  /** 昵称(对方) */
  nameB?: string;

  /** 微信openID(自己) */
  openIdA?: string;

  /** 微信openID(对方) */
  openIdB?: string;

  /** 微信unionId(自己) */
  unionIdA?: string;

  /** 微信unionId(对方) */
  unionIdB?: string;

  /** 用户全局唯一编号(自己) */
  userNoA?: string;

  /** 用户全局唯一编号(对方) */
  userNoB?: string;
}

export interface PageInfoPartnerManagementMerchant {
  /** @format int32 */
  endRow?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  list?: PartnerManagementMerchant[];

  /** @format int32 */
  navigateFirstPage?: number;

  /** @format int32 */
  navigateLastPage?: number;

  /** @format int32 */
  navigatePages?: number;
  navigatepageNums?: number[];

  /** @format int32 */
  nextPage?: number;

  /** @format int32 */
  pageNum?: number;

  /** @format int32 */
  pageSize?: number;

  /** @format int32 */
  pages?: number;

  /** @format int32 */
  prePage?: number;

  /** @format int32 */
  size?: number;

  /** @format int32 */
  startRow?: number;

  /** @format int64 */
  total?: number;
}

/**
 * 平台配置-投诉与建议-基础添加请求参数
 */
export interface ComplaintsSuggestionsAddDTO {
  /** 反馈内容 */
  feedbackContent?: string;

  /** 图片 */
  image?: string;

  /** 手机号 */
  phone?: string;
}

/**
 * 确认订单请求参数
 */
export interface ConfirmOrderReq {
  /**
   * 订单参加活动ID(拼团为groupWorkId)
   * @format int32
   */
  activityId?: number;

  /**
   * 活动类型 0无活动 1拼团
   * @format int32
   */
  activityType?: number;

  /**
   * 收货地址id(没有不传)
   * @format int32
   * @example 1
   */
  addressId?: number;

  /**
   * 抵扣卷号(没有不传)
   * @example 1
   */
  deductionNo?: string;

  /**
   * 折扣卷号(没有不传)
   * @example 1
   */
  discountNo?: string;

  /**
   * 团队编码(如果没有团队编码 说明是拼团发起人)
   * @example 0
   */
  groupNo?: string;

  /**
   * 确认订单请求项(店铺编号:下单数据)
   * @example 1
   */
  orderStoreReqs?: Record<string, OrderStoreReq>;

  /**
   * 订单统一支付编号(没有不传)
   * @example 1
   */
  payOrderNo?: string;

  /** 不用传 */
  userNo?: string;
}

/**
 * 用户表
 */
export interface User {
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  authorities?: GrantedAuthority[];

  /** 电子钱包余额 */
  balance?: number;

  /**
   * 生日
   * @format date-time
   */
  birthday?: string;

  /**
   * 渠道
   * @format int32
   * @example 1
   */
  channel?: number;
  credentialsNonExpired?: boolean;
  enabled?: boolean;

  /**
   * 1男 2女 0未知
   * @format int32
   */
  gender?: number;

  /**
   * 注册时间
   * @format date-time
   */
  gmtCreate?: string;

  /** 成长值 */
  growth?: number;

  /**
   * 导购ID
   * @format int32
   * @example 1
   */
  guideId?: number;

  /** 头像 */
  headImg?: string;

  /**
   * @format int32
   * @example 1
   */
  id?: number;

  /** 当前积分 */
  integral?: number;

  /**
   * 用户状态 0 正常 1 正在流失 2已流失
   * @format int32
   */
  invitationStatus?: number;

  /** 用户手机号 */
  mobile?: string;

  /** 昵称 */
  name?: string;

  /** 微信openID */
  openId?: string;

  /** 密码 */
  password?: string;

  /** 支付密码 */
  payPassword?: string;

  /** 个人简介 */
  personalProfile?: string;

  /** 真实姓名 */
  realName?: string;

  /** 备注 */
  remark?: string;

  /**
   * 是否跳过密码 0 不跳过 1 跳过
   * @format int32
   */
  skipPassword?: number;

  /**
   * 用户状态 0 正常 1 注销
   * @format int32
   */
  status?: number;

  /**
   * 所属门店
   * @format int32
   * @example 1
   */
  storeId?: number;

  /** 微信unionId */
  unionId?: string;

  /** 用户全局唯一编号 */
  userNo?: string;
  username?: string;
}

/**
 * 轮播图管理
 */
export interface Banner {
  /** 小程序ID */
  appId?: string;

  /**
   * 归属类型 0 平台 1 商家 2 自营商家
   * @format int32
   */
  attributionType?: number;

  /** 创建人 */
  createUsername?: string;

  /**
   * 自定义类型 当跳转类型为0 0H5链接 1小程序 2富文本
   * @format int32
   */
  customType?: number;

  /**
   * 创建时间
   * @format date-time
   */
  gmtCreate?: string;

  /**
   * 更新时间
   * @format date-time
   */
  gmtModified?: string;

  /**
   * @format int32
   * @example 1
   */
  id?: number;

  /**
   * 是否删除 0 未删除 1 已删除
   * @format int32
   */
  isDel?: number;

  /** 跳转目标 根据类型进行判断 当跳转类型和自定义类型都为0该值为H5链接 */
  jumpTarget?: string;

  /**
   * 跳转类型0自定义1功能页面2商品分类3商品详情4直播间5商家店铺
   * @format int32
   * @example 1
   */
  jumpType?: number;

  /** 小程序ID */
  page?: string;

  /** 图片 */
  pic?: string;

  /**
   * banner位置 0 首页顶部banner 1社区首页banner 2直播页banner 3 店铺banner
   * @format int32
   * @example 1
   */
  position?: number;

  /** 富文本内容 */
  richTextContent?: string;

  /**
   * 排序、降序
   * @format int32
   * @example 1
   */
  sort?: number;

  /** 归属商家店铺编号 */
  storeNo?: string;

  /** 标题 */
  title?: string;
}

/**
 * 商品sku详情-基础添加请求参数
 */
export interface GroupWorkGoodsSkuDetailAddDTO {
  /**
   * 购买数量
   * @format int32
   */
  num: number;

  /** sku编码 */
  skuNo: string;
}

/**
 * 积分日志
 */
export interface PointsLogs {
  /**
   * 创建时间
   * @format date-time
   */
  gmtCreate?: string;

  /**
   * @format int32
   * @example 1
   */
  id?: number;

  /** 会员手机 */
  phone?: string;

  /**
   * 变动原因(0签到 1分享直播间 2订单评价 3社区发布视频)
   * @format int32
   */
  reason?: number;

  /**
   * 变动值
   * @format int32
   * @example 1
   */
  reasonValue?: number;

  /**
   * 变动类型(0消耗1获得)
   * @format int32
   * @example 1
   */
  type?: number;

  /** 会员id */
  userId?: string;

  /** 会员姓名 */
  userName?: string;
}

/**
 * 确认订单响应
 */
export interface OrderInfoResult {
  /**
   * 订单参加活动ID
   * @format int32
   */
  activityId?: number;

  /**
   * 订单活动类型
   * @format int32
   */
  activityType?: number;

  /** 优惠劵总金额 */
  couponPrice?: number;

  /** (JC)优惠劵详情 */
  deduction?: CouponDetail;

  /**
   * 抵扣卷号(没有不传)
   * @example 1
   */
  deductionNo?: string;

  /** 抵扣金额 */
  deductionPrice?: number;

  /** (JC)优惠劵详情 */
  discount?: CouponDetail;

  /**
   * 折扣卷号(没有不传)
   * @example 1
   */
  discountNo?: string;

  /** 折扣金额 */
  discountPrice?: number;

  /** 运费 */
  expressPrice?: number;

  /**
   * 团队编码
   * @example 0
   */
  groupNo?: string;

  /**
   * 拼团人数
   * @format int32
   * @example 0
   */
  groupNum?: number;

  /** 拼团活动 */
  groupWork?: GroupWork;

  /** 拼团活动商品 */
  groupWorkGoods?: GroupWorkGoods;

  /** 订单号 */
  orderNo?: string;

  /** 确认订单店铺响应 */
  orderStoreResults?: Record<string, OrderStoreResult>;

  /** 支付订单号 */
  payOrderNo?: string;

  /**
   * 小计
   * @example 1
   */
  subtotal?: number;

  /** 合计 */
  sumPrice?: number;

  /**
   * 商品总价
   * @example 1
   */
  totalGoodsPrice?: number;

  /** 用户表 */
  user?: User;

  /**
   * 优惠券
   * @example 1
   */
  userCoupons?: UserCoupon[];

  /** 不用传 */
  userNo?: string;

  /** 用户收货地址 */
  userReceivingAddress?: UserReceivingAddress;
}

export interface PageInfoUserShopCartVO {
  /** @format int32 */
  endRow?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  list?: UserShopCartVO[];

  /** @format int32 */
  navigateFirstPage?: number;

  /** @format int32 */
  navigateLastPage?: number;

  /** @format int32 */
  navigatePages?: number;
  navigatepageNums?: number[];

  /** @format int32 */
  nextPage?: number;

  /** @format int32 */
  pageNum?: number;

  /** @format int32 */
  pageSize?: number;

  /** @format int32 */
  pages?: number;

  /** @format int32 */
  prePage?: number;

  /** @format int32 */
  size?: number;

  /** @format int32 */
  startRow?: number;

  /** @format int64 */
  total?: number;
}

/**
 * 优惠券返回信息
 */
export interface CouponInfoVO {
  /** 归属类型 0平台 1 商家 2 自营商家 */
  attributionType?: string;

  /** 优惠券名称 */
  couponName?: string;

  /** 优惠券编号 */
  couponNo?: string;

  /** 优惠劵类型 0 满减 1 满折 */
  couponType?: string;

  /** 使用条件需求价格 */
  demandPrice?: string;

  /** 减免金额 */
  price?: string;

  /** 店铺编号 */
  storeNo?: string;

  /** 有效期结束 */
  termEnd?: string;

  /** 有效期开始 */
  termStart?: string;
}

/**
 * 社区帖子审核
 */
export interface CommunityPostsVO {
  /**
   * 帖子分类id
   * @format int32
   */
  classificationId?: number;

  /**
   * 收藏数
   * @format int32
   * @example 1
   */
  collectionNumber?: number;

  /**
   * 当前帖子的评论信息
   * @example 1
   */
  communityCommentList?: CommunityComment[];

  /** 帖子内容 */
  content?: string;

  /**
   * 关注数
   * @format int32
   * @example 1
   */
  followNumer?: number;

  /**
   * 点赞数
   * @format int32
   * @example 1
   */
  giveNumber?: number;

  /**
   * 创建时间
   * @format date-time
   */
  gmtCreate?: string;

  /**
   * 修改时间
   * @format date-time
   */
  gmtModified?: string;

  /**
   * @format int32
   * @example 1
   */
  id?: number;

  /**
   * 当前用户是否收藏(0否1是)
   * @format int32
   * @example 1
   */
  isCollection?: number;

  /**
   * 当前用户是否关注(0否1是)
   * @format int32
   * @example 1
   */
  isFollow?: number;

  /**
   * 当前用户是否点赞(0否1是)
   * @format int32
   * @example 1
   */
  isGive?: number;

  /**
   * 当前用户是否观看(0否1是)
   * @format int32
   * @example 1
   */
  isViews?: number;

  /** 发帖人昵称 */
  name?: string;

  /** 发帖人openID */
  openId?: string;

  /**
   * 发帖时间
   * @format date-time
   */
  postingTime?: string;

  /** 关闭理由 */
  reasonsClosure?: string;

  /** 关联商品 */
  relatedGoods?: string;

  /** 帖子类型 0图片1视频 */
  resourceType?: string;

  /** 图片/视频 */
  resourceUrl?: string;

  /**
   * 状态(0展示1不展示)
   * @format int32
   * @example 1
   */
  status?: number;

  /** 商家名称 */
  storeInfoName?: string;

  /** 商家店铺名称 */
  storeName?: string;

  /** 商家店铺编号 */
  storeNo?: string;

  /**
   * 观看数
   * @format int32
   * @example 1
   */
  viewsNumber?: number;
}

/**
 * 拼团活动
 */
export interface GroupWork {
  /**
   * 归属类型 0 平台 1 商家 2 自营商家
   * @format int32
   */
  attributionType?: number;

  /**
   * 购买限制(同一个活动内客户能买几个)
   * @format int32
   * @example 1
   */
  buyLimit?: number;

  /**
   * 开启限购 0 关闭 1 开启
   * @format int32
   */
  buyLimitSwitch?: number;

  /**
   * 活动结束时间
   * @format date-time
   */
  endTime?: string;

  /** 结束时间时间戳(单位/毫秒) */
  endTimeStamp?: string;

  /**
   * 活动创建时间
   * @format date-time
   */
  gmtCreate?: string;

  /** 商品表 */
  goods?: Goods;
  goodsNo?: string;

  /**
   * 商品拼团状态 0待开团 1拼团中 2 拼团成功 3拼团失败
   * @format int32
   * @example 1
   */
  groupGoodsStatus?: number;

  /**
   * 成团人数
   * @format int32
   * @example 1
   */
  groupNum?: number;

  /**
   * 成团时间
   * @format date-time
   */
  groupTime?: string;

  /** 分享图 */
  groupWorkShareImg?: string;

  /** 邀请词 */
  groupWorkShareTitle?: string;

  /** 拼团目标 */
  groupWorkTarget?: string;

  /**
   * @format int32
   * @example 1
   */
  id?: number;

  /**
   * 是否虚拟成团 0 否 1 是
   * @format int32
   */
  isVirtual?: number;

  /**
   * 是否已加入 0 未加入 1 已加入
   * @format int32
   */
  joined?: number;

  /**
   * 已拼人数
   * @format int32
   */
  joinedPersonsCount?: number;

  /** 已加入人员 */
  orderGroupWorkItem?: OrderGroupWorkItem[];

  /**
   * 已过期已结束等不可变的剩余时间（单位/秒）
   * @format int32
   */
  restTime?: number;

  /**
   * 活动开始时间
   * @format date-time
   */
  startTime?: string;

  /** 开始时间时间戳(单位/毫秒) */
  startTimeStamp?: string;

  /**
   * 活动状态 0未开始 1进行中 2 已结束
   * @format int32
   * @example 1
   */
  status?: number;

  /** 归属商家店铺编号 */
  storeNo?: string;

  /** 活动标题 */
  title?: string;
}

export interface PageInfoStationLetter {
  /** @format int32 */
  endRow?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  list?: StationLetter[];

  /** @format int32 */
  navigateFirstPage?: number;

  /** @format int32 */
  navigateLastPage?: number;

  /** @format int32 */
  navigatePages?: number;
  navigatepageNums?: number[];

  /** @format int32 */
  nextPage?: number;

  /** @format int32 */
  pageNum?: number;

  /** @format int32 */
  pageSize?: number;

  /** @format int32 */
  pages?: number;

  /** @format int32 */
  prePage?: number;

  /** @format int32 */
  size?: number;

  /** @format int32 */
  startRow?: number;

  /** @format int64 */
  total?: number;
}

/**
 * 直播分类
 */
export interface LiveCategory {
  /**
   * 归属类型 0 平台 1 商家 2 自营商家
   * @format int32
   */
  attributionType?: number;

  /** 分类名称 */
  categoryName?: string;

  /** 分类图片 */
  categoryPic?: string;

  /**
   * 创建时间
   * @format date-time
   */
  gmtCreate?: string;

  /**
   * 修改时间
   * @format date-time
   */
  gmtModified?: string;

  /**
   * 直播分类id
   * @format int32
   * @example 1
   */
  id?: number;

  /**
   * 排序
   * @format int32
   * @example 1
   */
  sort?: number;

  /** 归属商家店铺编号 */
  storeNo?: string;
}

export interface PageInfoStore {
  /** @format int32 */
  endRow?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  list?: Store[];

  /** @format int32 */
  navigateFirstPage?: number;

  /** @format int32 */
  navigateLastPage?: number;

  /** @format int32 */
  navigatePages?: number;
  navigatepageNums?: number[];

  /** @format int32 */
  nextPage?: number;

  /** @format int32 */
  pageNum?: number;

  /** @format int32 */
  pageSize?: number;

  /** @format int32 */
  pages?: number;

  /** @format int32 */
  prePage?: number;

  /** @format int32 */
  size?: number;

  /** @format int32 */
  startRow?: number;

  /** @format int64 */
  total?: number;
}

export interface PageInfoUserMutualConcern {
  /** @format int32 */
  endRow?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  list?: UserMutualConcern[];

  /** @format int32 */
  navigateFirstPage?: number;

  /** @format int32 */
  navigateLastPage?: number;

  /** @format int32 */
  navigatePages?: number;
  navigatepageNums?: number[];

  /** @format int32 */
  nextPage?: number;

  /** @format int32 */
  pageNum?: number;

  /** @format int32 */
  pageSize?: number;

  /** @format int32 */
  pages?: number;

  /** @format int32 */
  prePage?: number;

  /** @format int32 */
  size?: number;

  /** @format int32 */
  startRow?: number;

  /** @format int64 */
  total?: number;
}

/**
 * 用户收藏表-基础添加请求参数
 */
export interface UserCollectionAddDTO {
  /** 商品编号(多商品收藏,号分割) */
  goodsNo?: string;
}

/**
 * 积分日志-基础添加请求参数
 */
export type PointsLogsAddDTO = object;

/**
 * (JC)平台配置-站内信
 */
export interface StationLetter {
  /** 编辑内容 */
  content?: string;

  /** 封面图 */
  coverPicture?: string;

  /**
   * 创建时间
   * @format date-time
   */
  gmtCreate?: string;

  /**
   * 最后修改时间
   * @format date-time
   */
  gmtModified?: string;

  /**
   * @format int32
   * @example 1
   */
  id?: number;

  /**
   * 删除状态(默认0未删除1删除)
   * @format int32
   */
  isDel?: number;

  /**
   * 是否推送(默认0未推送1已推送)
   * @format int32
   * @example 1
   */
  isPush?: number;

  /** 备注 */
  remark?: string;

  /** 选择触发用户 */
  selectUser?: string;

  /** 标题 */
  title?: string;
}

/**
 * 用户收货地址
 */
export interface UserReceivingAddress {
  /**
   * 区域id
   * @format int32
   * @example 1
   */
  areaId?: number;

  /** 区域名 */
  areaName?: string;

  /**
   * 市id
   * @format int32
   * @example 1
   */
  cityId?: number;

  /** 城市名 */
  cityName?: string;

  /**
   * @format int32
   * @example 1
   */
  id?: number;

  /**
   * 是否默认 0 否 1 是
   * @format int32
   */
  isDefault?: number;

  /** 收货人姓名 */
  name?: string;

  /** 收货人手机号 */
  phone?: string;

  /**
   * 省id
   * @format int32
   * @example 1
   */
  provinceId?: number;

  /** 省份名 */
  provinceName?: string;

  /** 详细地址 */
  singleAddress?: string;

  /** 用户全局唯一编号 */
  userNo?: string;
}

/**
 * 直播间
 */
export interface LiveRoom {
  /**
   * 归属类型 0 平台 1 商家 2 自营商家
   * @format int32
   */
  attributionType?: number;

  /** 聊天室ID */
  chatroomId?: string;

  /**
   * 创建时间
   * @format date-time
   */
  gmtCreate?: string;

  /**
   * 修改时间
   * @format date-time
   */
  gmtModified?: string;

  /**
   * 精品直播主键
   * @format int32
   * @example 1
   */
  id?: number;

  /** 封面图片 */
  logoPic?: string;

  /** RTMP拉流地址 */
  pullRtmpUrl?: string;

  /** HTTP拉流地址 */
  pullUrl?: string;

  /** 推流地址 */
  pushUrl?: string;

  /** 直播间描述/简介 */
  roomDesc?: string;

  /** 直播间标题 */
  roomTitle?: string;

  /**
   * 直播状态：0-初始化 1-直播中 2-已结束
   * @format int32
   */
  status?: number;

  /** 商家名称 */
  storeInfoName?: string;

  /** 店铺名称 */
  storeName?: string;

  /** 归属商家店铺编号 */
  storeNo?: string;

  /** 录播视频url */
  videoUrl?: string;
}

export interface PageInfoLiveRoomInfo {
  /** @format int32 */
  endRow?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  list?: LiveRoomInfo[];

  /** @format int32 */
  navigateFirstPage?: number;

  /** @format int32 */
  navigateLastPage?: number;

  /** @format int32 */
  navigatePages?: number;
  navigatepageNums?: number[];

  /** @format int32 */
  nextPage?: number;

  /** @format int32 */
  pageNum?: number;

  /** @format int32 */
  pageSize?: number;

  /** @format int32 */
  pages?: number;

  /** @format int32 */
  prePage?: number;

  /** @format int32 */
  size?: number;

  /** @format int32 */
  startRow?: number;

  /** @format int64 */
  total?: number;
}

/**
 * 订单拼团详情
 */
export interface OrderGroupWorkItem {
  /**
   * 是否是队长 0 否 1 是
   * @format int32
   */
  captain?: number;

  /**
   * 参团时间
   * @format date-time
   */
  gmtCreate?: string;

  /** 商品表 */
  goods?: Goods;

  /** @format int32 */
  groupLimitNum?: number;

  /** 团队编号 */
  groupNo?: string;

  /**
   * 成团人数
   * @format int32
   */
  groupNum?: number;

  /**
   * 拼团活动ID
   * @format int32
   * @example 1
   */
  groupWorkId?: number;

  /** 分享图 */
  groupWorkShareImg?: string;

  /**
   * 拼团状态 0创建中 1拼团中 2拼团成功 3拼团失败
   * @format int32
   */
  groupWorkStatus?: number;

  /** 用户头像 */
  headImg?: string;

  /**
   * @format int32
   * @example 1
   */
  id?: number;

  /**
   * 已拼人数
   * @format int32
   */
  joinedPersonsCount?: number;

  /** 订单商品项表 */
  orderGoods?: OrderGoods;

  /** 订单编号(拆单编号为：供应商id_品牌id_订单号) */
  orderNo?: string;

  /**
   * 状态 0 未加入 1加入
   * @format int32
   */
  status?: number;

  /** 用户全局唯一编号 */
  userNo?: string;
}

/**
 * 社区帖子审核
 */
export interface CommunityPosts {
  /**
   * 帖子分类id
   * @format int32
   */
  classificationId?: number;

  /**
   * 收藏数
   * @format int32
   * @example 1
   */
  collectionNumber?: number;

  /** 帖子内容 */
  content?: string;

  /**
   * 关注数
   * @format int32
   * @example 1
   */
  followNumer?: number;

  /**
   * 点赞数
   * @format int32
   * @example 1
   */
  giveNumber?: number;

  /**
   * 创建时间
   * @format date-time
   */
  gmtCreate?: string;

  /**
   * 修改时间
   * @format date-time
   */
  gmtModified?: string;

  /**
   * @format int32
   * @example 1
   */
  id?: number;

  /**
   * 当前用户是否收藏(0否1是)
   * @format int32
   * @example 1
   */
  isCollection?: number;

  /**
   * 当前用户是否关注(0否1是)
   * @format int32
   * @example 1
   */
  isFollow?: number;

  /**
   * 当前用户是否点赞(0否1是)
   * @format int32
   * @example 1
   */
  isGive?: number;

  /**
   * 当前用户是否观看(0否1是)
   * @format int32
   * @example 1
   */
  isViews?: number;

  /** 发帖人昵称 */
  name?: string;

  /** 发帖人openID */
  openId?: string;

  /** 发帖人手机号码 */
  phone?: string;

  /**
   * 发帖时间
   * @format date-time
   */
  postingTime?: string;

  /** 关闭理由 */
  reasonsClosure?: string;

  /** 关联商品 */
  relatedGoods?: string;

  /** 帖子类型 0图片1视频 */
  resourceType?: string;

  /** 图片/视频 */
  resourceUrl?: string;

  /**
   * 状态(0展示1不展示)
   * @format int32
   * @example 1
   */
  status?: number;

  /** 商家名称 */
  storeInfoName?: string;

  /** 商家店铺名称 */
  storeName?: string;

  /** 商家店铺编号 */
  storeNo?: string;

  /**
   * 观看数
   * @format int32
   * @example 1
   */
  viewsNumber?: number;
}

/**
 * 社区分类管理
 */
export interface CommunityClassification {
  /**
   * 创建时间
   * @format date-time
   */
  gmtCreate?: string;

  /**
   * 修改时间
   * @format date-time
   */
  gmtModified?: string;

  /**
   * @format int32
   * @example 1
   */
  id?: number;

  /**
   * 删除状态(0正常1删除)
   * @format int32
   * @example 1
   */
  isDel?: number;

  /** 分类名称 */
  name?: string;

  /**
   * 父节点id
   * @format int32
   * @example 1
   */
  parentId?: number;

  /**
   * 排序
   * @format int32
   * @example 1
   */
  sort?: number;
}

/**
 * 商品sku详情
 */
export interface GoodsSkuDetail {
  /**
   * 实际销量
   * @format int32
   * @example 1
   */
  actualSales?: number;

  /** 商品编号 */
  goodsNo?: string;

  /** 团购价 */
  groupPrice?: number;

  /**
   * @format int32
   * @example 1
   */
  id?: number;

  /** 重量（kg） */
  integralLimit?: number;

  /**
   * 是否上架 0 否 1是
   * @format int32
   */
  isShelved?: number;

  /** 划线价 */
  marketPrice?: number;

  /** 零售价 */
  salesPrice?: number;

  /** sku图片 */
  skuImgUrl?: string;

  /** sku名称 */
  skuName?: string;

  /** sku编码 */
  skuNo?: string;

  /** 多规格 */
  specIds?: string;

  /**
   * 库存（商品）
   * @format int32
   * @example 1
   */
  stock?: number;
}

/**
 * 城市合伙人-合伙人管理-绑定商家信息表
 */
export interface PartnerManagementMerchant {
  /**
   * 累计订单数
   * @format int32
   * @example 1
   */
  allOrderNumber?: number;

  /** 累计返佣金额 */
  allRebateAmount?: number;

  /**
   * 绑定时间
   * @format date-time
   */
  bindingTime?: string;

  /**
   * 开通商家中心时间
   * @format date-time
   */
  businessCenterTime?: string;

  /**
   * 创建时间
   * @format date-time
   */
  gmtCreate?: string;

  /**
   * 修改时间
   * @format date-time
   */
  gmtModified?: string;

  /**
   * @format int32
   * @example 1
   */
  id?: number;

  /** 用户手机号 */
  mobile?: string;

  /** 昵称 */
  name?: string;

  /** 合伙人用户微信openID */
  openId?: string;

  /** 店铺名称 */
  shopName?: string;

  /** 商家名称 */
  storeInfoName?: string;

  /** 绑定的商家名称 */
  storeName?: string;

  /** 绑定的商家编号 */
  storeNo?: string;

  /**
   * 解绑时间
   * @format date-time
   */
  unbindingTime?: string;
}

export interface PageInfoPointsLogs {
  /** @format int32 */
  endRow?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  list?: PointsLogs[];

  /** @format int32 */
  navigateFirstPage?: number;

  /** @format int32 */
  navigateLastPage?: number;

  /** @format int32 */
  navigatePages?: number;
  navigatepageNums?: number[];

  /** @format int32 */
  nextPage?: number;

  /** @format int32 */
  pageNum?: number;

  /** @format int32 */
  pageSize?: number;

  /** @format int32 */
  pages?: number;

  /** @format int32 */
  prePage?: number;

  /** @format int32 */
  size?: number;

  /** @format int32 */
  startRow?: number;

  /** @format int64 */
  total?: number;
}

/**
 * 门店表
 */
export interface Store {
  /** 名称缩写 */
  abbr?: string;

  /** 售后服务-评分 */
  afterSale?: number;

  /**
   * 区域id
   * @format int32
   * @example 1
   */
  areaId?: number;

  /** 区域名 */
  areaName?: string;

  /**
   * 归属类型 1 商家 2 自营商家
   * @format int32
   */
  attributionType?: number;

  /**
   * 市id
   * @format int32
   * @example 1
   */
  cityId?: number;

  /** 城市名 */
  cityName?: string;

  /** 联系电话 */
  contactNumber?: string;

  /** 联系人 */
  contactor?: string;
  desc?: string;

  /** 仓库所在详细地址 */
  detailAddress?: string;

  /**
   * 关注/粉丝数
   * @format int32
   */
  focus?: number;

  /**
   * 创建时间
   * @format date-time
   */
  gmtCreate?: string;

  /**
   * 最后修改时间
   * @format date-time
   */
  gmtModified?: string;

  /** 商品列表 */
  goodsList?: Goods[];

  /**
   * 是否已关注 0 未关注 1 已关注
   * @format int32
   */
  hasFocus?: number;

  /**
   * 是否已评价 0 未评价 1 已评价
   * @format int32
   */
  hasScored?: number;

  /**
   * @format int32
   * @example 1
   */
  id?: number;

  /** 首页入口图 */
  indexImg?: string;

  /**
   * 店铺开关 0 关闭 1 开启
   * @format int32
   */
  isOpen?: number;

  /** 跳转地址 */
  jumpUrl?: string;

  /** 直播间 */
  liveRoom?: LiveRoom;

  /** 店铺门头或logo url */
  logo?: string;

  /**
   * 保证金 0 未缴纳 1已缴纳
   * @format int32
   */
  marginStatus?: number;

  /** 商户号 */
  merchantNo?: string;

  /** 店铺名称 */
  name?: string;
  orderByField?: string;

  /**
   * 省id
   * @format int32
   * @example 1
   */
  provinceId?: number;

  /** 省份名 */
  provinceName?: string;

  /** 品质相符-评分 */
  quality?: number;

  /**
   * 销量
   * @format int32
   */
  salesCount?: number;

  /** 评分/综合体验 */
  score?: number;
  searchInfo?: string;

  /** 服务态度-评分 */
  serviceAttitude?: number;

  /** 店铺ID */
  showId?: string;

  /** 店铺编号 */
  storeNo?: string;

  /**
   * 仓库所在区域id
   * @format int32
   * @example 1
   */
  warehouseAreaId?: number;

  /** 仓库所在区域名 */
  warehouseAreaName?: string;

  /**
   * 仓库所在市id
   * @format int32
   * @example 1
   */
  warehouseCityId?: number;

  /** 仓库所在城市名 */
  warehouseCityName?: string;

  /**
   * 仓库所在省id
   * @format int32
   * @example 1
   */
  warehouseProvinceId?: number;

  /** 仓库所在省份名 */
  warehouseProvinceName?: string;

  /** 微信二维码 */
  wxQrCode?: string;
}

/**
 * 商城首页配置
 */
export interface MallHomeSet {
  /**
   * 配置区域 0直播间 1商家推荐 2 优惠券
   * @format int32
   * @example 1
   */
  area?: number;

  /**
   * 归属类型0 平台 1 商家 2 自营商家
   * @format int32
   */
  attributionType?: number;

  /** 首页Banner */
  bannerList?: Banner[];

  /** 推荐优惠券 */
  couponDetailList?: CouponDetail[];

  /**
   * 创建时间
   * @format date-time
   */
  gmtCreate?: string;

  /**
   * 修改时间
   * @format date-time
   */
  gmtModified?: string;

  /** 商家推荐商品 */
  goodsList?: Goods[];

  /**
   * @format int32
   * @example 1
   */
  id?: number;

  /**
   * 是否删除 0 未删除 1 已删除
   * @format int32
   */
  isDel?: number;

  /** 推荐内容  商品ID或直播间ID或优惠券编号 */
  recommendContent?: string;

  /** 推荐内容  商品名称或直播间名称或优惠券名称 */
  recommendName?: string;

  /**
   * 推荐内容类型 0 直播间 1 商家推荐 2 优惠券
   * @format int32
   * @example 1
   */
  recommendType?: number;

  /**
   * 排序、降序
   * @format int32
   * @example 1
   */
  sort?: number;

  /** 门店表 */
  store?: Store;

  /** 店铺编号 */
  storeNo?: string;
}

/**
 * 商品分类
 */
export interface GoodsClassify {
  /** 子分类 */
  children?: GoodsClassify[];

  /**
   * 是否存在商品 0 不存在 1 存在
   * @format int32
   */
  containsGoods?: number;

  /**
   * 创建时间
   * @format date-time
   */
  gmtCreate?: string;

  /**
   * 修改时间
   * @format date-time
   */
  gmtModified?: string;

  /**
   * @format int32
   * @example 1
   */
  id?: number;

  /** 分类图片 */
  imgUrl?: string;

  /**
   * 级别 1 2 3
   * @format int32
   * @example 1
   */
  level?: number;

  /** 一级分类名称 */
  levelOneName?: string;

  /**
   * 一级分类pid
   * @format int32
   */
  levelOnePid?: number;

  /** 二级分类名称 */
  levelTwoName?: string;

  /**
   * 二级分类pid
   * @format int32
   */
  levelTwoPid?: number;

  /** 分类名称 */
  name?: string;

  /**
   * 父id
   * @format int32
   * @example 1
   */
  pid?: number;

  /**
   * 排序值，降序
   * @format int32
   * @example 1
   */
  sort?: number;
}

export interface PageInfoCommunityHotWords {
  /** @format int32 */
  endRow?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  list?: CommunityHotWords[];

  /** @format int32 */
  navigateFirstPage?: number;

  /** @format int32 */
  navigateLastPage?: number;

  /** @format int32 */
  navigatePages?: number;
  navigatepageNums?: number[];

  /** @format int32 */
  nextPage?: number;

  /** @format int32 */
  pageNum?: number;

  /** @format int32 */
  pageSize?: number;

  /** @format int32 */
  pages?: number;

  /** @format int32 */
  prePage?: number;

  /** @format int32 */
  size?: number;

  /** @format int32 */
  startRow?: number;

  /** @format int64 */
  total?: number;
}

/**
 * 用户购物车选中商品规格信息返回
 */
export interface GoodsSkuDetailList {
  /** 关联的商品名称 */
  goodsName?: string;

  /** 关联的商品NO */
  goodsNo?: string;

  /** 规格ID */
  id?: string;

  /** 当前商品是否失效 0未失效 1已失效 */
  isInvalid?: string;

  /** 商品价格 */
  minimumPrice?: string;

  /** 用户购买的数量 */
  quantity?: string;

  /** 规格图片地址 */
  skuImgURL?: string;

  /** 规格名称 */
  skuName?: string;

  /** 规格NO */
  skuNo?: string;
}

export interface WechatLogin {
  /** code */
  code?: string;

  /** 头像 */
  headImg?: string;

  /** 昵称 */
  name?: string;

  /** openId */
  openId?: string;

  /** phone */
  phone?: string;

  /** unionId */
  unionId?: string;
}

/**
 * 商品规格表
 */
export interface GoodsSpec {
  /**
   * 归属类型 1 商家 2 自营商家
   * @format int32
   * @example 1
   */
  attributionType?: number;

  /**
   * 商品详情页子规格是否选中 1 选中 0未选中
   * @format int32
   */
  boxChecked?: number;

  /** 子规格 */
  children?: GoodsSpec[];

  /**
   * 子规格数量
   * @format int32
   */
  childrenNum?: number;

  /** 子集合名称合集，后台显示用 */
  childrenSpecName?: string;

  /**
   * Id
   * @format int32
   * @example 1
   */
  id?: number;

  /**
   * 上级id
   * @format int32
   * @example 1
   */
  pid?: number;

  /**
   * 排序值，降序
   * @format int32
   * @example 1
   */
  sort?: number;

  /** 规格名称 */
  specName?: string;

  /** 子集合名称，后台提交 */
  specSonName?: string[];

  /**
   * '店铺编号'
   * @example 1
   */
  storeNo?: string;
}

/**
 * 城市合伙人-返佣信息表
 */
export interface PartnerRebateInformation {
  /** 实付金额 */
  amountActuallyPaid?: number;

  /**
   * 创建时间
   * @format date-time
   */
  gmtCreate?: string;

  /**
   * 修改时间
   * @format date-time
   */
  gmtModified?: string;

  /**
   * @format int32
   * @example 1
   */
  id?: number;

  /** 合伙人(用户手机号) */
  mobile?: string;

  /** 合伙人昵称 */
  name?: string;

  /** 合伙人用户微信openID */
  openId?: string;

  /** 订单编号 */
  orderNo?: string;

  /** 订单总额 */
  payShouldAmount?: number;

  /** 分润金额 */
  profitDistributionAmount?: number;

  /**
   * 返佣状态(0在途 1作废 2到账)
   * @format int32
   * @example 1
   */
  rebateStatus?: number;

  /**
   * 店铺ID
   * @format int32
   * @example 1
   */
  storeId?: number;

  /**
   * 商家ID
   * @format int32
   * @example 1
   */
  storeInfoId?: number;

  /** 商家名称 */
  storeInfoName?: string;

  /** 店铺名称 */
  storeName?: string;

  /** 下单人(用户手机号) */
  userMobile?: string;

  /** 下单人昵称 */
  userName?: string;

  /** 下单人微信openID */
  userOpenId?: string;
}

export interface PageInfoGroupWork {
  /** @format int32 */
  endRow?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  list?: GroupWork[];

  /** @format int32 */
  navigateFirstPage?: number;

  /** @format int32 */
  navigateLastPage?: number;

  /** @format int32 */
  navigatePages?: number;
  navigatepageNums?: number[];

  /** @format int32 */
  nextPage?: number;

  /** @format int32 */
  pageNum?: number;

  /** @format int32 */
  pageSize?: number;

  /** @format int32 */
  pages?: number;

  /** @format int32 */
  prePage?: number;

  /** @format int32 */
  size?: number;

  /** @format int32 */
  startRow?: number;

  /** @format int64 */
  total?: number;
}

export interface UserWithToken {
  /** token */
  token?: string;

  /** 用户表 */
  user?: User;
}

/**
 * 用户购物车-基础添加请求参数
 */
export interface UserShopCartAddDTO {
  /**
   * 活动编号
   * @format int32
   */
  activityId?: number;

  /**
   * 活动类型 0无活动 1拼团2秒杀3砍价4组套5减满6抽奖
   * @format int32
   */
  activityType?: number;

  /** 商品编号 */
  goodsNo?: string;

  /**
   * 是否失效 0 未失效 1 失效
   * @format int32
   */
  isInvalid?: number;

  /**
   * 数量
   * @format int32
   */
  quantity?: number;

  /** 商品SKU */
  skuNo?: string;

  /** 所属门店NO */
  storeNo?: string;

  /** 用户编号 */
  userNo?: string;
}

/**
 * 拍卖纪录详情
 */
export interface AuctionWorkGoodsDetailsDTO {
  /**
   * 最终活动状态 0 出局 1 领先 2 成交
   * @format int32
   */
  activityStatus?: number;

  /**
   * 活动ID/拍卖编号
   * @format int32
   * @example 1
   */
  auctionWorkId?: number;

  /** 用户头像 */
  headImg?: string;

  /** 出价金额 */
  offerPrice?: number;

  /**
   * 出价时间
   * @format date-time
   */
  offerPriceTime?: string;

  /** 用户名称 */
  userName?: string;
}

export interface JsPayResponse {
  appId?: string;
  nonceStr?: string;
  paySign?: string;
  pkg?: string;
  signType?: string;
  timeStamp?: string;
}

export interface PageInfoMyGoodsDetailVo {
  /** @format int32 */
  endRow?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  list?: MyGoodsDetailVo[];

  /** @format int32 */
  navigateFirstPage?: number;

  /** @format int32 */
  navigateLastPage?: number;

  /** @format int32 */
  navigatePages?: number;
  navigatepageNums?: number[];

  /** @format int32 */
  nextPage?: number;

  /** @format int32 */
  pageNum?: number;

  /** @format int32 */
  pageSize?: number;

  /** @format int32 */
  pages?: number;

  /** @format int32 */
  prePage?: number;

  /** @format int32 */
  size?: number;

  /** @format int32 */
  startRow?: number;

  /** @format int64 */
  total?: number;
}

export interface PageInfoGoods {
  /** @format int32 */
  endRow?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  list?: Goods[];

  /** @format int32 */
  navigateFirstPage?: number;

  /** @format int32 */
  navigateLastPage?: number;

  /** @format int32 */
  navigatePages?: number;
  navigatepageNums?: number[];

  /** @format int32 */
  nextPage?: number;

  /** @format int32 */
  pageNum?: number;

  /** @format int32 */
  pageSize?: number;

  /** @format int32 */
  pages?: number;

  /** @format int32 */
  prePage?: number;

  /** @format int32 */
  size?: number;

  /** @format int32 */
  startRow?: number;

  /** @format int64 */
  total?: number;
}

/**
 * 订单商品项表
 */
export interface OrderGoods {
  /** 优惠劵抵扣金额 */
  couponPrice?: object;

  /** 商品主图 */
  coverImgUrl?: string;

  /**
   * 商品ID
   * @format int32
   */
  goodsId?: number;

  /** 商品名称 */
  goodsName?: string;

  /** 商品编号 */
  goodsNo?: string;

  /** 拼团价 */
  groupPrice?: number;

  /**
   * @format int32
   * @example 1
   */
  id?: number;

  /** 商品项编号 */
  orderGoodsNo?: string;

  /** 订单项状态 */
  orderGoodsStatus?: string;

  /** 订单编号 */
  orderNo?: string;

  /** 实际支付金额 */
  payAmount?: number;

  /** 应该支付金额 */
  payShouldAmount?: number;

  /**
   * 购买数量
   * @format int32
   * @example 1
   */
  saleQuantity?: number;

  /** sku图片 */
  skuImgUrl?: string;

  /** 商品sku名称 */
  skuName?: string;

  /** 商品sku */
  skuNo?: string;

  /** 销售价格 */
  skuSalesPrice?: number;

  /** 重量（kg） */
  skuWeight?: number;

  /**
   * 店铺ID
   * @format int32
   */
  storeId?: number;

  /** 店铺名称 */
  storeName?: string;

  /** 店铺编号 */
  storeNo?: string;

  /** 用户全局唯一编号 */
  userNo?: string;
}

/**
 * 用户设置
 */
export interface UserSetDTO {
  /**
   * 1男 2女 0未知
   * @format int32
   */
  gender?: number;

  /** 头像 */
  headImg?: string;

  /** 昵称 */
  name?: string;

  /** 个人简介 */
  personalProfile?: string;
  userNo?: string;
}

/**
 * 确认订单请求参数
 */
export interface OrderStoreReq {
  /** 确认订单请求项 */
  orderReqItems?: OrderReqItem[];

  /** 备注 */
  remark?: string;
}

/**
 * 社区帖子审核-基础添加请求参数
 */
export interface CommunityPostsAddDTO {
  /**
   * 帖子分类id
   * @format int32
   */
  classificationId?: number;

  /** 帖子内容 */
  content?: string;

  /** 发帖人昵称 */
  name?: string;

  /** 发帖人openID */
  openId?: string;

  /** 关联商品 */
  relatedGoods?: string;

  /** 帖子类型 0图片1视频 */
  resourceType?: string;

  /** 图片/视频 */
  resourceUrl?: string;

  /** 商家店铺名称 */
  storeName?: string;

  /** 商家店铺编号 */
  storeNo?: string;
}

/**
 * 订单表
 */
export interface Order {
  /** 关闭理由 */
  closeReason?: string;

  /**
   * 关闭时间
   * @format date-time
   */
  closeTime?: string;

  /**
   * 完成时间
   * @format date-time
   */
  completionTime?: string;

  /** 优惠券抵扣金额 */
  couponPrice?: number;

  /** 运费实付 */
  deliveryAmount?: number;

  /** 运费应付金额 */
  deliveryShouldAmount?: number;

  /**
   * 送达时间
   * @format date-time
   */
  deliveryTime?: string;

  /**
   * 下单时间
   * @format date-time
   */
  gmtCreate?: string;

  /**
   * 拼团状态 0创建中 1拼团中 2拼团成功 3拼团失败
   * @format int32
   */
  groupWorkStatus?: number;

  /**
   * @format int32
   * @example 1
   */
  id?: number;

  /**
   * 是否删除 0不删除 1已删除
   * @format int32
   */
  isDel?: number;

  /**
   * 物流信息ID
   * @format int32
   * @example 1
   */
  logisticsId?: number;

  /**
   * 操作时间（发货、回复等）
   * @format date-time
   */
  operationTime?: string;

  /** 订单商品项表 */
  orderGoods?: OrderGoods;

  /** 拼团用户信息 */
  orderGroupWorkItem?: OrderGroupWorkItem[];

  /** 订单编号 */
  orderNo?: string;

  /** 订单状态 000 待支付 100代发货 200 待收货 300待评论 400交易完成 500交易关闭(取消) */
  orderStatus?: string;

  /**
   * 订单类型 0 普通订单 1 拼团订单 2 拍卖订单
   * @format int32
   */
  orderType?: number;

  /** 订单实付金额 = 应付金额 - 各种优惠 */
  payAmount?: number;

  /** 支付订单编号 */
  payOrderNo?: string;

  /** 订单应付金额（所有费用总和） */
  payShouldAmount?: number;

  /**
   * 支付时间
   * @format date-time
   */
  payTime?: string;

  /** 收货人详细地址 */
  receiverAddress?: string;

  /** 收货人区 */
  receiverArea?: string;

  /**
   * 收货人区ID
   * @format int32
   * @example 1
   */
  receiverAreaId?: number;

  /** 收货人市 */
  receiverCity?: string;

  /**
   * 收货人市ID
   * @format int32
   * @example 1
   */
  receiverCityId?: number;

  /** 收货人手机号 */
  receiverMobile?: object;

  /** 收货人姓名 */
  receiverName?: string;

  /** 收货人省 */
  receiverProvince?: string;

  /**
   * 收货人省ID
   * @format int32
   * @example 1
   */
  receiverProvinceId?: number;

  /**
   * 收货时间
   * @format date-time
   */
  receiverTime?: string;

  /**
   * 收货类型 0用户 1 自动 2 后台
   * @format int32
   */
  receiverType?: number;

  /** 订单备注 */
  remark?: string;

  /**
   * 所属门店
   * @example 1
   */
  storeNo?: string;

  /** 微信支付流水号 */
  transactionId?: string;

  /** 用户全局唯一编号 */
  userNo?: string;
}

/**
 * 优惠券返回信息
 */
export interface CouponInfoByStoreVO {
  /** 归属类型 0平台 1 商家 2 自营商家 */
  attributionType?: string;

  /** 店铺名称 */
  storeName?: string;

  /** 店铺编号 */
  storeNo?: string;

  /** 未使用的优惠券 */
  unUsedCouponList?: CouponInfoVO[];
}

export interface PageInfoPartnerWithdrawalAudit {
  /** @format int32 */
  endRow?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  list?: PartnerWithdrawalAudit[];

  /** @format int32 */
  navigateFirstPage?: number;

  /** @format int32 */
  navigateLastPage?: number;

  /** @format int32 */
  navigatePages?: number;
  navigatepageNums?: number[];

  /** @format int32 */
  nextPage?: number;

  /** @format int32 */
  pageNum?: number;

  /** @format int32 */
  pageSize?: number;

  /** @format int32 */
  pages?: number;

  /** @format int32 */
  prePage?: number;

  /** @format int32 */
  size?: number;

  /** @format int32 */
  startRow?: number;

  /** @format int64 */
  total?: number;
}

/**
 * 订单拼团详情-基础添加请求参数
 */
export interface OrderGroupWorkItemAddDTO {
  /** 商品编号 */
  goodsNo: string;

  /**
   * 拼团活动ID
   * @format int32
   */
  groupWorkId: number;

  /** 留言 */
  message?: string;

  /** 商品规格及数量 */
  skuList: GroupWorkGoodsSkuDetailAddDTO[];

  /**
   * 收货地址ID
   * @format int32
   */
  userAddressId: number;
}

/**
 * 用户历史搜索表
 */
export interface UserSearchHistory {
  /** 搜索内容 */
  content?: string;

  /**
   * 搜索时间
   * @format date-time
   */
  gmtCreate?: string;

  /**
   * @format int32
   * @example 1
   */
  id?: number;

  /** 用户全局唯一编号 */
  userNo?: string;
}

/**
 * 社区评论管理
 */
export interface CommunityComment {
  /**
   * 评论时间
   * @format date-time
   */
  commentTime?: string;

  /** 评论内容 */
  content?: string;

  /**
   * 创建时间
   * @format date-time
   */
  gmtCreate?: string;

  /**
   * 修改时间
   * @format date-time
   */
  gmtModified?: string;

  /** 评论人头像 */
  headImg?: string;

  /**
   * @format int32
   * @example 1
   */
  id?: number;

  /** 评论人昵称 */
  name?: string;

  /** 评论人openID */
  openId?: string;

  /**
   * 帖子ID
   * @format int32
   * @example 1
   */
  postsId?: number;

  /** 发帖名称 */
  postsName?: string;

  /** 关闭理由 */
  reasonsClosure?: string;

  /**
   * 状态(0展示1不展示)
   * @format int32
   * @example 1
   */
  status?: number;
}

/**
 * 拼团活动商品
 */
export interface GroupWorkGoods {
  /** 商品名称 */
  goodsName?: string;

  /** 商品编号 */
  goodsNo?: string;

  /**
   * 拼团活动ID
   * @format int32
   * @example 1
   */
  groupWorkId?: number;

  /**
   * @format int32
   * @example 1
   */
  id?: number;

  /**
   * 是否上架 0 否 1是
   * @format int32
   */
  isShelved?: number;

  /** 商家名称 */
  storeInfoName?: string;
}

/**
 * 用户购物车-基础修改请求参数
 */
export interface UserShopCartDeleteDTO {
  /** 商品编号(goodsSkuDetailList.goodsNo) */
  goodsNo?: string;

  /** 商品SKU(goodsSkuDetailList.skuNo) */
  skuNo?: string;

  /** 所属门店 */
  storeNo?: string;
}

export interface Type微信解密数据 {
  /** 微信code */
  code?: string;

  /** 包括敏感数据在内的完整用户信息的加密数据 */
  encryptedData?: string;

  /** 加密算法的初始向量 */
  iv?: string;
  userNo?: string;
}

/**
 * 城市合伙人-审核管理
 */
export interface PartnerWithdrawalAudit {
  /**
   * 创建时间/申请时间
   * @format date-time
   */
  gmtCreate?: string;

  /**
   * 修改时间
   * @format date-time
   */
  gmtModified?: string;

  /**
   * @format int32
   * @example 1
   */
  id?: number;

  /** 用户手机号 */
  mobile?: string;

  /** 昵称 */
  name?: string;

  /** 合伙人用户微信openID */
  openId?: string;

  /**
   * 打款单号
   * @format int32
   */
  payOrderNo?: number;

  /**
   * 打款时间
   * @format int32
   */
  payTime?: number;

  /**
   * 一级审核时间
   * @format date-time
   */
  reviewTimeOne?: string;

  /** 一级审核理由 */
  reviewTimeOneNote?: string;

  /**
   * 一级审核状态(0通过1拒绝)
   * @format int32
   * @example 1
   */
  reviewTimeOneStatus?: number;

  /**
   * 一级审核人user ID
   * @format int32
   * @example 1
   */
  reviewTimeOneUserId?: number;

  /** 一级审核人 */
  reviewTimeOneUserName?: string;

  /**
   * 二级审核时间
   * @format date-time
   */
  reviewTimeTwo?: string;

  /** 二级审核理由 */
  reviewTimeTwoNote?: string;

  /**
   * 二级审核状态(0通过1拒绝)
   * @format int32
   * @example 1
   */
  reviewTimeTwoStatus?: number;

  /**
   * 二级审核人user ID
   * @format int32
   * @example 1
   */
  reviewTimeTwoUserId?: number;

  /** 二级审核人 */
  reviewTimeTwoUserName?: string;

  /**
   * 打款状态 0 未打款 1已打款 2打款失败
   * @format int32
   */
  status?: number;

  /** 提现金额 */
  withdrawalAmount?: number;
}

/**
 * 用户收货地址-基础添加请求参数
 */
export interface UserReceivingAddressAddDTO {
  /**
   * 区域ID
   * @format int32
   */
  areaId?: number;

  /** 区域名 */
  areaName?: string;

  /**
   * 市ID
   * @format int32
   */
  cityId?: number;

  /** 城市名 */
  cityName?: string;

  /**
   * 是否默认 0 否 1 是
   * @format int32
   */
  isDefault?: number;

  /** 收货人姓名 */
  name?: string;

  /** 收货人手机号 */
  phone?: string;

  /**
   * 省ID
   * @format int32
   */
  provinceId?: number;

  /** 省份名 */
  provinceName?: string;

  /** 详细地址 */
  singleAddress?: string;
}

/**
 * 商品-规格引用关系表
 */
export interface GoodsSpecRelation {
  /**
   * 商品编号
   * @example 1
   */
  goodsNo?: string;

  /**
   * Id
   * @format int32
   * @example 1
   */
  id?: number;

  /**
   * 规格详情
   * @example 1
   */
  specDetail?: string;

  /**
   * 规格id
   * @format int32
   * @example 1
   */
  specId?: number;

  /** 拍卖商品规格值 */
  specName?: string;
}

/**
 * 热门搜索词
 */
export interface PopularSearchTerms {
  /**
   * 创建时间
   * @format date-time
   */
  gmtCreate?: string;

  /**
   * 更新时间
   * @format date-time
   */
  gmtModified?: string;

  /**
   * @format int32
   * @example 1
   */
  id?: number;

  /**
   * 展示状态
   * @format int32
   * @example 1 展示 0 不展示
   */
  isShow?: number;

  /**
   * 配置区域 0直播间 1商品
   * @format int32
   * @example 1
   */
  setArea?: number;

  /**
   * 排序值
   * @format int32
   * @example 1
   */
  sort?: number;

  /** 搜索词 */
  terms?: string;
}

export interface PageInfoPartnerRebateInformation {
  /** @format int32 */
  endRow?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  list?: PartnerRebateInformation[];

  /** @format int32 */
  navigateFirstPage?: number;

  /** @format int32 */
  navigateLastPage?: number;

  /** @format int32 */
  navigatePages?: number;
  navigatepageNums?: number[];

  /** @format int32 */
  nextPage?: number;

  /** @format int32 */
  pageNum?: number;

  /** @format int32 */
  pageSize?: number;

  /** @format int32 */
  pages?: number;

  /** @format int32 */
  prePage?: number;

  /** @format int32 */
  size?: number;

  /** @format int32 */
  startRow?: number;

  /** @format int64 */
  total?: number;
}

/**
 * 用户购物车信息返回
 */
export interface UserShopCartVO {
  /** 商品+规格+数量+价格信息 */
  goodsSkuDetailList?: GoodsSkuDetailList[];

  /** 店铺ID */
  id?: string;

  /** 店铺名称 */
  name?: string;

  /** 店铺logo */
  storeLogo?: string;

  /** 店铺NO */
  storeNo?: string;
}

/**
 * 用户收货地址-基础修改请求参数
 */
export interface UserReceivingAddressUpdateDTO {
  /**
   * 区域ID
   * @format int32
   */
  areaId?: number;

  /** 区域名 */
  areaName?: string;

  /**
   * 市ID
   * @format int32
   */
  cityId?: number;

  /** 城市名 */
  cityName?: string;

  /** @format int32 */
  id?: number;

  /**
   * 是否默认 0 否 1 是
   * @format int32
   */
  isDefault?: number;

  /** 收货人姓名 */
  name?: string;

  /** 收货人手机号 */
  phone?: string;

  /**
   * 省ID
   * @format int32
   */
  provinceId?: number;

  /** 省份名 */
  provinceName?: string;

  /** 详细地址 */
  singleAddress?: string;
}

/**
 * 用户基本信息返回
 */
export interface UserDetailInfoVO {
  /** 头像 */
  headImg?: string;

  /** 我的收藏 */
  myCollection?: string;

  /** 我的粉丝 */
  myFans?: string;

  /** 我的关注 */
  myFollow?: string;

  /** 我的点赞 */
  myGive?: string;

  /** 昵称 */
  name?: string;

  /** 微信openID */
  openId?: string;

  /** 个人简介 */
  personalProfile?: string;

  /** 微信unionId */
  unionId?: string;

  /** 用户全局唯一编号 */
  userNo?: string;
}

/**
 * 用户优惠券
 */
export interface UserCoupon {
  /**
   * 领取类型 0 后台发放 1 商品内领取 2 首页领取 3 活动券
   * @format int32
   */
  acceptType?: number;

  /**
   * 归属类型 0平台 1 商家 2 自营商家
   * @format int32
   */
  attributionType?: number;

  /** 优惠劵名称 */
  couponName?: string;

  /**
   * 优惠卷码ID
   * @format int32
   * @example 1
   */
  couponNo?: number;

  /**
   * 优惠劵类型 0 满减 1 满折
   * @format int32
   */
  couponType?: number;

  /** 使用条件需求价格 */
  demandPrice?: number;

  /** 折扣率,% */
  discount?: number;

  /**
   * 冻结状态,生成订单未支付时冻结优惠券 0 未冻结 1 已冻结
   * @format int32
   */
  freezeStatus?: number;

  /**
   * 创建时间
   * @format date-time
   */
  gmtCreate?: string;

  /**
   * 修改时间
   * @format date-time
   */
  gmtModified?: string;

  /**
   * @format int32
   * @example 1
   */
  id?: number;

  /** 使用订单编号 */
  orderNo?: string;

  /** 减免金额 */
  price?: number;

  /**
   * 发放状态  0发放成功 1发放失败(优惠券不足时)
   * @format int32
   */
  releaseStatus?: number;

  /** 发放备注 */
  remark?: string;

  /** 撤销减免金额 */
  revokePrice?: number;

  /** 归属商家店铺编号 */
  storeNo?: string;

  /**
   * 有效期结束
   * @format date-time
   */
  termEnd?: string;

  /**
   * 有效期开始
   * @format date-time
   */
  termStart?: string;

  /**
   * 使用时间
   * @format date-time
   */
  useDate?: string;

  /**
   * 使用状态 0 未使用 1 已使用 2 已过期
   * @format int32
   */
  useStatus?: number;

  /** 领取人用户昵称 */
  userNickname?: string;

  /** 领取人用户编号 */
  userNo?: string;

  /** 领取人手机号 */
  userPhone?: string;
}

/**
 * 拍卖纪录-基础添加请求参数
 */
export interface AuctionWorkGoodsDetailsAddDTO {
  /**
   * 活动ID
   * @format int32
   */
  auctionWorkId: number;

  /** 拍卖商品编号 */
  goodsNo: string;

  /** 出价金额 */
  offerPrice: number;

  /** 出价人手机 */
  phone: string;
}

/**
 * (JC)优惠劵详情
 */
export interface CouponDetail {
  /** 适用商品名称集合,逗号分隔 */
  acceptGoodsName?: string;

  /** 适用商品集合,逗号分隔 */
  acceptGoodsSet?: string;

  /**
   * 商品适用范围  0 全商品 1 指定部分商品 2 指定商品分类
   * @format int32
   */
  acceptGoodsType?: number;

  /** 适用商品类型集合名称,逗号分隔 */
  acceptGoodsTypeName?: string;

  /** 适用商品类型集合,逗号分隔 */
  acceptGoodsTypeSet?: string;

  /**
   * 是否允许领取 0不允许 1允许
   * @format int32
   */
  allowReceive?: number;

  /**
   * 归属类型 0 平台 1 商家 2 自营商家
   * @format int32
   */
  attributionType?: number;

  /**
   * 优惠卷码ID
   * @example 1
   */
  couponNo?: string;

  /**
   * 优惠劵类型 0 满减 1 满折
   * @format int32
   * @example 1
   */
  couponType?: number;

  /** 优惠券说明 */
  detail?: string;

  /**
   * 有效天数(使用条件为1时)
   * @format int32
   * @example 1
   */
  expDayCount?: number;

  /** 使用条件:满减,满折多少元 */
  fullAmount?: number;

  /**
   * 创建时间
   * @format date-time
   */
  gmtCreate?: string;

  /**
   * 修改时间
   * @format date-time
   */
  gmtModified?: string;

  /**
   * @format int32
   * @example 1
   */
  id?: number;

  /**
   * 是否新人券(默认0否1是)
   * @format int32
   */
  isNewcomer?: number;

  /**
   * 每人限领
   * @format int32
   * @example 1
   */
  limitPerPerson?: number;

  /** 优惠劵名称 */
  name?: string;

  /** 满减,满折多少元 */
  price?: number;

  /** 领取方式(,分隔)0后台发放1商品内领取2首页领取3活动券 */
  receiveLimit?: string;

  /**
   * 领取后几天生效(使用条件为1时)
   * @format int32
   * @example 1
   */
  startDayCount?: number;

  /**
   * 库存
   * @format int32
   * @example 1
   */
  stock?: number;

  /** 归属商家店铺编号 */
  storeNo?: string;

  /**
   * 固定期限-结束(使用条件为0时)
   * @format date-time
   */
  termEnd?: string;

  /**
   * 固定期限-开始(使用条件为0时)
   * @format date-time
   */
  termStart?: string;

  /**
   * 使用期限(0固定期限 1自定义期限)
   * @format int32
   * @example 1
   */
  usePeriod?: number;

  /**
   * 领取状态 0 领取 1 已领取 2 已抢完
   * @format int32
   */
  userReceiveStatus?: number;
}

/**
 * 城市合伙人-推广配置
 */
export interface PartnerPromotionConfig {
  /**
   * 结算类型
   * @format int64
   */
  billingType?: number;

  /**
   * 推广关系绑定时效
   * @format int32
   * @example 1
   */
  bindingTime?: number;

  /** 城市合伙人 */
  cityPartnerNote?: string;

  /** 城市合伙人开通须知 */
  cityPartnerOpeningNote?: string;

  /**
   * 创建时间
   * @format date-time
   */
  gmtCreate?: string;

  /**
   * 修改时间
   * @format date-time
   */
  gmtModified?: string;

  /**
   * @format int32
   * @example 1
   */
  id?: number;

  /** 邀请规则 */
  invitationRules?: string;

  /** 推广者最低提现金额 */
  minimumWithdrawal?: number;

  /** 结算比例 */
  settlementRatio?: number;

  /** 提现说明 */
  withdrawalInstructions?: string;
}

/**
 * 确认订单请求项
 */
export interface OrderReqItem {
  /**
   * 购买数量
   * @format int32
   * @example 1
   */
  quantity?: number;

  /**
   * 购物车id(非购物车过来不传)
   * @format int32
   * @example 购物车id
   */
  shopId?: number;

  /**
   * 型号编码
   * @example sku编码
   */
  skuNo?: string;
}

/**
 * 用户购物车-基础修改请求参数
 */
export interface UserShopCartUpdateDTO {
  /** 商品编号(goodsSkuDetailList.goodsNo) */
  goodsNo?: string;

  /**
   * 数量(goodsSkuDetailList.quantity)
   * @format int32
   */
  quantity?: number;

  /** 商品SKU(goodsSkuDetailList.skuNo) */
  skuNo?: string;

  /** 所属门店 */
  storeNo?: string;
}

export interface UserApiActivityGroupsGetParams {
  /**
   * type
   * @example
   */
  type?: string;
}

export interface UserApiDisPartnerWithdrawRecordGetParams {
  /**
   * type
   * @example
   */
  type?: string;
}

export interface UserApiCommunitySelectGoodsGetParams {
  /**
   * 分类查询ID
   * @example 1
   */
  classifyId?: string;

  /**
   * 商品名称
   * @example
   */
  goodsName?: string;

  /** @example  */
  goodsNo?: string;

  /**
   * 查询最高价
   * @example
   */
  highestPrice?: string;

  /**
   * 查询最低价
   * @example
   */
  minimumPrice?: string;

  /**
   * 价格排行
   * @example ASC 正序 DESC 倒序
   */
  priceRank?: string;

  /**
   * 销量排行
   * @example ASC 正序 DESC 倒序
   */
  saleRank?: string;

  /**
   * 店铺编号
   * @example
   */
  storeNo: string;

  /** @example  */
  userNo?: string;
}

export interface UserApiCommunityGetCommunityPostsByMyCollectionGetParams {
  /**
   * 微信openID
   * @example
   */
  openId?: string;
}

export interface UserApiCommunityGetCommunityPostsByMyGiveGetParams {
  /**
   * 微信openID
   * @example
   */
  openId?: string;
}

export interface UserApiActivityGroupsShareGetParams {
  /**
   * goodsNo
   * @example
   */
  goodsNo: string;

  /**
   * groupWorkId
   * @example
   */
  groupWorkId: string;
}

export interface UserApiHomeRecommendedLiveRoomListsGetParams {
  /**
   * categoryId
   * @example
   */
  categoryId?: string;
}

export interface UserApiSettingUpdateUserAccountInformationPostParams {
  /**
   * 1男 2女 0未知
   * @example
   */
  gender?: string;

  /**
   * 头像
   * @example
   */
  headImg?: string;

  /**
   * 昵称
   * @example
   */
  name?: string;

  /**
   * 个人简介
   * @example
   */
  personalProfile?: string;

  /** @example  */
  userNo?: string;
}

export interface UserApiCommunityUpdateCommunityPostsByGiveNumberGetParams {
  /**
   * 是否收藏(0否1是)
   * @example
   */
  isCollection?: string;

  /**
   * 是否关注(0否1是)
   * @example
   */
  isFollow?: string;

  /**
   * 是否点赞(0否1是)
   * @example
   */
  isGive?: string;

  /**
   * 是否观看(0否1是)
   * @example
   */
  isViews?: string;

  /**
   * 帖子id
   * @example
   */
  postsId?: string;
}

export interface UserApiCommunityUpdateCommunityPostsByGiveNumberPostParams {
  /**
   * 是否收藏(0否1是)
   * @example
   */
  isCollection?: string;

  /**
   * 是否关注(0否1是)
   * @example
   */
  isFollow?: string;

  /**
   * 是否点赞(0否1是)
   * @example
   */
  isGive?: string;

  /**
   * 是否观看(0否1是)
   * @example
   */
  isViews?: string;

  /**
   * 帖子id
   * @example
   */
  postsId?: string;
}

export interface UserApiLiveRoomGetParams {
  /**
   * 直播间名称
   * @example
   */
  roomTitle?: string;

  /**
   * 店铺编号
   * @example
   */
  storeNo: string;

  /** @example  */
  userNo?: string;
}

export interface UserApiDisPartnerOrderRecordsGetParams {
  /**
   * 日期
   * @example
   */
  gmtModified?: string;

  /**
   * 返佣状态(0在途 1作废 2到账)
   * @example
   */
  rebateStatus?: string;

  /**
   * 商家ID
   * @example
   */
  storeInfoId?: string;
}

export interface UserApiStoreGetStoreNoticeGetParams {
  /**
   * 店铺编号
   * @example
   */
  storeNo?: string;
}

export interface UserApiCommunityGetCommunityPostsByMeGetParams {
  /**
   * 微信openID
   * @example
   */
  openId?: string;
}

export interface UserApiStoreGetParams {
  /**
   * 升序/降序
   * @example
   */
  order: string;

  /**
   * 店铺名称/商品名称
   * @example
   */
  searchInfo?: string;

  /**
   * 排序类型
   * @example
   */
  sort: string;
}

export interface UserApiActivityGoodsDetailGetParams {
  /**
   * goodsNo
   * @example
   */
  goodsNo: string;

  /**
   * groupWorkId
   * @example
   */
  groupWorkId: string;
}

export interface UserApiGoodsGetParams {
  /**
   * 分类查询ID
   * @example 1
   */
  classifyId?: string;

  /**
   * 商品名称
   * @example
   */
  goodsName?: string;

  /** @example  */
  goodsNo?: string;

  /**
   * 查询最高价
   * @example
   */
  highestPrice?: string;

  /**
   * 查询最低价
   * @example
   */
  minimumPrice?: string;

  /**
   * 价格排行
   * @example ASC 正序 DESC 倒序
   */
  priceRank?: string;

  /**
   * 销量排行
   * @example ASC 正序 DESC 倒序
   */
  saleRank?: string;

  /**
   * 店铺编号
   * @example
   */
  storeNo: string;

  /** @example  */
  userNo?: string;
}

export interface UserApiCommunityGetCommunityPostsGetParams {
  /**
   * 分类ID
   * @example
   */
  classificationId?: string;

  /**
   * 帖子内容
   * @example
   */
  keyWords?: string;
}

export interface UserApiDisPartnerRichTextDetailGetParams {
  /**
   * type
   * @example
   */
  type?: string;
}

export interface UserApiActivityPayGetParams {
  /**
   * orderNo
   * @example
   */
  orderNo: string;
}

export interface UserApiGoodsDetailGetParams {
  /**
   * 活动ID 对应活动的编号
   * @example
   */
  activityId?: string;

  /**
   * 商品编号
   * @example
   */
  goodsNo?: string;

  /**
   * 商品访问来源 0 普通 1活动?2拍卖
   * @example
   */
  source?: string;

  /**
   * 门店编号
   * @example
   */
  storeNo?: string;

  /** @example  */
  userNo?: string;
}

export interface UserApiActivityGetParams {
  /**
   * type
   * @example
   */
  type?: string;
}

export interface UserApiPopularSearchTermsGetParams {
  /**
   * 配置区域 0直播间 1商品
   * @example
   */
  setArea?: string;
}
