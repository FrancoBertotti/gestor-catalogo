import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { deleteMaterial, toggleMaterialActive } from './actions'
import Toggle from '@/app/admin/_components/Toggle'

export default async function MaterialsPage() {
  const supabase = await createClient()
  const { data: materials } = await supabase.from('materials').select('*').order('id')

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">materiales</h1>
          <p className="text-xs text-neutral-400 font-mono uppercase tracking-wider mt-0.5">Materiales disponibles</p>
        </div>
        <Link href="/admin/materials/new" className="px-4 py-2 bg-[#dc4a1b] hover:bg-[#f67043] text-white font-mono uppercase tracking-wider text-xs transition shadow-[0_0_20px_rgba(220,74,27,0.2)] hover:shadow-[0_0_20px_rgba(220,74,27,0.4)] shrink-0">
          + Nuevo
        </Link>
      </div>

      {/* Mobile: cards */}
      <div className="flex flex-col gap-3 md:hidden">
        {materials?.map((mat) => (
          <div key={mat.id} className={`border border-neutral-800 bg-neutral-950 p-4 transition ${!mat.active ? 'opacity-50' : ''}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white">{mat.name}</p>
                <p className="text-xs text-neutral-400 mt-0.5">{mat.type || '—'}</p>
              </div>
              <Toggle id={mat.id} active={mat.active} action={toggleMaterialActive} />
            </div>
            {(mat.colors as any[])?.length > 0 && (
              <div className="mt-2 flex gap-1 flex-wrap">
                {(mat.colors as any[]).slice(0, 8).map((c: any, i: number) => (
                  <span key={i} title={c.name} className="w-5 h-5 border border-neutral-700 inline-block" style={{ backgroundColor: c.hex }} />
                ))}
              </div>
            )}
            <div className="mt-3 pt-3 border-t border-neutral-800 flex gap-4">
              <Link href={`/admin/materials/${mat.id}/edit`} className="text-xs font-mono uppercase tracking-wider text-[#1bacdc] hover:text-[#afe1f1] transition">
                editar
              </Link>
              <form action={deleteMaterial.bind(null, mat.id)} className="inline">
                <button type="submit" className="text-xs font-mono uppercase tracking-wider text-red-500 hover:text-red-400 transition">
                  eliminar
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: table */}
      <div className="hidden md:block border border-neutral-800 bg-neutral-950 overflow-hidden">
        <table className="w-full text-left text-sm text-neutral-300">
          <thead className="bg-black text-neutral-400 uppercase text-xs tracking-wider border-b border-neutral-800">
            <tr>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Tipo</th>
              <th className="px-4 py-3">Colores</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {materials?.map((mat) => (
              <tr key={mat.id} className={`transition ${mat.active ? 'hover:bg-neutral-900/50' : 'opacity-50 hover:bg-neutral-900/30'}`}>
                <td className="px-4 py-3">
                  <Toggle id={mat.id} active={mat.active} action={toggleMaterialActive} />
                </td>
                <td className="px-4 py-3 font-mono text-xs text-neutral-400">{mat.id}</td>
                <td className="px-4 py-3 font-medium text-white">{mat.name}</td>
                <td className="px-4 py-3 text-neutral-400">{mat.type}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    {(mat.colors as any[])?.slice(0, 5).map((c: any, i: number) => (
                      <span key={i} title={c.name} className="w-4 h-4 border border-neutral-700 inline-block" style={{ backgroundColor: c.hex }} />
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3 text-right space-x-4">
                  <Link href={`/admin/materials/${mat.id}/edit`} className="text-[#1bacdc] hover:text-[#afe1f1] transition text-xs font-mono uppercase tracking-wider">
                    editar
                  </Link>
                  <form action={deleteMaterial.bind(null, mat.id)} className="inline">
                    <button type="submit" className="text-red-500 hover:text-red-400 transition text-xs font-mono uppercase tracking-wider">
                      eliminar
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
