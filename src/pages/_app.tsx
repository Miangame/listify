import { Analytics } from '@vercel/analytics/react'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { SessionProvider } from 'next-auth/react'
import Modal from 'react-modal'

import { GlobalStyles } from '../components/GlobalStyles/GlobalStyles.styled'
import { Head } from '../components/Head/Head'
import { ResetCSS } from '../components/ResetCSS/ResetCSS.styles'

import { Header } from '@/components/Header/Header'
import { Layout } from '@/components/Layout/Layout'
import { LayoutContainer } from '@/components/LayoutContainer/LayoutContainer'
import { theme } from '@/theme/theme'
import { Footer } from '@/components/Footer/Footer'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        <Head />
        <ResetCSS />
        <GlobalStyles />

        <LayoutContainer>
          <Header />
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <Footer />
        </LayoutContainer>

        <Analytics />
      </ThemeProvider>
    </SessionProvider>
  )
}

Modal.setAppElement('#__next')

export default appWithTranslation(App)
