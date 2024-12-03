import { useMemo, useRef, memo } from 'react'
import { PickerView, PickerViewColumn, View } from '@tarojs/components'
import { ITouchEvent } from '@tarojs/components/types/common'
import Taro, { FC } from '@tarojs/taro'
import { MMModalAnimationType, MMModalJustifyContent } from '../modal/const'
import MMModal from '../modal/index'
import MMModalPopupTitle from '../modal/title'
import { guid } from '../utils'
import styles from './index.modules.less'

const name = 'MMPicker'
export interface IMMPickerProps {
  /**
   * 弹窗标题
   *
   * @type {string}
   * @memberof MMPickerProps
   */
  title?: string

  /**
   * 数据
   *
   * @type {{ value: string; text: string }[][]}
   * @memberof MMPickerProps
   */
  data: { id: string; text: string }[][]

  /**
   * 当前值
   *
   * @type {string[]}
   * @memberof MMPickerProps
   */
  value: string[]

  /**
   * 选择改变
   *
   * @memberof MMPickerProps
   */
  onChange?: (value: string[], changeIndex: string) => void

  /**
   * 点击确定事件
   *
   * @memberof MMPickerProps
   */
  onOk: (value: string[]) => void

  /**
   * 点击取消
   *
   * @memberof MMPickerProps
   */
  onCancel: () => void

  /**
   * 是否显示
   *
   * @type {boolean}
   * @memberof MMPickerProps
   */
  visible: boolean
}

const Component: FC<IMMPickerProps> = (props) => {
  const { visible, title, onCancel, value: propsValue = [], data = [] } = props

  function onOk() {
    const selectList = [...propsValue].map((value, index) => {
      if (!value) {
        return props.data[index][0].id
      }
      return value
    })
    props.onOk(selectList)
  }

  function getValue() {
    const { value = [], data = [] } = props
    if (value.length === 0 && data.length !== 0) {
      return data.map((_) => 0)
    }

    return value.map((val, index) => {
      if (val === undefined && data[index] && data[index][0]) {
        return 0
      }
      return data[index] && data[index].findIndex((dataVal) => dataVal.id === val)
    })
  }

  function handleChange(event, pickerIndex) {
    let index = event.target.value
    if (index > props.data[pickerIndex].length - 1) {
      index = props.data[pickerIndex].length - 1
    } else if (index < 0) {
      index = 0
    }

    let newValue = [...props.value]
    const pickerData = props.data[pickerIndex][index]
    if (newValue[pickerIndex] !== pickerData.id) {
      newValue[pickerIndex] = pickerData.id
      newValue = new Array(props.data.length).fill(1).map((_v, index) => {
        return newValue[index] === undefined ? props.data[index][0].id : newValue[index]
      })
      props.onChange!(newValue, pickerIndex)
    }
  }

  function onTouchMove(event: ITouchEvent) {
    event.stopPropagation()
  }

  const pickerValue = getValue()
  const prevValue = useRef<number[][]>(pickerValue.map((value) => [value]))
  const pickerValueNew = pickerValue.map((value, index) => {
    if (prevValue.current[index] === undefined) {
      return value === undefined ? prevValue.current[index] : [value]
    }

    return value === prevValue.current[index][0] ? prevValue.current[index] : [value]
  })
  prevValue.current = pickerValueNew

  const dataMemoRef = useRef<any[]>([])
  const dataMemo = useMemo(
    () =>
      props.data.map((value, index) => {
        if (dataMemoRef.current[index] && dataMemoRef.current[index].data === value) {
          return dataMemoRef.current[index]
        }
        return { key: guid(), data: value }
      }),
    [props.data]
  )

  dataMemoRef.current = dataMemo

  return (
    <View className={name}>
      <MMModal visible={visible} animationType={MMModalAnimationType.down} justifyContent={MMModalJustifyContent.flexEnd} onClose={props.onCancel}>
        <View className={styles.modal}>
          <MMModalPopupTitle onCancel={onCancel} onOk={onOk} title={title} />
          <View className={styles.content} onTouchMove={onTouchMove}>
            {dataMemo.map((pickValue, pickIndex) => (
              <PickerView
                key={pickValue.key + pickIndex}
                indicatorStyle="height: 40PX;"
                style="width: 100%; height: 200PX;"
                value={pickerValueNew[pickIndex]}
                onChange={(event) => handleChange(event, pickIndex)}
              >
                <PickerViewColumn>
                  {pickValue.data.map((item) => {
                    return (
                      <View style={{ display: 'flex', alignItems: 'center', height: '40PX', justifyContent: 'center', fontSize: '14PX' }} key={item.id}>
                        {item.text}
                      </View>
                    )
                  })}
                </PickerViewColumn>
              </PickerView>
            ))}
          </View>
        </View>
      </MMModal>
    </View>
  )
}

Component.options = {
  addGlobalClass: true
}
const MMPicker = memo(Component)
export default MMPicker
