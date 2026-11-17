import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { r2 } from '@/lib/r2'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { randomUUID } from 'crypto'
import path from 'path'

// 파일 업로드 (Cloudflare R2)
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ success: false, message: '인증이 필요합니다.' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const category = (formData.get('category') as string) ?? 'common'

    if (!file) {
      return NextResponse.json({ success: false, message: '파일이 없습니다.' }, { status: 400 })
    }

    const ext = path.extname(file.name)
    const physicalName = `${randomUUID()}${ext}`
    const directory = category
    const key = `${directory}/${physicalName}`

    const buffer = Buffer.from(await file.arrayBuffer())
    await r2.send(
      new PutObjectCommand({
        Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME!,
        Key: key,
        Body: buffer,
        ContentType: file.type,
      })
    )

    const { data, error } = await supabase
      .from('wr_file')
      .insert({
        category,
        directory,
        physical_name: physicalName,
        actual_name: file.name,
        type: file.type,
        size: file.size,
        user_id: user.id,
      })
      .select('file_id, physical_name, actual_name, directory')
      .single()

    if (error) throw error

    const publicUrl = `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${key}`

    return NextResponse.json({
      success: true,
      data: {
        ...data,
        url: publicUrl,
      },
    })
  } catch {
    return NextResponse.json(
      { success: false, message: '파일 업로드 중 오류가 발생하였습니다.' },
      { status: 500 }
    )
  }
}
