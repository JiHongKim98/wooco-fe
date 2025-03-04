import Header from '@/src/widgets/header'
import Image from 'next/image'
import notice from '@/src/assets/images/notice.png'

export default function Page() {
  return (
    <>
      <Header title='우코! 이렇게 사용하면 좋아요' isBack />
      <Image src={notice} alt='우코! 이렇게 사용하면 좋아요' />
    </>
  )
}
