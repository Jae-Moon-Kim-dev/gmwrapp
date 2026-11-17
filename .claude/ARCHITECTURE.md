# gmwrapp 구조 (feature/supabase-rebuild)

광명우리교회 홈페이지. Next.js App Router + Supabase로 재구성한 버전입니다.
별도 API 서버나 `/api` 라우트 없이, **서버 컴포넌트 / Server Action / `src/lib`** 로 FE와 BE를 나눕니다.

> 이 Next.js는 버전 16입니다. 학습된 지식과 API가 다를 수 있으니 코드를 쓰기 전에
> `node_modules/next/dist/docs/`를 확인하세요 (AGENTS.md 참고).

## 기술 스택

| 영역 | 사용 |
|---|---|
| 프레임워크 | Next.js 16.4 (App Router, `cacheComponents`, `partialPrefetching`) |
| UI | React 19.3, MUI 9 (`@mui/material-nextjs` 캐시 프로바이더), Emotion |
| DB / 인증 | Supabase (`@supabase/ssr`, `@supabase/supabase-js`) |
| 폰트 | 나눔고딕 로컬 폰트 (`public/fonts`, `--font-nanum`) |
| 패키지 매니저 | npm (`package-lock.json`) |

## 폴더 구조

```
src/
├─ proxy.ts                  # (구 middleware.ts) 요청마다 세션 갱신 + /admin 로그인 체크
├─ theme.ts                  # MUI 테마 (색상, 폰트, 컴포넌트 기본값)
├─ types/database.ts         # Supabase 생성 타입 (Database, Tables<>)
│
├─ app/                      # 라우트 = 화면
│  ├─ layout.tsx             # 루트 레이아웃: html/body, 폰트, MUI 프로바이더만
│  ├─ not-found.tsx          # 404 (SiteShell로 헤더/푸터 포함)
│  ├─ (site)/                # 홈페이지 그룹 - 주소에 (site)는 안 붙음
│  │  ├─ layout.tsx          # SiteShell: Header + Footer
│  │  ├─ page.tsx            # 홈: 배너 + 최근 글(공지, 자유게시판)
│  │  ├─ [section]/[slug]/
│  │  │  ├─ page.tsx         # 메뉴 페이지 (/about/intro, /community/free ...)
│  │  │  └─ [postId]/page.tsx  # 게시글 상세
│  │  └─ login/
│  │     ├─ page.tsx         # 로그인 화면
│  │     ├─ LoginForm.tsx    # "use client" 폼 (useActionState)
│  │     └─ actions.ts       # "use server" signIn / signOut
│  └─ admin/                 # 관리자 (/admin/...)
│     ├─ layout.tsx          # 상단바 + 왼쪽 사이드바 (권한 검사 안 함, 아래 참고)
│     ├─ page.tsx            # 대시보드
│     ├─ menus/              # 메뉴 관리 (TODO)
│     ├─ permissions/        # 메뉴별 권한 (TODO)
│     ├─ posts/              # 게시글 관리 (TODO)
│     └─ members/            # 회원 관리 (TODO)
│
├─ components/
│  ├─ layout/                # SiteShell, Header, Footer, MobileNav, AuthButtons
│  ├─ admin/                 # AdminPage(권한 검사 틀), AdminNav, AdminMobileNav, AdminUser, navItems
│  ├─ board/                 # BoardList, BoardPagination, PageContent, PageHeader, Loading, EmptyMessage
│  └─ ui/NextLink.tsx        # MUI component prop에 넘기는 next/link 래퍼
│
└─ lib/                      # 서버 로직 (BE 역할, 대부분 import "server-only")
   ├─ auth.ts                # getCurrentUser (요청당 1회 cache), requireAdmin
   ├─ menus.ts               # getMenuTree, getMenuByPath ("use cache", tag: menus)
   ├─ posts.ts               # getPosts, getPost, getPageContent, increaseViewCount, getAuthorNames
   ├─ format.ts              # formatDate (Asia/Seoul)
   └─ supabase/
      ├─ env.ts              # URL / PUBLISHABLE_KEY 읽기 (없으면 즉시 에러)
      ├─ server.ts           # 쿠키 기반 서버 클라이언트 (로그인 사용자 기준 RLS)
      ├─ public.ts           # 쿠키 없는 클라이언트 (캐시 가능한 공용 데이터용)
      ├─ client.ts           # 브라우저 클라이언트
      └─ proxy.ts            # updateSession: 토큰 갱신, /admin 비로그인 → /login
```

## FE / BE 경계

별도 API 계층(`route.ts` + axios 서비스)을 두지 않습니다. 경계는 파일 단위입니다.

| 역할 | 위치 | 규칙 |
|---|---|---|
| 화면 (서버) | `app/**/page.tsx`, `components/**` (기본) | 데이터는 `src/lib` 함수로만 가져옴. Supabase 직접 호출 X |
| 화면 (클라이언트) | `"use client"` 파일 (LoginForm, MobileNav 등) | 입력, 상태, 인터랙션만 |
| 쓰기 진입점 | `app/**/actions.ts` (`"use server"`) | 폼 파싱, 검증, `redirect`만. 로직이 커지면 `src/lib`으로 |
| 데이터 접근 (DAL) | `src/lib/*.ts` (`import "server-only"`) | Supabase 쿼리, 권한 확인. 실제 BE 로직은 여기 |

