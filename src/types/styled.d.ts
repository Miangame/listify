// import original module declaration
import 'styled-components'

// and extend it
declare module 'styled-components' {
  export interface DefaultTheme {
    size: {
      units: (value: number) => string
    }
    colors: {
      primary: string
      secondary: string
      accent: string
      background: string
      text: string
      textSecondary: string
      card: string
      border: string
      danger: string
    }
    transition: {
      standard: (firstProperty?: string, ...restProperties: string[]) => string
    }
  }
}
