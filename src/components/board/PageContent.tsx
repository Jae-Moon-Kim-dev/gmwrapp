import { getPageContent } from "@/lib/posts"

// 교회소개처럼 글 목록 없이 본문 하나만 보여주는 메뉴
export default async function PageContent({ menuId }: { menuId: number }) {
  const page = await getPageContent(menuId)

  if (!page) {
    return <p className="py-20 text-center text-gray-400">준비 중인 페이지입니다.</p>
  }

  // TODO: 에디터를 붙이면 HTML/마크다운 렌더링으로 바꾸세요
  return <div className="leading-8 whitespace-pre-wrap">{page.content}</div>
}
