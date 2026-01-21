import { Navigate } from 'react-router'
import { useAuth } from '../hooks/use-auth'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, username } = useAuth()

  if (isLoading) {
    return null
  }

  if (!isAuthenticated || !username) {
    return <Navigate to="/sign-up" replace />
  }

  return <>{children}</>
}
