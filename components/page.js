import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import Header from './header'
import Menu from './menu'

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
`
const Content = styled.div`
  display: flex;
  flex: 1;
`

const Page = ({ children, id, style }) => {
  return (
    <Container id={`${id}_Page`} style={style}>
      <Header />
      <Content>
        <Menu />
        {children}
      </Content>
    </Container>
  )
}

export default Page