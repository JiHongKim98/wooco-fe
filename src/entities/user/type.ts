import type { PlaceType } from '@/src/entities/place/type'
import type { CourseType } from '@/src/entities/course/type'
export type FavoriteRegionType = {
  id: number
  value: string
}

export type UserType = {
  user_info: {
    user_id: number
    name: string
    profile_url: string
  }
  place_info: {
    summary: {
      star_rate_avg: number
      total_place: number
    }
    places: PlaceType[]
  }
  course_info: {
    summary: {
      total_course: number
    }
    courses: CourseType[]
  }
}
