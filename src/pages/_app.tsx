import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { Analytics } from '@vercel/analytics/react'
import { appWithTranslation } from 'next-i18next'

import { Head } from '../components/Head/Head'
import { ResetCSS } from '../components/ResetCSS/ResetCSS.styles'
import { GlobalStyles } from '../components/GlobalStyles/GlobalStyles.styled'

import { theme } from '@/theme/theme'
import { Layout } from '@/components/Layout/Layout'
import { LayoutContainer } from '@/components/LayoutContainer/LayoutContainer'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Head />
      <ResetCSS />
      <GlobalStyles />

      <LayoutContainer>
        {/* <Header /> */}
        <Layout>
          <Component {...pageProps} />
        </Layout>
        {/* <Footer /> */}
      </LayoutContainer>

      <Analytics />
    </ThemeProvider>
  )
}

export default appWithTranslation(App)
