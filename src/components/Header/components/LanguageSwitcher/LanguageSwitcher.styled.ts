import styled from 'styled-components'

export const LanguageSelector = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.size.units(1)};
  cursor: pointer;
`

export const LanguageButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.text};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.size.units(1)};
  font-size: 0.875rem;
  cursor: pointer;
  padding: ${({ theme }) => theme.size.units(1)};
  border-radius: ${({ theme }) => theme.size.units(0.5)};
  transition: ${({ theme }) => theme.transition.standard()};

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`

export const LanguageDropdown = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: ${({ theme }) => theme.size.units(0.5)};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: ${(props) => (props.$isOpen ? 'block' : 'none')};
  z-index: 10;
`

export const LanguageOption = styled.button`
  display: block;
  width: 100%;
  padding: ${({ theme }) => `${theme.size.units(1)} ${theme.size.units(2)}`};
  text-align: left;
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.standard()};

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`
