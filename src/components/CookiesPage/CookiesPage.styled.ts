import styled from 'styled-components'

export const CookiesContainer = styled.div`
  max-width: ${({ theme }) => theme.size.units(100)};
  margin: 0 auto;
  padding: ${({ theme }) => theme.size.units(2.5)};
`

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.size.units(4)};
  margin-bottom: ${({ theme }) => theme.size.units(2.5)};
  text-align: center;
`

export const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.size.units(2.5)};
`

export const Paragraph = styled.p`
  font-size: ${({ theme }) => theme.size.units(2)};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.size.units(1.25)};
`
