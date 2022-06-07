import { useEffect, useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import Constants from 'constants'
import { setAccessToken } from 'apis'
import { useBroadcastChannel } from 'helpers/broadcast-channel'

export function useLogout() {
  const { push } = useRouter()
  const { PageRoutes, BroadcastType } = Constants
  const { channel } = useBroadcastChannel()

  const logout = useCallback(() => {
    console.log('Logout HP Wolf Security Admin System')
    setAccessToken(null)
    localStorage.removeItem(Constants.HPWSAS_REFRESH_TOKEN)
    channel.postMessage({ type: BroadcastType.LOGOUT })
    // window.location.href = process.env.NEXT_PUBLIC_HPID_LOGOUT_CALLBACK
    push({ pathname: PageRoutes.INDEX })
  }, [])

  return { logout }
}