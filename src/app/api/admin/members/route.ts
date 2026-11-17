import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// 멤버 목록 조회 (페이지네이션 + 검색)
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ success: false, message: '인증이 필요합니다.' }, { status: 401 })
    }

    const { pagination, searchQuery } = await request.json()
    const { pageIndex = 0, pageSize = 10 } = pagination ?? {}
    const { role_id, searchParam, searchText } = searchQuery ?? {}

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let query: any = supabase
      .from('wr_member')
      .select(`
        id,
        role_id,
        created_at,
        wr_role!inner(role_name)
      `, { count: 'exact' })

    if (role_id) {
      query = query.eq('role_id', role_id)
    }

    // searchParam, searchText는 auth.users.user_metadata 기반 검색 - 현재 미구현 (TODO)
    void searchParam
    void searchText

    const from = pageIndex * pageSize
    const to = from + pageSize - 1
    query = query.range(from, to)

    const { data, error, count } = await query

    if (error) throw error

    // auth.users의 user_metadata 정보는 service role 필요 - 기본 정보만 반환
    const memberList = (data ?? []).map((item: Record<string, unknown>, index: number) => ({
      chkMember: false,
      rownum: from + index + 1,
      id: item.id,
      role_id: item.role_id,
      role_name: (item.wr_role as Record<string, unknown>)?.role_name ?? '',
      created_at: item.created_at,
    }))

    return NextResponse.json({
      success: true,
      data: {
        member_list: memberList,
        total_cnt: count ?? 0,
      },
    })
  } catch {
    return NextResponse.json(
      { success: false, message: '멤버 목록 조회 중 오류가 발생하였습니다.' },
      { status: 500 }
    )
  }
}
