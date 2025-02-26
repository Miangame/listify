import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Home = () => {
  return (
    <main>
      <h1>HELLO WORLD</h1>
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
