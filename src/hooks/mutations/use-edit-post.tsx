import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import type { RawPost } from '../../types/post'

interface EditPostProps {
  username: string
  post: Pick<RawPost, 'content' | 'title' | 'username' | 'id'>
}

const editPost = async ({ username, post }: EditPostProps) => {
  if (username !== post.username) {
    return
  }
  await axios.patch(`https://dev.codeleap.co.uk/careers/${post.id}/`, {
    title: post.title,
    content: post.content,
  })
}

export const useEditPost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: editPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}
