import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { FaStrava } from 'react-icons/fa'

import {
  ConnectWithStravaButton,
  StravaSubtitle,
  StravaTitle,
  StyledStravaIcon,
  Wrapper
} from '@/components/StravaPage/StravaPage.styled'

interface StravaPageProps {
  isStravaConnected: boolean
}

const StravaPage = ({ isStravaConnected }: StravaPageProps) => {
  const { t } = useTranslation('strava')

  const router = useRouter()

  const handleStravaLogin = () => {
    const STRAVA_CLIENT_ID = process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID
    const REDIRECT_URI = process.env.NEXT_PUBLIC_STRAVA_REDIRECT_URI
    const stravaAuthUrl = `https://www.strava.com/oauth/authorize?client_id=${STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&approval_prompt=force&scope=activity:read_all`
    window.location.href = stravaAuthUrl
  }

  useEffect(() => {
    const code = router.query.code

    if (code) {
      fetch(`/api/strava/auth?code=${code}`)
        .then((res) => res.json())
        .then((data) => {
          console.log({ data, router })
          if (data.success) {
            router.replace(router.pathname)
          }
        })
        .catch(console.error)
        .finally(() => {
          router.replace(router.pathname)
        })
    }
  }, [router])

  return (
    <Wrapper>
      <StravaTitle>
        <StyledStravaIcon />
        {t('stravaTitle')}
      </StravaTitle>
      <StravaSubtitle>{t('stravaSubtitle')}</StravaSubtitle>

      {!isStravaConnected && (
        <ConnectWithStravaButton onClick={handleStravaLogin}>
          <FaStrava />
          {t('connectAccountButton')}
        </ConnectWithStravaButton>
      )}
    </Wrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: `/${context.locale}/`,
        permanent: false
      }
    }
  }

  let isStravaConnected = false
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/strava/check`,
      {
        headers: {
          cookie: context.req.headers.cookie || ''
        }
      }
    )
    const data = await response.json()
    isStravaConnected = data.isStravaConnected
  } catch (error) {
    console.error('Error checking Strava connection:', error)
  }

  return {
    props: {
      isStravaConnected,
      ...(await serverSideTranslations(context.locale ?? 'en', [
        'common',
        'head',
        'header',
        'strava',
        'cookies',
        'footer'
      ]))
    }
  }
}

export default StravaPage
