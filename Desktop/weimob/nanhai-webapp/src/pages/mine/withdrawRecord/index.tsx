import Taro from '@tarojs/taro'
import { FC, memo, useState } from 'react'
import { View, Image, ScrollView } from '@tarojs/components'
import styles from './index.module.less'
import { IWithdrawRecordProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import classNames from 'classnames'
import DefaultPage from '~/components/defaultPage'
import Tabber from '~/components/tabber'

const Component: FC<IWithdrawRecordProps> = () => {
  const [records, setRecords] = useState<any>([
    {
      id: 1,
      withdrawAmount: 127.0,
      WithdrawTime: '2020-03-17 17:01',
      withdrawStatus: 0
    },
    {
      id: 2,
      withdrawAmount: 127.0,
      WithdrawTime: '2020-03-17 17:01',
      withdrawStatus: 1
    },
    {
      id: 3,
      withdrawAmount: 127.0,
      WithdrawTime: '2020-03-17 17:01',
      withdrawStatus: 2
    }
  ])
  const [tabIndex, setTabIndex] = useState<number>(0)
  const tabberArr = [
    {
      id: 0,
      title: '全部'
    },
    {
      id: 1,
      title: '已打款'
    },
    {
      id: 2,
      title: '未打款'
    }
  ]
  return (
    <View className={styles.withdrawRecordStyle}>
      <MMNavigation title="提现记录" />
      <Tabber tabIndex={tabIndex} setTabIndex={setTabIndex} tabArr={tabberArr} isBottomTxt={false} />
      {records && records.length > 0 && (
        <View className={styles.withdrawRecord}>
          <ScrollView scrollY className={styles.sview}>
            {records.map((item) => {
              return (
                <View key={item} className={styles.record}>
                  <View className={styles.recordLabel}>提现</View>
                  <View className={classNames(styles.recordLabel, styles.recordLabelAmount)}>¥{item.withdrawAmount}</View>
                  <View className={styles.recordLabel}>申请提现时间</View>
                  <View className={styles.recordLabel}>{item.WithdrawTime}</View>
                  <View className={styles.recordLabel}>状态</View>
                  <View className={classNames(styles.recordLabel, item.withdrawStatus === 1 ? styles.recordLabelCheck : '')}>
                    {{ 0: '未打款', 1: '待审核', 2: '已打款' }[item.withdrawStatus] || ''}
                  </View>
                </View>
              )
            })}
          </ScrollView>
        </View>
      )}
      {records && records.length === 0 && <DefaultPage defaultHint="暂无记录" imgSrc={require('~/images/noRecord.png')} imgTop="100px" />}
    </View>
  )
}

const WithdrawRecord = memo(Component)
export default WithdrawRecord
