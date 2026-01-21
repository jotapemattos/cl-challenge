import { PostCardContent } from './content'
import { DeletePostDialog } from './delete-dialog'
import { EditPostDialog } from './edit-dialog'
import { PostCardHeader } from './header'
import { PostCardRoot } from './root'

export const PostCard = {
  Root: PostCardRoot,
  Header: PostCardHeader,
  Content: PostCardContent,
  DeleteButton: DeletePostDialog,
  EditButton: EditPostDialog,
}
