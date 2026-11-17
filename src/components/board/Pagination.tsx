import Link from "next/link"

type Props = { basePath: string; page: number; totalPages: number }

export default function Pagination({ basePath, page, totalPages }: Props) {
  if (totalPages <= 1) return null

  // 현재 페이지 기준 앞뒤 2개씩
  const start = Math.max(1, page - 2)
  const end = Math.min(totalPages, page + 2)
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i)

  return (
    <nav className="mt-8 flex justify-center gap-1 text-sm">
      {pages.map((p) => (
        <Link
          key={p}
          href={`${basePath}?page=${p}`}
          aria-current={p === page ? "page" : undefined}
          className={`min-w-9 rounded px-3 py-1.5 text-center ${
            p === page ? "bg-brand-600 text-white" : "hover:bg-gray-100"
          }`}
        >
          {p}
        </Link>
      ))}
    </nav>
  )
}
