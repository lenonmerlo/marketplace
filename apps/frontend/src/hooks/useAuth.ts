import { useEffect, useState } from 'react'
import { api } from '../api/client'

type User = { id: string; email?: string; role: string }

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (!token) { setLoading(false); return }
    api.get('/auth/me')
      .then(res => setUser(res.data.user))
      .catch(() => {
        localStorage.removeItem('authToken')
        setUser(null)
      })
      .finally(() => setLoading(false))
  }, [])

  async function login(email: string, password: string) {
    const { data } = await api.post('/auth/login', { email, password })
    localStorage.setItem('authToken', data.accessToken)
    setUser(data.user ?? null)
  }

  function logout() {
    localStorage.removeItem('authToken')
    setUser(null)
  }

  return { user, isAuth: !!user, loading, login, logout }
}
