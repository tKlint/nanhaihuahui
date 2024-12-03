class AliYun {
  /**
   * 几倍图
   *
   * @static
   * @memberof AliYun
   */
  static multiple = 2

  /**
   * 整数
   *
   * @static
   * @memberof AliYun
   */
  static trunc(nu: number) {
    return Math.trunc(nu) * AliYun.multiple;
  }

  /**
   * 获取剪接图片后缀
   *
   * @static
   * @param {{ width: number, height: number }} { width, height }
   * @returns
   * @memberof AliYun
   */
  static getResizeUrl({ width, height }: { width?: number; height?: number }) {
    let url = `?x-oss-process=image/resize,m_fill`;
    if (width) {
      url += `,w_${AliYun.trunc(width)}`
    }
    if (height) {
      url += `,h_${AliYun.trunc(height)}`
    }
    return url;
  }

  /**
   * 获取视频第一帧图片
   *
   * @static
   * @param {{ width: number, height: number }} { width, height }
   * @returns
   * @memberof AliYun
   */
  static getVideoSnapshotUrl({ width, height }: { width?: number; height?: number }) {
    let url = `?x-oss-process=video/snapshot,t_7000,f_jpg`;

    if (width) {
      url += `,w_${AliYun.trunc(width)}`
    }
    if (height) {
      url += `,h_${AliYun.trunc(height)}`
    }
    return url;
  }
}

export const { getResizeUrl, getVideoSnapshotUrl } = AliYun;
