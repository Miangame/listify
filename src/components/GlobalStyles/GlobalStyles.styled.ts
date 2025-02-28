import { Inter, Montserrat } from 'next/font/google'
import { createGlobalStyle } from 'styled-components'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600']
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600']
})

export const GlobalStyles = createGlobalStyle<{ $isDarkMode?: boolean }>`
  html, body {
    font-family: ${inter.style.fontFamily}, sans-serif;
  }

  body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    overscroll-behavior: none;
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
  }

  #__next {
    position: relative;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${montserrat.style.fontFamily}, sans-serif;
    font-weight: 600;
  }

  padding, span, li {
    font-family: ${inter.style.fontFamily}, sans-serif;
    font-weight: 400;
  }
`
