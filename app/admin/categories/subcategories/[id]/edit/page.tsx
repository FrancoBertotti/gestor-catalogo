import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { updateSubcategory } from '../../../actions'
import EditSubcategoryForm from './_form'

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditSubcategoryPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const [{ data: sub }, { data: categories }] = await Promise.all([
    supabase.from('subcategories').select('label, category_id').eq('id', id).single(),
    supabase.from('categories').select('id, label').order('id'),
  ])

  if (!sub) notFound()

  const updateWithId = updateSubcategory.bind(null, id)

  return (
    <div className="space-y-6 max-w-lg">
      <div>
        <h1 className="text-2xl font-bold text-white">Editar Subcategoría</h1>
        <p className="text-sm text-zinc-400 font-mono">{id}</p>
      </div>

      <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-900/50">
        <EditSubcategoryForm
          label={sub.label}
          categoryId={sub.category_id}
          categories={categories || []}
          onSubmit={updateWithId}
        />
      </div>
    </div>
  )
}
