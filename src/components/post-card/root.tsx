import type { ReactNode } from 'react'

interface PostCardRootProps {
  children: ReactNode
}

export function PostCardRoot({ children }: PostCardRootProps) {
  return (
    <div className="h-auto border border-muted-foreground rounded-2xl overflow-hidden">
      {children}
    </div>
  )
}