`route.ts`(Route Handler)는 외부 클라이언트(모바일 앱, 웹훅 등)가 필요할 때만 추가하고,
그때도 `src/lib` 함수를 호출하는 얇은 진입점으로 만듭니다.

## 라우팅

- 메뉴 주소는 DB `menus`의 slug로 결정됩니다: `/{그룹 slug}/{메뉴 slug}`
- `[section]/[slug]/page.tsx` 하나가 모든 메뉴를 처리하고 `menu_type`에 따라 본문을 바꿉니다.
  - `page` → `PageContent` (해당 메뉴의 최신 글 1개를 본문으로)
  - `board` → `BoardList` (`?page=` 페이지네이션, 15개씩)
  - `gallery`, `sermon` → 지금은 목록으로 표시 (TODO: 전용 화면)
- `generateStaticParams`로 메뉴 주소를 미리 만들고, 권한에 따라 달라지는 본문은 `Suspense` 안에서 요청 시 렌더링합니다.

## 데이터 / 캐시

- **메뉴**: 모든 방문자에게 같으므로 `public.ts` 클라이언트 + `"use cache"`, `cacheTag("menus")`, `cacheLife("hours")`.
  관리자에서 메뉴를 바꾸면 `revalidateTag("menus")` 필요.
- **게시글**: 읽기 권한을 RLS가 판단하므로 `server.ts`(쿠키) 클라이언트로 읽고 캐시하지 않습니다.
- **현재 사용자**: `getCurrentUser`는 React `cache`로 요청당 한 번만 조회.

## 인증 / 권한

1. `login/actions.ts`의 `signIn` → `supabase.auth.signInWithPassword` → 쿠키 저장 → `next` 경로로 redirect (내부 경로만 허용)
2. `src/proxy.ts` → `updateSession`이 매 요청 `getClaims()`로 토큰 갱신
3. `/admin`: proxy에서 비로그인 차단 → 페이지에서 `requireAdmin()`으로 관리자 여부 재확인
   - 관리자 페이지는 `<AdminPage title="...">`로 감쌉니다. children은 `requireAdmin()` 통과 후에만 그려집니다.
     page 함수 본문(AdminPage 밖)에서 데이터를 조회하면 검사를 우회하니 조회는 children 컴포넌트 안에서 합니다.
   - `admin/layout.tsx`에서는 권한 검사를 하지 않습니다 (레이아웃은 페이지 이동 시 다시 실행되지 않음).
   - 관리자 Server Action은 첫 줄에서 반드시 `await requireAdmin()`.
   - 새 관리자 화면: `app/admin/<이름>/page.tsx` 추가 + `components/admin/navItems.ts`에 한 줄 추가
4. 역할: `profiles.role_id → roles.code` (`admin` / `member` / `guest`)
5. 메뉴별 읽기/쓰기/관리 권한: `menu_roles` (RLS에서 사용)

## DB 테이블 (Supabase public)

| 테이블 | 용도 | 주요 컬럼 |
|---|---|---|
| `menus` | 메뉴 트리 | `parent_id`, `slug`, `menu_type`, `sort_order`, `is_visible` |
| `roles` | 역할 | `code`, `name`, `is_editable` |
| `menu_roles` | 메뉴별 권한 | `menu_id`, `role_id`, `can_read`, `can_write`, `can_admin` |
| `profiles` | 회원 (auth.users 1:1) | `id`, `name`, `role_id` |
| `posts` | 게시글 / 페이지 본문 | `menu_id`, `title`, `content`, `is_notice`, `view_count`, `user_id` |
| `post_meta` | 게시글 부가정보 | `post_id`, `meta_key`, `meta_value` |
| `comments` | 댓글 | `post_id`, `parent_id`, `user_id`, `content` |
| `files` | 첨부파일 | `post_id`, `storage_key`, `original_name`, `mime_type`, `size` |
| `site_settings` | 사이트 설정 | `setting_key`, `setting_value` |

RPC: `increment_post_view(p_post_id)`

## 환경 변수 (`.env.local`)

```
NEXT_PUBLIC_SUPABASE_URL=https://<project-id>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

- Publishable key만 사용합니다. `sb_secret_...` 키는 `NEXT_PUBLIC_`에 절대 넣지 않습니다.
- `.env` 변경 후에는 dev 서버를 재시작해야 반영됩니다.

## 남은 작업 (코드 내 TODO)

- 관리자: 메뉴 관리, 메뉴별 권한, 회원 권한 변경
- 회원가입 페이지 (약관 새로 작성)
- 게시글 작성/수정, 에디터 + HTML 렌더링
- gallery / sermon 전용 화면
- 홈 배너 이미지, 교회 소개 문구
- `menus.ts`, `posts.ts`에서 Supabase 에러 객체를 그대로 throw → `new Error(...)`로 감싸기 (원인이 브라우저에 `{message: ..., hint: ...}`로만 보이는 문제)
