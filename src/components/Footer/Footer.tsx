import { useTranslation } from 'next-i18next'

import {
  FooterContent,
  FooterLink,
  FooterLinks,
  Wrapper
} from './Footer.styled'

export const Footer = () => {
  const { t } = useTranslation('footer')

  return (
    <Wrapper>
      <FooterContent>
        <div>
          © {new Date().getFullYear()} Listify. All rights reserved. | Made
          with ❤️ by{' '}
          <a
            href="https://x.com/miguel5gavilan"
            target="_blank"
            rel="noopener noreferrer"
          >
            Miangame
          </a>
        </div>
        <FooterLinks>
          <FooterLink href="/terms">{t('terms')}</FooterLink>
          <FooterLink href="/privacy">{t('privacy')}</FooterLink>
          <FooterLink href="/cookies">{t('cookies')}</FooterLink>
          <FooterLink href="mailto:miangame1@gmail.com">
            {t('contact')}
          </FooterLink>
        </FooterLinks>
      </FooterContent>
    </Wrapper>
  )
}
