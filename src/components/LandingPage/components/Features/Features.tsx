import { useTranslation } from 'next-i18next'
import { FiHeadphones } from 'react-icons/fi'
import { HiOutlineSparkles } from 'react-icons/hi'
import { LuMusic } from 'react-icons/lu'

import {
  FeatureCard,
  FeatureDescription,
  FeatureIcon,
  FeaturesGrid,
  FeatureTitle,
  SectionTitle,
  Wrapper
} from './Features.styled'

const FEATURES = [
  {
    title: 'aiPoweredTitle',
    description: 'aiPoweredDescription',
    icon: <HiOutlineSparkles size={24} />
  },
  {
    title: 'moodBasedTitle',
    description: 'moodBasedDescription',
    icon: <FiHeadphones size={24} />
  },
  {
    title: 'spotifyIntegrationTitle',
    description: 'spotifyIntegrationDescription',
    icon: <LuMusic size={24} />
  }
]

export const Features = () => {
  const { t } = useTranslation('landing')

  return (
    <Wrapper>
      <SectionTitle>{t('featuresTitle')}</SectionTitle>
      <FeaturesGrid>
        {FEATURES.map((feature, index) => (
          <FeatureCard key={index}>
            <FeatureIcon>{feature.icon}</FeatureIcon>
            <FeatureTitle>{t(feature.title)}</FeatureTitle>
            <FeatureDescription>{t(feature.description)}</FeatureDescription>
          </FeatureCard>
        ))}
      </FeaturesGrid>
    </Wrapper>
  )
}
