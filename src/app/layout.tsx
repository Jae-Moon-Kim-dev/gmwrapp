import type { Metadata } from "next"
import localFont from "next/font/local"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import "./globals.css"

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
    <html lang="ko" className={`${nanum.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
