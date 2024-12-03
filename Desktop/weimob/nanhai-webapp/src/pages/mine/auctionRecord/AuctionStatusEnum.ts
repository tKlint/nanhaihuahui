export enum AuctionStatusEnum {
  OUT = 1,
  WAIT_PAY = 2,
  PAY = 3,
  LEAD = 4,
  OVER_TAKE = 5
}

export const AuctionStatusTitle = {
  [AuctionStatusEnum.OUT]: '出局',
  [AuctionStatusEnum.WAIT_PAY]: '成交',
  [AuctionStatusEnum.PAY]: '成交',
  [AuctionStatusEnum.LEAD]: '领先',
  [AuctionStatusEnum.OVER_TAKE]: '被超'
}

export const AuctionStatusHandleTitle = {
  [AuctionStatusEnum.OUT]: '已截拍',
  [AuctionStatusEnum.WAIT_PAY]: '去支付',
  [AuctionStatusEnum.PAY]: '订单详情',
  [AuctionStatusEnum.LEAD]: '去加价',
  [AuctionStatusEnum.OVER_TAKE]: '详情'
}

export const AuctionStatusStyle = {
  [AuctionStatusEnum.OUT]: {
    color: '#fff',
    background: '#000',
    opacity: 0.4
  },
  [AuctionStatusEnum.WAIT_PAY]: {
    color: '#333',
    background: '#fff'
  },
  [AuctionStatusEnum.PAY]: {
    color: '#333',
    background: '#fff'
  },
  [AuctionStatusEnum.LEAD]: {
    background: '#FD4F53',
    color: '#fff'
  },
  [AuctionStatusEnum.OVER_TAKE]: {
    background: 'linear-gradient(180deg, #FFF5F5 0%, #FFEEEE 100%)',
    color: 'FD4F53'
  }
}

export const AuctionStatusHandleStyle = {
  [AuctionStatusEnum.OUT]: {
    border: '1px solid #F0F0F0',
    color: ' #ABABAB'
  },
  [AuctionStatusEnum.WAIT_PAY]: {
    background: 'linear-gradient(90deg, #FF7132 0%, #FC2C77 100%)',
    color: ' #fff'
  },
  [AuctionStatusEnum.PAY]: {
    border: '1px solid #F0F0F0',
    color: '#333'
  },
  [AuctionStatusEnum.LEAD]: {
    border: '1px solid #F0F0F0',
    color: '#333'
  },
  [AuctionStatusEnum.OVER_TAKE]: {
    border: '1px solid #FD4F53',
    color: ' #FD4F53'
  }
}

export default AuctionStatusEnum
