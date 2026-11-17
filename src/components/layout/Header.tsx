import Image from "next/image"
import { Suspense } from "react"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import NextLink from "@/components/ui/NextLink"
import { getMenuTree } from "@/lib/menus"
import AuthButtons from "./AuthButtons"
import MobileNav from "./MobileNav"

// 메뉴는 캐시된 데이터라 정적으로 그려지고,
// 로그인 버튼만 요청마다 바뀌므로 Suspense 안에 둡니다.
export default async function Header() {
  const menus = await getMenuTree()

  return (
    <AppBar position="sticky" elevation={1} sx={{ bgcolor: "primary.main" }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ height: 64, justifyContent: "space-between" }}>
          <Box component={NextLink} href="/" sx={{ display: "flex", flexShrink: 0 }}>
            <Image src="/images/logo-invert.png" alt="광명우리교회" width={110} height={50} priority />
          </Box>

          {/* PC 메뉴: 마우스를 올리면 하위 메뉴가 열림 (CSS만 사용) */}
          <Box component="nav" sx={{ display: { xs: "none", md: "flex" }, height: "100%" }}>
            {menus.map((group) => (
              <Box
                key={group.id}
                sx={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  "&:hover .submenu": { visibility: "visible", opacity: 1 },
                  "&:hover > span": { color: "secondary.main" },
                }}
              >
                <Box component="span" sx={{ px: 2, py: 1, fontWeight: 700, cursor: "default" }}>
                  {group.name}
                </Box>
                <Paper
                  className="submenu"
                  elevation={4}
                  sx={{
                    position: "absolute",
                    top: "100%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    minWidth: 150,
                    py: 1,
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                    visibility: "hidden",
                    opacity: 0,
                    transition: "opacity .15s",
                  }}
                >
                  {group.children.map((menu) => (
                    <Box
                      key={menu.id}
                      component={NextLink}
                      href={menu.url ?? "#"}
                      sx={{
                        display: "block",
                        px: 2,
                        py: 1,
                        fontSize: 14,
                        whiteSpace: "nowrap",
                        color: "text.primary",
                        "&:hover": { bgcolor: "brand.soft", color: "primary.main" },
                      }}
                    >
                      {menu.name}
                    </Box>
                  ))}
                </Paper>
              </Box>
            ))}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Suspense fallback={<Box sx={{ width: 80 }} />}>
              <AuthButtons />
            </Suspense>
            <MobileNav menus={menus} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
