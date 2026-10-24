'use client'

import { useOptimistic, useTransition } from 'react'

type Props = {
  id: string
  active: boolean
  action: (id: string, active: boolean) => Promise<void>
}

export default function Toggle({ id, active, action }: Props) {
  const [isPending, startTransition] = useTransition()
  const [optimisticActive, setOptimisticActive] = useOptimistic(active)

  const handleToggle = () => {
    startTransition(async () => {
      setOptimisticActive(!optimisticActive)
      await action(id, optimisticActive)
    })
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      title={optimisticActive ? 'Desactivar' : 'Activar'}
      className="p-2 -m-2 touch-manipulation"
      aria-label={optimisticActive ? 'Desactivar' : 'Activar'}
    >
      <div className={`w-12 h-6 rounded-full transition-colors duration-200 relative ${optimisticActive ? 'bg-green-500' : 'bg-zinc-600'}`}>
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${optimisticActive ? 'translate-x-6' : 'translate-x-0'}`}
        />
      </div>
    </button>
  )
}
