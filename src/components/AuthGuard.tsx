import { ReactNode, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { toast } from '@/hooks/use-toast'

interface AuthGuardProps {
  children: ReactNode
  fallback?: ReactNode
}

export const AuthGuard = ({ children, fallback }: AuthGuardProps) => {
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      toast({
        title: "Accesso richiesto",
        description: "Per utilizzare questa funzionalità devi effettuare l'accesso.",
        variant: "destructive"
      })
    }
  }, [user, loading])

  if (loading) {
    return <div className="flex items-center justify-center p-4">Caricamento...</div>
  }

  if (!user) {
    return fallback ? <>{fallback}</> : null
  }

  return <>{children}</>
}