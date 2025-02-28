import { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai'
import { SpotifyApi } from '@spotify/web-api-ts-sdk'
import { getServerSession } from 'next-auth'

import { SYSTEM_PROMPT } from '@/constants/prompts'
import { SpotifyGeneratePlaylistResponse } from '@/types/SpotifyGeneratePlaylistResponse'
import { authOptions } from './auth/[...nextauth]'
import { prisma } from '@/lib/prisma'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const spotifyApi = SpotifyApi.withClientCredentials(
  process.env.SPOTIFY_CLIENT_ID!,
  process.env.SPOTIFY_CLIENT_SECRET!
)

const getSpotifyTrack = async (
  songTitle: string,
  artist: string,
  album: string
) => {
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

    const bestMatch = exactMatch || response.tracks.items[0]

    return bestMatch
  } catch (error) {
    console.error('❌ Error searching Spotify:', error)
    return undefined
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<SpotifyGeneratePlaylistResponse | void> {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res
      .status(401)
      .json({ message: 'Unauthorized. Please log in with Spotify.' })
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { prompt, email } = req.body

  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  if (user.tokens <= 0) {
    return res.status(403).json({ message: 'Not enough tokens' })
  }

  const randomFactor = Math.random().toString(36).substring(7) // Genera un string aleatorio
  const modifiedPrompt = `${prompt} [Unique ID: ${randomFactor}]`

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: modifiedPrompt }
      ],
      temperature: 0.9,
      top_p: 0.8
    })

    const playlistContent = response.choices[0]?.message?.content
    if (!playlistContent) {
      return res.status(500).json({ message: 'Failed to generate playlist.' })
    }

    const playlist: SpotifyGeneratePlaylistResponse =
      JSON.parse(playlistContent)

    for (let track of playlist.tracks) {
      track.spotify_track = await getSpotifyTrack(
        track.title,
        track.artist,
        track.album
      )
    }

    playlist.tracks = playlist.tracks.filter((track) => track.spotify_track)

    await prisma.user.update({
      where: { email },
      data: { tokens: user.tokens - 1 }
    })

    res.status(200).json(playlist)
  } catch (error) {
    console.error('OpenAI API Error:', error)
    res.status(500).json({ message: 'Error generating response' })
  }
}
