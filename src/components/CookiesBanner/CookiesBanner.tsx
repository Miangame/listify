import { useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'

import {
  CookieBannerContainer,
  CookieText,
  ButtonContainer,
  Button
} from './CookiesBanner.styled'

export const CookiesBanner = () => {
  const { t } = useTranslation('cookies')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const cookieAccepted = localStorage.getItem('listifyCookiesAccepted')
    if (!cookieAccepted) {
      setVisible(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('listifyCookiesAccepted', 'true')
    setVisible(false)
  }

  return (
    <CookieBannerContainer $visible={visible}>
      <CookieText>{t('message')}</CookieText>
      <ButtonContainer>
        <Button onClick={acceptCookies}>{t('accept')}</Button>
      </ButtonContainer>
    </CookieBannerContainer>
  )
}
