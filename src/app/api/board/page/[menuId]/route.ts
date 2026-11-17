import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// 페이지형 게시판 내용 조회
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ menuId: string }> }
) {
  try {
    const { menuId } = await params
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('wr_board')
      .select('board_id, menu_id, board_type, board_content')
      .eq('menu_id', menuId)
      .eq('board_type', 'page')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (error) {
      return NextResponse.json({ success: false, message: '페이지 내용을 찾을 수 없습니다.' }, { status: 404 })
    }

    return NextResponse.json({ success: true, data })
  } catch {
    return NextResponse.json(
      { success: false, message: '페이지 조회 중 오류가 발생하였습니다.' },
      { status: 500 }
    )
  }
}

// 페이지형 게시판 내용 저장
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ menuId: string }> }
) {
  try {
    const { menuId } = await params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ success: false, message: '인증이 필요합니다.' }, { status: 401 })
    }

    const { content } = await request.json()

    // 기존 페이지가 있으면 업데이트, 없으면 삽입
    const { data: existing } = await supabase
      .from('wr_board')
      .select('board_id')
      .eq('menu_id', menuId)
      .eq('board_type', 'page')
      .limit(1)
      .single()

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
