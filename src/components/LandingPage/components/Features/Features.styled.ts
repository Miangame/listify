import styled from 'styled-components'

import { media } from '@/theme/media'

export const Wrapper = styled.section`
  padding: ${({ theme }) => theme.size.units(8)} 0;
`

export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.size.units(4)};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.size.units(6)};
`

export const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.size.units(4)};

  ${media.greaterThan('md')`
    grid-template-columns: repeat(2, 1fr);
  `}

  ${media.greaterThan('lg')`
    grid-template-columns: repeat(3, 1fr);
  `}
`

export const FeatureCard = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: ${({ theme }) => theme.size.units(1.5)};
  padding: ${({ theme }) => theme.size.units(2)};
  transition: ${({ theme }) => theme.transition.standard()};

  &:hover {
    transform: translateY(-5px);
  }
`

export const FeatureIcon = styled.div`
  width: ${({ theme }) => theme.size.units(6)};
  height: ${({ theme }) => theme.size.units(6)};
  border-radius: 50%;
  background-color: rgba(29, 185, 84, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.size.units(2)};

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`

export const FeatureTitle = styled.h3`
  font-size: ${({ theme }) => theme.size.units(2.5)};
  margin-bottom: ${({ theme }) => theme.size.units(1)};
`

export const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
`
