import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { deleteProduct, toggleProductActive } from './actions'
import Toggle from '@/app/admin/_components/Toggle'

export default async function ProductsPage() {
  const supabase = await createClient()

  const { data: products } = await supabase
    .from('products')
    .select('*, categories(label)')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Productos</h1>
          <p className="text-sm text-zinc-400">Gestión del catálogo de productos</p>
        </div>
        <Link
          href="/admin/products/new"
          className="px-4 py-2 bg-zinc-100 hover:bg-white text-zinc-950 font-medium rounded-lg text-sm transition"
        >
          Nuevo Producto
        </Link>
      </div>

      <div className="border border-zinc-800 rounded-lg overflow-hidden bg-zinc-900/50">
        <table className="w-full text-left text-sm text-zinc-300">
          <thead className="bg-zinc-900 text-zinc-400 uppercase text-xs border-b border-zinc-800">
            <tr>
              <th className="px-4 py-4">Estado</th>
              <th className="px-4 py-4">Título</th>
              <th className="px-4 py-4">Categoría</th>
              <th className="px-4 py-4">Precio Mín / Máx</th>
              <th className="px-4 py-4">Lead Time</th>
              <th className="px-4 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {products && products.length > 0 ? (
              products.map((product: any) => (
                <tr key={product.id} className={`transition ${product.active ? 'hover:bg-zinc-800/50' : 'opacity-50 hover:bg-zinc-800/30'}`}>
                  <td className="px-4 py-4">
                    <Toggle id={product.id} active={product.active} action={toggleProductActive} />
                  </td>
                  <td className="px-4 py-4 font-medium text-zinc-100">{product.title}</td>
                  <td className="px-4 py-4">{product.categories?.label || '-'}</td>
                  <td className="px-4 py-4">
                    {product.price_min || '-'} / {product.price_max || '-'}
                  </td>
                  <td className="px-4 py-4">{product.lead_time_short || '-'}</td>
                  <td className="px-4 py-4 text-right space-x-3">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="text-zinc-400 hover:text-zinc-100 transition"
                    >
                      Editar
                    </Link>
                    <form
                      action={deleteProduct.bind(null, product.id, product.images || [])}
                      className="inline"
                    >
                      <button type="submit" className="text-red-400 hover:text-red-300 transition">
                        Eliminar
                      </button>
                    </form>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-zinc-500">
                  No se encontraron productos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
