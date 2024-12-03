import Taro, { getCurrentInstance } from '@tarojs/taro'
import { FC, memo, useEffect, useState } from 'react'
import { View, Input, Text, Textarea, Image } from '@tarojs/components'
import styles from './index.module.less'
import { ISetSiteProps } from './const'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import useCitysPicker from '~/modules/@wmeimob/taro-design/src/components/citys-picker/hooks'
import MMPopup from '~/modules/@wmeimob/taro-design/src/components/modal/popup'
import MMCitysPicker from '~/modules/@wmeimob/taro-design/src/components/citys-picker'
import BottomButton from '~/components/bottomButton'
import useInput from '~/components/hooks/useInput'
import { api } from '~/request'

enum RecevingAddressInfo { Province = 0, City, Area };

const Component: FC<ISetSiteProps> = () => {
  const [isDefault, setIsDefault] = useState<boolean>(false);
  const nameHook = useInput();
  const mobileHook = useInput();
  const singleAddressHook = useInput();
  const citysHook = useCitysPicker();
  const [editFlag, setEditFlag] = useState<boolean>(false);
  // 地址
  // const { value } = citysHook
  /**
   * 提交/修改收货地址
   * 操作成功后删除缓存中的收货地址
   * @returns void
   */
  async function submitSure() {
    const address = citysHook.value;
    const phone = mobileHook.value;
    const name = nameHook.value;
    const singleAddress = singleAddressHook.value;

    if (!name) {
      return Taro.showToast({ title: "请输入收件人姓名", icon: "none" });
    }

    if (!phone || !(/0?(13|14|15|17|18|19)[0-9]{9}/.test(phone))) {
      return Taro.showToast({ title: "请输入正确的手机号", icon: "none" });
    }

    if (!singleAddress) {
      return Taro.showToast({ title: "请输入详细地址", icon: "none" });
    }

    if (!address || address.length === 0) {
      return Taro.showToast({ title: "请输入完整的地址", icon: "none" });
    }

    const { id: provinceId, text: provinceName } = address[RecevingAddressInfo.Province];
    const { id: cityId, text: cityName } = address[RecevingAddressInfo.City];
    const { id: areaId, text: areaName } = address[RecevingAddressInfo.Area];

    const requestParams = {
      areaId: Number(areaId),
      areaName,
      cityId: Number(cityId),
      cityName,
      isDefault: isDefault ? 1 : 0,
      name,
      phone,
      provinceId: Number(provinceId),
      provinceName,
      singleAddress
    }
    let requestUrl = "/user/api/setting/addUserReceivingAddress_POST";

    if (editFlag) {
      requestParams.id = getCurrentInstance().router?.params.id;
      requestUrl = "/user/api/setting/modifyUserReceivingAddress_PUT";
    }

    const { code } = await api[requestUrl](requestParams);

    if (code !== 0) {
      return Taro.showToast({ title: "操作失败", icon: "none" });
    }

    Taro.showToast({ title: "操作成功", icon: "success" });
    Taro.removeStorageSync("userRecevingAddress");
    if (!editFlag) {
      singleAddressHook.setValue("");
      citysHook.setValue([]);
      nameHook.setValue("");
      mobileHook.setValue("");
    }
  }

  /**
   * 设置路由参数
   * @param params 
   */
  function setRouterParamsToSate(params) {
    const { 
      areaId, areaName, cityId, name,
      cityName, isDefault: deafult,
      phone, provinceId, provinceName, singleAddress
    } = params;

    const formatAddress: (typeof citysHook.value) = [];
    formatAddress[RecevingAddressInfo.Province] = {
      id: provinceId,
      text: provinceName
    }
    formatAddress[RecevingAddressInfo.City] = {
      id: cityId,
      text: cityName
    }
    formatAddress[RecevingAddressInfo.Area] = {
      id: areaId,
      text: areaName
    }

    setEditFlag(true);
    singleAddressHook.setValue(singleAddress);
    nameHook.setValue(name);
    mobileHook.setValue(phone);
    setIsDefault(Boolean(Number(deafult)));
    citysHook.setValue(formatAddress)
  }

  useEffect(() => {
    const params = getCurrentInstance().router?.params;

    if (params?.id) {
      // 获取到页面参数
      setRouterParamsToSate(params);
    }
  }, [])

  return (
    <View className={styles.setSiteStyle}>
      <MMNavigation title="新增地址" />
      <View className={styles.siteForm}>
        <View className={styles.siteLabel}>收货人</View>
        <Input
          className={styles.siteInput}
          maxlength={20}
          value={nameHook.value}
          onInput={nameHook.onInput}
          placeholder="输入姓名 "
          placeholderStyle="color:#999999;line-height:44px"
        />
        <View className={styles.siteLabel}>联系电话</View>
        <Input
          type="number"
          className={styles.siteInput}
          value={mobileHook.value}
          onInput={mobileHook.onInput}
          placeholder="输入联系电话 "
          placeholderStyle="color:#999999;line-height:44px"
        />
        <View className={styles.siteLabel}>收货地址</View>
        <View className={styles.txt} onClick={() => citysHook.setVisible(true)}>
          <View className={styles.siteInput}>
            {citysHook.value.length !== 0 ? (
              citysHook.value.map((value) => value.text).join(' ')
            ) : (
              <View className={styles.selectAdd}>
                <Text>请选择省市区</Text> <Image className={styles.arrowsIcon} src={require('~/images/site/pull.png')} />
              </View>
            )}
          </View>
        </View>
        <MMCitysPicker {...citysHook} />
        <View className={styles.siteLabel}>详细地址</View>
        <Textarea
          className={styles.siteInput}
          maxlength={50}
          value={singleAddressHook.value}
          onInput={singleAddressHook.onInput}
          style={{ minHeight: '90px' }}
        />
        <View className={styles.siteDefault}>
          <Text className={styles.siteDefaultTxt}>设为默认地址</Text>
          <Image
            onClick={() => (isDefault === false ? setIsDefault(true) : setIsDefault(false))}
            className={styles.siteDefaultImg}
            src={require(isDefault === false ? '~/images/site/switch.png' : '~/images/site/switched.png')}
          />
        </View>
      </View>
      <BottomButton title="确定" onClick={() => submitSure()} contentStyle={{ background: '#fff' }} />
    </View>
  )
}

const SetSite = memo(Component)
export default SetSite
