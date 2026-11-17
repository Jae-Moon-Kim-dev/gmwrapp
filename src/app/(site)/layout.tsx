import SiteShell from "@/components/layout/SiteShell"

// 홈페이지 화면들 (주소에 (site)는 붙지 않습니다: /, /about/intro, /login ...)
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell>{children}</SiteShell>
}
