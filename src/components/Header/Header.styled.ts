import styled, { DefaultTheme } from 'styled-components'

import { media } from '@/theme/media'

export const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => `${theme.size.units(4)} ${theme.size.units(3)}`};
`

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.size.units(1)};
  font-size: ${({ theme }) => theme.size.units(3)};

  span {
    font-weight: 700;
    background: linear-gradient(
      90deg,
      ${(props) => props.theme.colors.primary},
      ${(props) => props.theme.colors.accent}
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`

export const LoginButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.size.units(1)};
  background-color: transparent;
  color: ${(props) => props.theme.colors.text};
  border: 1px solid ${(props) => props.theme.colors.primary};
  border-radius: ${({ theme }) => theme.size.units(6.25)};
  padding: ${({ theme }) => `${theme.size.units(1)} ${theme.size.units(2.5)}`};
  font-size: ${({ theme }) => theme.size.units(1.5)};
  font-weight: 600;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.standard()};

  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.secondary};
  }
`

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.size.units(1)};
  background-color: transparent;
  color: ${(props) => props.theme.colors.text};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${({ theme }) => theme.size.units(6.25)};
  padding: ${({ theme }) => theme.size.units(1)};
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.standard()};

  & > span {
    display: none;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  ${media.greaterThan('sm')`
    padding: ${({ theme }: DefaultTheme) => `${theme.size.units(1)} ${theme.size.units(2.5)}`};

    span {
      display: block;
    }
  `}
`

export const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.size.units(2)};
`

export const UserAvatar = styled.div`
  width: ${({ theme }) => theme.size.units(5)};
  height: ${({ theme }) => theme.size.units(5)};
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.card};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const UserInfo = styled.div`
  display: none;
  flex-direction: column;

  ${media.greaterThan('sm')`
    display: flex;
  `}
`

export const UserName = styled.span`
  font-weight: 600;
  font-size: 0.875rem;
`

export const UserPlan = styled.span`
  font-size: 0.75rem;
  color: ${(props) => props.theme.colors.textSecondary};
`

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.size.units(2)};
`
