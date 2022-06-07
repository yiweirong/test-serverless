import React, { useEffect, useMemo } from 'react'
import styled from '@emotion/styled'
import { Button, Collapse } from 'antd'
import { DeleteOutlined, AppstoreOutlined  } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import Constants from 'constants'


const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 260px;
  height: 100%;
  border-right: 1px solid #e4e4e4;
  font-size: 36px;
`
const Group = styled.div`
  width: 100%;
  min-height: 48px;
  display: flex;
  flex-direction: column;
  font-size: 18px;
  border-bottom: 1px solid #e4e4e4;
`
const Item = styled.div`
  width: 100%;
  min-height: 32px;
  display: flex;
  font-size: 14px;
  font-weight: 400;
  align-items: center;
  padding-left: 20px;
  cursor: pointer;
  background-color: #ffffff00;
  transition: background-color 0.2s;
  transition-timing-function: ease-in-out;

  &:hover {
    background-color: #ace0f9;
  }
`
const testId = `${Constants.AUID}_MENU`


const Menu = () => {
  const { t } = useTranslation()

  return (
    <Container id={`${testId}`}>
      <Collapse defaultActiveKey={['1']} ghost expandIconPosition='right' style={{fontSize: '16px', fontWeight: 600}}>
        <Collapse.Panel header="Subscription Management" key="1">
          <Item>
            <DeleteOutlined style={{marginRight: 8}}/>
            <span>Delete subscription</span>
          </Item>
        </Collapse.Panel>
        {/* <Collapse.Panel header="This is panel header 2" key="2">
          <p>key2</p>
        </Collapse.Panel>
        <Collapse.Panel header="This is panel header 3" key="3">
          <p>key3</p>
        </Collapse.Panel> */}
      </Collapse>
    </Container>
  )
}

export default Menu