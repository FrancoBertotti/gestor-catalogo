export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { logout } from '@/app/login/actions'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100">
      <aside className="w-64 border-r border-zinc-800 bg-zinc-900/30 flex flex-col justify-between">
        <div className="p-6">
          <div className="text-xl font-bold tracking-wider text-white">CATÁLOGO ADMIN</div>
          <nav className="mt-8 flex flex-col space-y-1">
            <Link
              href="/admin"
              className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800/60 hover:text-white"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/products"
              className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800/60 hover:text-white"
            >
              Productos
            </Link>
            <Link
              href="/admin/categories"
              className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800/60 hover:text-white"
            >
              Categorías
            </Link>
            <Link
              href="/admin/materials"
              className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800/60 hover:text-white"
            >
              Materiales
            </Link>
          </nav>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-end border-b border-zinc-800 bg-zinc-900/30 px-8">
          <form action={logout}>
            <button
              type="submit"
              className="rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
            >
              Cerrar Sesión
            </button>
          </form>
        </header>

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  )
}
