import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import type { RawPost } from '../../types/post'

interface DeletePostProps {
  username: string
  post: RawPost
}

const deletePost = async ({ username, post }: DeletePostProps) => {
  if (username !== post.username) {
    return
  }
  await axios.delete(`https://dev.codeleap.co.uk/careers/${post.id}/`)
}

export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}
