import Link from 'next/link'
import styled from 'styled-components'

import { media } from '@/theme/media'

export const Wrapper = styled.footer`
  padding: ${({ theme }) => `${theme.size.units(4)} ${theme.size.units(3)}`};
  text-align: center;
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 0.875rem;

  a {
    color: ${(props) => props.theme.colors.textSecondary};
  }
`

export const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  gap: ${({ theme }) => theme.size.units(2)};

  ${media.greaterThan('sm')`
    flex-direction: row;
  `}
`

export const FooterLinks = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.size.units(3)};
`

export const FooterLink = styled(Link)`
  color: ${(props) => props.theme.colors.textSecondary};
  text-decoration: none;
  transition: ${({ theme }) => theme.transition.standard()};

  &:hover {
    color: ${(props) => props.theme.colors.text};
  }
`
