import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// 역할 수정
export async function PUT(
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

    const { role_name, description } = await request.json()

    const { error } = await supabase
      .from('wr_role')
      .update({ role_name, description, updated_at: new Date().toISOString() })
      .eq('role_id', id)

    if (error) throw error

    return NextResponse.json({ success: true, message: '역할이 수정되었습니다.' })
  } catch {
    return NextResponse.json(
      { success: false, message: '역할 수정 중 오류가 발생하였습니다.' },
      { status: 500 }
    )
  }
}

// 역할 삭제
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

    const { error } = await supabase.from('wr_role').delete().eq('role_id', id)

    if (error) throw error

    return NextResponse.json({ success: true, message: '역할이 삭제되었습니다.' })
  } catch {
    return NextResponse.json(
      { success: false, message: '역할 삭제 중 오류가 발생하였습니다.' },
      { status: 500 }
    )
  }
}
