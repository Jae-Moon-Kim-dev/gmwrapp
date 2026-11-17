import type { Metadata } from "next"
import { Suspense } from "react"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import NextLink from "@/components/ui/NextLink"
import AdminNav from "@/components/admin/AdminNav"
import AdminMobileNav from "@/components/admin/AdminMobileNav"
import AdminUser from "@/components/admin/AdminUser"

export const metadata: Metadata = {
  title: { default: "관리자", template: "%s | 관리자" },
  robots: { index: false, follow: false },
}

const SIDEBAR_WIDTH = 220

// 관리자 화면 틀: 상단바 + 왼쪽 사이드바
// ⚠️ 레이아웃은 페이지 이동 시 다시 실행되지 않으므로 여기서 권한 검사를 하지 않습니다.
//    각 page(AdminPage)와 모든 관리자 Server Action에서 requireAdmin()을 호출하세요.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", bgcolor: "grey.50" }}>
      <AppBar position="sticky" elevation={1} sx={{ bgcolor: "primary.dark" }}>
        <Toolbar sx={{ gap: 1 }}>
          <AdminMobileNav />
          <Typography component={NextLink} href="/admin" sx={{ fontWeight: 700, color: "inherit" }}>
            광명우리교회 관리자
          </Typography>
          <Box sx={{ flex: 1 }} />
          <Button component={NextLink} href="/" color="inherit" size="small">
            사이트로
          </Button>
          <Suspense>
            <AdminUser />
          </Suspense>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: "flex", flex: 1 }}>
        <Box
          component="aside"
          sx={{
            display: { xs: "none", md: "block" },
            width: SIDEBAR_WIDTH,
            flexShrink: 0,
            pt: 2,
            bgcolor: "background.paper",
            borderRight: 1,
            borderColor: "divider",
          }}
        >
          <AdminNav />
        </Box>
        <Box component="main" sx={{ flex: 1, minWidth: 0, p: { xs: 2, md: 4 } }}>
          {children}
        </Box>
      </Box>
    </Box>
  )
}
