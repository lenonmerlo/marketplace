import { Navigate } from 'react-router-dom'
import type { PropsWithChildren } from 'react'

export default function Private({ children }: PropsWithChildren) {
  const token = localStorage.getItem('accessToken')
  return token ? <>{children}</> : <Navigate to="/login" replace />
}
