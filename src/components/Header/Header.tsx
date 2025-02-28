import { signIn, signOut, useSession } from 'next-auth/react'
import { CiLogin, CiLogout } from 'react-icons/ci'
import { LuMusic } from 'react-icons/lu'

import {
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
  const { data: session } = useSession()

  const handleLogin = () => {
    signIn('spotify')
  }

  const handleLogout = () => {
    signOut()
  }

  return (
    <Wrapper>
      <Logo>
        <LuMusic size={24} />
        <span>Listify</span>
      </Logo>
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
    </Wrapper>
  )
}
