/* eslint-disable no-console */
import { Button, View, Image } from '@tarojs/components'
import { Component, ComponentType } from 'react'
import Taro from '@tarojs/taro'
import { autobind } from '~/modules/@wmeimob/decorator/src/components'
import MMNavigation from '~/modules/@wmeimob/taro-design/src/components/navigation'
import * as styles from './index.module.less'
import { upload } from '~/components/aliyun'
import request from '~/request'

@autobind
class Index extends Component {
  state = {
    uploadImgList: []
  }

  async onGetClick() {
    // const { data } = await get('/');
    const id = 10
    await request.put(`v1/material/${id}`, {
      name: '222',
      url: '222'
    })
    // console.log(data);
  }

  async onPostClick() {
    const { data } = await request.post('http://localhost:8080/api')
    console.log(data)
  }

  async onPostDataClick() {
    const { data } = await request.post('http://localhost:8080/data', {
      xxx: 1
    })
    console.log(data)
  }

  async onUnLoginClick() {
    const { data } = await request.get('http://localhost:8080/login')
    console.log(data)
  }

  async onErrorClick() {
    try {
      await request.post('http://localhost:8080/code', {
        status: 418,
        data: {
          code: 418,
          msg: '错误信息'
        }
      })
      console.log('抛出了错误！')
    } catch (error) {
      console.log(error)
    }
  }

  async onConnectClick() {
    try {
      await request.post('http://www.adfadf.com/xxxxxxxxxx')
      console.log('抛出了错误！')
    } catch (error) {
      console.log(error)
    }
  }

  onUploadClick() {
    Taro.chooseImage({
      count: 9,
      success: src => {
        console.log(src)
        upload(src.tempFilePaths).then(value => {
          this.setState({
            uploadImgList: value
          })
        })
      }
    })
  }

  render() {
    const { uploadImgList: uploadImgArr } = this.state
    return (
      <View className={styles.page}>
        <MMNavigation title="请求" />
        <Button onClick={this.onGetClick}>get请求</Button>
        <Button onClick={this.onPostClick}>post请求</Button>
        <Button onClick={this.onPostDataClick}>传递参数</Button>
        <Button onClick={this.onUnLoginClick}>未登录</Button>
        <Button onClick={this.onErrorClick}>错误弹窗</Button>
        <Button onClick={this.onConnectClick}>网络连接失败</Button>
        <View className={styles.imgWrap}>
          {uploadImgArr.map((item, index) => (
            <View key={String(index)} className={styles.imgStyle}>
              <Image src={item} mode="aspectFill" className={styles.imgItem} />
            </View>
          ))}
        </View>
        <Button onClick={this.onUploadClick.bind(this, uploadImgArr)}>图片上传阿里云</Button>
      </View>
    )
  }
}
export default Index as ComponentType
