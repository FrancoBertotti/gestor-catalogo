import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { deleteMaterial, toggleMaterialActive } from './actions'
import Toggle from '@/app/admin/_components/Toggle'

export default async function MaterialsPage() {
  const supabase = await createClient()
  const { data: materials } = await supabase.from('materials').select('*').order('id')

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Materiales</h1>
          <p className="text-sm text-zinc-400">Materiales disponibles para impresión 3D</p>
        </div>
        <Link href="/admin/materials/new" className="px-4 py-2 bg-zinc-100 hover:bg-white text-zinc-950 font-medium rounded-lg text-sm transition">
          Nuevo Material
        </Link>
      </div>

      <div className="border border-zinc-800 rounded-lg overflow-hidden bg-zinc-900/50">
        <table className="w-full text-left text-sm text-zinc-300">
          <thead className="bg-zinc-900 text-zinc-400 uppercase text-xs border-b border-zinc-800">
            <tr>
              <th className="px-4 py-4">Estado</th>
              <th className="px-4 py-4">ID</th>
              <th className="px-4 py-4">Nombre</th>
              <th className="px-4 py-4">Tipo</th>
              <th className="px-4 py-4">Colores</th>
              <th className="px-4 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {materials?.map((mat) => (
              <tr key={mat.id} className={`transition ${mat.active ? 'hover:bg-zinc-800/50' : 'opacity-50 hover:bg-zinc-800/30'}`}>
                <td className="px-4 py-4">
                  <Toggle id={mat.id} active={mat.active} action={toggleMaterialActive} />
                </td>
                <td className="px-4 py-4 font-mono text-xs text-zinc-400">{mat.id}</td>
                <td className="px-4 py-4 font-medium text-zinc-100">{mat.name}</td>
                <td className="px-4 py-4 text-zinc-400">{mat.type}</td>
                <td className="px-4 py-4">
                  <div className="flex gap-1">
                    {(mat.colors as any[])?.slice(0, 5).map((c, i) => (
                      <span key={i} title={c.name} className="w-4 h-4 rounded-full border border-zinc-700 inline-block" style={{ backgroundColor: c.hex }} />
                    ))}
                  </div>
                </td>
                <td className="px-4 py-4 text-right space-x-3">
                  <Link href={`/admin/materials/${mat.id}/edit`} className="text-zinc-400 hover:text-zinc-100 transition">
                    Editar
                  </Link>
                  <form action={deleteMaterial.bind(null, mat.id)} className="inline">
                    <button type="submit" className="text-red-400 hover:text-red-300 transition">Eliminar</button>
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
