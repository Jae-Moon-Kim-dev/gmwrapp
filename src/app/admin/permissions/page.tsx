import type { Metadata } from "next"
import Typography from "@mui/material/Typography"
import AdminPage from "@/components/admin/AdminPage"

export const metadata: Metadata = { title: "메뉴별 권한" }

export default function Page() {
  return (
    <AdminPage title="메뉴별 권한" description="역할별로 메뉴의 읽기/쓰기/관리 권한을 정합니다.">
      {/* TODO: menu_roles 체크박스 표 */}
      <Typography sx={{ mt: 4, color: "text.disabled" }}>준비 중입니다.</Typography>
    </AdminPage>
  )
}
