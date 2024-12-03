import Taro from '@tarojs/taro'
import { FC, memo, useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { IInviteMemberProps } from './const'
import styles from './index.module.less'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import DefaultPage from '~/components/defaultPage'

const Component: FC<IInviteMemberProps> = () => {
  const [hasInvite, setHasInvite] = useState<boolean>(true)
  const [inviteMember, setinviteMember] = useState<any>({
    memberHeadImg: `${require('~/images/business/logo.png')}`,
    memberName: '185****5566'
  })
  return (
    <View className={styles.inviteMemberStyle}>
      <MMNavigation title="邀请者信息" />
      {hasInvite === true ? (
        <View className={styles.businessInvite}>
          <View className={styles.inviteHint}>如下是邀请您开通商家中心的用户</View>
          <View className={styles.inviteMember}>
            <Image className={styles.inviteMemberImg} src={inviteMember.memberHeadImg} />
            <View className={styles.inviteMemberInfo}>
              <View className={styles.inviteMemberName}>用户昵称</View>
              <View className={styles.inviteMemberTel}>{inviteMember.memberName}</View>
            </View>
          </View>
        </View>
      ) : (
        <DefaultPage
          defaultHintColor="#333"
          imgHeight="169px"
          imgSrc={require('~/images/business/noInvite.png')}
          defaultHint="没有任何人邀请您哦，您是主动加入我们"
        />
      )}
    </View>
  )
}

const InviteMember = memo(Component)
export default InviteMember
