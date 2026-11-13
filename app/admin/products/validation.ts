// Validación compartida entre el formulario (cliente) y las actions (servidor).
// No lleva 'use server' para poder importarse desde ambos lados.

export type ProductFormValues = {
  title: string
  price_min: string
  price_max: string
  lead_time_short: string
  category_id: string
}

export type FieldErrors = Partial<Record<keyof ProductFormValues, string>>

/** Convierte "1.234,50" / "12,5" / "12.5" a número. Devuelve null si está vacío o es inválido. */
export function parsePrice(value: string | number | null | undefined): number | null {
  if (typeof value === 'number') return Number.isFinite(value) ? value : null
  const raw = (value ?? '').trim()
  if (raw === '') return null
  const normalized = raw.includes(',')
    ? raw.replace(/\./g, '').replace(',', '.')
    : raw
  const n = Number(normalized)
  return Number.isFinite(n) ? n : null
}

export function validateProduct(values: ProductFormValues): FieldErrors {
  const errors: FieldErrors = {}

  if (!values.title.trim()) {
    errors.title = 'El título es obligatorio. Completalo para continuar.'
  }

  if (!values.category_id) {
    errors.category_id = 'Seleccioná una categoría para continuar.'
  }

  const min = parsePrice(values.price_min)
  if (values.price_min.trim() === '') {
    errors.price_min = 'El precio mínimo es obligatorio. Completalo para continuar.'
  } else if (min === null || min < 0) {
    errors.price_min = 'Ingresá un precio válido (solo números, sin letras).'
  }

  if (values.price_max.trim() !== '') {
    const max = parsePrice(values.price_max)
    if (max === null || max < 0) {
      errors.price_max = 'Ingresá un precio válido (solo números, sin letras).'
    } else if (min !== null && max < min) {
      errors.price_max = 'El precio máximo no puede ser menor al mínimo.'
    }
  }

  if (!values.lead_time_short.trim()) {
    errors.lead_time_short = 'El tiempo de entrega es obligatorio. Completalo para continuar.'
  }

  return errors
}
