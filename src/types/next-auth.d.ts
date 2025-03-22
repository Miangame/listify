import 'next-auth'
import { UserSession } from './UserSession'

declare module 'next-auth' {
  interface Session {
    accessToken?: string
    user?: UserSession
    expiresAt: number
    refreshToken: string
  }
}
