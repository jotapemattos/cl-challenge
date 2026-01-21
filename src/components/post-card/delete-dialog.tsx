import { AlertDialog } from '@base-ui/react'
import { TrashIcon } from '@phosphor-icons/react'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { useDeletePost } from '../../hooks/mutations/use-delete-post'
import type { RawPost } from '../../types/post'

interface DeletePostDialogProps {
  username: string
  post: RawPost
}

export function DeletePostDialog({ post, username }: DeletePostDialogProps) {
  const { mutate, isError, isSuccess, error } = useDeletePost()

  useEffect(() => {
    if (isSuccess) {
      toast.success('Post deleted succesfully!')
    }
  }, [isSuccess])

  useEffect(() => {
    if (isError) {
      console.log(error)
      toast.error('Something went wrong!')
    }
  }, [isError, error])

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger className="cursor-pointer">
        <TrashIcon className="size-6 text-white" weight="bold" />
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Backdrop className="fixed inset-0 min-h-dvh bg-black opacity-20 transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:opacity-70 supports-[-webkit-touch-callout:none]:absolute" />
        <AlertDialog.Popup className="fixed top-1/2 left-1/2 -mt-8 w-full mx-auto max-w-[300px] md:max-w-[660px] space-y-6 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray-50 p-6 text-gray-900 outline outline-1 outline-gray-200 transition-all duration-150 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 dark:outline-gray-300">
          <AlertDialog.Title className="text-[22px] w-full font-bold">
            Are you sure you want to delete this item?
          </AlertDialog.Title>
          <div className="flex justify-end gap-4">
            <AlertDialog.Close className="w-[120px] h-[32px] rounded-lg border border-muted-foreground text-base font-bold">
              Cancel
            </AlertDialog.Close>
            <AlertDialog.Close
              onClick={() => mutate({ post, username })}
              className="w-[120px] h-[32px] rounded-lg bg-[#FF5151] text-white text-base font-bold"
            >
              Delete
            </AlertDialog.Close>
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
