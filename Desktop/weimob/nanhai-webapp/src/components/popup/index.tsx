import { View, ScrollView, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Component } from 'react'
import MMButton from '~/modules/@wmeimob/taro-design/src/components/button'
import { MMButtonColor } from '~/modules/@wmeimob/taro-design/src/components/button/const'
import MMModal from '~/modules/@wmeimob/taro-design/src/components/modal'
import { MMModalAnimationType, MMModalJustifyContent } from '~/modules/@wmeimob/taro-design/src/components/modal/const'

import { IMMPopupProps, IMMPopupState } from './const'
import * as styles from './index.module.less'

export default class MMPopup extends Component<IMMPopupProps, IMMPopupState> {
  static options = {
    addGlobalClass: true
  }

  static defaultProps: Partial<IMMPopupProps> = {
    visible: false,
    title: '',
    subTitle: '',
    okText: '',
    cancelText: '',
    contentStyle: {},
    footer: false
  }

  state = {}

  maxContentHeight = Taro.getSystemInfoSync().screenHeight * 0.7

  render() {
    const { visible, title, subTitle, okText, cancelText, footer, onClose, onOk, contentStyle, modalStyle } = this.props

    const customFooterStyle: React.CSSProperties = {
      padding: footer === 'render' ? '10px' : '0px'
    }

    return (
      <MMModal
        visible={visible}
        justifyContent={MMModalJustifyContent.flexEnd}
        animationType={MMModalAnimationType.down}
        className={styles.shopCartPopup}
        onClose={onClose}
      >
        <View className={styles.modalContent} style={{ ...modalStyle }}>
          <View className={styles.title}>
            {this.props.renderTitle}
            {title}
            {/* <Image src={getImage('visible_close-Sb5E2k01qN0z.png')} className={styles.icon_close} onClick={onClose} /> */}
          </View>
          {!!subTitle && <View className={styles.subTitle}>{subTitle}</View>}
          <ScrollView scrollY className={styles.content} style={{ maxHeight: `${this.maxContentHeight}px`, ...contentStyle }}>
            <View className={styles.contentClass}>{this.props.children}</View>
          </ScrollView>

          <View style={customFooterStyle}>{this.props.renderFooter}</View>

          {footer === true && (
            <View className={styles.opreations}>
              {cancelText && (
                <View className={styles.close} onClick={onClose}>
                  {cancelText}
                </View>
              )}
              {okText && (
                <View className={styles.confirm} onClick={onOk}>
                  {okText}
                </View>
              )}
            </View>
          )}
        </View>
      </MMModal>
    )
  }
}
