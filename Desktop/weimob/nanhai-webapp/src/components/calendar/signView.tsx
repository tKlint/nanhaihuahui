import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import styles from './index.modules.less'
import dayjs from 'dayjs'
import classNames from 'classnames'
import { autobind } from 'core-decorators'
import { guid } from '~/modules/@wmeimob/taro-design/src/components/utils'
import { PureComponent } from 'react'

interface IMMCalendarItemProps {
  /**
   * 签到日期
   */
  signDate?: Date[]

  /**
   * 选择
   *
   * @memberof IMMCalendarProps
   */
  onClick?: (value: Date) => void

  /**
   * 切换日期时
   */
  onMove?: (data: Date) => void
}

@autobind
export default class MMSignView extends PureComponent<IMMCalendarItemProps> {
  static options = {
    addGlobalClass: true
  }

  static defaultProps = {}

  state = {
    date: new Date()
  }

  dateState: { [key: string]: { disable: boolean } } = {}

  render() {
    const { date: dayDate } = this.state
    const day = dayjs(dayDate)

    const prevMonth = day.subtract(1, 'month').endOf('month').get('date')
    // startDay应该是以当前日期的本月第一天为基准 day.startOf("month")
    const startDay = new Array(day.startOf('month').day())
      .fill('1')
      .map((_value, index) => {
        return {
          id: guid(),
          text: prevMonth - index
        }
      })
      .reverse()
    const endMonth = day.endOf('month').get('day')
    const endDay = new Array(6 - endMonth).fill('1').map((_value, index) => {
      return {
        id: guid(),
        text: index + 1
      }
    })
    const dayArrayLength = day.endOf('month').date()

    return (
      dayDate && (
        <View className={styles.monthBox}>
          <View id={'MMCalendarItem' + dayDate.getTime()} />
          <View className={styles.topBox}>
            <View className={styles.month}>{day.format('YYYY年MM月')}</View>
            <View className={styles.moveBtn}>
              <Image
                className={styles.moveBtnImg}
                onClick={() => this.handleMove(-1)}
                src="https://ocj-uat.oss-cn-shanghai.aliyuncs.com/uat/app-assets/signin_l-H9fOaIAd2WHd.png"
              />
              <Image
                className={styles.moveBtnImg}
                onClick={() => this.handleMove(1)}
                src="https://ocj-uat.oss-cn-shanghai.aliyuncs.com/uat/app-assets/signin_r-42h31cfxeHE9.png"
              />
            </View>
          </View>
          <View className={styles.weekTitle}>
            <View className={styles.weekItem}>日</View>
            <View className={styles.weekItem}>一</View>
            <View className={styles.weekItem}>二</View>
            <View className={styles.weekItem}>三</View>
            <View className={styles.weekItem}>四</View>
            <View className={styles.weekItem}>五</View>
            <View className={styles.weekItem}>六</View>
          </View>
          <View>
            <View className={styles.date}>
              {startDay.map((val, index) => (
                <View key={val.id} className={styles.item}>
                  <View className={classNames(styles.disable, styles.itemContent)}>
                    <View className={classNames(styles.itemText, styles.disable)}>{val.text}</View>
                  </View>
                </View>
              ))}
              {this.renderDateItem(dayArrayLength, day)}
              {endDay.map((val, index) => (
                <View key={val.id} className={styles.item}>
                  <View className={classNames(styles.disable, styles.itemContent)}>
                    <View className={classNames(styles.itemText, styles.disable)}>{val.text}</View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      )
    )
  }

  private handleMove(num: number) {
    const date = dayjs(this.state.date).add(num, 'month').toDate()
    this.setState({
      date: dayjs(this.state.date).add(num, 'month').toDate()
    })
    this.props.onMove && this.props.onMove!(date)
  }

  private renderDateItem(num: number, date: dayjs.Dayjs) {
    const id = guid()
    return new Array(num).fill('2').map((val, index) => {
      const dayMonth = date.startOf('month')
      const day = dayMonth.add(index, 'day')
      const text = ''

      // 这里必须要用bind 和 字符串类型配合 不然传不进去 taro bug
      const dayDate = day.format()
      return (
        <View key={id + index} className={classNames(styles.item)} onClick={this.onClick.bind(this, dayDate)}>
          <View className={this.getItemClassName([styles.itemContent], day)}>
            <View className={classNames(styles.itemText)}>{index + 1}</View>
            {/* <View className={styles.dot}>{text}</View> */}
          </View>
        </View>
      )
    })
  }

  private onClick(date: string) {
    const day = dayjs(date).toDate()
    this.props.onClick && this.props.onClick(day)
  }

  private getItemClassName(classnames: string[], day: dayjs.Dayjs) {
    const classList: any = []
    const { signDate } = this.props
    if (day.isSame(new Date(), 'date')) {
      classList.push(styles.sign)
    }
    if (signDate && signDate.find((value) => day.isSame(value, 'date'))) {
      classList.push(styles.showDot)
    }
    return classNames(...classnames, ...classList)
  }
}
