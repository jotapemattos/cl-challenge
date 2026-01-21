interface PostCardContentProps {
  username: string
  createdDatetime: string
  content: string
}

function getTimeAgo(createdDatetime: string): string {
  const now = new Date()
  const created = new Date(createdDatetime)
  const diffInMs = now.getTime() - created.getTime()
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))

  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  return diffInHours > 1
    ? `${diffInHours} hours ago`
    : `${diffInHours} hour ago`
}

export function PostCardContent({
  content,
  createdDatetime,
  username,
}: PostCardContentProps) {
  return (
    <main className="flex flex-col justify-center p-6 gap-4">
      <span className="flex items-center justify-between text-foreground text-lg">
        <h3 className="font-bold">@{username}</h3>
        <p>{getTimeAgo(createdDatetime)}</p>
      </span>
      <p className="text-lg text-black break-words">{content}</p>
    </main>
  )
}
