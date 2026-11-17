import Link from "next/link"
import { getAuthorNames, getPosts, PAGE_SIZE } from "@/lib/posts"
import { formatDate } from "@/lib/format"
import Pagination from "./Pagination"

type Props = {
  menuId: number
  basePath: string
  page: number
}

export default async function BoardList({ menuId, basePath, page }: Props) {
  const { posts, total } = await getPosts(menuId, page)
  const authors = await getAuthorNames(posts.map((p) => p.user_id))

  if (posts.length === 0) {
    return <p className="py-20 text-center text-gray-400">등록된 글이 없습니다.</p>
  }

  return (
    <>
      <table className="w-full border-t-2 border-brand-700 text-sm">
        <thead className="border-b border-gray-200 bg-gray-50 text-gray-600">
          <tr>
            <th className="hidden w-16 py-3 sm:table-cell">번호</th>
            <th className="py-3 text-left">제목</th>
            <th className="hidden w-28 py-3 sm:table-cell">작성자</th>
            <th className="w-28 py-3">등록일</th>
            <th className="hidden w-16 py-3 sm:table-cell">조회</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, i) => (
            <tr key={post.id} className="border-b border-gray-100 hover:bg-brand-50/50">
              <td className="hidden py-3 text-center text-gray-500 sm:table-cell">
                {post.is_notice ? (
                  <span className="rounded bg-accent px-2 py-0.5 text-xs font-bold text-white">공지</span>
                ) : (
                  total - (page - 1) * PAGE_SIZE - i
                )}
              </td>
              <td className="py-3">
                <Link href={`${basePath}/${post.id}`} className="hover:text-brand-600 hover:underline">
                  {post.title}
                </Link>
              </td>
              <td className="hidden py-3 text-center text-gray-600 sm:table-cell">
                {post.user_id ? authors.get(post.user_id) : "-"}
              </td>
              <td className="py-3 text-center text-gray-500">{formatDate(post.created_at)}</td>
              <td className="hidden py-3 text-center text-gray-500 sm:table-cell">{post.view_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination basePath={basePath} page={page} totalPages={Math.ceil(total / PAGE_SIZE)} />
    </>
  )
}
