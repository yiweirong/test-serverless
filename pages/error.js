import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import { Button } from 'antd'
import styled from '@emotion/styled'
import { useTranslation } from 'react-i18next'
import Header from 'components/header'
import Constants from 'constants'


const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const ErrorBox = styled.div`
  display: flex;
  flex-direction: row;
  height: 250px;
  box-shadow: 2px 4px 20px rgba(0, 0, 0, 0.16);
  border-radius: 2px;
  margin-top: 220px;
  width: 720px;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  background-image: linear-gradient(-225deg, #FFE29F 0%, #FFA99F 48%, #FF719A 100%);
  color: #333;
`
const testId = `${Constants.AUID}_ERROR`


const Error = () => {
  const { t } = useTranslation()

  return (
    <Container id={testId}>
      <Header />
      <ErrorBox>No Permission</ErrorBox>
    </Container>
  )
}

export default Error