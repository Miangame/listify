import { useTranslation } from 'next-i18next'

import { SectionTitle } from '../Features/Features.styled'

import {
  Step,
  StepDescription,
  StepNumber,
  StepsContainer,
  StepTitle,
  Wrapper
} from './HowItWorks.styled'

const STEPS = [
  {
    title: 'connectTitle',
    description: 'connectDescription'
  },
  {
    title: 'customizeTitle',
    description: 'customizeDescription'
  },
  {
    title: 'createTitle',
    description: 'createDescription'
  }
]

export const HowItWorks = () => {
  const { t } = useTranslation('landing')

  return (
    <Wrapper>
      <SectionTitle>How It Works</SectionTitle>
      <StepsContainer>
        {STEPS.map((step, index) => (
          <Step key={index}>
            <StepNumber>{index + 1}</StepNumber>
            <StepTitle>{t(step.title)}</StepTitle>
            <StepDescription>{t(step.description)}</StepDescription>
          </Step>
        ))}
      </StepsContainer>
    </Wrapper>
  )
}
