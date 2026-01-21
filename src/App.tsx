import { Button } from '@base-ui/react/button'
import { SignOutIcon } from '@phosphor-icons/react/dist/ssr/SignOut'
import { useMemo, useState } from 'react'
import { PostCard } from './components/post-card/index'
import { PostCardSkeleton } from './components/post-card-skeleton'
import { PostFilters, type SortOption } from './components/post-filters'
import { CreatePostForm } from './components/post-form'
import { usePosts } from './hooks/queries/use-posts'
import { useAuth } from './hooks/use-auth'

const loadingSkeletons = (
  <>
    <PostCardSkeleton />
    <PostCardSkeleton />
    <PostCardSkeleton />
  </>
)

function App() {
  const { username, logout } = useAuth()
  const { data, isLoading, error, refetch } = usePosts()

  const [searchText, setSearchText] = useState('')
  const [authorFilter, setAuthorFilter] = useState('')
  const [sortOption, setSortOption] = useState<SortOption>('date-desc')

  const filteredAndSortedPosts = useMemo(() => {
    if (!data?.results) return []

    const search = searchText?.toLowerCase()
    const author = authorFilter?.toLowerCase()

    const filteredPosts = data.results.filter((post) => {
      if (search) {
        const matchesSearch =
          post.title.toLowerCase().includes(search) ||
          post.content.toLowerCase().includes(search)
        if (!matchesSearch) return false
      }
      if (author) {
        const matchesAuthor = post.username.toLowerCase().includes(author)
        if (!matchesAuthor) return false
      }
      return true
    })

    return filteredPosts.sort((a, b) => {
      switch (sortOption) {
        case 'date-desc':
          return (
            new Date(b.created_datetime).getTime() -
            new Date(a.created_datetime).getTime()
          )
        case 'date-asc':
          return (
            new Date(a.created_datetime).getTime() -
            new Date(b.created_datetime).getTime()
          )
        case 'title-asc':
          return a.title.localeCompare(b.title)
        case 'title-desc':
          return b.title.localeCompare(a.title)
        case 'author-asc':
          return a.username.localeCompare(b.username)
        case 'author-desc':
          return b.username.localeCompare(a.username)
        default:
          return 0
      }
    })
  }, [data?.results, searchText, authorFilter, sortOption])

  const isLoadingState = isLoading || (!data && !error)

  if (isLoadingState) {
    return (
      <main className="w-full h-full min-h-screen bg-background flex items-center justify-center font-roboto text-4xl px-4 md:px-12">
        <div className="w-full md:w-[600px] xl:w-[800px] min-h-screen flex flex-col items-center gap-6 bg-white pb-6">
          <header className="w-full lg:w-full h-20 bg-brand flex items-center justify-start px-4 md:px-9">
            <h1 className="text-xl font-bold text-white">CodeLeap Network</h1>
          </header>
          <section className="px-4 md:px-9 w-full space-y-6">
            <CreatePostForm />
            {loadingSkeletons}
          </section>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="w-full h-full min-h-screen bg-background flex items-center justify-center font-roboto text-4xl px-4 md:px-12">
        <div className="w-full md:w-[600px] xl:w-[800px] min-h-screen flex flex-col items-center gap-6 bg-white pb-6">
          <header className="w-full lg:w-full h-20 bg-brand flex items-center justify-start px-4 md:px-9">
            <h1 className="text-xl font-bold text-white">CodeLeap Network</h1>
          </header>
          <section className="px-4 md:px-9 w-full flex flex-col items-center justify-center gap-4 py-12">
            <h2 className="text-2xl font-bold text-gray-800">
              Failed to load posts
            </h2>
            <p className="text-base text-gray-600 text-center">
              Something went wrong while fetching posts. Please try again.
            </p>
            <button
              onClick={() => refetch()}
              className="mt-4 px-6 text-base py-2 bg-brand text-white font-bold rounded hover:opacity-90 transition-opacity"
            >
              Try again
            </button>
          </section>
        </div>
      </main>
    )
  }

  return (
    <main className="w-full h-full min-h-screen bg-background flex items-center justify-center font-roboto text-4xl px-4 md:px-12">
      <div className="w-full md:w-[600px] xl:w-[800px] min-h-screen flex flex-col items-center gap-6 bg-white pb-6">
        <header className="w-full lg:w-full h-20 bg-brand flex items-center justify-between px-4 md:px-9">
          <h1 className="text-xl font-bold text-white">CodeLeap Network</h1>
          <Button
            className="flex items-center gap-2 text-base text-white cursor-pointer"
            onClick={logout}
          >
            <SignOutIcon />
            <span>Logout</span>
          </Button>
        </header>
        <section className="px-4 md:px-9 w-full space-y-6">
          <CreatePostForm />
          <PostFilters
            searchText={searchText}
            onSearchTextChange={setSearchText}
            authorFilter={authorFilter}
            onAuthorFilterChange={setAuthorFilter}
            sortOption={sortOption}
            onSortOptionChange={setSortOption}
          />
          {filteredAndSortedPosts.map((post) => (
            <PostCard.Root key={post.id}>
              <PostCard.Header title={post.title}>
                {username === post.username ? (
                  <div className="p-6 flex items-center gap-8">
                    <PostCard.DeleteButton username={username} post={post} />
                    <PostCard.EditButton username={username} post={post} />
                  </div>
                ) : null}
              </PostCard.Header>
              <PostCard.Content
                username={post.username}
                createdDatetime={post.created_datetime}
                content={post.content}
              />
            </PostCard.Root>
          ))}
        </section>
      </div>
    </main>
  )
}

export default App
