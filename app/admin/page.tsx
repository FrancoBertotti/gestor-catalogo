import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  const [
    { count: productsCount },
    { count: categoriesCount },
    { count: subcategoriesCount },
    { count: materialsCount },
  ] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('categories').select('*', { count: 'exact', head: true }),
    supabase.from('subcategories').select('*', { count: 'exact', head: true }),
    supabase.from('materials').select('*', { count: 'exact', head: true }),
  ])

  const stats = [
    { name: 'Productos', value: productsCount ?? 0, href: '/admin/products' },
    { name: 'Categorías', value: categoriesCount ?? 0, href: '/admin/categories' },
    { name: 'Subcategorías', value: subcategoriesCount ?? 0, href: '/admin/categories#subcategorias' },
    { name: 'Materiales', value: materialsCount ?? 0, href: '/admin/materials' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Dashboard</h1>
        <p className="text-sm text-zinc-400">Métricas generales del catálogo</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            aria-label={`Ir a ${stat.name}`}
            className="group block rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 shadow-sm backdrop-blur-sm transition hover:border-[#dc4a1b] hover:bg-zinc-900/70 focus-visible:outline-none focus-visible:border-[#dc4a1b] active:scale-[0.99]"
          >
            <div className="flex items-start justify-between">
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 group-hover:text-zinc-300 transition-colors">
                {stat.name}
              </p>
              <span className="text-zinc-600 group-hover:text-[#f67043] transition-colors" aria-hidden="true">
                →
              </span>
            </div>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-white">
              {stat.value}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
