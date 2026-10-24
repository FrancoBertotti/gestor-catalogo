import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import ProductForm from '../../_components/ProductForm'
import { updateProduct } from '../../actions'

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (!product) notFound()

  const { data: categories } = await supabase.from('categories').select('id, label')
  const { data: subcategories } = await supabase.from('subcategories').select('id, category_id, label')

  const updateProductWithId = updateProduct.bind(null, id)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Editar Producto</h1>
        <p className="text-sm text-zinc-400">Modifica los datos del producto</p>
      </div>

      <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-900/50">
        <ProductForm
          product={product}
          categories={categories || []}
          subcategories={subcategories || []}
          onSubmit={updateProductWithId}
        />
      </div>
    </div>
  )
}
