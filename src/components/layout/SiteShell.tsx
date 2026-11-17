import Box from "@mui/material/Box"
import Header from "./Header"
import Footer from "./Footer"

// 홈페이지 공통 틀: 헤더 + 본문 + 푸터
// (site) 레이아웃과 루트 not-found에서 같이 씁니다.
export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Box component="main" sx={{ flex: 1 }}>
        {children}
      </Box>
      <Footer />
    </Box>
  )
}
