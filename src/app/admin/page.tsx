import type { Metadata } from "next"
import { Suspense } from "react"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import { requireAdmin } from "@/lib/auth"
import Loading from "@/components/board/Loading"

export const metadata: Metadata = { title: "관리자" }

export default function AdminPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h4" component="h1" sx={{ color: "primary.main" }}>
        관리자
      </Typography>
      <Suspense fallback={<Loading rows={3} />}>
        <AdminContent />
      </Suspense>
    </Container>
  )
}

async function AdminContent() {
  const user = await requireAdmin()

  return (
    <>
      <Typography sx={{ mt: 3 }}>{user.name ?? user.email}님, 환영합니다.</Typography>
      {/* TODO: 메뉴 관리, 권한 관리, 게시글 관리, 회원 관리 */}
      <List dense sx={{ color: "text.secondary" }}>
        <ListItem><ListItemText primary="메뉴 관리 (menus)" /></ListItem>
        <ListItem><ListItemText primary="메뉴별 권한 (menu_roles)" /></ListItem>
        <ListItem><ListItemText primary="회원 권한 변경 (profiles.role_id)" /></ListItem>
      </List>
    </>
  )
}
