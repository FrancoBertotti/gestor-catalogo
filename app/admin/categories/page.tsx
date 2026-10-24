import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { deleteCategory, deleteSubcategory, toggleCategoryActive, toggleSubcategoryActive } from './actions'
import Toggle from '@/app/admin/_components/Toggle'

export default async function CategoriesPage() {
  const supabase = await createClient()

  const { data: categories } = await supabase.from('categories').select('*').order('id')
  const { data: subcategories } = await supabase
    .from('subcategories')
    .select('*, categories(label)')
    .order('id')

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Categorías</h1>
            <p className="text-sm text-zinc-400">Categorías principales del catálogo</p>
          </div>
          <Link href="/admin/categories/new" className="px-4 py-2 bg-zinc-100 hover:bg-white text-zinc-950 font-medium rounded-lg text-sm transition">
            Nueva Categoría
          </Link>
        </div>

        <div className="border border-zinc-800 rounded-lg overflow-hidden bg-zinc-900/50">
          <table className="w-full text-left text-sm text-zinc-300">
            <thead className="bg-zinc-900 text-zinc-400 uppercase text-xs border-b border-zinc-800">
              <tr>
                <th className="px-4 py-4">Estado</th>
                <th className="px-4 py-4">ID</th>
                <th className="px-4 py-4">Label</th>
                <th className="px-4 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {categories?.map((cat) => (
                <tr key={cat.id} className={`transition ${cat.active ? 'hover:bg-zinc-800/50' : 'opacity-50 hover:bg-zinc-800/30'}`}>
                  <td className="px-4 py-4">
                    <Toggle id={cat.id} active={cat.active} action={toggleCategoryActive} />
                  </td>
                  <td className="px-4 py-4 font-mono text-xs text-zinc-400">{cat.id}</td>
                  <td className="px-4 py-4 text-zinc-100">{cat.label}</td>
                  <td className="px-4 py-4 text-right space-x-3">
                    <Link href={`/admin/categories/${cat.id}/edit`} className="text-zinc-400 hover:text-zinc-100 transition">
                      Editar
                    </Link>
                    <form action={deleteCategory.bind(null, cat.id)} className="inline">
                      <button type="submit" className="text-red-400 hover:text-red-300 transition">Eliminar</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-white">Subcategorías</h2>
            <p className="text-sm text-zinc-400">Subcategorías asociadas a cada categoría</p>
          </div>
          <Link href="/admin/categories/subcategories/new" className="px-4 py-2 bg-zinc-100 hover:bg-white text-zinc-950 font-medium rounded-lg text-sm transition">
            Nueva Subcategoría
          </Link>
        </div>

        <div className="border border-zinc-800 rounded-lg overflow-hidden bg-zinc-900/50">
          <table className="w-full text-left text-sm text-zinc-300">
            <thead className="bg-zinc-900 text-zinc-400 uppercase text-xs border-b border-zinc-800">
              <tr>
                <th className="px-4 py-4">Estado</th>
                <th className="px-4 py-4">ID</th>
                <th className="px-4 py-4">Label</th>
                <th className="px-4 py-4">Categoría</th>
                <th className="px-4 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {subcategories?.map((sub: any) => (
                <tr key={sub.id} className={`transition ${sub.active ? 'hover:bg-zinc-800/50' : 'opacity-50 hover:bg-zinc-800/30'}`}>
                  <td className="px-4 py-4">
                    <Toggle id={sub.id} active={sub.active} action={toggleSubcategoryActive} />
                  </td>
                  <td className="px-4 py-4 font-mono text-xs text-zinc-400">{sub.id}</td>
                  <td className="px-4 py-4 text-zinc-100">{sub.label}</td>
                  <td className="px-4 py-4 text-zinc-400">{sub.categories?.label || sub.category_id}</td>
                  <td className="px-4 py-4 text-right space-x-3">
                    <Link href={`/admin/categories/subcategories/${sub.id}/edit`} className="text-zinc-400 hover:text-zinc-100 transition">
                      Editar
                    </Link>
                    <form action={deleteSubcategory.bind(null, sub.id)} className="inline">
                      <button type="submit" className="text-red-400 hover:text-red-300 transition">Eliminar</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
