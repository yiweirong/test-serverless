import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Constants from 'constants/index'
import { useRequireToken, useRefreshToken, setAccessToken } from 'apis'
import { useLogout } from 'helpers/logout'
import { parsePath, logApiError } from 'helpers'
import { useBroadcastChannel } from 'helpers/broadcast-channel'

const App = () => {
  const router = useRouter()
  const { PageRoutes, BroadcastType } = Constants
  const { requireToken } = useRequireToken()
  const { refreshToken } = useRefreshToken()
  const { logout } = useLogout()
  const { channel } = useBroadcastChannel()

  useEffect(() => {
    const pathInfo = parsePath(router.asPath)
    // console.log('pathInfo: ', pathInfo)

    if ((pathInfo.path === '/' || pathInfo.path.includes('/oauth/callback')) && pathInfo.fields.code) {
      requireToken({ code: pathInfo.fields.code }, { 
        onError: (error) => {
          logApiError(error)
          router.push({ pathname: PageRoutes.LOGIN })
        },
        onSuccess: (res) => {
          const { Payload: { access_token, refresh_token } } = res
          setAccessToken(access_token)
          localStorage.setItem(Constants.HPWSAS_REFRESH_TOKEN, refresh_token)
          channel.postMessage({
            type: BroadcastType.REFRESH_TOKEN,
            access_token,
            refresh_token
          })
          router.push({ pathname: PageRoutes.HOME })
        }
      })
    } else if (localStorage.getItem(Constants.HPWSAS_REFRESH_TOKEN)) {
      refreshToken({}, {
        onError: (error) => {
          logApiError(error)
          logout()
        },
        onSuccess: (res) => {
          const { Payload: { access_token, refresh_token } } = res
          setAccessToken(access_token)
          localStorage.setItem(Constants.HPWSAS_REFRESH_TOKEN, refresh_token)
          channel.postMessage({
            type: BroadcastType.REFRESH_TOKEN,
            access_token,
            refresh_token
          })
          router.push({ pathname: PageRoutes.HOME })
        }
      })
    } else {
      router.push({ pathname: PageRoutes.LOGIN })
    }
  }, [router.asPath])

  return (
    <></>
  )
}

export default App