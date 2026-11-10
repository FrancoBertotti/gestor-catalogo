'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { parsePrice, validateProduct } from './validation'

export type ActionResult = { error?: string }

export type ProductInput = {
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

async function requireAuth() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No autorizado')
  return supabase
}

export async function createProduct(data: ProductInput): Promise<ActionResult> {
  const supabase = await requireAuth()

  const fieldErrors = validateProduct(data)
  if (Object.keys(fieldErrors).length > 0) {
    return { error: Object.values(fieldErrors)[0] }
  }

  const { error } = await supabase.from('products').insert([
    {
      title: data.title.trim(),
      description: data.description,
      price_min: parsePrice(data.price_min),
      price_max: parsePrice(data.price_max),
      lead_time_short: data.lead_time_short.trim(),
      type: data.type,
      category_id: data.category_id,
      subcategory_id: data.subcategory_id || null,
      images: data.images,
      active: data.active,
    },
  ])

  if (error) return { error: `Error al crear producto: ${error.message}` }

  revalidatePath('/admin/products')
  redirect('/admin/products')
}

export async function updateProduct(id: string, data: ProductInput): Promise<ActionResult> {
  const supabase = await requireAuth()

  const fieldErrors = validateProduct(data)
  if (Object.keys(fieldErrors).length > 0) {
    return { error: Object.values(fieldErrors)[0] }
  }

  const { error } = await supabase
    .from('products')
    .update({
      title: data.title.trim(),
      description: data.description,
      price_min: parsePrice(data.price_min),
      price_max: parsePrice(data.price_max),
      lead_time_short: data.lead_time_short.trim(),
      type: data.type,
      category_id: data.category_id,
      subcategory_id: data.subcategory_id || null,
      images: data.images,
      active: data.active,
    })
    .eq('id', id)

  if (error) return { error: `Error al actualizar producto: ${error.message}` }

  revalidatePath('/admin/products')
  redirect('/admin/products')
}

export async function toggleProductActive(id: string, currentActive: boolean) {
  const supabase = await requireAuth()
  const { error } = await supabase
    .from('products')
    .update({ active: !currentActive })
    .eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/products')
}

export async function deleteProduct(id: string, images: string[]) {
  const supabase = await requireAuth()

  if (images && images.length > 0) {
    const filePaths = images
      .map((url) => {
        const parts = url.split('/catalog-images/')
        return parts.length > 1 ? decodeURIComponent(parts[1]) : null
      })
      .filter((path): path is string => path !== null)

    if (filePaths.length > 0) {
      await supabase.storage.from('catalog-images').remove(filePaths)
    }
  }

  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) throw new Error(`Error al eliminar producto: ${error.message}`)

  revalidatePath('/admin/products')
  redirect('/admin/products')
}
