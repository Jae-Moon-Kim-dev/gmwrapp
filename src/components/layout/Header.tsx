import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"
import { getMenuTree } from "@/lib/menus"
import AuthButtons from "./AuthButtons"
import MobileNav from "./MobileNav"

// 메뉴는 캐시된 데이터라 정적으로 그려지고,
// 로그인 버튼만 요청마다 바뀌므로 Suspense 안에 둡니다.
export default async function Header() {
  const menus = await getMenuTree()

  return (
    <header className="sticky top-0 z-40 bg-brand-700 text-white shadow">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="shrink-0">
          <Image src="/images/logo-invert.png" alt="광명우리교회" width={110} height={50} priority />
        </Link>

        {/* PC 메뉴: 마우스를 올리면 하위 메뉴가 열림 */}
        <nav className="hidden h-full md:block">
          <ul className="flex h-full">
            {menus.map((group) => (
              <li key={group.id} className="group relative flex items-center">
                <span className="cursor-default px-4 py-2 text-[15px] font-bold group-hover:text-accent">
                  {group.name}
                </span>
                <ul className="invisible absolute top-full left-1/2 min-w-36 -translate-x-1/2 rounded-b-md bg-white py-2 text-gray-700 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100">
                  {group.children.map((menu) => (
                    <li key={menu.id}>
                      <Link
                        href={menu.url ?? "#"}
                        className="block px-4 py-2 text-sm whitespace-nowrap hover:bg-brand-50 hover:text-brand-600"
                      >
                        {menu.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Suspense fallback={<div className="h-8 w-20" />}>
            <AuthButtons />
          </Suspense>
          <MobileNav menus={menus} />
        </div>
      </div>
    </header>
  )
}
