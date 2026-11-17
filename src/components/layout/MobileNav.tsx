"use client"

import Link from "next/link"
import { useState } from "react"
import type { MenuGroup } from "@/lib/menus"

// 모바일 햄버거 메뉴
export default function MobileNav({ menus }: { menus: MenuGroup[] }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button
        aria-label="메뉴 열기"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="rounded p-2 hover:bg-white/10"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      {open && (
        <nav className="absolute inset-x-0 top-16 max-h-[calc(100vh-4rem)] overflow-y-auto bg-white text-gray-700 shadow-lg">
          {menus.map((group) => (
            <div key={group.id} className="border-b border-gray-100 px-4 py-3">
              <p className="mb-2 font-bold text-brand-700">{group.name}</p>
              <ul className="grid grid-cols-2 gap-1">
                {group.children.map((menu) => (
                  <li key={menu.id}>
                    <Link href={menu.url ?? "#"} onClick={() => setOpen(false)} className="block rounded px-2 py-1.5 text-sm hover:bg-brand-50">
                      {menu.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      )}
    </div>
  )
}
