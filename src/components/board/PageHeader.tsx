import Link from "next/link"

// 하위 페이지 상단 제목 + 경로 표시
export default function PageHeader({ group, title }: { group: string; title: string }) {
  return (
    <div className="bg-brand-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <nav className="text-sm text-gray-500">
          <Link href="/" className="hover:text-brand-600">홈</Link>
          <span className="mx-2">›</span>
          <span>{group}</span>
          <span className="mx-2">›</span>
          <span className="text-gray-700">{title}</span>
        </nav>
        <h1 className="mt-2 text-3xl font-extrabold text-brand-700">{title}</h1>
      </div>
    </div>
  )
}
