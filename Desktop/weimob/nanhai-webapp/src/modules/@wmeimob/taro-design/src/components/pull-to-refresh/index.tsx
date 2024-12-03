/* eslint-disable no-console */
import { PureComponent } from 'react'
import { View, ScrollView } from '@tarojs/components';
import { ITouch, ITouchEvent } from '@tarojs/components/types/common';
import Taro, { getCurrentInstance, nextTick } from '@tarojs/taro';
import classname from 'classnames';
import { autobind, throttleLast } from '~/modules/@wmeimob/decorator/src/components';
import { MMPullToRefreshState } from './const';
import styles from './index.modules.less';
import MMLoading from '../loading';
import { selectRect } from '../utils';

interface IMMPullToRefreshProps {
  /**
   * 状态
   *
   * @type {MMPullToRefreshState}
   * @memberof IMMPullToRefreshProps
   */
  state: MMPullToRefreshState;

  /**
   * 没有更多
   *
   * @type {boolean}
   * @memberof IMMPullToRefreshProps
   */
  noMore: boolean;

  /**
   * 刷新事件回调
   *
   * @memberof IMMPullToRefreshProps
   */
  onRefresh: () => void;

  /**
   * 滚动到地步回调
   *
   * @memberof IMMPullToRefreshProps
   */
  onScrollToLower: () => void;

  /**
   * 渲染底部 低于无更多
   *
   * @memberof IMMPullToRefreshProps
   */
  renderFooter?: JSX.Element;

  /**
   * 没有更多的文案
   *
   * @memberof IMMPullToRefreshProps
   */
  noMoreText?: string;

  /**
   * 容器高度。下拉刷新必须指定一个高度。大部分情况下组件内会自动根据距离顶部距离计算出容器剩余高度作为组件高度。但是有些特定情况。造成两个滚动条的时候。你可能需要手动指定容器高度
   */
  height?: number;
}

interface IMMPullToRefreshState {
  pulling: boolean;
  top: number;
  scrollViewHeight: number;
}

/**
 * @name 下拉刷新
 */
@autobind
export default class MMPullToRefresh extends PureComponent<IMMPullToRefreshProps, IMMPullToRefreshState> {
  static options = {
    addGlobalClass: true
  };

  static defaultProps = {
    height: 0,
    noMoreText: '没有更多了'
  };

  static loadingHeight = 50;

  static getDerivedStateFromProps(nextProps: IMMPullToRefreshProps, prevState: IMMPullToRefreshState) {
    if (nextProps.state === MMPullToRefreshState.refreshing) {
      return {
        top: MMPullToRefresh.loadingHeight,
        pulling: false
      };
    }

    if (prevState.pulling) {
      return null;
    }

    return {
      top: 0
    };
  }

  public state: IMMPullToRefreshState = {
    pulling: false,
    scrollViewHeight: 0,
    // eslint-disable-next-line no-invalid-this
    top: this.props.state === MMPullToRefreshState.refreshing ? MMPullToRefresh.loadingHeight : 0
  };

  /**
   * 当前滚动条高度
   *
   * @private
   * @memberof MMPullToRefresh
   */
  private scrollTop = 0;

  /**
   * 记录开始startTouch
   *
   * @private
   * @type {ITouch}
   * @memberof MMPullToRefresh
   */
  private startTouch: ITouch | undefined;

  /**
   * 可以拖动开始
   *
   * @private
   * @memberof MMPullToRefresh
   */
  private get canPull() {
    if (this.props.state !== MMPullToRefreshState.none) {
      return false;
    }

    if (this.scrollTop > 5) {
      return false;
    }
    return true;
  }

  private get classNameContent() {
    const classNames = [styles.content];
    if (this.props.state === MMPullToRefreshState.refreshing) {
      classNames.push(styles.content__refreshing);
    }

    return classname(...classNames);
  }

  componentDidMount() {
    nextTick(() => {
      this.calculateScrollViewHeight();
    })
  }

  componentDidUpdate() {
    nextTick(() => {
      this.calculateScrollViewHeight();
    })
  }

  render() {
    const { state } = this.props;
    const nu = MMPullToRefreshState.refreshing;
    const height = MMPullToRefresh.loadingHeight;
    const style = this.state.scrollViewHeight !== 0 ? { height: this.state.scrollViewHeight + 'px' } : {};

    return (
      <View className={styles.MMPullToRefresh}>
        <View id="MMPullToRefreshTop" />
        <ScrollView
          scrollY={true}
          throttle={false}
          enhanced={true}
          bounces={false}
          style={style}
          onScroll={this.onScroll}
          lowerThreshold={100}
          onScrollToLower={this.onScrollToLower}
        >
          <View
            className={this.classNameContent}
            style={{ top: this.state.top + 'px' }}
            onTouchMove={this.onTouchMove}
            onTouchEnd={this.onTouchEnd}
          >
            <View className={styles.loading} style={{ marginTop: -height + 'px', height: height + 'px' }}>
              {/* {this.getRefresh()} */}
              <MMLoading width={25} height={25} />
            </View>
            {this.props.children}
            {state !== nu && this.renderPull()}
            {this.props.renderFooter}
          </View>
        </ScrollView>
      </View>
    );
  }

  private renderPull() {
    const { noMore, noMoreText } = this.props;
    return <View className={styles.more}>{noMore ? noMoreText : <MMLoading width={25} height={25} />}</View>;
  }

  // private getRefresh() {
  //     if (this.state.top === MMPullToRefresh.loadingHeight) {
  //         return this.props.state === MMPullToRefreshState.refreshing ? '刷新中' : '松开刷新';
  //     }
  //     return '下拉刷新';
  // }

  private onScrollToLower() {
    if (this.props.state !== MMPullToRefreshState.pushing && !this.props.noMore) {
      this.props.onScrollToLower();
    }
  }

  private onScroll(event) {
    this.scrollTop = event.target.scrollTop;
  }

  private async calculateScrollViewHeight() {
    let scrollViewHeight = this.props.height;
    if (!scrollViewHeight) {
      const topViewRes = await selectRect('#MMPullToRefreshTop', getCurrentInstance().page);
      const { screenHeight } = Taro.getSystemInfoSync();
      scrollViewHeight = screenHeight - topViewRes.top
    }
    this.setState({
      scrollViewHeight
    });
  }

  @throttleLast(60)
  private onTouchMove(event: ITouchEvent) {
    if (!this.canPull) {
      this.startTouch = undefined;
      if (this.props.state !== MMPullToRefreshState.refreshing) {
        this.setState({
          top: 0
        });
      }
      return;
    }

    const [touche] = event.touches;
    if (!this.startTouch) {
      this.startTouch = touche;
      return;
    }

    const top = touche.clientY - this.startTouch.clientY;
    if (top > 0) {
      this.setTop(top);
    }
  }

  private setTop(top: number) {
    let stateTop = top;
    if (stateTop > MMPullToRefresh.loadingHeight) {
      stateTop = MMPullToRefresh.loadingHeight;
    }

    this.setState({
      pulling: true,
      top: stateTop
    });
  }

  private async onTouchEnd(_event: ITouchEvent) {
    if (!this.canPull) {
      return;
    }

    if (this.state.top < MMPullToRefresh.loadingHeight) {
      this.setState({ top: 0 });
      this.startTouch = undefined;
      return;
    }

    this.setState({ top: MMPullToRefresh.loadingHeight, pulling: false });
    this.startTouch = undefined;
    this.props.onRefresh();
  }
}
