import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps } from 'next'

import {
  CookiesContainer,
  Title,
  Section,
  Paragraph
} from '@/components/CookiesPage/CookiesPage.styled'

const CookiesPolicy = () => {
  const { t } = useTranslation('cookies')

  return (
    <CookiesContainer>
      <Title>{t('title')}</Title>

      <Section>
        <Paragraph>{t('intro')}</Paragraph>
      </Section>

      <Section>
        <h2>{t('what_are_cookies_title')}</h2>
        <Paragraph>{t('what_are_cookies_description')}</Paragraph>
      </Section>

      <Section>
        <h2>{t('how_we_use_cookies_title')}</h2>
        <Paragraph>{t('how_we_use_cookies_description')}</Paragraph>
      </Section>

      <Section>
        <h2>{t('types_of_cookies_title')}</h2>
        <Paragraph>{t('types_of_cookies_description')}</Paragraph>
      </Section>

      <Section>
        <h2>{t('managing_cookies_title')}</h2>
        <Paragraph>{t('managing_cookies_description')}</Paragraph>
      </Section>

      <Section>
        <h2>{t('changes_title')}</h2>
        <Paragraph>{t('changes_description')}</Paragraph>
      </Section>
    </CookiesContainer>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'head',
        'header',
        'cookies',
        'footer'
      ]))
    }
  }
}

export default CookiesPolicy
