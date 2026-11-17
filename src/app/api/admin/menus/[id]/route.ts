import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// 메뉴 단건 조회
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('wr_menu')
      .select('*')
      .eq('menu_id', id)
      .single()

    if (error || !data) {
      return NextResponse.json({ success: false, message: '메뉴를 찾을 수 없습니다.' }, { status: 404 })
    }

    return NextResponse.json({ success: true, data })
  } catch {
    return NextResponse.json(
      { success: false, message: '메뉴 조회 중 오류가 발생하였습니다.' },
      { status: 500 }
    )
  }
}

// 메뉴 수정
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ success: false, message: '인증이 필요합니다.' }, { status: 401 })
    }

    const body = await request.json()
    const { parent_menu_id, menu_type, menu_name, menu_url, visible_yn } = body

    const { error } = await supabase
      .from('wr_menu')
      .update({
        parent_menu_id: parent_menu_id ?? null,
        menu_type,
        menu_name,
        menu_url,
        visible_yn,
        updated_at: new Date().toISOString(),
      })
      .eq('menu_id', id)

    if (error) throw error

    return NextResponse.json({ success: true, message: '메뉴가 수정되었습니다.' })
  } catch {
    return NextResponse.json(
      { success: false, message: '메뉴 수정 중 오류가 발생하였습니다.' },
      { status: 500 }
    )
  }
}

// 메뉴 삭제
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ success: false, message: '인증이 필요합니다.' }, { status: 401 })
    }

    const { error } = await supabase.from('wr_menu').delete().eq('menu_id', id)

    if (error) throw error

    return NextResponse.json({ success: true, message: '메뉴가 삭제되었습니다.' })
  } catch {
    return NextResponse.json(
      { success: false, message: '메뉴 삭제 중 오류가 발생하였습니다.' },
      { status: 500 }
    )
  }
}
