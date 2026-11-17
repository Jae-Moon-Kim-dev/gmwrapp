import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// 역할 목록 조회
export async function GET() {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('wr_role')
      .select('*')
      .order('role_id', { ascending: true })

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch {
    return NextResponse.json(
      { success: false, message: '역할 목록 조회 중 오류가 발생하였습니다.' },
      { status: 500 }
    )
  }
}

// 역할 등록
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ success: false, message: '인증이 필요합니다.' }, { status: 401 })
    }

    const { role_name, description } = await request.json()

    const { error } = await supabase.from('wr_role').insert({
      role_name,
      description,
      user_id: user.id,
    })

    if (error) throw error

    return NextResponse.json({ success: true, message: '역할이 등록되었습니다.' })
  } catch {
    return NextResponse.json(
      { success: false, message: '역할 등록 중 오류가 발생하였습니다.' },
      { status: 500 }
    )
  }
}
