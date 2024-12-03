import { CommunityPosts } from "~/request/data-contracts"

export interface IIndexProps {
  // 数据
  data: CommunityPosts[]
  // 是否是本人发布
  isSelf?: boolean
  // 关注
  follow?(): void
  // 分页更新
  update(): void
  // 对帖子的操作
  followClick?(type: number, item: CommunityPosts, handleType: number): void
}

