import Link from "next/link"
import { Suspense } from "react"
import { getMenuByPath } from "@/lib/menus"
import { getPosts } from "@/lib/posts"
import { formatDate } from "@/lib/format"

export default function HomePage() {
  return (
    <>
      {/* 메인 배너 - TODO: 교회 사진으로 교체 */}
      <section className="bg-gradient-to-br from-brand-700 to-brand-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-24">
          <p className="text-accent">환영합니다</p>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight md:text-5xl">광명우리교회</h1>
          <p className="mt-4 max-w-xl text-brand-100">
            {/* TODO: 교회 표어나 소개 문구 */}
            하나님을 사랑하고 이웃을 섬기는 교회
          </p>
          <div className="mt-8 flex gap-3">
            <Link href="/about/worship" className="rounded bg-accent px-5 py-2.5 font-bold text-white hover:opacity-90">
              예배시간 안내
            </Link>
            <Link href="/about/location" className="rounded border border-white/40 px-5 py-2.5 hover:bg-white/10">
              오시는 길
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-2">
        <Suspense fallback={<RecentSkeleton title="행사안내" />}>
          <RecentPosts section="events" slug="notice" />
        </Suspense>
        <Suspense fallback={<RecentSkeleton title="자유게시판" />}>
          <RecentPosts section="community" slug="free" />
        </Suspense>
      </section>
    </>
  )
}

async function RecentPosts({ section, slug }: { section: string; slug: string }) {
  const found = await getMenuByPath(section, slug)
  if (!found) return null

  const { posts } = await getPosts(found.menu.id, 1)
  const path = `/${section}/${slug}`

  return (
    <div>
      <div className="mb-3 flex items-end justify-between border-b-2 border-brand-700 pb-2">
        <h2 className="text-lg font-bold text-brand-700">{found.menu.name}</h2>
        <Link href={path} className="text-sm text-gray-500 hover:text-brand-600">더보기 +</Link>
      </div>
      {posts.length === 0 ? (
        <p className="py-8 text-center text-sm text-gray-400">등록된 글이 없습니다.</p>
      ) : (
        <ul>
          {posts.slice(0, 5).map((post) => (
            <li key={post.id} className="flex justify-between gap-4 border-b border-gray-100 py-2.5 text-sm">
              <Link href={`${path}/${post.id}`} className="truncate hover:text-brand-600">
                {post.title}
              </Link>
              <span className="shrink-0 text-gray-400">{formatDate(post.created_at)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function RecentSkeleton({ title }: { title: string }) {
  return (
    <div>
      <h2 className="mb-3 border-b-2 border-brand-700 pb-2 text-lg font-bold text-brand-700">{title}</h2>
      <div className="h-40 animate-pulse rounded bg-gray-50" />
    </div>
  )
}
