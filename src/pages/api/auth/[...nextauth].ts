import NextAuth, { NextAuthOptions } from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'
import { SpotifyApi } from '@spotify/web-api-ts-sdk'

import { prisma } from '@/lib/prisma'

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization:
        'https://accounts.spotify.com/authorize?scope=user-read-email,user-read-private,playlist-modify-public,playlist-modify-private'
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
    updateAge: 60 * 60
  },
  callbacks: {
    async signIn({ user }) {
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email! }
      })

      if (!existingUser) {
        await prisma.user.create({
          data: {
            email: user.email!,
            name: user.name,
            tokens: 10
          }
        })
      }

      return true
    },

    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token

        if (account.access_token) {
          const spotify = SpotifyApi.withAccessToken(
            process.env.SPOTIFY_CLIENT_ID!,
            {
              access_token: account.access_token,
              token_type: 'Bearer',
              expires_in: account.expires_at as number,
              refresh_token: account.refresh_token as string
            }
          )
          const spotifyUser = await spotify.currentUser.profile()

          token.user = {
            ...user,
            plan: spotifyUser.product
          }

          token.expiresAt = account.expires_at
          token.refreshToken = account.refresh_token
        }
      }
      return token
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken as string
      session.user = token.user as any
      session.expiresAt = token.expiresAt as number
      session.refreshToken = token.refreshToken as string

      const dbUser = await prisma.user.findUnique({
        where: { email: session.user?.email! }
      })

      if (dbUser && session.user) {
        session.user.tokens = dbUser.tokens
      }

      return session
    }
  }
}

export default NextAuth(authOptions)
