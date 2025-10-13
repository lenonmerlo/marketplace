import type { ReactNode } from "react"
import { Link } from "react-router-dom"

type Props = {
  children: ReactNode
  to?: string
  active?: boolean
  icon?: ReactNode
}

export default function NavTab({ children, to = "#", active = false, icon }: Props) {
  return (
    <Link
      to={to}
      className={`h-9 px-4 rounded-[12px] inline-flex items-center gap-2
        ${active
          ? "bg-[var(--color-shape)] text-[var(--color-orange-base)]"
          : "text-[#3D3D3D] hover:bg-[var(--color-shape)]"
        }`}
    >
      {icon && <span className="opacity-70">{icon}</span>}
      <span className="text-sm font-medium">{children}</span>
    </Link>
  )
}
