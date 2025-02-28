import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Features } from '@/components/LandingPage/components/Features/Features'
import { Hero } from '@/components/LandingPage/components/Hero/Hero'
import { HowItWorks } from '@/components/LandingPage/components/HowItWorks/HowItWorks'

const Home = () => {
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
      ...(await serverSideTranslations(context.locale ?? 'en', [
        'common',
        'head',
        'landing',
        'footer'
      ]))
    }
  }
}

export default Home
