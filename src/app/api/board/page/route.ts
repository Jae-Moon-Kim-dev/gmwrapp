import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// 페이지형 게시판 내용 저장 (menuId는 body에서)
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ success: false, message: '인증이 필요합니다.' }, { status: 401 })
    }

    const { menuId, content } = await request.json()

    const { data: existing } = await supabase
      .from('wr_board')
      .select('board_id')
      .eq('menu_id', menuId)
      .eq('board_type', 'page')
      .limit(1)
      .maybeSingle()

    if (existing) {
      await supabase
        .from('wr_board')
        .update({ board_content: content, updated_at: new Date().toISOString() })
        .eq('board_id', existing.board_id)
    } else {
      await supabase.from('wr_board').insert({
        menu_id: Number(menuId),
        board_type: 'page',
        board_content: content,
        board_user_id: user.id,
      })
    }

    return NextResponse.json({ success: true, data: true })
  } catch {
    return NextResponse.json(
      { success: false, message: '페이지 저장 중 오류가 발생하였습니다.' },
      { status: 500 }
    )
  }
}
