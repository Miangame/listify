import {
  FooterContent,
  FooterLink,
  FooterLinks,
  Wrapper
} from './Footer.styled'

export const Footer = () => {
  return (
    <Wrapper>
      <FooterContent>
        <div>© {new Date().getFullYear()} Listify. All rights reserved.</div>
        <FooterLinks>
          <FooterLink href="/terms">Terms</FooterLink>
          <FooterLink href="/privacy">Privacy</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
        </FooterLinks>
      </FooterContent>
    </Wrapper>
  )
}
