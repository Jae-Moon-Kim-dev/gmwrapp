import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// 게시글 단건 조회
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ boardId: string }> }
) {
  try {
    const { boardId } = await params
    const supabase = await createClient()

    // 조회수 증가
    await supabase.rpc('increment_views', { board_id_param: Number(boardId) })

    const { data, error } = await supabase
      .from('wr_board')
      .select(`
        *,
        wr_file(file_id, actual_name, physical_name, directory, type, size)
      `)
      .eq('board_id', boardId)
      .single()

    if (error || !data) {
      return NextResponse.json({ success: false, message: '게시글을 찾을 수 없습니다.' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: {
        ...data,
        board_files: data.wr_file ?? [],
      },
    })
  } catch {
    return NextResponse.json(
      { success: false, message: '게시글 조회 중 오류가 발생하였습니다.' },
      { status: 500 }
    )
  }
}
