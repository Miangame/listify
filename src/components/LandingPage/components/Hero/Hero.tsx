import { BiChevronRight } from 'react-icons/bi'
import { useTranslation } from 'next-i18next'
import { signIn } from 'next-auth/react'

import { CTAButton, HeroSubtitle, HeroTitle, Wrapper } from './Hero.styled'

export const Hero = () => {
  const { t } = useTranslation('landing')

  const handleLogin = () => {
    signIn('spotify')
  }

  return (
    <Wrapper>
      <HeroTitle>{t('heroTitle')}</HeroTitle>
      <HeroSubtitle>{t('heroSubtitle')}</HeroSubtitle>
      <CTAButton onClick={handleLogin}>
        {t('ctaButton')}
        <BiChevronRight size={16} />
      </CTAButton>
    </Wrapper>
  )
}
