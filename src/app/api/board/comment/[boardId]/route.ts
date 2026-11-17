import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// 댓글 목록 조회
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ boardId: string }> }
) {
  try {
    const { boardId } = await params
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('wr_comment')
      .select('*')
      .eq('board_id', boardId)
      .order('created_at', { ascending: true })

    if (error) throw error

    return NextResponse.json({ success: true, data: data ?? [] })
  } catch {
    return NextResponse.json(
      { success: false, message: '댓글 목록 조회 중 오류가 발생하였습니다.' },
      { status: 500 }
    )
  }
}
