'use client'

import { useState, useTransition, FormEvent } from 'react'

type Category = { id: string; label: string }

type Props = {
  categories: Category[]
  onSubmit: (id: string, label: string, category_id: string) => Promise<void>
}

export default function NewSubcategoryForm({ categories, onSubmit }: Props) {
  const [isPending, startTransition] = useTransition()
  const [form, setForm] = useState({
    id: '',
    label: '',
    category_id: categories[0]?.id || '',
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      await onSubmit(form.id, form.label, form.category_id)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-2">ID</label>
        <input
          type="text"
          required
          value={form.id}
          onChange={(e) => setForm({ ...form, id: e.target.value })}
          placeholder="ej: gaming-est"
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
          placeholder="ej: gaming & tech"
          className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-zinc-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-2">Categoría</label>
        <select
          value={form.category_id}
          onChange={(e) => setForm({ ...form, category_id: e.target.value })}
          className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-zinc-500"
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.label}</option>
          ))}
        </select>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2 bg-zinc-100 hover:bg-white text-zinc-950 font-medium rounded-lg transition disabled:opacity-50"
        >
          {isPending ? 'Guardando...' : 'Crear Subcategoría'}
        </button>
      </div>
    </form>
  )
}
