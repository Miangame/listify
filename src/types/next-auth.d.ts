import 'next-auth'

declare module 'next-auth' {
  interface Session {
    accessToken?: string
    user?: {
      name: string
      email: string
      image: string
      plan: string
    }
    expiresAt: number
    refreshToken: string
  }
}
