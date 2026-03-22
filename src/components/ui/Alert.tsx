import { X, CheckCircle2, AlertTriangle, Info, XCircle } from 'lucide-react'
import clsx from 'clsx'
import { useState } from 'react'

type AlertVariant = 'info' | 'success' | 'warning' | 'danger'

interface AlertProps {
  variant?:     AlertVariant
  title?:       string
  children:     React.ReactNode
  dismissible?: boolean
  className?:   string
}

const config: Record<AlertVariant, { icon: React.ElementType; style: string }> = {
  info:    { icon: Info,          style: 'bg-accent/10  border-accent/30  text-accent'  },
  success: { icon: CheckCircle2,  style: 'bg-green-500/10 border-green-500/30 text-green-400' },
  warning: { icon: AlertTriangle, style: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400' },
  danger:  { icon: XCircle,       style: 'bg-red-500/10  border-red-500/30  text-red-400'  },
}

export function Alert({ variant = 'info', title, children, dismissible, className }: AlertProps) {
  const [visible, setVisible] = useState(true)
  if (!visible) return null
  const { icon: Icon, style } = config[variant]
  return (
    <div className={clsx('flex gap-3 p-4 rounded-xl border', style, className)}>
      <Icon size={18} className="flex-shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        {title && <p className="font-bold text-sm mb-0.5">{title}</p>}
        <div className="text-sm opacity-80">{children}</div>
      </div>
      {dismissible && (
        <button onClick={() => setVisible(false)} className="opacity-60 hover:opacity-100 flex-shrink-0">
          <X size={16} />
        </button>
      )}
    </div>
  )
}
