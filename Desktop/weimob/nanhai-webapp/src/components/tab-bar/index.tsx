import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { autobind } from '~/modules/@wmeimob/decorator/src/components'
import MMIconFont from '~/modules/@wmeimob/taro-design/src/components/icon-font'
import styles from './index.modules.less'
import classNames from 'classnames'
import { isNewIphone } from '~/modules/@wmeimob/taro-design/src/components/utils'
import MMBadge from '~/modules/@wmeimob/taro-design/src/components/badge'
import MMIconFontName from '~/modules/@wmeimob/taro-design/src/components/icon-font/name'
import { PureComponent } from 'react'

interface IMMTabBarData {
  /**
   * 图标
   *
   * @type {string}
   * @memberof IMMTabBarData
   */
  image?: any

  /**
   * 选中时候的样式
   *
   * @type {*}
   * @memberof IMMTabBarData
   */
  imageSelected?: any

  /**
   * iconfont值
   *
   * @type {string}
   * @memberof IMMTabBarData
   */
  iconfont?: MMIconFontName
  /**
   * 文字
   *
   * @type {string}
   * @memberof IMMTabBarData
   */
  text: string
  /**
   * 跳转连接
   *
   * @type {string}
   * @memberof IMMTabBarData
   */
  url: string
  /**
   * 红点
   *
   * @type {boolean}
   * @memberof IMMTabBarData
   */
  redHot?: boolean
  /**
   * 未读数
   *
   * @type {number}
   * @memberof IMMTabBarData
   */
  count?: number
}

interface IMMTabBarProps {
  /**
   * 点击事件 返回false 可以组织页面的跳转
   *
   * @memberof IMMTabBarProps
   */
  onClick?: (data: IMMTabBarData) => boolean | void

  /**
   *  tabar数据
   *
   * @type {IMMTabBarData}
   * @memberof IMMTabBarProps
   */
  data?: IMMTabBarData[]

  /**
   * 当前激活路径
   */
  path?: string
}

export interface IMMTabBarState {
  /**
   * 当前页面index
   *
   * @type {number}
   * @memberof IMMTabBarState
   */
  currPageIndex: number

  /**
   * 导航数据
   *
   * @type {IMMTabBarData[]}
   * @memberof IMMTabBarState
   */
  data: IMMTabBarData[]
}

const MMTabBarList: MMTabBar[] = []

/**
 * @name 标签栏
 */
@autobind
export default class MMTabBar extends PureComponent<IMMTabBarProps, IMMTabBarState> {
  static currPageIndex = 0

  static options = {
    addGlobalClass: true
  }

  static defaultProps: Partial<IMMTabBarProps> = {}

  static data: IMMTabBarData[] = [
    {
      image: require('~/images/indexIcon.png'),
      imageSelected: require('~/images/indexed.png'),
      url: '/pages/home/index',
      iconfont: MMIconFontName.Admin,
      text: '首页'
    },
    {
      image: require('~/images/classIcon.png'),
      imageSelected: require('~/images/classed.png'),
      iconfont: MMIconFontName.Admin,
      url: '/pages/goodsClassify/index',
      text: '分类'
    },
    // {
    //   image: require('~/images/socialIcon.png'),
    //   imageSelected: require('~/images/socialIcon.png'),
    //   iconfont: MMIconFontName.Admin,
    //   url: '/pages/home/index',
    //   text: '社区'
    // },
    {
      image: require('~/images/shopCartIcon.png'),
      imageSelected: require('~/images/shoped.png'),
      iconfont: MMIconFontName.Admin,
      url: '/pages/shopCart/index',
      text: '购物车'
    },
    {
      image: require('~/images/mineIcon.png'),
      imageSelected: require('~/images/selectMine.png'),
      iconfont: MMIconFontName.Admin,
      url: '/pages/tabber/mine/index',
      text: '我的'
    }
  ]

  state: IMMTabBarState = {
    currPageIndex: MMTabBar.currPageIndex,
    data: this.getData()
  }

  getData() {
    if (this.props.data) {
      MMTabBar.data = this.props.data
    }
    return MMTabBar.data
  }

  componentDidShow() {
    this.setPath()
  }

  render() {
    const { currPageIndex, data } = this.state

    return (
      <View>
        <View className={styles.MMTabBar_placeholder} />
        {/* {isNewIphone && <View className="spacingIphone" />} */}
        <View className={styles.MMTabBar}>
          <View className={styles.content}>
            {data.map((value, index) => (
              <View
                key={value.text}
                className={this.getClassName(index)}
                style={{
                  marginRight: index === 1 ? '23px' : 0,
                  marginLeft: index === 2 ? '23px' : 0
                }}
                onClick={() => this.onClick(value, index)}
              >
                <View className={styles.iconfont}>
                  {value.image ? (
                    <Image src={currPageIndex === index ? value.imageSelected! : value.image} className={styles.image} />
                  ) : (
                    <MMIconFont
                      value={value.iconfont as any}
                      size={styles.iconSize}
                      color={currPageIndex === index ? styles.primaryColor : styles.tabBarFontColor}
                    />
                  )}
                  {value.redHot && <MMBadge absolute />}
                  {value.count && (
                    <View className={styles.count}>
                      <MMBadge value={value.count} digit={2} absolute />
                    </View>
                  )}
                </View>
                <View className={styles.text}>{value.text} </View>
              </View>
            ))}
            {this.renderActiviNav()}
          </View>
          {isNewIphone && <View className="spacingIphone" />}
        </View>
      </View>
    )
  }

  componentDidMount() {
    process.env.TARO_ENV === 'h5' && Taro.hideTabBar({})
    MMTabBarList.push(this)
    this.setPath()
  }

  setPath() {
    const { path } = this.props
    if (path) {
      this.setAllState({
        currPageIndex: this.state.data.findIndex((value) => value.url === path.replace(/\?.*$/g, ''))
      })
    }
  }

  setRedDot(index: number, redHot: boolean) {
    this.setAllState({
      data: this.state.data.map((value, dataIndex) => {
        if (index === dataIndex) {
          value.redHot = redHot
        }
        return value
      })
    })
  }

  setCount(index: number, count: number) {
    this.setAllState({
      data: this.state.data.map((value, dataIndex) => {
        if (index === dataIndex) {
          value.count = count
        }
        return value
      })
    })
  }

  setAllState(state: Partial<IMMTabBarState>) {
    MMTabBarList.forEach((value) => value.setState(state as IMMTabBarState))
  }

  renderActiviNav() {
    return (
      <View className={styles.activeNav}>
        <Image src={require('~/images/socialIcon.png')} className={styles.activeNavImg} onClick={() => Taro.switchTab({ url: '/pages/community/index' })} />
        <View className={styles.activeNavTxt}>社区</View>
      </View>
    )
  }

  private getClassName(index) {
    const { currPageIndex } = this.state
    return classNames(styles.item, currPageIndex === index ? styles.selected : {}, index === 2 ? styles.itemCenter : '')
  }

  private onClick(data: IMMTabBarData, index: number) {
    if (index !== this.state.currPageIndex) {
      MMTabBarList.forEach((value) =>
        value.setState({
          currPageIndex: index
        })
      )
      MMTabBar.currPageIndex = index
      Taro.switchTab({
        url: data.url
      })
    }
  }
}
