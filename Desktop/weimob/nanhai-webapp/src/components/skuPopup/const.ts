
// import { IMMPopupProps } from "../popup/const";

export interface ISkuPopupProps {
  /** 购买数量 */
  quantity?: number;
  /** sku 编号 */
  skuNo?: string;
  /** 商品规格信息 */
  mallGoodsSpecs?: any;
  /** 商品sku映射信息 */
  goodsSkuWebVoList: any,
  /** 活动商品sku */
  activitySkuWebVo?: any,
  // 是否是奖品
  isPrize?: string,
  // 是否是活动sku
  isActivityGood?: boolean,
  // 是否是拼团sku选择
  isGroup?: boolean,
  // 是否显示划线价
  showPrice?: number, visible: boolean,
  storeNo?: string
  /** 点击确定 */
  onComfirm?(skuNo: string, quantity: number, isActSku?: string): void;
  onClose?(): void
}

