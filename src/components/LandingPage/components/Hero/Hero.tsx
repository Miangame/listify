import { BiChevronRight } from 'react-icons/bi'
import { useTranslation } from 'next-i18next'

import { CTAButton, HeroSubtitle, HeroTitle, Wrapper } from './Hero.styled'

export const Hero = () => {
  const { t } = useTranslation('landing')

  return (
    <Wrapper>
      <HeroTitle>{t('heroTitle')}</HeroTitle>
      <HeroSubtitle>{t('heroSubtitle')}</HeroSubtitle>
      <CTAButton>
        {t('ctaButton')}
        <BiChevronRight size={16} />
      </CTAButton>
    </Wrapper>
  )
}
