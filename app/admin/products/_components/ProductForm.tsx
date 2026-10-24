'use client'

import { useState, useTransition, ChangeEvent, FormEvent } from 'react'
import { createClient } from '@/lib/supabase/client'

export type Category = {
  id: string
  label: string
}

export type Subcategory = {
  id: string
  category_id: string
  label: string
}

export type Product = {
  id: string
  title: string
  description: string
  price_min: string
  price_max: string
  lead_time_short: string
  type: string
  category_id: string
  subcategory_id: string
  images: string[]
  active: boolean
}

type ProductFormProps = {
  product?: Product
  categories: Category[]
  subcategories: Subcategory[]
  onSubmit: (data: any) => Promise<void>
}

export default function ProductForm({
  product,
  categories,
  subcategories,
  onSubmit,
}: ProductFormProps) {
  const [isPending, startTransition] = useTransition()
  const [isUploading, setIsUploading] = useState(false)

  const [formData, setFormData] = useState({
    title: product?.title || '',
    description: product?.description || '',
    price_min: product?.price_min || '',
    price_max: product?.price_max || '',
    lead_time_short: product?.lead_time_short || '',
    type: product?.type || 'estandar',
    category_id: product?.category_id || (categories[0]?.id || ''),
    subcategory_id: product?.subcategory_id || '',
    active: product?.active ?? true,
  })

  const [images, setImages] = useState<string[]>(product?.images || [])

  const filteredSubcategories = subcategories.filter(
    (sub) => sub.category_id === formData.category_id
  )

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      category_id: e.target.value,
      subcategory_id: '',
    }))
  }

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)
    const supabase = createClient()
    const newImageUrls: string[] = []

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`

        const { error: uploadError } = await supabase.storage
          .from('catalog-images')
          .upload(fileName, file)

        if (uploadError) {
          console.error('Error subiendo imagen:', uploadError.message)
          continue
        }

        const { data } = supabase.storage.from('catalog-images').getPublicUrl(fileName)

        if (data?.publicUrl) {
          newImageUrls.push(data.publicUrl)
        }
      }

      setImages((prev) => [...prev, ...newImageUrls])
    } catch (error) {
      console.error('Error en carga de archivos:', error)
    } finally {
      setIsUploading(false)
      e.target.value = ''
    }
  }

  const handleRemoveImage = (urlToRemove: string) => {
    setImages((prev) => prev.filter((url) => url !== urlToRemove))
  }

  const handleSetMain = (url: string) => {
    setImages((prev) => [url, ...prev.filter((u) => u !== url)])
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      await onSubmit({ ...formData, images })
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-zinc-300 mb-2">Título</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-zinc-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-zinc-300 mb-2">Descripción</label>
          <textarea
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-zinc-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Categoría</label>
          <select
            value={formData.category_id}
            onChange={handleCategoryChange}
            className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-zinc-500"
          >
            <option value="" disabled>Seleccionar categoría</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Subcategoría</label>
          <select
            value={formData.subcategory_id}
            onChange={(e) => setFormData({ ...formData, subcategory_id: e.target.value })}
            disabled={!formData.category_id || filteredSubcategories.length === 0}
            className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-zinc-500 disabled:opacity-50"
          >
            <option value="">Ninguna / Seleccionar</option>
            {filteredSubcategories.map((sub) => (
              <option key={sub.id} value={sub.id}>{sub.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Precio Mínimo</label>
          <input
            type="text"
            value={formData.price_min}
            onChange={(e) => setFormData({ ...formData, price_min: e.target.value })}
            className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-zinc-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Precio Máximo</label>
          <input
            type="text"
            value={formData.price_max}
            onChange={(e) => setFormData({ ...formData, price_max: e.target.value })}
            className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-zinc-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Tiempo de Entrega</label>
          <input
            type="text"
            value={formData.lead_time_short}
            onChange={(e) => setFormData({ ...formData, lead_time_short: e.target.value })}
            className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-zinc-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Tipo</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-zinc-500"
          >
            <option value="estandar">Estándar</option>
            <option value="personalizable">Personalizable</option>
            <option value="servicios">Servicios</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, active: !formData.active })}
            className={`w-10 h-5 rounded-full transition-colors relative ${formData.active ? 'bg-green-500' : 'bg-zinc-600'}`}
          >
            <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${formData.active ? 'translate-x-5' : 'translate-x-0.5'}`} />
          </button>
          <label className="text-sm font-medium text-zinc-300">
            {formData.active ? 'Activo (visible en la web)' : 'Inactivo (oculto en la web)'}
          </label>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-zinc-300 mb-2">Imágenes</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            disabled={isUploading}
            className="w-full text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-zinc-800 file:text-zinc-200 hover:file:bg-zinc-700 cursor-pointer disabled:opacity-50"
          />
          {isUploading && (
            <p className="text-xs text-zinc-400 mt-2">Subiendo imágenes...</p>
          )}

          {images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              {images.map((url, index) => (
                <div
                  key={index}
                  className={`relative group border rounded-lg overflow-hidden bg-zinc-900 aspect-square ${index === 0 ? 'border-zinc-400' : 'border-zinc-800'}`}
                >
                  <img
                    src={url}
                    alt={`Preview ${index}`}
                    className="w-full h-full object-cover"
                  />
                  {index === 0 && (
                    <span className="absolute top-2 left-2 bg-zinc-900/90 text-zinc-100 text-xs px-2 py-0.5 rounded font-medium">
                      Principal
                    </span>
                  )}
                  {index !== 0 && (
                    <button
                      type="button"
                      onClick={() => handleSetMain(url)}
                      className="absolute top-2 left-2 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs px-2 py-0.5 rounded transition opacity-0 group-hover:opacity-100"
                    >
                      Principal
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(url)}
                    className="absolute top-2 right-2 bg-red-600/80 hover:bg-red-600 text-white text-xs px-2 py-1 rounded transition"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isPending || isUploading}
          className="px-6 py-2 bg-zinc-100 hover:bg-white text-zinc-950 font-medium rounded-lg transition disabled:opacity-50"
        >
          {isPending ? 'Guardando...' : product ? 'Actualizar Producto' : 'Crear Producto'}
        </button>
      </div>
    </form>
  )
}
