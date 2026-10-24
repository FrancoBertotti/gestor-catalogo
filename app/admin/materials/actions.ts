'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export type MaterialInput = {
  id: string
  name: string
  type: string
  description: string
  features: string[]
  colors: { hex: string; name: string; inStock: boolean }[]
  active: boolean
}

async function requireAuth() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No autorizado')
  return supabase
}

export async function createMaterial(data: MaterialInput) {
  const supabase = await requireAuth()
  const { error } = await supabase.from('materials').insert([data])
  if (error) throw new Error(error.message)
  revalidatePath('/admin/materials')
  redirect('/admin/materials')
}

export async function updateMaterial(id: string, data: Omit<MaterialInput, 'id'>) {
  const supabase = await requireAuth()
  const { error } = await supabase.from('materials').update(data).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/materials')
  redirect('/admin/materials')
}

export async function toggleMaterialActive(id: string, currentActive: boolean) {
  const supabase = await requireAuth()
  const { error } = await supabase.from('materials').update({ active: !currentActive }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/materials')
}

export async function deleteMaterial(id: string) {
  const supabase = await requireAuth()
  const { error } = await supabase.from('materials').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/materials')
  redirect('/admin/materials')
}
