import { FiLoader } from 'react-icons/fi'
import styled, { DefaultTheme, keyframes } from 'styled-components'

import { media } from '@/theme/media'

export const Wrapper = styled.main`
  padding: ${({ theme }) => `${theme.size.units(4)} ${theme.size.units(2)}`};
  width: 100%;
`

export const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.size.units(4)};
  margin-bottom: ${({ theme }) => theme.size.units(4)};
`

export const GeneratorCard = styled.div`
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.size.units(1.5)};
  padding: ${({ theme }) => theme.size.units(4)};
  margin-bottom: ${({ theme }) => theme.size.units(4)};
`

export const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.size.units(3)};
`

export const Label = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.size.units(1)};
  font-weight: 600;
  font-size: 0.875rem;
`

export const TextArea = styled.textarea`
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.size.units(1)};
  padding: ${({ theme }) => theme.size.units(2)};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.size.units(2)};
  resize: vertical;
  min-height: ${({ theme }) => theme.size.units(15)};
  transition: ${({ theme }) => theme.transition.standard()};

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.textSecondary};
  }
`

export const TextAreaCounter = styled.small<{ $isOverLimit: boolean }>`
  display: block;
  margin-top: ${({ theme }) => theme.size.units(1)};
  font-size: 0.75rem;
  text-align: right;
  color: ${(props) =>
    props.$isOverLimit
      ? props.theme.colors.danger
      : props.theme.colors.textSecondary};
`

export const GenerateButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.size.units(1)};
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.secondary};
  border: none;
  border-radius: ${({ theme }) => theme.size.units(6.25)};
  padding: ${({ theme }) => `${theme.size.units(1.5)} ${theme.size.units(3)}`};
  font-size: ${({ theme }) => theme.size.units(2)};
  font-weight: 600;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.standard()};
  width: 100%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(29, 185, 84, 0.3);
  }

  &:disabled {
    background-color: #1db95480;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`

const spinAnimation = keyframes`
  to {
    transform: rotate(360deg);
  }
`

export const StyledLoader = styled(FiLoader)`
  animation: ${spinAnimation} 1s linear infinite;
`

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.size.units(8)} 0`};
  gap: ${({ theme }) => theme.size.units(2)};
`

export const LoadingText = styled.div`
  font-size: ${({ theme }) => theme.size.units(2)};
  color: ${(props) => props.theme.colors.textSecondary};
`

export const ResultsSection = styled.section<{ $visible: boolean }>`
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  height: ${(props) => (props.$visible ? 'auto' : 0)};
  transition: ${({ theme }) => theme.transition.standard()};
`

export const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.size.units(2)};
  gap: ${({ theme }) => theme.size.units(2)};

  ${media.greaterThan('md')`
    flex-direction: row;
    align-items: flex-end;
  `}
`

export const ResultsTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.size.units(1)};
`

export const ResultsTitle = styled.h2`
  font-size: ${({ theme }) => theme.size.units(3)};
`

export const ResultsSubtitle = styled.h3`
  font-size: ${({ theme }) => theme.size.units(1.5)};
`

export const ImportButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.size.units(1)};
  background-color: ${(props) => props.theme.colors.accent};
  color: ${(props) => props.theme.colors.text};
  border: none;
  border-radius: ${({ theme }) => theme.size.units(6.25)};
  padding: ${({ theme }) => `${theme.size.units(1)} ${theme.size.units(2)}`};
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.standard()};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(155, 77, 238, 0.3);
  }

  ${media.greaterThan('sm')`
    padding: ${({ theme }: DefaultTheme) => `${theme.size.units(1.5)} ${theme.size.units(3)}`};
    font-size: ${({ theme }: DefaultTheme) => theme.size.units(2)};
  `}
`

export const SongList = styled.div`
  background-color: ${(props) => props.theme.colors.card};
  border-radius: ${({ theme }) => theme.size.units(1.5)};
  overflow: hidden;
`

export const SongListHeader = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr 100px;
  padding: ${({ theme }) => `${theme.size.units(2)} ${theme.size.units(2)}`};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  font-size: 0.75rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.textSecondary};
  text-transform: uppercase;

  ${media.greaterThan('md')`
    grid-template-columns: 50px 1fr 1fr 100px;
  `}
`

export const SongItem = styled.div`
  display: grid;
  grid-template-columns: 50px 50px 1fr 100px;
  padding: ${({ theme }) => `${theme.size.units(1.5)} ${theme.size.units(2)}`};
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  transition: ${({ theme }) => theme.transition.standard()};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }

  ${media.greaterThan('md')`
    grid-template-columns: 50px 50px 1fr 1fr 100px;
  `}
`

export const SongNumber = styled.div`
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.size.units(1)};
`

export const StyledCheckbox = styled.input`
  appearance: none;
  width: ${({ theme }) => theme.size.units(2)};
  height: ${({ theme }) => theme.size.units(2)};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${({ theme }) => theme.size.units(0.5)};
  background-color: ${(props) => props.theme.colors.card};
  cursor: pointer;

  &:checked {
    background-color: ${(props) => props.theme.colors.primary};
    border-color: ${(props) => props.theme.colors.primary};
  }
`

export const SongListHeaderNumber = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.size.units(1)};
`

export const SongInfo = styled.div`
  display: flex;
  flex-direction: column;
`

export const SongTitle = styled.div`
  font-weight: 500;
  margin-bottom: ${({ theme }) => theme.size.units(0.5)};
`

export const SongArtist = styled.div`
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.textSecondary};
`

export const SongAlbum = styled.div`
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.textSecondary};
  display: none;

  ${media.greaterThan('md')`
    display: block;
  `}
`

export const SongDuration = styled.div`
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.textSecondary};
  text-align: right;
  display: flex;
  gap: ${({ theme }) => theme.size.units(1)};
  align-items: center;
  justify-content: center;
`

export const SongAlbumCover = styled.div`
  width: ${({ theme }) => theme.size.units(5)};
  height: ${({ theme }) => theme.size.units(5)};
  border-radius: ${({ theme }) => theme.size.units(0.5)};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
