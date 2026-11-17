import Link from "next/link"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { getMenuByPath } from "@/lib/menus"
import { getAuthorNames, getPost, increaseViewCount } from "@/lib/posts"
import { formatDate } from "@/lib/format"
import PageHeader from "@/components/board/PageHeader"

export default async function PostPage({ params }: PageProps<"/[section]/[slug]/[postId]">) {
  return (
    <Suspense fallback={<p className="py-20 text-center text-gray-400">불러오는 중...</p>}>
      <PostDetail params={params} />
    </Suspense>
  )
}

async function PostDetail({ params }: { params: PageProps<"/[section]/[slug]/[postId]">["params"] }) {
  const { section, slug, postId } = await params
  const found = await getMenuByPath(section, slug)
  const id = Number(postId)
  if (!found || !Number.isInteger(id)) notFound()

  // 권한이 없거나 다른 메뉴의 글이면 404
  const post = await getPost(id)
  if (!post || post.menu_id !== found.menu.id) notFound()

  await increaseViewCount(post.id)
  const authors = await getAuthorNames([post.user_id])
  const listPath = `/${section}/${slug}`

  return (
    <>
      <PageHeader group={found.group.name} title={found.menu.name} />
      <article className="mx-auto max-w-4xl px-4 py-10">
        <header className="border-t-2 border-brand-700 border-b border-b-gray-200 py-5">
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p className="mt-2 text-sm text-gray-500">
            {post.user_id ? authors.get(post.user_id) : "-"} · {formatDate(post.created_at)} · 조회{" "}
            {post.view_count + 1}
          </p>
        </header>
        {/* TODO: 에디터를 붙이면 HTML 렌더링으로 바꾸세요 */}
        <div className="min-h-40 border-b border-gray-200 py-8 leading-8 whitespace-pre-wrap">
          {post.content}
        </div>
        <div className="mt-6 text-right">
          <Link href={listPath} className="rounded border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50">
            목록
          </Link>
        </div>
      </article>
    </>
  )
}
