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
  border: none;
  border-radius: ${({ theme }) => theme.size.units(6.25)};
  padding: ${({ theme }) => theme.size.units(1)};
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.standard()};
  justify-content: center;

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
  cursor: pointer;
  position: relative;
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

export const CollapseWrapper = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: ${({ theme }) => theme.size.units(6)};
  right: 0;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  width: 100%;
  min-width: ${({ theme }) => theme.size.units(20)};
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.size.units(1)};
  padding: ${({ theme }) => theme.size.units(1)};
  gap: ${({ theme }) => theme.size.units(1)};
  flex-direction: column;
  z-index: 1;
`

export const DesktopTokensWrapper = styled.div`
  display: none;
  align-items: center;
  gap: ${({ theme }) => theme.size.units(1)};

  ${media.greaterThan('sm')`
    display: flex;
    flex-direction: column;
  `}
`

export const ShowCreditWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.size.units(1)};
`

export const BuyMoreCredits = styled.button`
  border: none;
  background-color: transparent;
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 0.875rem;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.standard()};
  text-decoration: underline;

  &:hover {
    color: ${(props) => props.theme.colors.text};
  }
`

export const MobileTokensWrapper = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.size.units(1)};

  ${media.greaterThan('sm')`
    display: none;
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

export const CloseModalButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.size.units(1)};
  right: ${({ theme }) => theme.size.units(1)};
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
`

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.size.units(2)};
  height: 100%;
  justify-content: center;
`

export const ModalTitle = styled.h2`
  font-size: ${({ theme }) => theme.size.units(2.5)};
  font-weight: 600;

  ${media.greaterThan('sm')`
    font-size: ${({ theme }: DefaultTheme) => theme.size.units(4)};
  `}
`

export const ModalDescription = styled.p`
  font-size: ${({ theme }) => theme.size.units(1.5)};

  ${media.greaterThan('sm')`
    font-size: ${({ theme }: DefaultTheme) => theme.size.units(2.5)};
  `}
`

export const ModalPlansWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  gap: ${({ theme }) => theme.size.units(2)};

  ${media.greaterThan('sm')`
    grid-template-columns: repeat(2, 1fr);
  `}
`

export const ModalPlanCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.size.units(1)};
  padding: ${({ theme }) => theme.size.units(2)};
  border-radius: ${({ theme }) => theme.size.units(1)};
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  border: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.standard()};
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
`

export const ModalPlanName = styled.span`
  font-size: ${({ theme }) => theme.size.units(2)};
  font-weight: 600;

  ${media.greaterThan('sm')`
    font-size: ${({ theme }: DefaultTheme) => theme.size.units(3)};
  `}
`

export const ModalPlanPrice = styled.span`
  font-size: ${({ theme }) => theme.size.units(1.5)};

  ${media.greaterThan('sm')`
    font-size: ${({ theme }: DefaultTheme) => theme.size.units(2.5)};
  `}
`

export const ModalPlanCredits = styled.span`
  font-size: ${({ theme }) => theme.size.units(1)};
  color: ${({ theme }) => theme.colors.textSecondary};

  ${media.greaterThan('sm')`
    font-size: ${({ theme }: DefaultTheme) => theme.size.units(1.5)};
  `}
`

export const ModalPlanButton = styled.button`
  border: none;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.secondary};
  padding: ${({ theme }) => `${theme.size.units(1)} ${theme.size.units(2)}`};
  border-radius: ${({ theme }) => theme.size.units(6.25)};
  font-size: ${({ theme }) => theme.size.units(1.5)};
  font-weight: 600;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.standard()};

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.primary};
  }
`
