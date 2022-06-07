import React, { useEffect, useCallback, useMemo, useState } from 'react'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { Dropdown, Menu, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import Constants from 'constants'
import { useGetUser, useRevokeToken } from 'apis'


const Container = styled.div`
  width: 100vw;
  height: 75px;
  min-height: 75px;
  display: flex;
  flex-direction: row;
  padding-right: 20px;
  border-bottom: 1px solid #e4e4e4;
  align-items: center;
  font-size: 36px;
  padding: 0 20px 0 20px;
  background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
  background-image: linear-gradient(-20deg, #fddb92 0%, #d1fdff 100%);
`
const Logo = styled.img`
  width: 42px;
  height: 42px;
  margin: 0 12px 0 12px;
`
const Title = styled.div`
  font-size: 24px;
  color: #333;
`
const MenuItem = styled(Menu.Item)`
  height: 40px;
  display: flex;
  align-items: center;
`
const ItemLabel = styled.span`
  font-size: 16px;
`
const ProfileBtn = styled(Avatar)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  font-size: 20px;
  font-weight: 600;
  cursor: default;
  color: #fcda5e;
  background-color: #002ea6;
  cursor: pointer;
`
const testId = `${Constants.AUID}_HEADER`

const Header = () => {
  const { t } = useTranslation()
  const { push } = useRouter()
  const { user } = useGetUser()
  const [firstLetter, setFirstLetter] = useState('')
  const { revokeToken } = useRevokeToken()

  const onMenuItemClick = useCallback(item => {
    switch(item) {
      case 'signout':
        revokeToken()
        break
      case 'username':
        console.log('goto profile page')
        break
    }
  }, [push])

  const profileMenu = useMemo(() => (
    <Menu style={{ width: 180, marginTop: 16 }} onClick={(evt) => onMenuItemClick(evt.key)}> 
      <MenuItem key='username' id={`${testId}_profile_username`}>
        <ItemLabel>{`${user?.first_name} ${user?.last_name}`}</ItemLabel>
      </MenuItem>
      <MenuItem key='signout' id={`${testId}_profile_signout`}>
        <ItemLabel>{t('common.signOut')}</ItemLabel>
      </MenuItem>
      {/* <MenuItem key={MenuLabel.ACCOUNT} id={`${testId}_profile_account`}>
        <ItemLabel>{t('header.myAccount')}</ItemLabel>
      </MenuItem> */}
    </Menu>
  ), [onMenuItemClick, user])

  useEffect(() => {
    setFirstLetter(user?.first_name.substr(0, 1))
  }, [user, setFirstLetter])

  return (
    <Container id={`${testId}`}>
      <Logo src='/imgs/logo.png'/>
      <Title>{t('common.title')}</Title>
      <div style={{flex: '1'}}></div>
      <Dropdown overlay={profileMenu} placement='bottomRight'>
        <ProfileBtn>{firstLetter}</ProfileBtn>
      </Dropdown>
    </Container>
  )
}

export default Header