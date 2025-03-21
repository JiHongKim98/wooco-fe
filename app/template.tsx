'use client'

import { motion } from 'framer-motion'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.1,
        ease: 'easeInOut',
      }}
      className='h-full w-full'
    >
      {children}
    </motion.div>
  )
}
