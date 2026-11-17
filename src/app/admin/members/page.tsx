import type { Metadata } from "next"
import Typography from "@mui/material/Typography"
import AdminPage from "@/components/admin/AdminPage"

export const metadata: Metadata = { title: "회원 관리" }

export default function Page() {
  return (
    <AdminPage title="회원 관리" description="회원 목록과 역할을 관리합니다.">
      {/* TODO: 회원 목록, profiles.role_id 변경 */}
      <Typography sx={{ mt: 4, color: "text.disabled" }}>준비 중입니다.</Typography>
    </AdminPage>
  )
}
