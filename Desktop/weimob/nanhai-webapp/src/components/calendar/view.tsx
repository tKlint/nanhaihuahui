import { ScrollView, View } from '@tarojs/components';
import { BaseEventOrig, ITouchEvent } from '@tarojs/components/types/common';
import Taro, { Component } from '@tarojs/taro';
import { autobind, debounce } from '~/modules/@wmeimob/decorator/src/components';
import dayjs from 'dayjs';
import styles from './index.modules.less';
import MMCalendarItem from './viewItem';
import MMPopup from '~/modules/@wmeimob/taro-design/src/components/modal/popup';
import { selectRect } from '~/modules/@wmeimob/taro-design/src/components/utils';
import { guid } from '~/modules/@wmeimob/utils/src/other';

export interface IMMCalendarViewProps {
  /**
   * 选中的区间
   *
   * @type {[Date, Date]}
   * @memberof IMMCalendarProps
   */
  value: [Date, Date] | [Date] | []

  /**
   * 禁止日期
   *
   * @type {[Date, Date][]}
   * @memberof IMMCalendarViewProps
   */
  disableDate?: [Date, Date][]

  /**
   * 选择区间包含禁止日期
   *
   * @memberof IMMCalendarViewProps
   */
  onSelectHasDisableDate?: (value: [Date, Date] | [Date] | []) => void

  /**
   * 选择区间最小值
   *
   * @type {Date}
   * @memberof IMMCalendarProps
   */
  minDate?: Date
  /**
   * 选择区间最大值
   *
   * @type {Date}
   * @memberof IMMCalendarProps
   */
  maxDate?: Date
  /**
   * 初始化月数
   *
   * @type {number}
   * @memberof IMMCalendarProps
   */
  initalMonths?: number
  /**
   * 选择
   *
   * @memberof IMMCalendarProps
   */
  onSelect: (value: [Date, Date] | [Date] | []) => void

  /**
   * 点击确定
   *
   * @memberof IMMCalendarProps
   */
  onClick: () => void

  /**
   * 滚动条高度
   *
   * @type {number}
   * @memberof IMMCalendarViewProps
   */
  scrollViewHeight?: number
}
interface IMMCalendarViewState {
  scrollTop: number
  scrollViewHeight: number
  scrollViewTop: number
  monthsNumber: number
  noMore: boolean
}
/**
 * 日历插件 [性能优化] 日历状态的缓存
 *
 * @export
 * @class MMCalendarView
 * @extends {Component<IMMCalendarViewProps, IMMCalendarViewState>}
 */
@autobind
export class MMCalendarView extends Component<IMMCalendarViewProps, IMMCalendarViewState> {
  static options = {
    addGlobalClass: true
  };

  static defaultProps = {
    disableDate: [],
    minDate: new Date(),
    // maxDate: new Date('2019-11-22'),
    maxDate: dayjs(new Date()).add(1, 'year').toDate(),
    initalMonths: 10
  }

  state: IMMCalendarViewState = {
    scrollTop: 0,
    scrollViewTop: 0,
    scrollViewHeight: 0,
    monthsNumber: this.props.initalMonths || MMCalendarView.defaultProps.initalMonths,
    noMore: false
  }

  id = "MMCalendarViewTop" + guid()

  popup: MMPopup

  render() {
    const { scrollViewHeight, noMore } = this.state;
    const [startTime, endTime] = this.props.value || [];
    return <View className={styles.MMCalendar}>
      <MMPopup ref={ref => this.popup = ref as MMPopup} />
      <View className={styles.weekTitle} onTouchMove={this.onTouchMove}>
        <View className={styles.weekItem}>日</View>
        <View className={styles.weekItem}>一</View>
        <View className={styles.weekItem}>二</View>
        <View className={styles.weekItem}>三</View>
        <View className={styles.weekItem}>四</View>
        <View className={styles.weekItem}>五</View>
        <View className={styles.weekItem}>六</View>
      </View>
      <View id={this.id} />
      <ScrollView scrollY throttle={false} style={{ height: '280px' }}
        onScroll={this.onScroll as any} lowerThreshold={2000} onScrollToLower={this.onScrollToLower}>
        {this.renderDate()}
        <View className={styles.loading}>
          {noMore ? '' : '加载中'}
        </View>
      </ScrollView>
    </View>
  }

  componentDidMount() {
    if (this.props.scrollViewHeight) {
      this.setState({
        scrollViewHeight: this.props.scrollViewHeight
      })
    } else {
      setTimeout(() => {
        this.calculateScrollViewHeight();
      }, 1000)
    }
  }

  async calculateScrollViewHeight() {
    const topViewRes = await selectRect('#' + this.id, this.$scope);
    Taro.getSystemInfo({
      success: res => {
        this.setState({
          scrollViewTop: topViewRes.top,
          scrollViewHeight: res.screenHeight - topViewRes.top
        });
      }
    });
  }

  @debounce(200)
  private onScroll(event: BaseEventOrig<{ scrollTop: number }>) {
    this.setState({
      scrollTop: event.detail.scrollTop
    })
  }

  private onTouchMove(event: ITouchEvent) {
    event.stopPropagation();
  }

  private onScrollToLower() {
    const diffNumber = dayjs(this.props.maxDate).diff(dayjs(this.props.minDate), 'month');
    if (this.state.monthsNumber < diffNumber + 1) {
      let monthsNumber = this.state.monthsNumber + 3;
      if (monthsNumber > diffNumber + 1) {
        monthsNumber = diffNumber + 1;
      }
      this.setState({
        monthsNumber
      })
    } else {
      this.setState({
        noMore: true
      })
    }
  }

  private renderDate() {
    const { minDate, maxDate, value: PropsValue } = this.props;
    const { monthsNumber, scrollTop } = this.state;
    const diffNumber = dayjs(maxDate).diff(dayjs(minDate), 'month');
    const monthsNu = monthsNumber > diffNumber + 1 ? diffNumber + 1 : monthsNumber;
    const monthhsArray = new Array(monthsNu).fill(1);

    let top = 0;
    return PropsValue && monthhsArray.map((_value, index) => {
      const day = dayjs(minDate).add(index, 'month').startOf('month');
      const dayRowNumber = day.day() + day.endOf('month').date() > 35 ? 6 : 5;
      const date = day.toDate();
      const isScreen = Math.abs(top - scrollTop) < 1000 && Math.abs(scrollTop - top) < 1000;
      top += (dayRowNumber + 1) * styles.itemHeight;
      return <View key={date.toString()} >
        <MMCalendarItem inScreen={isScreen} date={date} {...this.props} />
      </View>
    });
  }
}
