import type { Metadata } from "next"
import Typography from "@mui/material/Typography"
import AdminPage from "@/components/admin/AdminPage"

export const metadata: Metadata = { title: "게시글 관리" }

export default function Page() {
  return (
    <AdminPage title="게시글 관리" description="모든 게시판의 글을 확인하고 관리합니다.">
      {/* TODO: 게시판별 글 목록, 공지 지정, 삭제 */}
      <Typography sx={{ mt: 4, color: "text.disabled" }}>준비 중입니다.</Typography>
    </AdminPage>
  )
}
