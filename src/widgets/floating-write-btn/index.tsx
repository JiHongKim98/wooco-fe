'use client'

import { Pencil, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface FloatingButtonProps {
  onClick: () => void
  text: string
}

interface FloatingWriteButtonProps {
  isClick?: boolean
  setIsClick?: (value: boolean) => void
}

export default function FloatingWriteButton({
  isClick,
  setIsClick,
}: FloatingWriteButtonProps) {
  const router = useRouter()

  useEffect(() => {
    if (isClick) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isClick])

  const handleClick = (path: string) => {
    if (setIsClick) {
      setIsClick(!isClick)
    }
    document.scrollingElement?.scrollTo({ top: 0, behavior: 'smooth' })
    router.push(path)
  }

  return (
    <div className='flex items-center justify-end cursor-pointer z-[50]'>
      <div className='fixed flex flex-col gap-[20px] items-end bottom-[80px] z-[1001] pr-[20px]'>
        {isClick && (
          <div className='flex flex-col gap-[10px]'>
            <FloatingMenuButton
              onClick={() => handleClick('/courses/new')}
              text='코스 작성'
            />
            <FloatingMenuButton
              onClick={() => handleClick('/plans/new')}
              text='플랜 작성'
            />
          </div>
        )}
        <button
          className='w-[50px] h-[50px] bg-brand rounded-full flex items-center justify-center shadow-lg border border-blue-800 border-opacity-20'
          onClick={() => setIsClick && setIsClick(!isClick)}
        >
          {isClick ? (
            <X size={23} color='white' strokeWidth={1.5} />
          ) : (
            <Pencil size={23} color='white' strokeWidth={1.5} />
          )}
        </button>
      </div>
    </div>
  )
}

export function FloatingMenuButton({ onClick, text }: FloatingButtonProps) {
  return (
    <button
      className='w-[80px] h-[30px] bg-white shadow-floating-button text-[14px] rounded-full flex items-center justify-center hover:bg-brand hover:text-white transition-all duration-200'
      onClick={onClick}
    >
      {text}
    </button>
  )
}
