import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { SpotifyApi } from '@spotify/web-api-ts-sdk'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const { playlistName, trackUris, playlistDescription } = req.body

  try {
    const spotify = SpotifyApi.withClientCredentials(
      process.env.SPOTIFY_CLIENT_ID!,
      process.env.SPOTIFY_CLIENT_SECRET!
    )

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
