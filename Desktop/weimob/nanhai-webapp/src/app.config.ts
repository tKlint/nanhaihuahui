/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { AppConfig } from '@tarojs/taro'

export default {
  pages: [
    'pages/home/index',
    'pages/goodsClassify/index',
    'pages/shopCart/index',
    'pages/community/index',
    'pages/tabber/mine/index',
    'pages/liveHome/index', // 首页直播导航
    'pages/auctionGoodDetail/index', // 拍卖商品详情
    'pages/supportService/index',// 客服
    'pages/liveRoom/index'
  ],
  tabBar: {
    custom: true,
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页'
      },
      {
        pagePath: 'pages/goodsClassify/index',
        text: '分类'
      },
      {
        pagePath: 'pages/community/index',
        text: '社区'
      },
      {
        pagePath: 'pages/shopCart/index',
        text: '购物车'
      },
      {
        pagePath: 'pages/tabber/mine/index',
        text: '我的'
      }
    ]
  },
  subPackages: [
    {
      root: 'pages/login',
      pages: ['login/index', 'accredit/index']
    },
    {
      root: 'pages/subcommunity',
      pages: [
        'search/index', // 社区搜索
        'detail/index', // 帖子详情
        'release/index', // 发布
        'regoods/index', // 发布-关联商品
        'playerCommunity/index/index', // 玩家社区
        'playerCommunity/collection/index', // 玩家社区 - 收藏
        'playerCommunity/follow/index', // 玩家社区 - 关注
        'playerCommunity/fans/index', // 玩家社区 - 粉丝
        'playerCommunity/like/index' // 玩家社区 - 点赞
      ]
    },
    {
      root: 'pages/search',
      pages: [
        'homeSearch/index', // 首页搜索
        'shopList/index', // 店铺
        'goodList/index' // 分类搜索商品列表
      ]
    },
    {
      root: 'pages/selfMall',
      pages: [
        'mall/index' // 自营商城
      ]
    },
    {
      root: 'pages/shop',
      pages: [
        'shopDetail/index', // 店铺详情
        'merchantInfo/index', // 商家信息
        'shopCard/index', // 商家名片
        'shopCertification/index', // 商家资质
        'shopNotice/index' // 商家公告
      ]
    },
    {
      root: 'pages/mine',
      pages: [
        'auctionRecord/index', // 参拍记录
        'setting/index', // 设置
        'accountInfo/index', // 账户信息
        'site/index', // 我的地址
        'setSite/index', // 新建、更改地址
        'feedback/index', // 意见反馈
        'sign/index', // 签到
        'integral/index', // 积分
        'collection/index', // 我的收藏
        'attention/index', // 我的关注
        'coupon/index', // 我的优惠券
        'couponDetail/index', // 优惠券详情
        'myOrder/index', // 我的订单
        'orderDetail/index', // 订单详情
        'myEvaluation/index', // 我的评价
        'messageCenter/index', // 消息中心
        'commentsAndLikes/index', // 评论和点赞
        'inMall/index', // 站内信
        'allRule/index', // 提现说明 及 各种规则
        'cityPartner/index', // 城市合伙人
        'makePartner/index', // 成为合伙人
        'partnerCenter/index', // 合伙人中心
        'withdraw/index', // 提现
        'withdrawRecord/index', // 提现记录
        'myMerchant/index', // 我的商户
        'inviteSetShop/index', // 邀请开店
        'rebateOrder/index' // 返佣订单记录
      ]
    },
    {
      root: 'pages/order',
      pages: [
        'logistics/index', // 物流
        'afterSale/index', // 申请退款
        'afterSaleDetail/index', // 申请退款
        'afterSaleSuccess/index', // 退货退款
        'sale/index', // 退款/售后
        'saleDetail/index', // 售后详情
        'appeal/index', // 申诉
        'groupBook/index', // 拼团
        'groupBookDetail/index', // 拼团详情
        'confirmOrder/index', // 确认订单
        'paySuccess/index', // 支付成功
        'openGroupSuccess/index', // 拼团 开团成功页面（参团）
        'evaluate/index', // 评价
        'evaluateSuccess/index' // 评价成功
      ]
    },
    {
      root: 'pages/business',
      pages: [
        'business/index', // 商家中心
        'businessCenter/index', // 商家中心
        'businessIndex/index', // 商家中心首页
        'openBusiness/index', // 开通
        'businessLogin/index', // 登录
        'applyForLive/index', // 申请开通直播
        'businessAccount/index', // 账户密码
        'inviteMember/index' // 邀请人
      ]
    },
    {
      root: 'pages/activity',
      pages: [
        'groupHome/index', // 拼团首页
        'groupShare/index', // 拼团分享
        'goodDetail/index', // 拼团商品详情
        'commodityDetail/index', // 商品详情
        'liveRoomDetail/index' // 直播间
      ]
    }
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTextStyle: 'black',
    navigationBarTitleText: 'WeChat',
    navigationStyle: 'custom'
  },
  plugins: {
    liveRoomPlugin: {
      version: '1.3.4',
      provider: 'wx95a7d2b78cf30f98'
    }
  }
} as AppConfig
