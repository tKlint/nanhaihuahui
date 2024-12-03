/* eslint-disable id-length */
/* eslint-disable no-nested-ternary */
import { ViewStyle } from 'react-native';

/**
 *  padding辅助函数
 *  例如:<Text style={{...padding(10, 20, 10, 5)}}>Some text</Text>
 * @param {number} a
 * @param {number} [b]
 * @param {number} [c]
 * @param {number} [d]
 */
export function padding(a: number, b?: number, c?: number, d?: number) {
  return {
    paddingTop: a,
    paddingRight: b ? b : a,
    paddingBottom: c ? c : a,
    paddingLeft: d ? d : (b ? b : a)
  }
}

/**
 *  margin辅助函数
 *  例如:<Text style={{...padding(10, 20, 10, 5)}}>Some text</Text>
 * @param {number} a
 * @param {number} [b]
 * @param {number} [c]
 * @param {number} [d]
 */
export function margin(a: number, b?: number, c?: number, d?: number) {
  return {
    marginTop: a,
    marginRight: b ? b : a,
    marginBottom: c ? c : a,
    marginLeft: d ? d : (b ? b : a)
  }
}

/**
 *  borderRadius辅助函数
 *  例如:<Text style={{...boardRadius(10, 20, 10, 5)}}>Some text</Text>
 * @param {number} a
 * @param {number} [b]
 * @param {number} [c]
 * @param {number} [d]
 */
export function boardRadius(a: number, b?: number, c?: number, d?: number): ViewStyle {
  return {
    borderTopLeftRadius: a,
    borderTopRightRadius: b ? b : a,
    borderBottomRightRadius: c ? c : a,
    borderBottomLeftRadius: d ? d : (b ? b : a)
  }
}

/**
 * 上边框
 *  ...borderTop('1px solid #eeeeee')
 * @export
 * @param {string} value
 * @returns
 */
export function borderTop(value: string) {
  const [borderTopWidth = '0', borderStyle = 'solid', borderTopColor = '']: any[] = value.split(' ');
  return {
    borderTopWidth: parseInt(borderTopWidth, 10),
    borderTopColor,
    borderStyle
  }
}

/**
 * 右边框
 *  ...borderRight('1px solid #eeeeee')
 * @export
 * @param {string} value
 * @returns
 */
export function borderRight(value: string) {
  const [borderRightWidth = '0', borderStyle = 'solid', borderRightColor = '']: any[] = value.split(' ');
  return {
    borderRightWidth: parseInt(borderRightWidth, 10),
    borderRightColor,
    borderStyle
  }
}

/**
 * 底边框
 *  ...borderBottom('1px solid #eeeeee')
 * @export
 * @param {string} value
 * @returns
 */
export function borderBottom(value: string): ViewStyle {
  const [borderBottomWidth = '0', borderStyle = 'solid', borderBottomColor = '']: any[] = value.split(' ');
  return {
    borderBottomWidth: parseInt(borderBottomWidth, 10),
    borderBottomColor,
    borderStyle
  }
}

/**
 * 左边框
 *  ...borderLeft('1px solid #eeeeee')
 * @export
 * @param {string} value
 * @returns
 */
export function borderLeft(value: string) {
  const [borderLeftWidth = '0', borderStyle = 'solid', borderLeftColor = '']: any[] = value.split(' ');
  return {
    borderLeftWidth: parseInt(borderLeftWidth, 10),
    borderLeftColor,
    borderStyle
  }
}

/**
 * 边框
 *  ...border('1px solid #eeeeee')
 * @export
 * @param {string} value
 * @returns
 */
export function border(value: string) {
  return {
    ...borderTop(value),
    ...borderRight(value),
    ...borderBottom(value),
    ...borderLeft(value)
  }
}
