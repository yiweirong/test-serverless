import { useEffect, useState } from 'react'
import { useQuery, useMutation } from 'react-query'
import qs from 'qs'
import jwtDecode from 'jwt-decode'
import Constants from 'constants/index'
import { useLogout } from 'helpers/logout'
import { logApiError } from 'helpers'
import { instance as axios } from './axios-instance'


let access_token

export const getAccessToken = () => {
  return access_token
}

export const setAccessToken = token => {
  if (token) {
    access_token = token
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    access_token = null
    axios.defaults.headers.common['Authorization'] = undefined
  }
}

export function useGetLoginUrl() {
  const { isSuccess, data, error, status } = useQuery(['getLoginUrl'], async () => {
    const req_url = `${process.env.NEXT_PUBLIC_BACKEND_SVC}/v1/login/callback?redirect_uri=${process.env.NEXT_PUBLIC_WEB_HOST}`
    const { data: result } = await axios.get(req_url)

    return result.redirect
  }, {
    onError: logApiError
  })

  return { loginUrl: data, error, status }
}

export function useRequireToken() {
  const { mutate } = useMutation(async ({ code }) => {
    const req_url = `${process.env.NEXT_PUBLIC_BACKEND_SVC}/v1/token`
    const body = {
      code,
      grant_type: 'authorization_code',
      redirect_uri: `${process.env.NEXT_PUBLIC_WEB_HOST}`
    }

    const { data: result } = await axios.post(
      req_url, 
      qs.stringify(body), 
      {
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    return result
  })

  return { requireToken: mutate }
}

export function useRefreshToken() {
  const { mutate } = useMutation(async () => {
    const req_url = `${process.env.NEXT_PUBLIC_BACKEND_SVC}/v1/token/refresh`
    const body = {
      refresh_token: localStorage.getItem(Constants.HPWSAS_REFRESH_TOKEN),
      grant_type: 'refresh_token'
    }

    const { data: result } = await axios.post(
      req_url, 
      qs.stringify(body), 
      {
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    return result
  })

  return { refreshToken: mutate }
}

export function useRevokeToken() {
  const { logout } = useLogout()
  const { mutate } = useMutation(async () => {
    const req_url = `${process.env.NEXT_PUBLIC_BACKEND_SVC}/v1/token/revoke`
    const body = {
      token_type_hint: 'access_token'
    }

    const { data: result } = await axios.post(
      req_url, 
      qs.stringify(body), 
      {
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    return result
  }, {
    onSuccess: (res) => {
      logout()
    },
    onError: logApiError
  })

  return { revokeToken: mutate }
}

export function useGetUser() {
  const { isSuccess, data, error, status } = useQuery(['getUser'], async () => {
    const id = jwtDecode(access_token).user_id
    const req_url = `${process.env.NEXT_PUBLIC_BACKEND_SVC}/v1/user/${id}`
    const { data: result } = await axios.get(req_url)

    return result
  })

  return { user: data, error, status }
}