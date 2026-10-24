'use client'

import { useState } from 'react'
import Link from 'next/link'
import { logout } from '@/app/login/actions'

const navLinks = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/products', label: 'Productos' },
  { href: '/admin/categories', label: 'Categorías' },
  { href: '/admin/materials', label: 'Materiales' },
]

export function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="md:hidden rounded-lg p-2 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
      aria-label="Abrir menú"
    >
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  )
}

export function MobileDrawer() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="md:hidden rounded-lg p-2 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
        aria-label="Abrir menú"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {open && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={() => setOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed inset-y-0 left-0 z-50 w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col md:hidden">
            <div className="flex items-center justify-between p-4 border-b border-zinc-800">
              <span className="text-lg font-bold text-indigo-400">Gestor Practical</span>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
                aria-label="Cerrar menú"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex-1 p-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-indigo-600/20 hover:text-indigo-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="p-4 border-t border-zinc-800">
              <form action={logout}>
                <button
                  type="submit"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2 text-xs font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
                >
                  Cerrar Sesión
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  )
}
