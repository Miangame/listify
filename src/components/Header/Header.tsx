import { signIn, signOut, useSession } from 'next-auth/react'
import { CiGlobe, CiLogin, CiLogout } from 'react-icons/ci'
import { LuMusic } from 'react-icons/lu'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import {
  HeaderRight,
  LanguageButton,
  LanguageDropdown,
  LanguageOption,
  LanguageSelector,
  LoginButton,
  Logo,
  LogoutButton,
  UserAvatar,
  UserInfo,
  UserName,
  UserPlan,
  UserProfile,
  Wrapper
} from './Header.styled'

export const Header = () => {
  const { t } = useTranslation('common')

  const { pathname, asPath, locale, push, query } = useRouter()
  const { data: session } = useSession()

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

  const handleLogin = () => {
    signIn('spotify')
  }

  const handleLogout = () => {
    signOut()
  }

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
  }

  return (
    <Wrapper>
      <Logo>
        <LuMusic size={24} />
        <span>Listify</span>
      </Logo>
      <HeaderRight>
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
        {!session ? (
          <LoginButton onClick={handleLogin}>
            <CiLogin size={16} />
            Login
          </LoginButton>
        ) : (
          <UserProfile>
            <UserAvatar>
              <img src={session.user?.image} alt={session.user?.name} />
            </UserAvatar>
            <UserInfo>
              <UserName>{session.user?.name}</UserName>
              <UserPlan>Spotify {session.user?.plan}</UserPlan>
            </UserInfo>
            <LogoutButton onClick={handleLogout}>
              <CiLogout size={16} />
              <span>Logout</span>
            </LogoutButton>
          </UserProfile>
        )}
      </HeaderRight>
    </Wrapper>
  )
}
