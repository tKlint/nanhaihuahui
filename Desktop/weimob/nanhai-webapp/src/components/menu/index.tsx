/* eslint-disable @typescript-eslint/member-ordering */
import { ScrollView, View, Image } from '@tarojs/components'
import Taro, { getSystemInfoSync } from '@tarojs/taro'
import { autobind } from '~/modules/@wmeimob/decorator/src/components'
import classNames from 'classnames'
import styles from './index.modules.less'
import { Component, ReactNode } from 'react'
import global from '../../globalStore'
// import { isH5 } from '~/config'

export interface IMMMenuData {
  childrenCategoryList: any
  name: ReactNode
  id: any
  map(arg0: (ite: any, inde: any) => JSX.Element): import('react').ReactNode
  text: string
  children?: IMMMenuData[]
  imgUrl: string
}
export const { statusBarHeight } = getSystemInfoSync()

interface IMMMenuProps {
  /**
   * 滚动视窗高度
   *
   * @type {number}
   * @memberof IMMMenuProps
   */
  scrollViewHeight?: number

  /**
   * 滚动视窗高度
   *
   * @type {number}
   * @memberof IMMMenuProps
   */
  type?: number

  /**
   * 数据
   *
   * @type {IMMMenuData[]}
   * @memberof IMMMenuProps
   */
  data: IMMMenuData[]

  /**
   * 数据
   *
   * @type {IMMMenuData[]}
   * @memberof IMMMenuProps
   */
  // data2: IMMMenuData[]
  /**
   * 选中改变事件
   *
   * @memberof IMMMenuProps
   */
  onChange: (value: Object, index: number) => void
  /**
   * 选中改变事件
   *
   * @memberof IMMMenuProps
   */
  changeLeft: (value: string[]) => void
  /**
   * 选中改变事件
   *
   * @memberof IMMMenuProps
   */
  onMore: (value: string[]) => void
}

@autobind
export default class MMMenu extends Component<IMMMenuProps> {
  static options = {
    addGlobalClass: true
  }

  static defaultProps: Partial<IMMMenuProps> = {
    data: []
  }

  state = {
    scrollViewHeight: 0,
    activeIndex: 0,
    value: 0,
    valueName: '',
    scrollTop: 0
  }

  // onScroll(event) {
  // this.setState({ scrollTop: event.detail.scrollTop })
  // this.setState({ scrollTop: 0 })
  // }

  render() {
    const { data } = this.props
    const { activeIndex, scrollTop } = this.state
    return (
      !!data.length && (
        <View className={styles.MMMenu}>
          <ScrollView scrollY className={styles.list} show-scrollbar={false} enhanced>
            {data.map((dataValue, index) => (
              <View className={classNames(styles.overflows)} key={dataValue.id}>
                <View onClick={() => this.onChangeLeft(index, dataValue.id)} className={classNames(styles.item, index === activeIndex ? styles.selected : '')}>
                  {dataValue.name}
                </View>
              </View>
            ))}
          </ScrollView>
          {/* onScroll={eve => this.onScroll(eve)} scrollTop={scrollTop} */}
          {/* scrollAnchoring={true} */}
          <ScrollView scrollY show-scrollbar={false} className={styles.listChildren}>
            <View className={classNames(styles.overflows, styles.contentBox)}>
              <Image className={styles.secondBoxTopImg} src={data[activeIndex].imgUrl || ''} />
              <View className={styles.secondBoxTopTitle}>
                <View className={styles.secondBoxLeft} />
                <View className={styles.title}>{data[activeIndex].name || ''}</View>
                <View className={styles.secondBoxRight} />
              </View>
              {data[activeIndex] && data[activeIndex].children && data[activeIndex].children.length > 0 && (
                <View className={styles.secondBoxs}>
                  {data[activeIndex].children.map((ite, inde) => {
                    return (
                      <View className={styles.secondBoxsBoxs} key={ite.name + `${inde}`}>
                        <Image className={styles.secondBoxsBoxsImg} src={ite.imgUrl} />
                        <View className={styles.secondBoxsBoxsTitle}>{ite.name}</View>
                      </View>
                    )
                  })}
                </View>
              )}
              {/*  */}
            </View>
          </ScrollView>
        </View>
      )
    )
  }

  private onChangeLeft(activeIndex, string) {
    this.setState({ activeIndex, valueName: string })
    this.props.changeLeft(string)
  }

  private onChangeRight(value: any, tValue: any, index: number, iteNme: String, itName: String) {
    // const { showName } = this.props.data[this.state.activeIndex]
    // const string = showName + '/' + iteNme + '/' + itName
    // eslint-disable-next-line no-shadow
    const data = {
      thirdCategoryNo: tValue.categoryNo,
      showName: tValue.showName
    }
    this.props.onChange(data, index)
  }
}
