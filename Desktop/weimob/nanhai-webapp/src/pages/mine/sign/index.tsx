/* eslint-disable react/no-children-prop */
import Taro from '@tarojs/taro'
import { FC, memo, useState } from 'react'
import { View, Image, RichText } from '@tarojs/components'
import styles from './index.module.less'
import { ISignProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import { isNewIphone } from '~/modules/@wmeimob/taro-design/src/components/utils'
import MMSignView from '~/components/calendar/signView'
import MMPopup from '~/components/popup'

const Component: FC<ISignProps> = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [dateList, setDateList] = useState<any>([])
  const [signRule, setSignRule] = useState<string>(
    '1.用户连续签到2天，获得2元无|门槛现金红包。  2.连续签到7天，获得20元满减现金红包，购买任意二手物品可享受满50减20优惠。  3.若用户有作弊行为(如同一用户使用多账号、多设备等行为)，则无法领取和使用红包。 7.转转拥有在法律允许的范围内对本活动进行解释的权利。'
  )
  function onSelect(date) {}

  return (
    <View className={styles.signStyle}>
      <MMNavigation title="签到" />
      <View className={styles.signWrap}>
        <Image className={styles.signBg} src={require('~/images/sign/signBg.png')} />
        <View className={styles.dateWrap}>
          <View className={styles.dateCont}>
            <MMSignView signDate={dateList} onClick={(date) => onSelect(date)} />
          </View>
        </View>
        <View className={styles.signRule}>
          <View className={styles.signRuleTitle}>签到活动规则</View>
          <View className="taro_html" dangerouslySetInnerHTML={{ __html: signRule }} />
        </View>
        {isNewIphone && <View className="spacingIphone" />}
      </View>
      <MMPopup title="恭喜您，签到成功" visible={visible} onOk={() => setVisible(false)} okText="确定" children="获得35积分" footer={true} />
    </View>
  )
}

const Sign = memo(Component)
export default Sign
