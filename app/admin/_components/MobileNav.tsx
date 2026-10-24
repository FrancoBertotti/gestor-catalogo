'use client'

import { useState } from 'react'
import Link from 'next/link'
import { logout } from '@/app/login/actions'

const navLinks = [
  { href: '/admin', label: 'dashboard' },
  { href: '/admin/products', label: 'productos' },
  { href: '/admin/categories', label: 'categorías' },
  { href: '/admin/materials', label: 'materiales' },
]

export function MobileDrawer() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="p-2 text-neutral-300 hover:text-white border border-neutral-800 bg-neutral-950 transition-colors"
        aria-label="Abrir menú"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {open ? (
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {open && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40 bg-black/70"
            onClick={() => setOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed inset-y-0 left-0 z-50 w-64 bg-black border-r border-neutral-800 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-neutral-800">
              <span className="text-base font-bold text-[#dc4a1b]">Gestor Practical</span>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-white border border-neutral-800 transition-colors"
                aria-label="Cerrar menú"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex-1 p-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2.5 text-sm font-medium text-[#1bacdc] hover:text-[#afe1f1] hover:bg-neutral-900 transition-colors lowercase"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="p-4 border-t border-neutral-800">
              <form action={logout}>
                <button
                  type="submit"
                  className="w-full border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs font-mono uppercase tracking-wider text-neutral-300 hover:border-[#dc4a1b] hover:text-white transition-colors"
                >
                  cerrar sesión
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  )
}
