import { CSSProperties } from "react";
import { GridStyleDTO } from "~/modules/@wmeimob/data-model/src/storeModule/common/GridStyleDTO";

/**
 * 格式化网格样式
 * @param gridStyle
 * @noSupport RN 不支持react-native环境
 */
export function serializeGridStyle(gridStyle: GridStyleDTO) {
  const style: CSSProperties = {};
  Object.keys(gridStyle).forEach(key => {
    if (key === 'padding') {
      style.padding = gridStyle[key].map(value => `${value}px`).join(' ')
    } else {
      style[key] = gridStyle[key]
    }
  })
  return style;
}
