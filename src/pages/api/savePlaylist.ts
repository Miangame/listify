import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { SpotifyApi } from '@spotify/web-api-ts-sdk'

import { authOptions } from './auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const { playlistName, trackUris, playlistDescription } = req.body

  try {
    const spotify = SpotifyApi.withAccessToken(process.env.SPOTIFY_CLIENT_ID!, {
      access_token: session.accessToken as string,
      token_type: 'Bearer',
      expires_in: session.expiresAt as number,
      refresh_token: session.refreshToken as string
    })

    const user = await spotify.currentUser.profile()
    const playlist = await spotify.playlists.createPlaylist(user.id, {
      name: playlistName,
      description: playlistDescription,
      public: false
    })

    await spotify.playlists.addItemsToPlaylist(playlist.id, trackUris)

    res.status(200).json({
      message: 'Playlist saved successfully!',
      playlistUrl: playlist.external_urls.spotify
    })
  } catch (error) {
    console.error('Error saving playlist:', error)
    res.status(500).json({ message: 'Failed to save playlist' })
  }
}
