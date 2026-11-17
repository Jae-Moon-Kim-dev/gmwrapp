import type { Metadata } from "next"
import Typography from "@mui/material/Typography"
import AdminPage from "@/components/admin/AdminPage"

export const metadata: Metadata = { title: "메뉴 관리" }

export default function Page() {
  return (
    <AdminPage title="메뉴 관리" description="홈페이지 상단 메뉴와 각 메뉴의 화면 종류를 정합니다.">
      {/* TODO: 메뉴 트리, 추가/수정/삭제, 순서 변경 (저장 후 revalidateTag("menus")) */}
      <Typography sx={{ mt: 4, color: "text.disabled" }}>준비 중입니다.</Typography>
    </AdminPage>
  )
}
