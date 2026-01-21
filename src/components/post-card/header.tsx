import type { ReactNode } from 'react'

interface PostCardHeaderProps {
  title: string
  children: ReactNode
}

export function PostCardHeader({ title, children }: PostCardHeaderProps) {
  return (
    <header className="h-[70px] bg-brand flex items-center justify-between">
      <h1 className="text-[22px] text-white font-bold p-6 truncate">{title}</h1>
      {children}
    </header>
  )
}
