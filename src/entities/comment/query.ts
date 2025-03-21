import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryResult,
} from '@tanstack/react-query'
import {
  getComments,
  postComment,
  deleteComment,
  updateComment,
} from '@/src/entities/comment/api'
import type { CommentType } from '@/src/entities/comment/type'

const COMMENT_QUERY_KEY = {
  all: ['comments'] as const,
  detail: (id: string) => [...COMMENT_QUERY_KEY.all, id] as const,
}

export const useGetComments = (id: string): UseQueryResult<CommentType[]> => {
  return useQuery({
    queryKey: COMMENT_QUERY_KEY.detail(id),
    queryFn: () => getComments(id),
  })
}

export const useCreateComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, contents }: { id: string; contents: string }) =>
      postComment(id, contents),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMMENT_QUERY_KEY.all })
    },
  })
}

export const useUpdateComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, contents }: { id: string; contents: string }) =>
      updateComment(id, contents),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMMENT_QUERY_KEY.detail })
    },
  })
}

export const useDeleteComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMMENT_QUERY_KEY.detail })
    },
  })
}
