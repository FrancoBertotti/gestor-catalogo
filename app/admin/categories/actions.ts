'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

async function requireAuth() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No autorizado')
  return supabase
}

export async function createCategory(id: string, label: string) {
  const supabase = await requireAuth()
  const { error } = await supabase.from('categories').insert([{ id, label, active: true }])
  if (error) throw new Error(error.message)
  revalidatePath('/admin/categories')
  redirect('/admin/categories')
}

export async function updateCategory(id: string, label: string) {
  const supabase = await requireAuth()
  const { error } = await supabase.from('categories').update({ label }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/categories')
  redirect('/admin/categories')
}

export async function toggleCategoryActive(id: string, currentActive: boolean) {
  const supabase = await requireAuth()
  const { error } = await supabase.from('categories').update({ active: !currentActive }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/categories')
}

export async function deleteCategory(id: string) {
  const supabase = await requireAuth()
  const { error } = await supabase.from('categories').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/categories')
  redirect('/admin/categories')
}

export async function createSubcategory(id: string, label: string, category_id: string) {
  const supabase = await requireAuth()
  const { error } = await supabase.from('subcategories').insert([{ id, label, category_id, active: true }])
  if (error) throw new Error(error.message)
  revalidatePath('/admin/categories')
  redirect('/admin/categories')
}

export async function updateSubcategory(id: string, label: string, category_id: string) {
  const supabase = await requireAuth()
  const { error } = await supabase.from('subcategories').update({ label, category_id }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/categories')
  redirect('/admin/categories')
}

export async function toggleSubcategoryActive(id: string, currentActive: boolean) {
  const supabase = await requireAuth()
  const { error } = await supabase.from('subcategories').update({ active: !currentActive }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/categories')
}

export async function deleteSubcategory(id: string) {
  const supabase = await requireAuth()
  const { error } = await supabase.from('subcategories').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/categories')
  redirect('/admin/categories')
}
