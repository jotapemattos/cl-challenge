import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import type { CreatePostPayload } from '../../types/post'

const createPost = async (post: CreatePostPayload) => {
  const res = await axios.post('https://dev.codeleap.co.uk/careers/', post)
  return res.data
}

export const useCreatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}
