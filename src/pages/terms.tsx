import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps } from 'next'

import {
  Paragraph,
  Section,
  TermsContainer,
  Title
} from '@/components/TermsPage/TermsPage.styled'

const Terms = () => {
  const { t } = useTranslation('terms')

  return (
    <TermsContainer>
      <Title>{t('title')}</Title>

      <Section>
        <Paragraph>{t('intro')}</Paragraph>
      </Section>

      <Section>
        <h2>{t('usage_title')}</h2>
        <Paragraph>{t('usage_description')}</Paragraph>
      </Section>

      <Section>
        <h2>{t('payments_title')}</h2>
        <Paragraph>{t('payments_description')}</Paragraph>
      </Section>

      <Section>
        <h2>{t('data_title')}</h2>
        <Paragraph>{t('data_description')}</Paragraph>
      </Section>

      <Section>
        <h2>{t('changes_title')}</h2>
        <Paragraph>{t('changes_description')}</Paragraph>
      </Section>

      <Section>
        <h2>{t('analytics_title')}</h2>
        <Paragraph>{t('analytics_description')}</Paragraph>
      </Section>
    </TermsContainer>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'head',
        'header',
        'terms',
        'cookies',
        'footer'
      ]))
    }
  }
}

export default Terms
