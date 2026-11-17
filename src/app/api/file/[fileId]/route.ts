import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { r2 } from '@/lib/r2'
import { DeleteObjectCommand } from '@aws-sdk/client-s3'

// 파일 삭제 (R2 + DB)
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ fileId: string }> }
) {
  try {
    const { fileId } = await params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ success: false, message: '인증이 필요합니다.' }, { status: 401 })
    }

    const { data: file, error: fetchError } = await supabase
      .from('wr_file')
      .select('directory, physical_name, user_id')
      .eq('file_id', fileId)
      .single()

    if (fetchError || !file) {
      return NextResponse.json({ success: false, message: '파일을 찾을 수 없습니다.' }, { status: 404 })
    }

    // R2에서 삭제
    const key = `${file.directory}/${file.physical_name}`
    await r2.send(
      new DeleteObjectCommand({
        Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME!,
        Key: key,
      })
    )

    // DB에서 삭제
    const { error } = await supabase.from('wr_file').delete().eq('file_id', fileId)

    if (error) throw error

    return NextResponse.json({ success: true, message: '파일이 삭제되었습니다.' })
  } catch {
    return NextResponse.json(
      { success: false, message: '파일 삭제 중 오류가 발생하였습니다.' },
      { status: 500 }
    )
  }
}
