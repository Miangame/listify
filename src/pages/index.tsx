import { GetServerSideProps } from 'next'
import { getSession, useSession } from 'next-auth/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { Features } from '@/components/LandingPage/components/Features/Features'
import { Hero } from '@/components/LandingPage/components/Hero/Hero'
import { HowItWorks } from '@/components/LandingPage/components/HowItWorks/HowItWorks'

const Home = () => {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/dashboard')
    }
  }, [session, router])

  return (
    <main>
      <Hero />
      <Features />
      <HowItWorks />
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  const translations = await serverSideTranslations(context.locale ?? 'en', [
    'common',
    'head',
    'header',
    'landing',
    'footer'
  ])

  if (session) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false
      }
    }
  }

  return {
    props: {
      ...translations
    }
  }
}

export default Home
