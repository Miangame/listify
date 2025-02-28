import styled, { DefaultTheme } from 'styled-components'

import { media } from '@/theme/media'

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${({ theme }) => `${theme.size.units(8)} 0`};

  ${media.greaterThan('md')`
    padding: ${({ theme }: DefaultTheme) => `${theme.size.units(12)} 0`};
  `};
`

export const HeroTitle = styled.h1`
  font-size: ${({ theme }) => theme.size.units(5)};
  margin-bottom: ${({ theme }) => theme.size.units(2)};
  background: linear-gradient(
    90deg,
    ${(props) => props.theme.colors.primary},
    ${(props) => props.theme.colors.accent}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  ${media.greaterThan('md')`
    font-size: ${({ theme }: DefaultTheme) => theme.size.units(7)};
  `}

  ${media.greaterThan('lg')`
    font-size: ${({ theme }: DefaultTheme) => theme.size.units(9)};
  `}
`

export const HeroSubtitle = styled.p`
  font-size: ${({ theme }) => theme.size.units(2.25)};
  color: ${(props) => props.theme.colors.textSecondary};
  max-width: ${({ theme }) => theme.size.units(75)};
  margin-bottom: ${({ theme }) => theme.size.units(4)};
  line-height: ${({ theme }) => theme.size.units(3.75)};

  ${media.greaterThan('md')`
    font-size: ${({ theme }: DefaultTheme) => theme.size.units(2.5)};
  `}
`

export const CTAButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.size.units(1)};
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.secondary};
  border: none;
  border-radius: ${({ theme }) => theme.size.units(6.25)};
  padding: 0.75rem 1.5rem;
  padding: ${({ theme }) => `${theme.size.units(1.5)} ${theme.size.units(3)}`};
  font-size: ${({ theme }) => theme.size.units(2)};
  font-weight: 600;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.standard()};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(29, 185, 84, 0.3);
  }
`
