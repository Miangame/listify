import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { CiGlobe } from 'react-icons/ci'

import {
  LanguageButton,
  LanguageDropdown,
  LanguageOption,
  LanguageSelector
} from './LanguageSwitcher.styled'

export const LanguageSwitcher = () => {
  const { t } = useTranslation('common')

  const { pathname, asPath, locale, push, query } = useRouter()

  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)

  const languages = [
    {
      code: 'en',
      name: t('english')
    },
    {
      code: 'es',
      name: t('spanish')
    },
    {
      code: 'fr',
      name: t('french')
    }
  ]

  const handleChangeLanguage = (newLocale: string) => () => {
    if (newLocale !== locale) {
      push({ pathname, query }, asPath, { locale: newLocale })
    }

    setIsLanguageDropdownOpen(false)
  }

  const currentLanguage = languages.find((lang) => lang.code === locale)

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
  }

  return (
    <LanguageSelector>
      <LanguageButton onClick={toggleLanguageDropdown}>
        <CiGlobe size={16} />
        {currentLanguage?.name}
      </LanguageButton>
      <LanguageDropdown $isOpen={isLanguageDropdownOpen}>
        {languages
          .filter((lang) => lang.code !== locale)
          .map(({ code, name }) => (
            <LanguageOption key={code} onClick={handleChangeLanguage(code)}>
              {name}
            </LanguageOption>
          ))}
      </LanguageDropdown>
    </LanguageSelector>
  )
}
