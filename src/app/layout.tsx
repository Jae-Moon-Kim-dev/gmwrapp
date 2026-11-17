import type { Metadata } from "next"
import localFont from "next/font/local"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import theme from "@/theme"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={nanum.variable}>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
              <Header />
              <Box component="main" sx={{ flex: 1 }}>
                {children}
              </Box>
              <Footer />
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
