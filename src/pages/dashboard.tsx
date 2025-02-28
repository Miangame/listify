import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useState } from 'react'
import { CiClock2, CiSearch } from 'react-icons/ci'
import { FaPlus } from 'react-icons/fa6'
import Swal from 'sweetalert2'
import { useTheme } from 'styled-components'

import {
  FormGroup,
  GenerateButton,
  GeneratorCard,
  ImportButton,
  Label,
  LoadingContainer,
  LoadingText,
  PageTitle,
  ResultsHeader,
  ResultsSection,
  ResultsTitle,
  SongAlbum,
  SongAlbumCover,
  SongArtist,
  SongDuration,
  SongInfo,
  SongItem,
  SongList,
  SongListHeader,
  SongNumber,
  SongTitle,
  StyledLoader,
  TextArea,
  TextAreaCounter,
  Wrapper
} from '@/components/DashboardPage/DashboardPage.styled'
import { SpotifyGeneratePlaylistResponse } from '@/types/SpotifyGeneratePlaylistResponse'
import { msToTime } from '@/utils/msToTime'

const MAX_PROMPT_LENGTH = 150

const DashboardPage = () => {
  const { t } = useTranslation('dashboard')
  const theme = useTheme()

  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState<
    SpotifyGeneratePlaylistResponse | undefined
  >()
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > MAX_PROMPT_LENGTH) return

    setPrompt(e.target.value)
  }
  const handleGenerate = async () => {
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

  const savePlaylist = async () => {
    const res = await fetch('/api/savePlaylist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        playlistName: response?.playlist_name,
        playlistDescription: response?.description,
        trackUris: response?.tracks.map((track) => track.spotify_track?.uri)
      })
    })

    if (!res.ok) {
      Swal.fire({
        title: t('errorSavingPlaylist'),
        text: t('errorSavingPlaylistText', {
          playlistName: response?.playlist_name
        }),
        icon: 'error'
      })
      return
    }

    const data = await res.json()

    Swal.fire({
      title: t('playlistSaved'),
      text: t('playlistSavedText', { playlistName: response?.playlist_name }),
      icon: 'success',
      confirmButtonText: t('ok')
    }).then(() => {
      window.open(data.playlistUrl, '_blank')
    })
  }

  const handleImport = async () => {
    Swal.fire({
      title: t('confirmAlertTitle'),
      text: t('confirmAlertText', { playlistName: response?.playlist_name }),
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: t('confirmAlertConfirmButtonText'),
      cancelButtonText: t('confirmAlertCancelButtonText'),
      confirmButtonColor: theme.colors.primary,
      cancelButtonColor: theme.colors.danger,
      theme: 'dark'
    }).then((result) => {
      if (result.isConfirmed) {
        savePlaylist()
      }
    })
  }

  return (
    <Wrapper>
      <PageTitle>{t('title')}</PageTitle>

      <GeneratorCard>
        <FormGroup>
          <Label htmlFor="playlist-description">{t('textareaLabel')}</Label>
          <TextArea
            id="playlist-description"
            placeholder={t('textareaPlaceholder')}
            value={prompt}
            onChange={handleChange}
          />
          <TextAreaCounter $isOverLimit={prompt.length >= MAX_PROMPT_LENGTH}>
            {prompt.length}/{MAX_PROMPT_LENGTH}
          </TextAreaCounter>
        </FormGroup>
        <GenerateButton
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
        >
          {loading ? (
            <>
              <StyledLoader size={16} />
              {t('generating')}
            </>
          ) : (
            <>
              <CiSearch size={16} />
              {t('generate')}
            </>
          )}
        </GenerateButton>
      </GeneratorCard>

      {loading ? (
        <LoadingContainer>
          <StyledLoader size={40} />
          <LoadingText>{t('generatingPerfectPlaylist')}</LoadingText>
        </LoadingContainer>
      ) : response ? (
        <ResultsSection $visible={!!response}>
          <ResultsHeader>
            <ResultsTitle>{response.playlist_name}</ResultsTitle>
            <ImportButton onClick={handleImport}>
              <FaPlus size={16} />
              {t('importToSpotify')}
            </ImportButton>
          </ResultsHeader>

          <SongList>
            <SongListHeader>
              <div>#</div>
              <div>{t('songTitle')}</div>
              <div>{t('songAlbum')}</div>
              <div>{t('songDuration')}</div>
            </SongListHeader>

            {response.tracks.map((song, index) => (
              <SongItem key={index}>
                <SongNumber>{index + 1}</SongNumber>
                <SongAlbumCover>
                  <img
                    src={
                      song.spotify_track?.album.images[0].url ||
                      '/img/placeholder.svg'
                    }
                    alt={`${song.album} cover`}
                  />
                </SongAlbumCover>
                <SongInfo>
                  <SongTitle>{song.title}</SongTitle>
                  <SongArtist>{song.artist}</SongArtist>
                </SongInfo>
                <SongAlbum>{song.album}</SongAlbum>
                <SongDuration>
                  <CiClock2 size={14} />
                  {msToTime(song.spotify_track?.duration_ms ?? 0)}
                </SongDuration>
              </SongItem>
            ))}
          </SongList>
        </ResultsSection>
      ) : null}
    </Wrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      ...(await serverSideTranslations(context.locale ?? 'en', [
        'common',
        'head',
        'dashboard',
        'footer'
      ]))
    }
  }
}

export default DashboardPage
