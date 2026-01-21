import { Button } from '@base-ui/react/button'
import { Field } from '@base-ui/react/field'
import { Form } from '@base-ui/react/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircleNotchIcon } from '@phosphor-icons/react'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useCreatePost } from '../hooks/mutations/use-create-post'
import { useAuth } from '../hooks/use-auth'
import { type CreatePostSchema, createPostSchema } from '../types/post'

export function CreatePostForm() {
  const { control, handleSubmit, watch, reset } = useForm<CreatePostSchema>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  })
  const { username } = useAuth()
  const { mutate, isSuccess, isError, isPending } = useCreatePost()

  const title = watch('title')
  const content = watch('content')

  useEffect(() => {
    if (isSuccess) {
      toast.success('Post created successfully')
      reset()
    }
  }, [isSuccess, reset])

  function createPost(values: CreatePostSchema) {
    if (!username) return
    mutate({ username, ...values })
    if (isError) {
      toast.error('Something went wrong. Try again later.')
    }
  }

  return (
    <Form
      className="flex w-full items-end justify-between flex-col gap-4 border border-muted-foreground p-6 md:p-8 rounded-2xl"
      onSubmit={handleSubmit(createPost)}
    >
      <h1 className="self-start text-[22px] font-bold">What's on your mind</h1>
      <Controller
        name="title"
        control={control}
        render={({
          field: { ref, name, value, onBlur, onChange },
          fieldState: { invalid, isTouched, isDirty, error },
        }) => (
          <Field.Root
            name={name}
            invalid={invalid}
            touched={isTouched}
            dirty={isDirty}
            className="w-full flex flex-col gap-1"
          >
            <Field.Label className="text-base">Title</Field.Label>
            <Field.Control
              className="border border-foreground rounded-lg h-8 w-full px-4 placeholder:text-muted-foreground text-sm"
              ref={ref}
              value={value}
              onBlur={onBlur}
              onValueChange={onChange}
              placeholder="Hello world"
            />
            <Field.Error className="text-red-500 text-xs" match={!!error}>
              {error?.message}
            </Field.Error>
          </Field.Root>
        )}
      />
      <Controller
        name="content"
        control={control}
        render={({
          field: { ref, name, value, onBlur, onChange },
          fieldState: { invalid, isTouched, isDirty, error },
        }) => (
          <Field.Root
            name={name}
            invalid={invalid}
            touched={isTouched}
            dirty={isDirty}
            className="w-full flex flex-col gap-1"
          >
            <Field.Label className="text-base">Content</Field.Label>
            <textarea
              className="border border-foreground rounded-lg resize-none h-20 w-full px-4 py-3 placeholder:text-muted-foreground text-sm"
              ref={ref}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              placeholder="Content here"
            />
            <Field.Error className="text-red-500 text-xs" match={!!error}>
              {error?.message}
            </Field.Error>
          </Field.Root>
        )}
      />
      <Button
        type="submit"
        disabled={!title || !content || isPending}
        className="flex items-center justify-center text-base text-white font-bold bg-brand rounded-lg text-center h-8 w-full sm:w-28 hover:brightness-90 cursor-pointer transition-all duration-300 float-right disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:brightness-100"
      >
        {isPending ? (
          <CircleNotchIcon size={16} className="animate-spin" />
        ) : (
          'Create'
        )}
      </Button>
    </Form>
  )
}
