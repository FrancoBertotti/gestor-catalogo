'use client'

import { useTransition, FormEvent, useState } from 'react'
import { createCategory } from '../actions'

export default function NewCategoryPage() {
  const [isPending, startTransition] = useTransition()
  const [form, setForm] = useState({ id: '', label: '' })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      await createCategory(form.id, form.label)
    })
  }

  return (
    <div className="space-y-6 max-w-lg">
      <div>
        <h1 className="text-2xl font-bold text-white">Nueva Categoría</h1>
        <p className="text-sm text-zinc-400">Creá una categoría principal del catálogo</p>
      </div>

      <form onSubmit={handleSubmit} className="border border-zinc-800 rounded-lg p-6 bg-zinc-900/50 space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">ID</label>
          <input
            type="text"
            required
            value={form.id}
            onChange={(e) => setForm({ ...form, id: e.target.value })}
            placeholder="ej: estandar"
            className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-zinc-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Label</label>
          <input
            type="text"
            required
            value={form.label}
            onChange={(e) => setForm({ ...form, label: e.target.value })}
            placeholder="ej: 1. catálogo estándar"
            className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-zinc-500"
          />
        </div>
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-2 bg-zinc-100 hover:bg-white text-zinc-950 font-medium rounded-lg transition disabled:opacity-50"
          >
            {isPending ? 'Guardando...' : 'Crear Categoría'}
          </button>
        </div>
      </form>
    </div>
  )
}
