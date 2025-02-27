import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useState } from 'react'

import { SpotifyGeneratePlaylistResponse } from '@/types/SpotifyGeneratePlaylistResponse'

const Home = () => {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState<
    SpotifyGeneratePlaylistResponse | undefined
  >()
  const [loading, setLoading] = useState(false)

  const generatePlaylist = async () => {
    if (!prompt) return

    setLoading(true)
    setResponse(undefined)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      })

      if (!res.ok) {
        throw new Error('Error fetching data')
      }

      const data = await res.json()

      setResponse(data)
    } catch (error) {
      console.error(error)
    }

    setLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value)
  }

  console.log(response)

  return (
    <main>
      <textarea
        placeholder="Type your message here..."
        onChange={handleChange}
        value={prompt}
      />
      <button onClick={generatePlaylist} disabled={loading}>
        {loading ? 'Generating...' : 'Generate'}
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>{response?.playlist_name}</h2>
          <p>{response?.description}</p>
          <ul>
            {response?.tracks.map((track, index) => (
              <li key={index}>
                <p>
                  <strong>{track.spotify_track?.name}</strong> by{' '}
                  {track.spotify_track?.artists
                    .map((artist) => artist.name)
                    .join(', ')}{' '}
                  from {track.spotify_track?.album.name} (
                  {track.spotify_track?.album.release_date})
                </p>
                <p>Genre: {track.genre}</p>
                <p>BPM: {track.bpm}</p>
                <a
                  href={track.spotify_track?.external_urls.spotify}
                  target="_blank"
                  rel="noreferrer"
                >
                  Listen on Spotify
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  )
}

export async function getStaticProps({ locale = 'en' }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'head']))
    }
  }
}

export default Home
