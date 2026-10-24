'use client'

import { useActionState } from 'react'
import { login } from './actions'

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, null)

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-neutral-950 border border-neutral-800 p-8 space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-[#dc4a1b] tracking-tight">Gestor Practical</h1>
          <p className="text-neutral-400 text-xs font-mono uppercase tracking-wider">Panel de Administración</p>
        </div>

        {/* Info Supabase */}
        <div className="border border-[#1bacdc]/30 bg-[#1bacdc]/10 p-3 flex gap-2.5 items-start">
          <svg className="h-4 w-4 text-[#1bacdc] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-xs text-[#1bacdc] leading-relaxed font-mono">
            Ingresá con tu usuario de Supabase — el mismo email y contraseña que usás para acceder al panel de Supabase.
          </p>
        </div>

        <form action={formAction} className="space-y-4">
          {state?.error && (
            <div className="border border-red-500/30 bg-red-500/10 p-3 text-xs font-mono text-red-400">
              {state.error}
            </div>
          )}

          <div className="space-y-1">
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full bg-black border border-neutral-800 px-3 py-2 text-sm text-white placeholder-neutral-600 focus:border-[#dc4a1b] focus:outline-none focus:ring-1 focus:ring-[#dc4a1b]"
              placeholder="admin@ejemplo.com"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400">Contraseña</label>
            <input
              type="password"
              name="password"
              required
              className="w-full bg-black border border-neutral-800 px-3 py-2 text-sm text-white placeholder-neutral-600 focus:border-[#dc4a1b] focus:outline-none focus:ring-1 focus:ring-[#dc4a1b]"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-[#dc4a1b] hover:bg-[#f67043] text-white font-mono uppercase tracking-wider text-xs px-4 py-3 shadow-[0_0_20px_rgba(220,74,27,0.3)] hover:shadow-[0_0_20px_rgba(220,74,27,0.5)] transition-all disabled:opacity-50 mt-2"
          >
            {isPending ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  )
}
