import { PureComponent } from 'react'
import Taro from '@tarojs/taro'
import citysJson from './citys'
import { ICity, MMCityType } from './const'
import { autobind } from '~/modules/@wmeimob/decorator/src/components'
import MMPopup from '../modal/popup'
import MMPicker from '../picker'
import { findCity } from './utils'

export interface MMCitysPickerProps {
  /**
   * 是否显示
   *
   * @type {boolean}
   * @memberof MMCitysPickerProps
   */
  visible: boolean

  /**
   * 当前值
   *
   * @type {{
   *         id: string,
   *         text: string
   *     }[]}
   * @memberof MMCitysPickerProps
   */
  value: {
    id: string
    text: string
  }[]

  /**
   * 点击确定
   *
   * @memberof MMCitysPickerProps
   */
  onOk: (
    value: {
      id: string
      text: string
    }[]
  ) => void

  /**
   * 点击取消
   *
   * @memberof MMCitysPickerProps
   */
  onCancel: () => void

  /**
   * 能选择省，市，区的哪几个
   */
  type?: MMCityType
}

interface MMCitysPickerState {
  pickerValue: string[]
  pickerData: ICity[][]
}

/**
 * @name 城市选择
 */
@autobind
export default class MMCitysPicker extends PureComponent<MMCitysPickerProps, MMCitysPickerState> {
  static options = {
    addGlobalClass: true
  }

  static defaultProps = {
    type: MMCityType.Area
  }

  popup: MMPopup

  state: MMCitysPickerState = {
    pickerValue: [],
    pickerData: []
  }

  render() {
    const { pickerValue, pickerData } = this.state
    const { visible, type } = this.props
    const finalData = pickerData.slice(0, type)
    return (
      <MMPicker
        onOk={this.onOkPicker}
        onCancel={this.onCancel}
        value={pickerValue}
        visible={visible}
        title="地址"
        data={finalData}
        onChange={this.onChangePicker}
      />
    )
  }

  componentDidMount() {
    this.initPickerData()
  }

  componentDidUpdate(prevProps) {
    if (this.props.visible && !prevProps.visible) {
      this.initPickerData()
    }
  }

  private initPickerData() {
    let pickerValue: string[] = []
    const pickerData: ICity[][] = [citysJson]

    if (this.props.value.length > 0) {
      pickerValue = this.props.value.map((value) => value.id)
      pickerData[1] = pickerValue[0] ? findCity(pickerValue[0]).children : []
      pickerData[2] = pickerValue[1] ? findCity(pickerValue[1], pickerData[1]).children : []
    } else {
      pickerValue[0] = citysJson[0].id

      pickerData[1] = citysJson[0].children
      pickerValue[1] = pickerData[1][0].id

      pickerData[2] = pickerData[1][0].children
      pickerValue[2] = pickerData[1][0].children[0].id
    }

    this.setState({
      pickerData,
      pickerValue
    })
  }

  // private onChangePicker(pickerIndex, value) {
  //   const pickerValue = [...this.state.pickerValue];
  //   const pickerData = [...this.state.pickerData];
  //   pickerValue[pickerIndex] = value;

  //   for (let index = pickerIndex + 1; index < 3; index++) {
  //     const data = pickerData[index - 1].find(pickerVal => pickerVal.id === pickerValue[index - 1]) as ICity;

  //     if (data && data.children.length !== 0) {
  //       pickerValue[index] = data.children[0].id;
  //     } else {
  //       delete pickerValue[index];
  //     }
  //     pickerData[index] = data ? data.children : [];
  //   }

  //   this.setState({
  //     pickerValue,
  //     pickerData
  //   })
  // }

  private onChangePicker(value: string[]) {
    const pickerValue = [...this.state.pickerValue]
    const pickerData = [...this.state.pickerData]
    const pickerIndex = pickerValue.findIndex((val, index) => val !== value[index])
    pickerValue[pickerIndex] = value[pickerIndex]

    for (let index = pickerIndex + 1; index < 3; index++) {
      const data = pickerData[index - 1].find((pickerVal) => pickerVal.id === pickerValue[index - 1]) as ICity

      if (data && data.children.length !== 0) {
        pickerValue[index] = data.children[0].id
      } else {
        delete pickerValue[index]
      }
      pickerData[index] = data ? data.children : []
    }

    this.setState({
      pickerValue,
      pickerData
    })
  }

  private onCancel() {
    this.props.onCancel()
  }

  private onOkPicker() {
    const newValue = this.state.pickerValue.map((value) => {
      const { id, text } = findCity(value)
      return { id, text }
    })

    this.props.onOk(newValue)
  }
}
