import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import { ArrowRightOutlined, LoadingOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import styled from '@emotion/styled'
import { useTranslation } from 'react-i18next'
import Constants from 'constants'
import { useGetLoginUrl } from 'apis'

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: center;
  filter: ${({filter}) => `blur(${filter}px)`};
  transition: filter 0.5s;
  transition-timing-function: ease-in-out;
`
const Bg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  filter: blur(0px);
  z-index: -10;
  background-image: linear-gradient(to top, #d299c2 0%, #fef9d7 100%);
  background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);
  background-image: linear-gradient(to top, #f5b087 0%, #055d8b 100%);
  background-image: linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%);
  background-image: linear-gradient(120deg, #055d8b 0%, #f5b087 100%);
  background-image: linear-gradient(120deg, #8ec5fc 0%, #e0c3fc 100%);
  background-image: linear-gradient(-20deg, #fddb92 0%, #d1fdff 100%);
`
const Title = styled.div`
  font-size: 56px;
  margin-top: 32px;
  color: #280e3b;
`
const SignInBtn = styled.div`
  margin-top: 48px;
  width: 200px;
  height: 40px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  color: #fff;
  background-color: #d387db78;
  cursor: pointer;
  &:hover {
    background-color: #85b8cb;
  }
`
const DocsLink = styled.div`
  width: 200px;
  font-size: 12px;
  margin-top: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #280e3b;
  cursor: pointer;
  &:hover {
    color: #85b8cb;
  }
`
const Footer = styled.div`
  position: absolute;
  display: flex;
  font-family: 'HPSimplified-Light';
  flex-direction: row-reverse;
  align-items: center;
  padding: 0 36px 0 36px;
  color: #280e3b;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 68px;
  z-index: 10;
  cursor: default;
  background-color: #ffffff32;
`
const Logo = styled.img`
  width: 24px;
  height: 24px;
  margin-left: 12px;
`
const testId = `${Constants.AUID}_LOGIN`

const Login = () => {
  const { t } = useTranslation()
  const { loginUrl } = useGetLoginUrl()
  const [filter, setFilter] = useState(0)

  const onLoginClick = useCallback(() => {
    setFilter(5)
    setTimeout(() => {
      setFilter(0)
      window.open(loginUrl)
      // window.location.href = loginUrl
    }, 500)
  }, [setFilter, loginUrl])

  // useEffect(() => {
  //   console.log(loginUrl)
  // }, [loginUrl])

  // useEffect(() => {
  //   console.log('error: ', error?.response)
  // }, [error])

  return (
    <Container id={`${testId}_login_page`} filter={filter}>
      <Bg />
      <Title id={`${testId}_title`}>{`${t('login.welcome')} ${t('common.title')}`}</Title>
      <SignInBtn onClick={onLoginClick}>
        <span>{t('login.signin')}</span>
      </SignInBtn>
      <DocsLink>
        <span>{t('login.docsLink')}</span>
      </DocsLink>
      <Footer>
        <Logo src='/imgs/logo.png'/>
        <span>{t('login.poweredBy')}</span>
      </Footer>
    </Container>
  )
}

export default Login