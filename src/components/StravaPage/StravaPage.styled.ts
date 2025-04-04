import { FaStrava } from 'react-icons/fa'
import styled from 'styled-components'

export const Wrapper = styled.main`
  padding: ${({ theme }) => `${theme.size.units(4)} ${theme.size.units(2)}`};
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

export const StyledStravaIcon = styled(FaStrava)`
  color: ${({ theme }) => theme.colors.strava};
`

export const StravaTitle = styled.h1`
  font-size: ${({ theme }) => theme.size.units(4)};
  margin-bottom: ${({ theme }) => theme.size.units(4)};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.size.units(2)};
`

export const StravaSubtitle = styled.p`
  font-size: ${({ theme }) => theme.size.units(2)};
  margin-bottom: ${({ theme }) => theme.size.units(4)};
  color: ${({ theme }) => theme.colors.textSecondary};
`

export const ConnectWithStravaButton = styled.button`
  background-color: ${({ theme }) => theme.colors.strava};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => `${theme.size.units(1)} ${theme.size.units(2)}`};
  border-radius: ${({ theme }) => theme.size.units(1)};
  border: none;
  cursor: pointer;
  font-size: ${({ theme }) => theme.size.units(2)};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.size.units(2)};
`
