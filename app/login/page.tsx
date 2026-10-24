'use client'

import { useActionState } from 'react'
import { login } from './actions'

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, null)

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 shadow-2xl backdrop-blur-xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-white">Gestor Practical</h1>
          <p className="mt-2 text-sm text-zinc-400">Panel de Administración</p>
        </div>

        {/* Info Supabase */}
        <div className="rounded-lg border border-indigo-500/30 bg-indigo-500/10 p-3 flex gap-2.5 items-start">
          <svg className="h-4 w-4 text-indigo-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-xs text-indigo-300 leading-relaxed">
            Ingresá con tu usuario de Supabase — el mismo email y contraseña que usás para acceder al panel de Supabase.
          </p>
        </div>

        <form action={formAction} className="space-y-6">
          {state?.error && (
            <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400">
              {state.error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium uppercase text-zinc-400">Email</label>
              <input
                type="email"
                name="email"
                required
                className="mt-1 block w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="admin@ejemplo.com"
              />
            </div>

            <div>
              <label className="block text-xs font-medium uppercase text-zinc-400">Contraseña</label>
              <input
                type="password"
                name="password"
                required
                className="mt-1 block w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-500 disabled:opacity-50"
          >
            {isPending ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  )
}
