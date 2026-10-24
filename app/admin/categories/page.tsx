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

      {/* Categorías */}
      <section className="space-y-4">
        <div className="flex justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">categorías</h1>
            <p className="text-xs text-neutral-400 font-mono uppercase tracking-wider mt-0.5">Categorías principales</p>
          </div>
          <Link href="/admin/categories/new" className="px-4 py-2 bg-[#dc4a1b] hover:bg-[#f67043] text-white font-mono uppercase tracking-wider text-xs transition shadow-[0_0_20px_rgba(220,74,27,0.2)] hover:shadow-[0_0_20px_rgba(220,74,27,0.4)] shrink-0">
            + Nueva
          </Link>
        </div>

        {/* Mobile: cards */}
        <div className="flex flex-col gap-3 md:hidden">
          {categories?.map((cat) => (
            <div key={cat.id} className={`border border-neutral-800 bg-neutral-950 p-4 transition ${!cat.active ? 'opacity-50' : ''}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white">{cat.label}</p>
                  <p className="text-xs text-neutral-500 font-mono mt-0.5">{cat.id}</p>
                </div>
                <Toggle id={cat.id} active={cat.active} action={toggleCategoryActive} />
              </div>
              <div className="mt-3 pt-3 border-t border-neutral-800 flex gap-4">
                <Link href={`/admin/categories/${cat.id}/edit`} className="text-xs font-mono uppercase tracking-wider text-[#1bacdc] hover:text-[#afe1f1] transition">
                  editar
                </Link>
                <form action={deleteCategory.bind(null, cat.id)} className="inline">
                  <button type="submit" className="text-xs font-mono uppercase tracking-wider text-red-500 hover:text-red-400 transition">
                    eliminar
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: table */}
        <div className="hidden md:block border border-neutral-800 bg-neutral-950 overflow-hidden">
          <table className="w-full text-left text-sm text-neutral-300">
            <thead className="bg-black text-neutral-400 uppercase text-xs tracking-wider border-b border-neutral-800">
              <tr>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Label</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {categories?.map((cat) => (
                <tr key={cat.id} className={`transition ${cat.active ? 'hover:bg-neutral-900/50' : 'opacity-50 hover:bg-neutral-900/30'}`}>
                  <td className="px-4 py-3">
                    <Toggle id={cat.id} active={cat.active} action={toggleCategoryActive} />
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-neutral-400">{cat.id}</td>
                  <td className="px-4 py-3 text-white">{cat.label}</td>
                  <td className="px-4 py-3 text-right space-x-4">
                    <Link href={`/admin/categories/${cat.id}/edit`} className="text-[#1bacdc] hover:text-[#afe1f1] transition text-xs font-mono uppercase tracking-wider">
                      editar
                    </Link>
                    <form action={deleteCategory.bind(null, cat.id)} className="inline">
                      <button type="submit" className="text-red-500 hover:text-red-400 transition text-xs font-mono uppercase tracking-wider">eliminar</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Subcategorías */}
      <section className="space-y-4">
        <div className="flex justify-between items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-white">subcategorías</h2>
            <p className="text-xs text-neutral-400 font-mono uppercase tracking-wider mt-0.5">Asociadas a cada categoría</p>
          </div>
          <Link href="/admin/categories/subcategories/new" className="px-4 py-2 bg-[#dc4a1b] hover:bg-[#f67043] text-white font-mono uppercase tracking-wider text-xs transition shadow-[0_0_20px_rgba(220,74,27,0.2)] hover:shadow-[0_0_20px_rgba(220,74,27,0.4)] shrink-0">
            + Nueva
          </Link>
        </div>

        {/* Mobile: cards */}
        <div className="flex flex-col gap-3 md:hidden">
          {subcategories?.map((sub: any) => (
            <div key={sub.id} className={`border border-neutral-800 bg-neutral-950 p-4 transition ${!sub.active ? 'opacity-50' : ''}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white">{sub.label}</p>
                  <p className="text-xs text-neutral-400 mt-0.5">{sub.categories?.label || sub.category_id}</p>
                  <p className="text-xs text-neutral-500 font-mono mt-0.5">{sub.id}</p>
                </div>
                <Toggle id={sub.id} active={sub.active} action={toggleSubcategoryActive} />
              </div>
              <div className="mt-3 pt-3 border-t border-neutral-800 flex gap-4">
                <Link href={`/admin/categories/subcategories/${sub.id}/edit`} className="text-xs font-mono uppercase tracking-wider text-[#1bacdc] hover:text-[#afe1f1] transition">
                  editar
                </Link>
                <form action={deleteSubcategory.bind(null, sub.id)} className="inline">
                  <button type="submit" className="text-xs font-mono uppercase tracking-wider text-red-500 hover:text-red-400 transition">
                    eliminar
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: table */}
        <div className="hidden md:block border border-neutral-800 bg-neutral-950 overflow-hidden">
          <table className="w-full text-left text-sm text-neutral-300">
            <thead className="bg-black text-neutral-400 uppercase text-xs tracking-wider border-b border-neutral-800">
              <tr>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Label</th>
                <th className="px-4 py-3">Categoría</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {subcategories?.map((sub: any) => (
                <tr key={sub.id} className={`transition ${sub.active ? 'hover:bg-neutral-900/50' : 'opacity-50 hover:bg-neutral-900/30'}`}>
                  <td className="px-4 py-3">
                    <Toggle id={sub.id} active={sub.active} action={toggleSubcategoryActive} />
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-neutral-400">{sub.id}</td>
                  <td className="px-4 py-3 text-white">{sub.label}</td>
                  <td className="px-4 py-3 text-neutral-400">{sub.categories?.label || sub.category_id}</td>
                  <td className="px-4 py-3 text-right space-x-4">
                    <Link href={`/admin/categories/subcategories/${sub.id}/edit`} className="text-[#1bacdc] hover:text-[#afe1f1] transition text-xs font-mono uppercase tracking-wider">
                      editar
                    </Link>
                    <form action={deleteSubcategory.bind(null, sub.id)} className="inline">
                      <button type="submit" className="text-red-500 hover:text-red-400 transition text-xs font-mono uppercase tracking-wider">eliminar</button>
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
