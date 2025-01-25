'use client'

import { useState } from 'react'
import ProfileImage from '@/src/shared/ui/ProfileImage'
import UserTag from '@/src/features/user/user-tag'
import ListUserPlace from '@/src/features/plan/list-user-place'
import ListUserCourse from '@/src/features/course/list-user-course'
import { Select } from 'antd'
import Spacer from '@/src/shared/ui/Spacer'
import FloatingWriteButton from '@/src/widgets/floating-write-btn'
import Header from '@/src/widgets/header'
import type { UserProfileType } from '@/src/entities/user/type'
import { useGetUserCourses } from '@/src/entities/course/query'

interface DetailUserProps {
  id: string
  user: UserProfileType | undefined
  isMe: boolean
}

const LIST_TYPE = {
  place: 'place' as const,
  course: 'course' as const,
}

type ListType = keyof typeof LIST_TYPE

export default function DetailUser({ id, user, isMe }: DetailUserProps) {
  const [type, setType] = useState<ListType>(LIST_TYPE.course)
  const [order, setOrder] = useState('recent')
  const { data: courses } = useGetUserCourses(id)

  const onChangeOrder = (value: string) => {
    setOrder(value)
  }

  const handleTypeChange = (newType: ListType) => {
    setType(newType)
  }

  return (
    <>
      {isMe ? (
        <Header title='마이 페이지' isBack />
      ) : (
        <Header title={user?.name || ''} isBack />
      )}
      <Spacer height={8} />
      <section className='px-[20px] py-[10px] gap-[5px] w-full flex flex-col justify-between'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col justify-center items-start gap-[10px]'>
            <ProfileImage
              size={60}
              src={user?.profile_url || ''}
              type='colored'
            />
            <p className='font-bold text-brand text-headline'>{user?.name}</p>
          </div>
          <div className='flex gap-[30px] items-end'>
            <UserTag type='heart' content={'?'} />
            <UserTag type='comment' content={'?'} />
            <UserTag type='rate' content={'?'} />
          </div>
        </div>
        <span className='text-sub font-light'>{user?.description}</span>
      </section>
      <div className='sticky top-0 bg-white z-10 flex items-center pt-[10px] pb-[5px]'>
        <div
          className={`w-[50%] flex justify-center border-b-[5px] pb-[5px] items-center font-semibold text-middle cursor-pointer ${
            type === LIST_TYPE.course
              ? ' border-container-light-blue '
              : 'border-light-gray text-gray-400'
          }`}
          onClick={() => handleTypeChange(LIST_TYPE.course)}
        >
          {isMe ? '나의 코스' : `${user?.name}님의 코스`}
        </div>
        <div
          className={`w-[50%] flex justify-center border-b-[5px] pb-[5px] items-center font-semibold text-middle cursor-pointer ${
            type === LIST_TYPE.place
              ? ' border-container-light-blue'
              : 'border-light-gray text-gray-400'
          }`}
          onClick={() => handleTypeChange(LIST_TYPE.place)}
        >
          장소 리뷰
        </div>
      </div>
      <Spacer height={10} />
      <div className='flex px-[20px] justify-between'>
        <div className='flex gap-[5px] text-main font-bold items-center'>
          {/* 실제 API 연결 필요 
          <span>전체</span>
          <span className='text-container-blue'>
            {type === LIST_TYPE.place
              ? user.place_info.summary.total_place
              : user.course_info.summary.total_course}
          </span>*/}
        </div>
        {type === LIST_TYPE.course ? (
          <Select
            defaultValue='recent'
            style={{ width: 80 }}
            onChange={onChangeOrder}
            size={'small'}
            options={[
              { value: 'recent', label: '최신순' },
              { value: 'popular', label: '인기순' },
            ]}
          />
        ) : (
          <div className='w-[80px]' />
        )}
      </div>
      {type === LIST_TYPE.place ? (
        <ListUserPlace />
      ) : (
        <>
          <Spacer height={10} />
          <Spacer height={8} className='bg-bright-gray' />
          {courses && <ListUserCourse courses={courses} />}
        </>
      )}
      <Spacer height={20} />
      <FloatingWriteButton />
    </>
  )
}
