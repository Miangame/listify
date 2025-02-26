import { default as NextHead } from 'next/head'
import { useTranslation } from 'next-i18next'

export const Head = () => {
  const { t } = useTranslation('head')

  return (
    <NextHead>
      <title>Listify</title>
      <meta name="description" content={t('description')} />
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover"
      />
    </NextHead>
  )
}
