'use client'

import { useState, useTransition, ChangeEvent, FormEvent } from 'react'
import { createClient } from '@/lib/supabase/client'
import { validateProduct, type FieldErrors } from '../validation'

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
  onSubmit: (data: any) => Promise<{ error?: string } | void>
}

export default function ProductForm({
  product,
  categories,
  subcategories,
  onSubmit,
}: ProductFormProps) {
  const [isPending, startTransition] = useTransition()
  const [isUploading, setIsUploading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

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

  // Tras el primer intento de envío, los errores se recalculan en vivo.
  const errors: FieldErrors = submitted ? validateProduct(formData) : {}

  const baseInput =
    'w-full px-4 py-2 bg-zinc-900 border rounded-lg text-zinc-100 focus:outline-none'
  const inputClass = (field: keyof FieldErrors) =>
    `${baseInput} ${errors[field] ? 'border-red-500 focus:border-red-400' : 'border-zinc-800 focus:border-zinc-500'}`
  const FieldError = ({ field }: { field: keyof FieldErrors }) =>
    errors[field] ? <p className="text-xs text-red-400 mt-1.5">{errors[field]}</p> : null
  const Required = () => <span className="text-red-400"> *</span>

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
    setSubmitted(true)
    setServerError(null)

    if (Object.keys(validateProduct(formData)).length > 0) {
      // Lleva al usuario al primer campo con error
      setTimeout(() => {
        document
          .querySelector('[data-invalid="true"]')
          ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 0)
      return
    }

    startTransition(async () => {
      const result = await onSubmit({ ...formData, images })
      if (result?.error) setServerError(result.error)
    })
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6 max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-zinc-300 mb-2">Título<Required /></label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className={inputClass('title')}
            data-invalid={errors.title ? 'true' : undefined}
          />
          <FieldError field="title" />
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
          <label className="block text-sm font-medium text-zinc-300 mb-2">Categoría<Required /></label>
          <select
            value={formData.category_id}
            onChange={handleCategoryChange}
            className={inputClass('category_id')}
            data-invalid={errors.category_id ? 'true' : undefined}
          >
            <option value="" disabled>Seleccionar categoría</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.label}</option>
            ))}
          </select>
          <FieldError field="category_id" />
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
          <label className="block text-sm font-medium text-zinc-300 mb-2">Precio Mínimo<Required /></label>
          <input
            type="text"
            value={formData.price_min}
            onChange={(e) => setFormData({ ...formData, price_min: e.target.value })}
            className={inputClass('price_min')}
            data-invalid={errors.price_min ? 'true' : undefined}
          />
          <FieldError field="price_min" />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Precio Máximo</label>
          <input
            type="text"
            value={formData.price_max}
            onChange={(e) => setFormData({ ...formData, price_max: e.target.value })}
            className={inputClass('price_max')}
            data-invalid={errors.price_max ? 'true' : undefined}
          />
          <FieldError field="price_max" />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Tiempo de Entrega<Required /></label>
          <input
            type="text"
            value={formData.lead_time_short}
            onChange={(e) => setFormData({ ...formData, lead_time_short: e.target.value })}
            className={inputClass('lead_time_short')}
            data-invalid={errors.lead_time_short ? 'true' : undefined}
          />
          <FieldError field="lead_time_short" />
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

        <div className="flex items-center gap-4">
          <button
            type="button"
            role="switch"
            aria-checked={formData.active}
            aria-label={formData.active ? 'Desactivar producto' : 'Activar producto'}
            onClick={() => setFormData({ ...formData, active: !formData.active })}
            className={`relative shrink-0 w-12 h-6 p-0 border-0 outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-zinc-400 ${formData.active ? 'bg-green-500' : 'bg-zinc-600'}`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white shadow-sm transition-transform duration-200 ${formData.active ? 'translate-x-6' : 'translate-x-0'}`}
            />
          </button>
          <span className="text-sm font-medium text-zinc-300">
            {formData.active ? 'Activo (visible en la web)' : 'Inactivo (oculto en la web)'}
          </span>
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
                  {index === 0 ? (
                    <span className="absolute bottom-0 inset-x-0 bg-[#dc4a1b] text-white text-xs text-center py-1.5 font-medium">
                      ★ Principal
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleSetMain(url)}
                      aria-label={`Marcar imagen ${index + 1} como principal`}
                      className="absolute bottom-0 inset-x-0 bg-zinc-900/90 hover:bg-zinc-800 active:bg-zinc-700 text-zinc-200 text-xs text-center py-2 transition touch-manipulation"
                    >
                      Hacer principal
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(url)}
                    aria-label={`Eliminar imagen ${index + 1}`}
                    className="absolute top-2 right-2 bg-red-600/90 hover:bg-red-600 text-white text-sm px-2.5 py-1.5 transition touch-manipulation"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {serverError && (
        <p className="text-sm text-red-400 border border-red-500/40 bg-red-500/10 rounded-lg px-4 py-3">
          {serverError}
        </p>
      )}

      {submitted && Object.keys(errors).length > 0 && (
        <p className="text-sm text-red-400">
          Revisá los campos marcados en rojo: hay datos obligatorios sin completar.
        </p>
      )}

      <p className="text-xs text-zinc-500">
        Los campos marcados con <span className="text-red-400">*</span> son obligatorios.
      </p>

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
