import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { RawPost } from '../../types/post'

interface ApiResponse {
  count: number
  next: string | null
  previous: string | null
  results: RawPost[]
}

const fetchPosts = async (): Promise<ApiResponse> => {
  const response = await axios.get('https://dev.codeleap.co.uk/careers/')
  return response.data as ApiResponse
}

export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 3000,
  })
}
