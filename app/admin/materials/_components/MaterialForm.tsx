'use client'

import { useState, useTransition, FormEvent } from 'react'
import type { MaterialInput } from '../actions'

type Color = { hex: string; name: string; inStock: boolean }

type Props = {
  material?: MaterialInput
  onSubmit: (data: MaterialInput) => Promise<void>
}

export default function MaterialForm({ material, onSubmit }: Props) {
  const [isPending, startTransition] = useTransition()

  const [form, setForm] = useState({
    id: material?.id || '',
    name: material?.name || '',
    type: material?.type || '',
    description: material?.description || '',
    active: material?.active ?? true,
  })

  const [features, setFeatures] = useState<string[]>(material?.features || [''])
  const [colors, setColors] = useState<Color[]>(
    material?.colors || [{ hex: '#ffffff', name: '', inStock: true }]
  )

  const addFeature = () => setFeatures([...features, ''])
  const removeFeature = (i: number) => setFeatures(features.filter((_, idx) => idx !== i))
  const updateFeature = (i: number, val: string) =>
    setFeatures(features.map((f, idx) => (idx === i ? val : f)))

  const addColor = () => setColors([...colors, { hex: '#ffffff', name: '', inStock: true }])
  const removeColor = (i: number) => setColors(colors.filter((_, idx) => idx !== i))
  const updateColor = (i: number, field: keyof Color, val: string | boolean) =>
    setColors(colors.map((c, idx) => (idx === i ? { ...c, [field]: val } : c)))

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      await onSubmit({
        ...form,
        features: features.filter(Boolean),
        colors,
        active: form.active,
      })
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {!material && (
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">ID</label>
            <input
              type="text"
              required
              value={form.id}
              onChange={(e) => setForm({ ...form, id: e.target.value })}
              placeholder="ej: pla-plus"
              className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-zinc-500"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Nombre</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-zinc-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Tipo</label>
          <input
            type="text"
            required
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            placeholder="ej: Bioplástico Rígido"
            className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-zinc-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-2">Descripción</label>
        <textarea
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-zinc-500"
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-zinc-300">Características</label>
          <button type="button" onClick={addFeature} className="text-xs text-zinc-400 hover:text-zinc-100 transition">
            + Agregar
          </button>
        </div>
        <div className="space-y-2">
          {features.map((feat, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="text"
                value={feat}
                onChange={(e) => updateFeature(i, e.target.value)}
                placeholder="ej: Ecológico / Biodegradable"
                className="flex-1 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-zinc-500"
              />
              <button
                type="button"
                onClick={() => removeFeature(i)}
                className="px-3 py-2 text-red-400 hover:text-red-300 transition"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-zinc-300">Colores</label>
          <button type="button" onClick={addColor} className="text-xs text-zinc-400 hover:text-zinc-100 transition">
            + Agregar
          </button>
        </div>
        <div className="space-y-2">
          {colors.map((color, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-zinc-900 border border-zinc-800 rounded-lg">
              <input
                type="color"
                value={color.hex}
                onChange={(e) => updateColor(i, 'hex', e.target.value)}
                className="w-10 h-10 rounded cursor-pointer border border-zinc-700 bg-transparent"
              />
              <input
                type="text"
                value={color.name}
                onChange={(e) => updateColor(i, 'name', e.target.value)}
                placeholder="Nombre del color"
                className="flex-1 px-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 text-sm focus:outline-none focus:border-zinc-500"
              />
              <label className="flex items-center gap-2 text-sm text-zinc-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={color.inStock}
                  onChange={(e) => updateColor(i, 'inStock', e.target.checked)}
                  className="accent-zinc-400"
                />
                En stock
              </label>
              <button
                type="button"
                onClick={() => removeColor(i)}
                className="text-red-400 hover:text-red-300 transition"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setForm({ ...form, active: !form.active })}
          className={`w-10 h-5 rounded-full transition-colors relative ${form.active ? 'bg-green-500' : 'bg-zinc-600'}`}
        >
          <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.active ? 'translate-x-5' : 'translate-x-0.5'}`} />
        </button>
        <label className="text-sm font-medium text-zinc-300">
          {form.active ? 'Activo (visible en la web)' : 'Inactivo (oculto en la web)'}
        </label>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2 bg-zinc-100 hover:bg-white text-zinc-950 font-medium rounded-lg transition disabled:opacity-50"
        >
          {isPending ? 'Guardando...' : material ? 'Actualizar Material' : 'Crear Material'}
        </button>
      </div>
    </form>
  )
}
