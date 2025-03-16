import { signIn, signOut, useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import { useEffect, useRef, useState } from 'react'
import { CiLogin, CiLogout } from 'react-icons/ci'
import { IoIosArrowDown, IoIosArrowUp, IoIosClose } from 'react-icons/io'
import { LuCreditCard, LuMusic } from 'react-icons/lu'
import Modal from 'react-modal'
import { useTheme } from 'styled-components'
import { useRouter } from 'next/router'

import {
  BuyMoreCredits,
  CloseModalButton,
  CollapseWrapper,
  DesktopTokensWrapper,
  HeaderRight,
  LoginButton,
  Logo,
  LogoutButton,
  MobileTokensWrapper,
  ModalContent,
  ModalDescription,
  ModalPlanButton,
  ModalPlanCard,
  ModalPlanCredits,
  ModalPlanName,
  ModalPlanPrice,
  ModalPlansWrapper,
  ModalTitle,
  ShowCreditWrapper,
  UserAvatar,
  UserInfo,
  UserName,
  UserPlan,
  UserProfile,
  Wrapper
} from './Header.styled'
import { LanguageSwitcher } from './components/LanguageSwitcher/LanguageSwitcher'

const plans = [
  {
    name: 'Free',
    price: 0,
    credits: 5
  },
  {
    name: 'Basic',
    price: 1.79,
    credits: 15
  },
  {
    name: 'Pro',
    price: 3.19,
    credits: 25
  },
  {
    name: 'Premium',
    price: 5.49,
    credits: 50
  }
]

export const Header = () => {
  const theme = useTheme()
  const { t } = useTranslation('header')
  const router = useRouter()

  const customModalStyles = {
    content: {
      backgroundColor: theme.colors.background,
      border: 'none',
      borderRadius: theme.size.units(1)
    },
    overlay: {
      backgroundColor: theme.colors.backgroundLight
    }
  }

  const { data: session } = useSession()

  const userProfileRef = useRef<HTMLDivElement>(null)
  const collapseRef = useRef<HTMLDivElement>(null)

  const [isCollapseOpen, setIsCollapseOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleLogin = () => {
    signIn('spotify')
  }

  const handleLogout = () => {
    signOut()
  }

  const handleToggle = () => {
    setIsCollapseOpen((prev) => !prev)
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleLogoClick = () => {
    const currentLocale = router.locale
    router.push('/', '/', {
      locale: currentLocale
    })
  }

  useEffect(() => {
    const handleCollapseClose = (event: MouseEvent) => {
      if (
        userProfileRef.current &&
        !userProfileRef.current.contains(event.target as Node) &&
        collapseRef.current &&
        !collapseRef.current.contains(event.target as Node)
      ) {
        setIsCollapseOpen(false)
      }
    }

    window.addEventListener('click', handleCollapseClose)

    return () => {
      window.removeEventListener('click', handleCollapseClose)
    }
  }, [])

  return (
    <Wrapper>
      <Logo onClick={handleLogoClick}>
        <LuMusic size={24} />
        <span>Listify</span>
      </Logo>
      <HeaderRight>
        {session && (
          <DesktopTokensWrapper>
            <ShowCreditWrapper>
              <LuCreditCard size={16} />
              <span>
                {t('credits')}: {session?.user?.tokens}
              </span>
            </ShowCreditWrapper>

            <BuyMoreCredits onClick={handleOpenModal}>
              {t('buyMoreCredits')}
            </BuyMoreCredits>
          </DesktopTokensWrapper>
        )}
        <LanguageSwitcher />
        {!session ? (
          <LoginButton onClick={handleLogin}>
            <CiLogin size={16} />
            Login
          </LoginButton>
        ) : (
          <UserProfile ref={userProfileRef} onClick={handleToggle}>
            <UserAvatar>
              <img src={session.user?.image} alt={session.user?.name} />
            </UserAvatar>
            <UserInfo>
              <UserName>{session.user?.name}</UserName>
              <UserPlan>Spotify {session.user?.plan}</UserPlan>
            </UserInfo>
            {isCollapseOpen ? (
              <IoIosArrowUp size={16} />
            ) : (
              <IoIosArrowDown size={16} />
            )}
            <CollapseWrapper ref={collapseRef} $isOpen={isCollapseOpen}>
              <MobileTokensWrapper>
                <ShowCreditWrapper>
                  <LuCreditCard size={16} />
                  <span>
                    {t('credits')}: {session?.user?.tokens}
                  </span>
                </ShowCreditWrapper>

                <BuyMoreCredits onClick={handleOpenModal}>
                  {t('buyMoreCredits')}
                </BuyMoreCredits>
              </MobileTokensWrapper>

              <LogoutButton onClick={handleLogout}>
                <CiLogout size={16} />
                <span>Logout</span>
              </LogoutButton>
            </CollapseWrapper>
          </UserProfile>
        )}
      </HeaderRight>

      <Modal isOpen={isModalOpen} style={customModalStyles}>
        <CloseModalButton onClick={handleCloseModal}>
          <IoIosClose size={40} />
        </CloseModalButton>
        <ModalContent>
          <ModalTitle>{t('buyMoreCredits')}</ModalTitle>
          <ModalDescription>{t('buyMoreCreditsDescription')}</ModalDescription>
          <ModalPlansWrapper>
            {plans.map((plan) => (
              <ModalPlanCard key={plan.name}>
                <ModalPlanName>{plan.name}</ModalPlanName>
                <ModalPlanPrice>{plan.price}€</ModalPlanPrice>
                <ModalPlanCredits>
                  {plan.credits} {t('credits')}
                </ModalPlanCredits>
                {plan.name !== 'Free' && (
                  <ModalPlanButton>{t('buy')}</ModalPlanButton>
                )}
              </ModalPlanCard>
            ))}
          </ModalPlansWrapper>
        </ModalContent>
      </Modal>
    </Wrapper>
  )
}
