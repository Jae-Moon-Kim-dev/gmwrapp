import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name, gender, cel_num, birth_date, mem_agr1, mem_agr2 } = body

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: '이메일과 비밀번호를 입력해주세요.' },
        { status: 400 }
      )
    }

    const supabase = await createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, gender, cel_num, birth_date, mem_agr1, mem_agr2 },
      },
    })

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: true, message: '회원가입이 완료되었습니다.' },
      { status: 201 }
    )
  } catch {
    return NextResponse.json(
      { success: false, message: '회원가입 중 오류가 발생하였습니다.' },
      { status: 500 }
    )
  }
}
