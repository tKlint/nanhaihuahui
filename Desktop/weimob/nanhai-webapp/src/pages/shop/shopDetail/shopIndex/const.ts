export interface IShopIndexProps {
  noticeList: any
  shopDetail: any
  bannerList: any
  couponList: any
  goodsList: any,
  getAllCoupon(): void
  getAllGoods(): void
  drawCoupon(any, boolean): void
}
