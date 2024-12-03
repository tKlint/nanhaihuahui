import { Image, Text, View } from '@tarojs/components'
import React, { Component, ComponentType } from 'react'
import Taro from '@tarojs/taro'
import classNames from 'classnames'
// import TabBar from '~/components/tab-bar';
import global from '~/globalStore'
import MMButton from '~/modules/@wmeimob/taro-design/src/components/button'
import H2 from '~/modules/@wmeimob/taro-design/src/components/head/h2'
import H3 from '~/modules/@wmeimob/taro-design/src/components/head/h3'
import MMPopup from '~/modules/@wmeimob/taro-design/src/components/modal/popup'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import imageSrc from './images/image.jpeg'
import * as styles from './index.module.less'

class Index extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  // config: Config = {
  //   navigationBarTitleText: '',
  //   navigationStyle: 'custom'
  // };

  state = {
    text: '组件',
    list: [{ object: 'object' }, 1, 2, 4, 5]
  }

  private popup: MMPopup

  /**
   * 组件第一次渲染完成
   *
   * @memberof Index
   */
  async componentDidMount() {
    // this.getData();
  }

  /**
   * 组件即将销毁
   *
   * @memberof Index
   */
  componentWillUnmount() {
    // eslint-disable-next-line no-console
    console.log('componentWillUnmount')
  }

  /**
   * 跳转别的页面时生命周期  相对于微信小程序生命周期onHide
   *
   * @memberof Index
   */
  componentDidHide() {
    // eslint-disable-next-line no-console
    console.log('componentDidHide')
  }

  /**
   * 跳转别的页面再回来时的生命周期  相对于微信小程序生命周期onShow
   *
   * @memberof Index
   */
  componentDidShow() {
    // eslint-disable-next-line no-console
    console.log('componentDidShow')
  }

  /**
   * 装饰器 @observer 注入的生命周期，mobx数据修改
   *
   * @memberof Index
   */
  componentWillReact() {
    // eslint-disable-next-line no-console
    console.log('componentWillReact')
  }

  render() {
    const { text } = this.state
    const {
      user: { userName }
    } = global
    return (
      <View>
        <MMNavigation title="基础用法" />
        <View className="container">
          <Text>template文件夹只是用来写示例</Text>
          <MMPopup ref={(ref) => (this.popup = ref as MMPopup)} />
          <View className="spacing" />
          <Text>template文件夹只是用来写示例</Text>
          <H2>样式写法</H2>
          <H3>单个样式</H3>
          <View className={styles.test} />
          <H3>多个样式</H3>
          <View className={classNames(styles.test, styles.test)} />

          <View className="spacing" />
          <H2>事件写法</H2>
          <View onClick={this.onClick}>点击事件</View>

          <View className="spacing" />
          <H2>全局hooks</H2>
          <View
            onClick={() =>
              Taro.navigateTo({
                url: '/pages/template/globalHook/index'
              })
            }
          >
            全局hooks
          </View>

          <View className="spacing" />
          <H2>全局变量mobx 类似vuex</H2>
          <View>
            <Text>用户名:{userName}</Text>
          </View>

          <View className="spacing" />
          <H2>状态</H2>
          <View>
            <Text>{text}</Text>
          </View>

          <View className="spacing" />
          <H2>参数</H2>
          <View>
            <MMButton>slot</MMButton>
          </View>

          <View className="spacing" />
          <H2>数组渲染</H2>
          <View>{this.renderList()}</View>

          <View className="spacing" />
          <H2>图片渲染</H2>
          <Image src={imageSrc} />
        </View>
      </View>
    )
  }

  // private async getData() {
  //   this.tabBar.current!.setAllState({
  //     currPageIndex: 0,
  //     flag: Date.now()
  //   });
  // }

  private renderList() {
    const { list } = this.state
    return list.map((item, index) => {
      const type = typeof item
      if (type === 'object') {
        return (
          <View>
            <Text>{(item as { object: string }).object}</Text>
          </View>
        )
      }
      return (
        <View key={item.toString() + index}>
          <Text>{item}</Text>
        </View>
      )
    })
  }

  private onClick() {
    this.popup.toast('点击事件')
  }
}

export default Index as ComponentType
