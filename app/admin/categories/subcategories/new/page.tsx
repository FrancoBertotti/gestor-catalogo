import { createClient } from '@/lib/supabase/server'
import { createSubcategory } from '../../actions'
import NewSubcategoryForm from './_form'

export default async function NewSubcategoryPage() {
  const supabase = await createClient()
  const { data: categories } = await supabase.from('categories').select('id, label').order('id')

  return (
    <div className="space-y-6 max-w-lg">
      <div>
        <h1 className="text-2xl font-bold text-white">Nueva Subcategoría</h1>
        <p className="text-sm text-zinc-400">Creá una subcategoría asociada a una categoría</p>
      </div>

      <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-900/50">
        <NewSubcategoryForm categories={categories || []} onSubmit={createSubcategory} />
      </div>
    </div>
  )
}
