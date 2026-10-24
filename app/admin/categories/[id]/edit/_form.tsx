'use client'

import { useState, useTransition, FormEvent } from 'react'

type Props = {
  label: string
  onSubmit: (label: string) => Promise<void>
}

export default function EditCategoryForm({ label: initialLabel, onSubmit }: Props) {
  const [isPending, startTransition] = useTransition()
  const [label, setLabel] = useState(initialLabel)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      await onSubmit(label)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-2">Label</label>
        <input
          type="text"
          required
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-zinc-500"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2 bg-zinc-100 hover:bg-white text-zinc-950 font-medium rounded-lg transition disabled:opacity-50"
        >
          {isPending ? 'Guardando...' : 'Actualizar'}
        </button>
      </div>
    </form>
  )
}
