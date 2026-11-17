export default function Footer() {
  return (
    <footer className="mt-16 bg-brand-900 text-sm text-gray-300">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <p className="font-bold text-white">광명우리교회</p>
        {/* TODO: 주소, 전화번호를 실제 정보로 바꾸세요 (site_settings 테이블로 옮겨도 좋아요) */}
        <p className="mt-2">경기도 광명시 · 전화 000-0000-0000</p>
        <p className="mt-4 text-xs text-gray-500">© 광명우리교회. All rights reserved.</p>
      </div>
    </footer>
  )
}
