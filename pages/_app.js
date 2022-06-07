import React, { useMemo, useState, memo } from 'react'
import App from 'next/app'
import Head from 'next/head'
import {
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { createGlobalStyle } from "styled-components"
import 'antd/dist/antd.less'
// import fetch from 'isomorphic-unfetch'
import i18n from '../i18n'
import { ContextWrapper } from '../helpers/context'


const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'HPSimplified-Regular';
    src: url('/fonts/HPSimplified_Rg.ttf');
  }

  @font-face {
    font-family: 'HPSimplified-Light';
    src: url('/fonts/HPSimplified_Lt.ttf');
  }

  body {
    position: relative;
    width: 100vw;
    height: 100vh;
    font-family: 'HPSimplified-Regular' !important;
    color: #000 !important;
  }

  #__next {
    height: -webkit-fill-available;
  }
`
const queryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 'Infinity', // 1 minutes
      cacheTime: 1000 * 60 * 5, //5 minutes
      refetchOnMount: "always",
      refetchOnWindowFocus: false,
      refetchOnReconnect: "always",
      refetchInterval: false, //1 minutes
      refetchIntervalInBackground: false,
    },
    mutations: {
      retry: 2,
    },
  },
}

const queryClient = new QueryClient(queryClientConfig)

function AppWrapper({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Wolf Security Admin System</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
      </Head>
      <GlobalStyle />
      <ContextWrapper>
        <Component {...pageProps} />
      </ContextWrapper>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider >
  )
}

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return <AppWrapper Component={Component} pageProps={pageProps} />
  }
}

export default MyApp