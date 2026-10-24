export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { logout } from '@/app/login/actions'
import { MobileDrawer } from './_components/MobileNav'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar desktop */}
      <aside className="hidden md:flex w-64 flex-col justify-between bg-black border-r border-neutral-800 shrink-0">
        <div className="p-6">
          <div className="text-xl font-bold tracking-wide text-[#dc4a1b]">Gestor Practical</div>
          <nav className="mt-8 flex flex-col space-y-1">
            <Link
              href="/admin"
              className="px-3 py-2.5 text-sm font-medium text-[#1bacdc] hover:text-[#afe1f1] hover:bg-neutral-900 transition-colors lowercase block"
            >
              dashboard
            </Link>
            <Link
              href="/admin/products"
              className="px-3 py-2.5 text-sm font-medium text-[#1bacdc] hover:text-[#afe1f1] hover:bg-neutral-900 transition-colors lowercase block"
            >
              productos
            </Link>
            <Link
              href="/admin/categories"
              className="px-3 py-2.5 text-sm font-medium text-[#1bacdc] hover:text-[#afe1f1] hover:bg-neutral-900 transition-colors lowercase block"
            >
              categorías
            </Link>
            <Link
              href="/admin/materials"
              className="px-3 py-2.5 text-sm font-medium text-[#1bacdc] hover:text-[#afe1f1] hover:bg-neutral-900 transition-colors lowercase block"
            >
              materiales
            </Link>
          </nav>
        </div>
        <div className="p-6 border-t border-neutral-800">
          <form action={logout}>
            <button
              type="submit"
              className="w-full border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs font-mono uppercase tracking-wider text-neutral-300 hover:border-[#dc4a1b] hover:text-white transition-colors"
            >
              cerrar sesión
            </button>
          </form>
        </div>
      </aside>

      <div className="flex flex-1 flex-col min-w-0">
        {/* Header mobile */}
        <header className="flex md:hidden h-14 items-center justify-between border-b border-neutral-800 bg-black px-4 shrink-0">
          <span className="text-base font-bold text-[#dc4a1b]">Gestor Practical</span>
          <MobileDrawer />
        </header>

        <main className="flex-1 overflow-auto p-4 md:p-8 bg-[linear-gradient(to_right,#1f1f1f12_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f12_1px,transparent_1px)] bg-[size:4rem_4rem]">
          {children}
        </main>
      </div>
    </div>
  )
}
