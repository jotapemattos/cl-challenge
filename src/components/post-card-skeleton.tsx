export function PostCardSkeleton() {
  return (
    <div className="h-auto border border-muted-foreground rounded-2xl overflow-hidden animate-pulse">
      <div className="bg-brand h-[70px] px-6 flex items-center">
        <div className="h-5 w-48 bg-white/30 rounded" />
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-4 w-24 bg-muted-foreground/30 rounded" />
          <div className="h-4 w-32 bg-muted-foreground/30 rounded" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-full bg-muted-foreground/30 rounded" />
          <div className="h-4 w-full bg-muted-foreground/30 rounded" />
          <div className="h-4 w-3/4 bg-muted-foreground/30 rounded" />
        </div>
      </div>
    </div>
  )
}
