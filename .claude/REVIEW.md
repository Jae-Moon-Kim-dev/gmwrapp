# 리뷰 / 나중에 고칠 것

발견했지만 바로 고치지 않은 문제를 모아둡니다. 고치면 항목을 지우거나 `[x]`로 바꾸세요.
형식: 증상 → 위치 → 원인(추정이면 표시) → 고치는 방법

## 버그

- [ ] **메뉴에 없는 2단 주소의 404 화면 HTML에 헤더/푸터가 없음**
  - 증상: `/nope/nope` → 404 응답이지만 서버 HTML `<body>`가 비어 있고 `NEXT_HTTP_ERROR_FALLBACK;404` 템플릿만 있음.
    `/zzz`(1단 주소)는 헤더/푸터 포함된 not-found가 정상 렌더링됨.
  - 위치: [src/app/(site)/[section]/[slug]/page.tsx](../src/app/(site)/[section]/[slug]/page.tsx) `MenuPage`의 `notFound()`
  - 원인(추정): `generateStaticParams`에 없는 파라미터를 요청 시 렌더링하다가 Suspense 밖에서 `notFound()`가 던져져
    서버 HTML 대신 클라이언트에서 not-found를 그리는 것으로 보임. dev 서버에서만 그런지, 이번 (site) 그룹 분리 전에도 그랬는지 미확인.
  - 확인: `next build && next start`로 같은 주소 확인 → 계속 그러면 `(site)/not-found.tsx` 추가나 `notFound()` 위치 조정 검토.
    Next 16 문서: `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/not-found.md`

- [ ] **메뉴 링크는 `menus.url`, 페이지 찾기는 `slug` 사용 → 둘이 어긋나면 404**
  - 위치: [Header.tsx](../src/components/layout/Header.tsx) `href={menu.url ?? "#"}`, [MobileNav.tsx](../src/components/layout/MobileNav.tsx) 동일
  - 고치기: 링크를 `` `/${group.slug}/${menu.slug}` ``로 만들고 `url`은 외부 링크 전용으로. (관리자 메뉴 관리 만들기 전에 처리 권장)

## 개선

- [ ] **Supabase 에러 객체를 그대로 throw → 브라우저에 `{message: ..., hint: ...}`로만 보임**
  - 위치: [src/lib/menus.ts](../src/lib/menus.ts), [src/lib/posts.ts](../src/lib/posts.ts) 의 `if (error) throw error`
  - 고치기: `throw new Error(\`메뉴 조회 실패: ${error.message}\`)` 처럼 감싸기
  - 배경: API 키가 잘못됐을 때 원인("Invalid API key")이 화면에 안 보여서 찾기 어려웠음

- [ ] **`signOut`을 `@/app/(site)/login/actions`에서 import**
  - 위치: [AuthButtons.tsx](../src/components/layout/AuthButtons.tsx), [AdminUser.tsx](../src/components/admin/AdminUser.tsx)
  - 사이트/관리자 양쪽에서 쓰는 액션이 (site) 그룹 안에 있음. 인증 액션이 늘어나면 `src/app/actions/auth.ts` 같은 공용 위치로 옮기기 검토.

## 환경 / 기타

- [ ] **`.next/types`에 이전 브랜치(feature/supabase-migration)의 타입 파일이 남아 `tsc --noEmit`이 실패**
  - `.next/types/app/api/...`, `.next/types/app/admin/member/...` 등 존재하지 않는 파일 참조
  - 고치기: dev 서버를 끄고 `.next` 폴더 삭제 후 다시 실행
- [ ] **`src/app/utils/hooks/` 빈 폴더** (git 추적 안 됨, 이전 구조 잔재) → 삭제
