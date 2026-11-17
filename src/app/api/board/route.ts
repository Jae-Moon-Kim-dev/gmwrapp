import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// 게시글 목록 조회
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { menuId, pagination } = await request.json()
    const { pageIndex = 0, pageSize = 10 } = pagination ?? {}

    const from = pageIndex * pageSize
    const to = from + pageSize - 1

    const { data, error, count } = await supabase
      .from('wr_board')
      .select(`
        board_id,
        menu_id,
        board_type,
        board_title,
        board_user_id,
        views_count,
        like_count,
        noti_yn,
        admin_yn,
        created_at
      `, { count: 'exact' })
      .eq('menu_id', menuId)
      .order('noti_yn', { ascending: false })
      .order('created_at', { ascending: false })
      .range(from, to)

    if (error) throw error

    const boardList = (data ?? []).map((item, index) => ({
      rownum: from + index + 1,
      board_id: item.board_id,
      menu_id: item.menu_id,
      board_type: item.board_type,
      board_title: item.board_title,
      board_user_id: item.board_user_id,
      created_name: '',
      create_date: item.created_at,
      views_count: item.views_count,
      like_count: item.like_count,
    }))

    return NextResponse.json({
      success: true,
      data: {
        board_list: boardList,
        total_cnt: count ?? 0,
      },
    })
  } catch {
    return NextResponse.json(
      { success: false, message: '게시글 목록 조회 중 오류가 발생하였습니다.' },
      { status: 500 }
    )
  }
}
