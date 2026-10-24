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
    { name: 'Productos', value: productsCount ?? 0 },
    { name: 'Categorías', value: categoriesCount ?? 0 },
    { name: 'Subcategorías', value: subcategoriesCount ?? 0 },
    { name: 'Materiales', value: materialsCount ?? 0 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Dashboard</h1>
        <p className="text-sm text-zinc-400">Métricas generales del catálogo</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 shadow-sm backdrop-blur-sm"
          >
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              {stat.name}
            </p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-white">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
