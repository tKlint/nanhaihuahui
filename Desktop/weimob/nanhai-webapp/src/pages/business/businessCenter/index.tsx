import Taro from '@tarojs/taro'
import { FC, memo, useState } from 'react'
import { View, Image, Text, ScrollView } from '@tarojs/components'
import { IBusinessCenterProps } from './const'
import styles from './index.module.less'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import Tabber from '~/components/tabber'
import { isNewIphone } from '~/modules/@wmeimob/taro-design/src/components/utils'
import classNames from 'classnames'

const Component: FC<IBusinessCenterProps> = () => {
  const [tabIndex, setTabIndex] = useState<number>(0)
  const [checkStatus, setcheckStatus] = useState<number>(1)
  const tabArr = [
    {
      id: 0,
      title: '基本信息'
    },
    {
      id: 1,
      title: '执照信息'
    },
    {
      id: 2,
      title: '法人信息'
    },
    // 申请通过没有邀请人信息 邀请人信息需要跳转页面
    {
      id: 3,
      title: '邀请人信息'
    }
  ]

  return (
    <View className={styles.businessCenterStyle}>
      {/* 审核通过 显示为 企业信息 */}
      <MMNavigation title="商家中心" />
      {checkStatus === 1 && <View className={styles.businessCheckInfo}>您的信息还在审核中，请耐心等待</View>}
      {checkStatus === 2 && (
        <View className={classNames(styles.businessCheckInfo, styles.businessCheckInfoElse)}>
          <View className={styles.businessCheckStatus}>审核失败</View>
          <View className={styles.businessCheckReason}>这里显示失败理由</View>
        </View>
      )}
      {/* tabberCurBg */}
      <Tabber tabIndex={tabIndex} setTabIndex={setTabIndex} tabArr={tabArr} tabberCurBg="linear-gradient(90deg, #FF7132 0%, #FC2C77 100%)" />
      <View className={styles.businessCommonInfo}>
        {/* 基本信息 */}
        {tabIndex === 0 && (
          <View className={styles.businessShop}>
            <Image className={styles.businessShopLogo} src={require('~/images/business/logo.png')} />
            <View className={styles.businessShopName}>商家基本信息中的企业全称</View>
          </View>
        )}
        {tabIndex === 0 && (
          <View className={styles.businessCommon}>
            <View className={styles.businessCommonItem}>
              <View className={styles.businessCommonItemLabel}>联系人：</View>
              <View className={styles.businessCommonItemCont}>张三</View>
            </View>
            <View className={styles.businessCommonItem}>
              <View className={styles.businessCommonItemLabel}>联系方式：</View>
              <View className={styles.businessCommonItemCont}>18533336666</View>
            </View>
            <View className={styles.businessCommonItem}>
              <View className={styles.businessCommonItemLabel}>公司地址：</View>
              <View className={styles.businessCommonItemCont}>上海上海市宝山区中成智谷创业产业园B0栋201室</View>
            </View>
          </View>
        )}

        {/* 执照信息 */}
        {tabIndex === 1 && (
          <View className={styles.businessCommon}>
            <View className={styles.businessCommonItem}>
              <View className={styles.businessCommonItemLabel}>营业执照：</View>

              <Image className={styles.photo} src={require('~/images/business/logo.png')} />
            </View>
            <View className={styles.businessCommonItem}>
              <View className={styles.businessCommonItemLabel}>执照编号：</View>
              <View className={styles.businessCommonItemCont}>218533331263666</View>
            </View>
            <View className={styles.businessCommonItem}>
              <View className={styles.businessCommonItemLabel}>注册资金：</View>
              <View className={styles.businessCommonItemCont}>123.600.00</View>
            </View>
            <View className={styles.businessCommonItem}>
              <View className={styles.businessCommonItemLabel}>登记机关：</View>
              <View className={styles.businessCommonItemCont}>上海市政府机关</View>
            </View>
            <View className={styles.businessCommonItem}>
              <View className={styles.businessCommonItemLabel}>主营行业：</View>
              <View className={styles.businessCommonItemCont}>零售</View>
            </View>
            <View className={styles.businessCommonItem}>
              <View className={styles.businessCommonItemLabel}>公司类型：</View>
              <View className={styles.businessCommonItemCont}>合资</View>
            </View>
            <View className={styles.businessCommonItem}>
              <View className={styles.businessCommonItemLabel}>成立时间：</View>
              <View className={styles.businessCommonItemCont}>2021-10-09</View>
            </View>
          </View>
        )}
        {/* 法人信息 */}
        {tabIndex === 2 && (
          <View className={styles.businessCommon}>
            <View className={styles.businessCommonItem}>
              <View className={styles.businessCommonItemLabel}>法人姓名：</View>
              <View className={styles.businessCommonItemCont}>张三</View>
            </View>
            <View className={styles.businessCommonItem}>
              <View className={styles.businessCommonItemLabel}>法人性别：</View>
              <View className={styles.businessCommonItemCont}>男</View>
            </View>
            <View className={styles.businessCommonItem}>
              <View className={styles.businessCommonItemLabel}>法人身份证：</View>
              <View className={styles.businessCommonItemCont}>310216198810232696</View>
            </View>
            <View className={styles.businessCommonItem}>
              <View className={styles.businessCommonItemLabel}>身份证照片：</View>
              <View className={styles.businessCommonItemCont}>-</View>
            </View>
          </View>
        )}
        {/* 邀请者信息 */}
        {tabIndex === 3 && (
          <View className={styles.businessInvite}>
            <View className={styles.inviteHint}>如下是邀请您开通商家中心的用户</View>
            <View className={styles.inviteMember}>
              <Image className={styles.inviteMemberImg} src={require('~/images/business/logo.png')} />
              <View className={styles.inviteMemberInfo}>
                <View className={styles.inviteMemberName}>用户昵称</View>
                <View className={styles.inviteMemberTel}>185****5566</View>
              </View>
            </View>
          </View>
        )}
      </View>
      {/* 审核失败时存在修改按钮 */}
      {checkStatus === 2 && <View className={styles.businessEdit}>修改</View>}
      {/* 审核通过 && 法人信息 */}
      {checkStatus === 3 && <View className={styles.businessEditHint}>如需修改，请在PC端进行修改</View>}
      {isNewIphone && <View className="spacingIphone" />}
    </View>
  )
}

const BusinessCenter = memo(Component)
export default BusinessCenter
