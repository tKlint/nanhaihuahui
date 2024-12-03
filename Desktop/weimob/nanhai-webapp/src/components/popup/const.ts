import { ReactNode } from "react";
import { IMMModalProps } from "~/modules/@wmeimob/taro-design/src/components/modal";

export interface IMMPopupProps extends Pick<IMMModalProps, 'visible' | 'onClose'> {
  /** 标题 */
  title?: string;
  /** 副标题 */
  subTitle?: string;
  /** 确定文本 */
  okText?: string;
  /** 取消文本 */
  cancelText?: string;
  /** 渲染title */
  renderTitle?: JSX.Element;
  /** 自定义底部插槽底部 */
  renderFooter?: ReactNode
  /** 是否渲染底部 */
  footer?: boolean | 'render';
  modalStyle?: React.CSSProperties;
  /** 样式 */
  contentStyle?: React.CSSProperties;

  onOk?: () => void;
}

export interface IMMPopupState { }
