import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: '이메일과 비밀번호를 입력해주세요.' },
        { status: 400 }
      )
    }

    const supabase = await createClient()
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      return NextResponse.json(
        { success: false, message: '이메일 또는 비밀번호가 일치하지 않습니다.' },
        { status: 401 }
      )
    }

    const { data: memberData } = await supabase
      .from('wr_member')
      .select('role_id')
      .eq('id', data.user.id)
      .single()

    const user = {
      id: data.user.id,
      name: data.user.user_metadata?.name ?? '',
      email: data.user.email,
      role_id: memberData?.role_id ?? 1,
    }

    return NextResponse.json({ success: true, data: user })
  } catch {
    return NextResponse.json(
      { success: false, message: '로그인 중 오류가 발생하였습니다.' },
      { status: 500 }
    )
  }
}
