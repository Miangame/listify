import { Track } from '@spotify/web-api-ts-sdk'

interface internalTrack {
  genre: string
  bpm: number
  title: string
  album: string
  artist: string
  spotify_track?: Track
}

export interface SpotifyGeneratePlaylistResponse {
  playlist_name: string
  description: string
  tracks: internalTrack[]
}
