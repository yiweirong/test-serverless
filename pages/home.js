import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import { Button } from 'antd'
import styled from '@emotion/styled'
import { useGetUser } from '../apis'
import Page from 'components/page'
import Constants from 'constants'


const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  flex: 1;
`
const Btn = styled(Button)`
  display: flex;
  color: #ff0000;
`
const testId = `${Constants.AUID}_HOME`


const Home = () => {
  const { user } = useGetUser()

  // useEffect(() => {
  //   console.log('user: ', user)
  //   console.log('refresh', localStorage.getItem(Constants.HPWSAS_REFRESH_TOKEN))
  // }, [user])

  // useEffect(() => {
  //   console.log('error: ', error?.response)
  // }, [error])

  return (
    <Page id={testId}>
      <Content>
        [Main Content]
      </Content>
    </Page>
  )
}

export default Home