/* eslint-disable no-nested-ternary */
import Taro from '@tarojs/taro'
import { FC, memo, useState } from 'react'
import { View, Image, Text, ScrollView, Input, Textarea } from '@tarojs/components'
import { IOpenBusinessProps } from './const'
import styles from './index.module.less'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import classNames from 'classnames'
import { isNewIphone } from '~/modules/@wmeimob/taro-design/src/components/utils'
import useCitysPicker from '~/modules/@wmeimob/taro-design/src/components/citys-picker/hooks'
import MMCitysPicker from '~/modules/@wmeimob/taro-design/src/components/citys-picker'
import BottomButton from '~/components/bottomButton'
import useInput from '~/components/hooks/useInput'

const Component: FC<IOpenBusinessProps> = () => {
  const [step, setStep] = useState<number>(1)
  const [legalPersonSex, setLegalPersonSex] = useState<number>(1)
  const inviteCodeHook = useInput()
  const companyNameHook = useInput()
  const linkManHook = useInput()
  const concactPhoneHook = useInput()
  const licenseHook = useInput()
  const registeredRefundHook = useInput()
  const registrateAuthorityHook = useInput()
  const industryHook = useInput()
  const companyTypeHook = useInput()
  const legalPersonHook = useInput()
  const idNoHook = useInput()

  const citysHook = useCitysPicker()

  function submitForm() {}
  return (
    <View className={styles.openBusinessStyle}>
      <MMNavigation title="开通商家中心" />

      <View className={styles.openStep}>
        <View className={styles.openStepBox}>
          <Image className={styles.openStepImg} src={require('~/images/business/codeCurrent.png')} />
          <View className={styles.openStepTitle}>邀请码</View>
        </View>
        <View className={classNames(styles.arrows, styles.arrowsCurrent)}>---&gt;</View>
        <View className={styles.openStepBox}>
          <Image
            className={styles.openStepImg}
            src={step === 1 ? require('~/images/business/commonInfo.png') : require('~/images/business/commonInfoCurrent.png')}
          />
          <View className={styles.openStepTitle}>基本信息</View>
        </View>
        <View className={classNames(styles.arrows, step >= 2 ? styles.arrowsCurrent : '')}>---&gt;</View>
        <View className={styles.openStepBox}>
          <Image className={styles.openStepImg} src={step >= 3 ? require('~/images/business/licenseed.png') : require('~/images/business/license.png')} />
          <View className={styles.openStepTitle}>营业执照</View>
        </View>
        <View className={classNames(styles.arrows, step >= 3 ? styles.arrowsCurrent : '')}>---&gt;</View>
        <View className={styles.openStepBox}>
          <Image className={styles.openStepImg} src={step === 4 ? require('~/images/business/entityed.png') : require('~/images/business/entity.png')} />
          <View className={styles.openStepTitle}>企业法人</View>
        </View>
      </View>
      <View className={styles.openForm}>
        {step === 1 && (
          <View className={styles.inviteWrap}>
            <View className={styles.inviteTitle}>填写邀请码</View>
            <View className={styles.inviteHint}>如果您有邀请码，则请填写邀请码；</View>
            <Input
              className={styles.inviteInput}
              value={inviteCodeHook.value}
              onInput={inviteCodeHook.onInput}
              placeholder="请输入邀请码 "
              placeholderStyle="color:#ABABAB;line-height:20px"
            />
            <View className={styles.inviteHint}>如果您无邀请码，则可直接跳过，进行下一步</View>
          </View>
        )}
        {step === 2 && (
          <View className={styles.form}>
            <View className={styles.formTitle}>公司基本信息</View>
            <View className={styles.formItem}>
              <View className={classNames(styles.formLabel, styles.formLabelRequire)}>公司名称：</View>
              <Input
                className={styles.formInput}
                value={companyNameHook.value}
                onInput={companyNameHook.onInput}
                placeholder="输入公司全称 "
                placeholderStyle="color:#ABABAB;line-height:20px"
              />
              <View className={styles.formHint}>公司名称请与营业执照保持一致</View>
            </View>
            <View className={styles.formItem}>
              <View className={styles.formLabel}>公司LOGO：</View>
              <View className={styles.formImg}>+</View>
              <View className={styles.formHint}>文件格式GIF,JPG,PNG</View>
            </View>
            <View className={styles.formItem}>
              <View className={classNames(styles.formLabel, styles.formLabelRequire)}>联系人：</View>
              <Input
                className={styles.formInput}
                value={linkManHook.value}
                onInput={linkManHook.onInput}
                placeholder=""
                placeholderStyle="color:#ABABAB;line-height:20px"
              />
            </View>
            <View className={styles.formItem}>
              <View className={classNames(styles.formLabel, styles.formLabelRequire)}>联系方式：</View>
              <Input
                className={styles.formInput}
                value={concactPhoneHook.value}
                onInput={concactPhoneHook.onInput}
                placeholder="手机号码，用户登录商家中心 "
                placeholderStyle="color:#ABABAB;line-height:20px"
              />
            </View>
            <View className={styles.formItem}>
              <View className={classNames(styles.formLabel, styles.formLabelRequire)}>公司地址：</View>
              {/* {citysHook.value.length !== 0 ? (
              citysHook.value.map((value) => value.text).join(' ')
            ) */}
              {/*  */}
              <View className={styles.formInput} onClick={() => citysHook.setVisible(true)}>
                请选择省/市/区
                <Image className={styles.arrowsIcon} src={require('~/images/site/pull.png')} />
              </View>
              <MMCitysPicker {...citysHook} />
            </View>
            <View className={styles.formItem}>
              <View className={classNames(styles.formLabel, styles.formLabelRequire)}>详细地址：</View>
              <Textarea placeholder="输入详细地址" placeholderStyle="color:#999" className={styles.formTextArea} />
            </View>
          </View>
        )}
        {step === 3 && (
          <View className={styles.form}>
            <View className={styles.formTitle}>营业执照信息</View>
            <View className={styles.formItem}>
              <View className={classNames(styles.formLabel, styles.formLabelRequire)}>营业执照：</View>
              <View className={styles.formImg}>+</View>
              <View className={styles.formHint}>文件格式JPG、PNG，文件大小100KB以内</View>
            </View>
            <View className={styles.formItem}>
              <View className={classNames(styles.formLabel, styles.formLabelRequire)}>执照编号：</View>
              <Input
                className={styles.formInput}
                value={licenseHook.value}
                onInput={licenseHook.onInput}
                placeholder="输入营业执照编号"
                placeholderStyle="color:#ABABAB;line-height:20px"
              />
            </View>
            <View className={styles.formItem}>
              <View className={styles.formLabel}>注册资金：</View>
              <Input
                className={styles.formInput}
                value={registeredRefundHook.value}
                onInput={registeredRefundHook.onInput}
                placeholder="选择注册资金 "
                placeholderStyle="color:#ABABAB;line-height:20px"
              />
            </View>
            <View className={styles.formItem}>
              <View className={styles.formLabel}>登记机关：</View>
              <Input
                className={styles.formInput}
                value={registrateAuthorityHook.value}
                onInput={registrateAuthorityHook.onInput}
                placeholder="输入登记机关 "
                placeholderStyle="color:#ABABAB;line-height:20px"
              />
            </View>
            <View className={styles.formItem}>
              <View className={styles.formLabel}>主营行业：</View>
              <Input
                className={styles.formInput}
                value={industryHook.value}
                onInput={industryHook.onInput}
                placeholder=" "
                placeholderStyle="color:#ABABAB;line-height:20px"
              />
            </View>
            <View className={styles.formItem}>
              <View className={styles.formLabel}>公司类型：</View>
              <Input
                className={styles.formInput}
                value={companyTypeHook.value}
                onInput={companyTypeHook.onInput}
                placeholder=" "
                placeholderStyle="color:#ABABAB;line-height:20px"
              />
            </View>

            <View className={styles.formItem}>
              <View className={styles.formLabel}>成立时间：</View>
              <View className={styles.formInput}>
                年/月/日
                <Image className={styles.arrowsIcon} src={require('~/images/business/date.png')} />
              </View>
            </View>
          </View>
        )}
        {step === 4 && (
          <View className={styles.form}>
            <View className={styles.formTitle}>法人信息</View>
            <View className={styles.formItem}>
              <View className={classNames(styles.formLabel, styles.formLabelRequire)}>法人姓名：</View>
              <Input
                className={styles.formInput}
                value={legalPersonHook.value}
                onInput={legalPersonHook.onInput}
                placeholder="输入法人姓名"
                placeholderStyle="color:#ABABAB;line-height:20px"
              />
              <View className={styles.formHint}>请根据企业营业执照如实填写，支持中英文</View>
            </View>
            <View className={styles.formItem}>
              <View className={styles.formLabel}>法人性别：</View>
              <View className={styles.radioWrap}>
                <Image
                  className={styles.radioImg}
                  onClick={() => setLegalPersonSex(1)}
                  src={legalPersonSex === 2 ? require('~/images/tabberMine/radioSelect.png') : require('~/images/tabberMine/radioSelected.png')}
                />
                <Text className={styles.radioText}>男</Text>
                <Image
                  className={styles.radioImg}
                  onClick={() => setLegalPersonSex(2)}
                  src={legalPersonSex === 1 ? require('~/images/tabberMine/radioSelect.png') : require('~/images/tabberMine/radioSelected.png')}
                />
                <Text className={styles.radioText}>女</Text>
              </View>
            </View>
            <View className={styles.formItem}>
              <View className={classNames(styles.formLabel, styles.formLabelRequire)}>法人身份证：</View>
              <Input
                className={styles.formInput}
                value={idNoHook.value}
                onInput={idNoHook.onInput}
                placeholder="输入法人身份证"
                placeholderStyle="color:#ABABAB;line-height:20px"
              />
            </View>
            <View className={styles.formItem}>
              <View className={styles.formLabel}>身份证照片：</View>
              <View className={styles.noValue}>根据相关规则，请到PC端提交法人身份证照片信息</View>
            </View>
          </View>
        )}
      </View>
      {step === 1 && <BottomButton title="下一步" onClick={() => setStep(2)} />}
      {step !== 1 && (
        <View>
          <View className={styles.openButton}>
            <View className={styles.openBtn} onClick={() => setStep(1)}>
              上一步
            </View>
            <View className={classNames(styles.openBtn, styles.openBtnElse)} onClick={() => (step === 2 ? setStep(3) : step === 3 ? setStep(4) : submitForm())}>
              {step === 4 ? '提交资料' : '下一步'}
            </View>
          </View>

          {isNewIphone && <View className="spacingIphone" />}
        </View>
      )}
    </View>
  )
}

const OpenBusiness = memo(Component)
export default OpenBusiness
