import styled from 'styled-components'

import { media } from '@/theme/media'

export const Wrapper = styled.section`
  padding: ${({ theme }) => `${theme.size.units(8)} 0`};
  background-color: rgba(255, 255, 255, 0.02);
`

export const StepsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.size.units(1)};
  max-width: ${({ theme }) => theme.size.units(100)};
  margin: 0 auto;

  ${media.greaterThan('md')`
    flex-direction: row;
  `}
`

export const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1;
`

export const StepNumber = styled.div`
  width: ${({ theme }) => theme.size.units(5)};
  height: ${({ theme }) => theme.size.units(5)};
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.size.units(2)};
`

export const StepTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: ${({ theme }) => theme.size.units(1)};
`

export const StepDescription = styled.p`
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 0.875rem;
`
