# 광명우리교회 홈페이지 (gmwrapp)

Next.js 16 + Supabase + MUI (Material UI) 9

## 시작하기

```bash
npm install
cp .env.example .env.local   # 값 채우기
npm run dev                  # http://localhost:3000
```

`.env.local`

| 이름 | 어디서 |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 대시보드 → Connect |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Project Settings → API Keys (`sb_publishable_...`) |

## 폴더 구조

```
src/
├── proxy.ts                      # 요청마다 로그인 세션 갱신, /admin 접근 제한 (구 middleware)
├── app/
│   ├── layout.tsx                # 공통 레이아웃 (헤더/푸터)
│   ├── page.tsx                  # 메인
│   ├── login/                    # 로그인 (Server Action)
│   ├── admin/                    # 관리자 (관리자만)
│   └── [section]/[slug]/         # 모든 메뉴 페이지: /about/intro, /community/free ...
│       └── [postId]/             # 글 상세
├── components/
│   ├── layout/                   # Header, Footer, MobileNav, AuthButtons
│   └── board/                    # 게시판 목록, 페이지네이션, 단일 페이지 본문
├── lib/
│   ├── supabase/
│   │   ├── server.ts             # 서버용 (로그인 쿠키 O → RLS가 사용자 기준)
│   │   ├── client.ts             # 브라우저용
│   │   ├── public.ts             # 쿠키 없이 방문자 권한 (캐시용)
│   │   └── proxy.ts              # 세션 갱신
│   ├── auth.ts                   # getCurrentUser, requireAdmin
│   ├── menus.ts                  # 메뉴 조회 (캐시)
│   └── posts.ts                  # 게시글 조회
└── types/database.ts             # Supabase에서 생성한 DB 타입
```

## 메뉴 → 페이지 연결

메뉴는 코드가 아니라 **DB(`menus`)** 에 있습니다. 메뉴를 추가하면 페이지가 자동으로 생깁니다.

- 주소: `/{상위 메뉴 slug}/{메뉴 slug}`
- `menu_type`에 따라 화면이 달라짐
  - `page`: 본문 하나 (그 메뉴의 최신 글 1개를 본문으로 사용)
  - `board`: 게시판 목록
  - `gallery`, `sermon`: 지금은 게시판 목록 → 전용 화면 만들 예정

## 권한

권한 판단은 **DB의 RLS**가 합니다. 화면 코드에서 권한을 따로 검사하지 않아도 볼 수 없는 글은 조회되지 않습니다.

- `roles`: admin(관리자) / member(교인) / guest(방문자, 로그인 안 함)
- `menu_roles`: 메뉴별 읽기/쓰기/관리 권한
- 관리자는 모든 메뉴에 전체 권한
- 회원가입하면 `profiles`가 자동으로 만들어지고 기본 권한은 member

## Cache Components (Next.js 16)

`next.config.ts`에 `cacheComponents: true`가 켜져 있습니다.

- 로그인 쿠키를 읽는 컴포넌트(`getCurrentUser`, `lib/posts.ts`)는 **반드시 `<Suspense>` 안에서** 써야 합니다. 밖에서 쓰면 빌드 에러가 납니다.
- 모두에게 같은 데이터(메뉴)는 `"use cache"`로 캐시합니다. 메뉴를 바꾸면 `revalidateTag("menus")`를 호출하세요.
- Client Component에서 `usePathname`, `useSearchParams`를 쓸 때도 `<Suspense>`가 필요합니다.

## DB 타입 다시 만들기

테이블을 바꾼 뒤:

```bash
npx supabase login
npx supabase gen types typescript --project-id jkxgmdcxippogqrprwnv > src/types/database.ts
```

DB 스키마를 파일로 받아두려면 `npx supabase db pull`.

## TODO

- [ ] 회원가입 (교회에 맞는 약관/개인정보 안내 새로 작성)
- [ ] 글쓰기/수정/삭제, 댓글
- [ ] 관리자: 메뉴·권한·회원 관리
- [ ] 사진 업로드 (Cloudflare R2), 앨범 화면
- [ ] 설교 영상 (YouTube 임베드)
- [ ] Netlify 배포
