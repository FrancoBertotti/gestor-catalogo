import MaterialForm from '../_components/MaterialForm'
import { createMaterial } from '../actions'

export default function NewMaterialPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Nuevo Material</h1>
        <p className="text-sm text-zinc-400">Agrega un material disponible para impresión</p>
      </div>

      <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-900/50">
        <MaterialForm onSubmit={createMaterial} />
      </div>
    </div>
  )
}
