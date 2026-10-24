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
      <div className="flex justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">productos</h1>
          <p className="text-xs text-neutral-400 font-mono uppercase tracking-wider mt-0.5">Gestión del catálogo</p>
        </div>
        <Link
          href="/admin/products/new"
          className="px-4 py-2 bg-[#dc4a1b] hover:bg-[#f67043] text-white font-mono uppercase tracking-wider text-xs transition shadow-[0_0_20px_rgba(220,74,27,0.2)] hover:shadow-[0_0_20px_rgba(220,74,27,0.4)] shrink-0"
        >
          + Nuevo
        </Link>
      </div>

      {/* Mobile: cards */}
      <div className="flex flex-col gap-3 md:hidden">
        {products && products.length > 0 ? (
          products.map((product: any) => (
            <div
              key={product.id}
              className={`border border-neutral-800 bg-neutral-950 p-4 transition ${!product.active ? 'opacity-50' : ''}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white truncate">{product.title}</p>
                  <p className="text-xs text-neutral-400 mt-0.5">{product.categories?.label || '—'}</p>
                </div>
                <Toggle id={product.id} active={product.active} action={toggleProductActive} />
              </div>
              <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-neutral-400 font-mono">
                <span>precio: {product.price_min || '—'} / {product.price_max || '—'}</span>
                <span>lead: {product.lead_time_short || '—'}</span>
              </div>
              <div className="mt-3 pt-3 border-t border-neutral-800 flex gap-4">
                <Link
                  href={`/admin/products/${product.id}/edit`}
                  className="text-xs font-mono uppercase tracking-wider text-[#1bacdc] hover:text-[#afe1f1] transition"
                >
                  editar
                </Link>
                <form action={deleteProduct.bind(null, product.id, product.images || [])} className="inline">
                  <button type="submit" className="text-xs font-mono uppercase tracking-wider text-red-500 hover:text-red-400 transition">
                    eliminar
                  </button>
                </form>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-neutral-500 text-sm py-8">No se encontraron productos.</p>
        )}
      </div>

      {/* Desktop: table */}
      <div className="hidden md:block border border-neutral-800 bg-neutral-950 overflow-hidden">
        <table className="w-full text-left text-sm text-neutral-300">
          <thead className="bg-black text-neutral-400 uppercase text-xs tracking-wider border-b border-neutral-800">
            <tr>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Título</th>
              <th className="px-4 py-3">Categoría</th>
              <th className="px-4 py-3">Precio Mín / Máx</th>
              <th className="px-4 py-3">Lead Time</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {products && products.length > 0 ? (
              products.map((product: any) => (
                <tr key={product.id} className={`transition ${product.active ? 'hover:bg-neutral-900/50' : 'opacity-50 hover:bg-neutral-900/30'}`}>
                  <td className="px-4 py-3">
                    <Toggle id={product.id} active={product.active} action={toggleProductActive} />
                  </td>
                  <td className="px-4 py-3 font-medium text-white">{product.title}</td>
                  <td className="px-4 py-3">{product.categories?.label || '—'}</td>
                  <td className="px-4 py-3 font-mono text-xs">
                    {product.price_min || '—'} / {product.price_max || '—'}
                  </td>
                  <td className="px-4 py-3">{product.lead_time_short || '—'}</td>
                  <td className="px-4 py-3 text-right space-x-4">
                    <Link href={`/admin/products/${product.id}/edit`} className="text-[#1bacdc] hover:text-[#afe1f1] transition text-xs font-mono uppercase tracking-wider">
                      editar
                    </Link>
                    <form action={deleteProduct.bind(null, product.id, product.images || [])} className="inline">
                      <button type="submit" className="text-red-500 hover:text-red-400 transition text-xs font-mono uppercase tracking-wider">
                        eliminar
                      </button>
                    </form>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-neutral-500">
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
