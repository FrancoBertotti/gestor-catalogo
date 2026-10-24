export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { logout } from '@/app/login/actions'
import { MobileDrawer } from './_components/MobileNav'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100">
      {/* Sidebar desktop */}
      <aside className="hidden md:flex w-64 border-r border-zinc-800 bg-zinc-900/40 flex-col justify-between shrink-0">
        <div className="p-6">
          <div className="text-xl font-bold tracking-wide text-indigo-400">Gestor Practical</div>
          <nav className="mt-8 flex flex-col space-y-1">
            <Link
              href="/admin"
              className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-indigo-600/20 hover:text-indigo-300"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/products"
              className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-indigo-600/20 hover:text-indigo-300"
            >
              Productos
            </Link>
            <Link
              href="/admin/categories"
              className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-indigo-600/20 hover:text-indigo-300"
            >
              Categorías
            </Link>
            <Link
              href="/admin/materials"
              className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-indigo-600/20 hover:text-indigo-300"
            >
              Materiales
            </Link>
          </nav>
        </div>
        <div className="p-6 border-t border-zinc-800">
          <form action={logout}>
            <button
              type="submit"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
            >
              Cerrar Sesión
            </button>
          </form>
        </div>
      </aside>

      <div className="flex flex-1 flex-col min-w-0">
        <header className="flex h-14 items-center justify-between border-b border-zinc-800 bg-zinc-900/40 px-4 md:px-8 shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile drawer toggle */}
            <MobileDrawer />
            <span className="md:hidden text-sm font-semibold text-indigo-400">Gestor Practical</span>
          </div>
          <form action={logout} className="hidden md:block">
            <button
              type="submit"
              className="rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
            >
              Cerrar Sesión
            </button>
          </form>
        </header>

        <main className="flex-1 overflow-auto p-4 md:p-8">{children}</main>
      </div>
    </div>
  )
}
