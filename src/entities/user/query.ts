import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import {
  getUser,
  updateUser,
  getMyProfile,
  getMyLikeRegions,
  postMyLikeRegion,
  deleteMyLikeRegion,
} from '@/src/entities/user/api'
import type {
  UserProfileType,
  UpdateUserType,
  UserLikeRegionType,
} from '@/src/entities/user/type'
import { LikeRegion } from '@/src/shared/store/regionStore'
import useUserStore from '@/src/shared/store/userStore'

export const USER_QUERY_KEY = {
  all: ['users'] as const,
  detail: (id: string) => [...USER_QUERY_KEY.all, id] as const,
  myProfile: ['myProfile'] as const,
  myLikeRegions: (data: LikeRegion[]) => ['myLikeRegions', data] as const,
}

export const useGetMyProfile = (): UseQueryResult<UserProfileType> => {
  return useQuery({
    queryKey: USER_QUERY_KEY.myProfile,
    queryFn: () => getMyProfile(),
  })
}

export const useGetUser = (id: string): UseQueryResult<UserProfileType> => {
  return useQuery({
    queryKey: USER_QUERY_KEY.detail(id),
    queryFn: () => getUser(id),
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  const updateStateUser = useUserStore((state) => state.updateStateUser)

  return useMutation({
    mutationFn: (data: UpdateUserType) => updateUser(data),
    onSuccess: (_,data) => {
      updateStateUser({
        name: data.name,
        profile_url: '',
        description: '',
      })
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY.myProfile })
    },
  })
}

export const useGetMyLikeRegions = (
  data: LikeRegion[]
): UseQueryResult<UserLikeRegionType[]> => {
  return useQuery({
    queryKey: USER_QUERY_KEY.myLikeRegions(data),
    queryFn: () => getMyLikeRegions(),
  })
}

export const usePostMyLikeRegion = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: { primary_region: string; secondary_region: string }) =>
      postMyLikeRegion(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY.myLikeRegions })
    },
  })
}

export const useDeleteMyLikeRegion = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteMyLikeRegion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY.myLikeRegions })
    },
  })
}
