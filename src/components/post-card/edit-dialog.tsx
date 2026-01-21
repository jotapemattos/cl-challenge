import { Dialog, Field, Form } from '@base-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircleNotchIcon, PencilLineIcon } from '@phosphor-icons/react'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useEditPost } from '../../hooks/mutations/use-edit-post'
import {
  type EditPostSchema,
  editPostSchema,
  type RawPost,
} from '../../types/post'

interface EditPostDialogProps {
  username: string
  post: RawPost
}

export function EditPostDialog({ post, username }: EditPostDialogProps) {
  const { control, handleSubmit, watch, reset } = useForm<EditPostSchema>({
    resolver: zodResolver(editPostSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  })
  const { mutate, isError, isSuccess, error, isPending } = useEditPost()

  const title = watch('title')
  const content = watch('content')

  useEffect(() => {
    if (isSuccess) {
      toast.success('Post edited succesfully!')
      reset()
    }
  }, [isSuccess, reset])

  useEffect(() => {
    if (isError) {
      console.log(error)
      toast.error('Something went wrong!')
    }
  }, [isError, error])

  function editPost(values: EditPostSchema) {
    if (!username) return
    const postPayload = {
      username,
      id: post.id,
      title: values.title || post.title,
      content: values.content || post.content,
    }
    mutate({
      username,
      post: postPayload,
    })
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="cursor-pointer">
        <PencilLineIcon className="size-6 text-white" weight="bold" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 min-h-dvh bg-black opacity-20 transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:opacity-70 supports-[-webkit-touch-callout:none]:absolute" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 -mt-8 w-full mx-auto max-w-[300px] md:max-w-[660px] space-y-4 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray-50 p-6 text-gray-900 outline outline-1 outline-gray-200 transition-all duration-150 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 dark:outline-gray-300">
          <Dialog.Title className="text-[22px] font-bold">
            Edit item
          </Dialog.Title>
          <Dialog.Viewport>
            <Form onSubmit={handleSubmit(editPost)} className="space-y-4">
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
                      defaultValue={post.title}
                      placeholder="Hello world"
                    />
                    <Field.Error
                      className="text-red-500 text-xs"
                      match={!!error}
                    >
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
                    <Field.Error
                      className="text-red-500 text-xs"
                      match={!!error}
                    >
                      {error?.message}
                    </Field.Error>
                  </Field.Root>
                )}
              />
              <div className="flex justify-end gap-4">
                <Dialog.Close className="w-[120px] h-[32px] rounded-lg border border-black text-base font-bold">
                  Cancel
                </Dialog.Close>
                <Dialog.Close
                  type="submit"
                  disabled={(!title && !content) || isPending}
                  className="w-[120px] h-[32px] rounded-lg bg-[#47B960] text-white text-base font-bold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:brightness-100"
                >
                  {isPending ? (
                    <CircleNotchIcon size={16} className="animate-spin" />
                  ) : (
                    'Save'
                  )}
                </Dialog.Close>
              </div>
            </Form>
          </Dialog.Viewport>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
