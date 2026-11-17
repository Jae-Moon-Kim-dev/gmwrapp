import Link from "next/link"

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <h1 className="text-2xl font-bold text-brand-700">페이지를 찾을 수 없습니다</h1>
      <p className="mt-3 text-gray-500">주소가 바뀌었거나 볼 수 있는 권한이 없는 글이에요.</p>
      <Link href="/" className="mt-8 inline-block rounded bg-brand-600 px-5 py-2.5 text-white">홈으로</Link>
    </div>
  )
}
