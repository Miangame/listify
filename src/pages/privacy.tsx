import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps } from 'next'

import {
  Paragraph,
  PrivacyContainer,
  Section,
  Title
} from '@/components/PrivacyPage/PrivacyPage.styled'

const PrivacyPolicy = () => {
  const { t } = useTranslation('privacy')

  return (
    <PrivacyContainer>
      <Title>{t('title')}</Title>

      <Section>
        <Paragraph>{t('intro')}</Paragraph>
      </Section>

      <Section>
        <h2>{t('data_collection_title')}</h2>
        <Paragraph>{t('data_collection_description')}</Paragraph>
      </Section>

      <Section>
        <h2>{t('analytics_title')}</h2>
        <Paragraph>{t('analytics_description')}</Paragraph>
      </Section>

      <Section>
        <h2>{t('payments_title')}</h2>
        <Paragraph>{t('payments_description')}</Paragraph>
      </Section>

      <Section>
        <h2>{t('data_sharing_title')}</h2>
        <Paragraph>{t('data_sharing_description')}</Paragraph>
      </Section>

      <Section>
        <h2>{t('user_rights_title')}</h2>
        <Paragraph>{t('user_rights_description')}</Paragraph>
      </Section>

      <Section>
        <h2>{t('changes_title')}</h2>
        <Paragraph>{t('changes_description')}</Paragraph>
      </Section>
    </PrivacyContainer>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'head',
        'header',
        'privacy',
        'cookies',
        'footer'
      ]))
    }
  }
}

export default PrivacyPolicy
