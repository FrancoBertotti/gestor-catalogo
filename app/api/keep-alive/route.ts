import { createClient } from '@supabase/supabase-js'

// Evita que Supabase (plan gratuito) pause el proyecto por inactividad.
// Lo ejecuta Vercel Cron una vez por día (ver vercel.json).
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  if (request.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { error } = await supabase.from('products').select('id').limit(1)

  if (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 })
  }
  return Response.json({ ok: true, at: new Date().toISOString() })
}
