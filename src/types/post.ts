import z from 'zod'

export interface RawPost {
  id: number
  username: string
  created_datetime: string
  title: string
  content: string
}

export const createPostSchema = z.object({
  title: z
    .string('Title is required')
    .min(1, 'The post title must have at least 1 character')
    .max(40, 'The title must have at most 100 characters'),
  content: z
    .string('Content is required')
    .min(1, 'The post content must have at least 1 character'),
})

export type CreatePostSchema = z.infer<typeof createPostSchema>

export type CreatePostPayload = CreatePostSchema & { username: string }

export const editPostSchema = z.object({
  title: z
    .string('Title is required')
    .max(40, 'The title must have at most 100 characters')
    .optional(),
  content: z.string('Content is required').optional(),
})

export type EditPostSchema = z.infer<typeof editPostSchema>
