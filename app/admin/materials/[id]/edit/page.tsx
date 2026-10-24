import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import MaterialForm from '../../_components/MaterialForm'
import { updateMaterial } from '../../actions'

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditMaterialPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: material } = await supabase.from('materials').select('*').eq('id', id).single()
  if (!material) notFound()

  const updateWithId = updateMaterial.bind(null, id)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Editar Material</h1>
        <p className="text-sm text-zinc-400 font-mono">{id}</p>
      </div>

      <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-900/50">
        <MaterialForm material={material} onSubmit={updateWithId} />
      </div>
    </div>
  )
}
