import styled from 'styled-components'

export const CookieBannerContainer = styled.div<{ $visible: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 15px;
  display: ${({ $visible }) => ($visible ? 'flex' : 'none')};
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  z-index: 1000;
`

export const CookieText = styled.p`
  margin: 0;
  flex: 1;
  padding-right: 10px;
`

export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`

export const Button = styled.button`
  background: #f8b400;
  border: none;
  color: black;
  padding: 8px 12px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background: #e6a200;
  }
`
