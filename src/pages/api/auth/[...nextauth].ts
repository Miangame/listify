import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'
import { SpotifyApi } from '@spotify/web-api-ts-sdk'

export default NextAuth({
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
        }
      }
      return token
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken as string
      session.user = token.user as any
      return session
    }
  }
})
