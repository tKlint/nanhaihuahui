import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { autobind } from '~/modules/@wmeimob/decorator/src/components'
import classname from 'classnames'
import styles from './index.modules.less'
import H2 from '../head/h2'
import { PureComponent } from 'react'

interface IList {
  title: string | undefined
  items: IItem[]
}

interface IItem {
  id: string
  text: string
}

interface IMMSkuListProps {
  /**
   * 选中
   *
   * @type {[]}
   * @memberof IMMSkuListProps
   */
  value: number[]
  /**
   * 库存
   *
   * @type {number[][]}
   * @memberof IMMSkuListProps
   */
  sku: number[][]
  /**
   * 列表
   *
   * @type {IList[]}
   * @memberof IMMSkuListProps
   */
  list: IList[]

  /**
   * 点击事件
   *
   * @memberof IMMSkuListProps
   */
  onClick: (value: string[]) => void
}

/**
 * @name 规格列表
 */
@autobind
export default class MMSkuList extends PureComponent<IMMSkuListProps> {
  static defaultProps = {
    sku: [],
    value: [],
    list: []
  }

  static options = {
    addGlobalClass: true
  }

  render() {
    const { list } = this.props
    return (
      <View className={styles.MMSkuList}>
        {list.map((listValue, index) => (
          <View key={'list' + index} className={styles.specList}>
            <View className={styles.title}>{listValue.title}</View>
            <View className={styles.content}>
              {listValue.items.map((item) => (
                <View key={item.id} className={this.getItemClassName(item, index)} onClick={() => this.onClick(item, index)}>
                  {item.text}
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    )
  }

  private onClick(item: IItem, index: number) {
    if (!this.skuInclude(item.id, index)) {
      return
    }
    const { value } = this.props
    if (value[index] === item.id) {
      const values = [...this.props.value]
      delete values[index]
      this.props.onClick(values)
    } else {
      const values = [...this.props.value]
      values[index] = item.id
      this.props.onClick(values)
    }
  }

  private getItemClassName(item: IItem, index: number) {
    const classNames = [styles.item]
    if (!this.skuInclude(item.id, index)) {
      classNames.push(styles.item__disabled)
    }

    if (this.props.value[index] === item.id) {
      classNames.push(styles.item__selected)
    }
    return classname(...classNames)
  }

  private skuInclude(id: string, index: number) {
    const includeArray = [...this.props.value]
    includeArray[index] = id
    return !!this.props.sku.find((value) => this.arrayInclude(value, includeArray))
  }

  private arrayInclude(array: string[], includeArray: string[]) {
    if (includeArray.length > 0) {
      return includeArray.every((value) => (value === undefined ? true : array.includes(value)))
    }
    return true
  }
}
