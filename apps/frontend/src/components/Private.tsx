import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Private({ children }: { children: React.ReactNode }) {
  const { isAuth, loading } = useAuth()
  if (loading) return null
  if (!isAuth) return <Navigate to="/login" replace />
  return <>{children}</>
}
