import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// 댓글 등록
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ success: false, message: '인증이 필요합니다.' }, { status: 401 })
    }

    const { boardId, content, parentId } = await request.json()

    const { error } = await supabase.from('wr_comment').insert({
      board_id: Number(boardId),
      comment_content: content,
      comment_parent: parentId ?? null,
      comment_user_id: user.id,
    })

    if (error) throw error

    return NextResponse.json({ success: true, message: '댓글이 등록되었습니다.' })
  } catch {
    return NextResponse.json(
      { success: false, message: '댓글 등록 중 오류가 발생하였습니다.' },
      { status: 500 }
    )
  }
}
