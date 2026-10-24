import { createClient } from '@/lib/supabase/server'
import ProductForm from '../_components/ProductForm'
import { createProduct } from '../actions'

export default async function NewProductPage() {
  const supabase = await createClient()

  const { data: categories } = await supabase.from('categories').select('id, label')
  const { data: subcategories } = await supabase.from('subcategories').select('id, category_id, label')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Crear Producto</h1>
        <p className="text-sm text-zinc-400">Agrega un nuevo producto al catálogo</p>
      </div>

      <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-900/50">
        <ProductForm
          categories={categories || []}
          subcategories={subcategories || []}
          onSubmit={createProduct}
        />
      </div>
    </div>
  )
}
