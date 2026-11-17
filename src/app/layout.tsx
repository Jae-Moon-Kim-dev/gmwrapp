import type { Metadata } from "next"
import localFont from "next/font/local"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import theme from "@/theme"

const nanum = localFont({
  src: [
    { path: "../../public/fonts/NanumGothicLight.woff", weight: "300" },
    { path: "../../public/fonts/NanumGothic.woff", weight: "400" },
    { path: "../../public/fonts/NanumGothicBold.woff", weight: "700" },
    { path: "../../public/fonts/NanumGothicExtraBold.woff", weight: "800" },
  ],
  variable: "--font-nanum",
  display: "swap",
})

export const metadata: Metadata = {
  title: { default: "광명우리교회", template: "%s | 광명우리교회" },
  description: "광명우리교회 홈페이지",
}

// 루트 레이아웃: html/body, 폰트, MUI 테마만 담당합니다.
// 화면 틀은 그룹별 레이아웃에서 정합니다.
//   (site)/layout.tsx  → 홈페이지 헤더/푸터
//   admin/layout.tsx   → 관리자 사이드바
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={nanum.variable}>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
