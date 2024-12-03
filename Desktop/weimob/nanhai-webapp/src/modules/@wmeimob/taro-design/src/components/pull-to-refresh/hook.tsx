import { useRef, useState } from "@tarojs/taro";
import { MMPullToRefreshState } from "./const";

export default function usePullList<T>(config: {
  defaultData?: T[],
  getData: (pageNum: number) => Promise<{ content: { list: T[], isLastPage: boolean, total: number } }>
}) {
  const { defaultData = [] } = config;
  const [data, setData] = useState(defaultData);
  const [total, setTotal] = useState(0);
  const [noMore, setNoMore] = useState(false);
  const [pullToRefreshState, setPullToRefreshState] = useState(MMPullToRefreshState.none);
  const pageNum = useRef(1);

  const postDate = async (num?: number) => {
    if (num !== undefined) {
      pageNum.current = num;
    } else {
      pageNum.current++;
    }

    if (pageNum.current === 1) {
      setPullToRefreshState(MMPullToRefreshState.refreshing);
      // setData([]);
    } else {
      setPullToRefreshState(MMPullToRefreshState.pushing);
    }

    const { content } = await config.getData(pageNum.current);
    if (pageNum.current === 1) {
      setData(content.list);
    } else {
      setData(data.concat(content.list));
    }
    setTotal(content.total);
    setNoMore(content.isLastPage);
    setPullToRefreshState(MMPullToRefreshState.none);
  }

  /**
   * 刷新
   *
   * @returns
   */
  function onRefresh() {
    return postDate(1);
  }

  function onScrollToLower() {
    return postDate();
  }

  /**
   * 根据id删除数据
   * @param id
   */
  function deleteById(id: string | number) {
    setData(data.filter(value => (value as any).id !== id))
  }

  /**
   * 更新某条数据的值
   *
   * @param updatedata
   */
  function updateById(updatedata: T) {
    setData(data.map(value => {
      if ((value as any).id === (updatedata as any).id) {
        return { ...value, ...updatedata }
      }
      return value;
    }));
  }

  return {
    data,
    state: pullToRefreshState,
    noMore,
    total,
    onRefresh,
    setData,
    updateById,
    deleteById,
    onScrollToLower,
    isEmpty: data.length === 0 && pullToRefreshState === MMPullToRefreshState.none
  }
}

