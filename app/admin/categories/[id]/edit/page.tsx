import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { updateCategory } from '../../actions'
import EditCategoryForm from './_form'

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditCategoryPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: category } = await supabase
    .from('categories')
    .select('id, label')
    .eq('id', id)
    .single()

  if (!category) notFound()

  const updateWithId = updateCategory.bind(null, id)

  return (
    <div className="space-y-6 max-w-lg">
      <div>
        <h1 className="text-2xl font-bold text-white">Editar Categoría</h1>
        <p className="text-sm text-zinc-400 font-mono">{id}</p>
      </div>

      <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-900/50">
        <EditCategoryForm label={category.label} onSubmit={updateWithId} />
      </div>
    </div>
  )
}
