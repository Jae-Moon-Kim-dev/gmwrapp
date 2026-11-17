import Typography from "@mui/material/Typography"
import { getPageContent } from "@/lib/posts"
import EmptyMessage from "./EmptyMessage"

// 교회소개처럼 글 목록 없이 본문 하나만 보여주는 메뉴
export default async function PageContent({ menuId }: { menuId: number }) {
  const page = await getPageContent(menuId)

  if (!page) {
    return <EmptyMessage>준비 중인 페이지입니다.</EmptyMessage>
  }

  // TODO: 에디터를 붙이면 HTML/마크다운 렌더링으로 바꾸세요
  return <Typography sx={{ lineHeight: 2, whiteSpace: "pre-wrap" }}>{page.content}</Typography>
}
