import { SpotifyApi } from '@spotify/web-api-ts-sdk'

const spotifyApi = SpotifyApi.withClientCredentials(
  process.env.SPOTIFY_CLIENT_ID!,
  process.env.SPOTIFY_CLIENT_SECRET!
)

export class SpotifyService {
  static async getSpotifyTrack(
    songTitle: string,
    artist: string,
    album: string
  ) {
    try {
      const searchQuery = `track:${songTitle} album:${album}`
      const response = await spotifyApi.search(
        searchQuery,
        ['track'],
        undefined,
        5
      )

      if (!response.tracks.items.length) {
        console.warn(`⚠ No results found for "${songTitle}" by "${artist}"`)
        return undefined
      }

      const exactMatch = response.tracks.items.find((track) =>
        track.artists.some((a) => a.name.toLowerCase() === artist.toLowerCase())
      )

      return exactMatch || response.tracks.items[0]
    } catch (error) {
      console.error('❌ Error searching Spotify:', error)
      return undefined
    }
  }
}
