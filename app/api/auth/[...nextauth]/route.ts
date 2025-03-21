import nextAuthOptions from '@/src/shared/lib/next-auth/options'
import NextAuth from 'next-auth'

export const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST }
