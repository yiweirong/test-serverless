import React, { useState, useEffect, useCallback } from 'react'
import { BroadcastChannel } from 'broadcast-channel'
import Router, { useRouter } from 'next/router'
import Constants from 'constants'
import { setAccessToken } from 'apis'

let channel

const createChannel = () => {
  channel = new BroadcastChannel(Constants.BROADCAST_CHANNEL_NAME, {
    idb: {
      onclose: () => {
        channel.close()
        createChannel()
      }
    }
  })

  channel.onmessage = msg => {
    switch(msg.type) {
      case Constants.BroadcastType.LOGOUT:
        console.log('=== LOGOUT by BROADCAST ===')
        setAccessToken(null)
        localStorage.removeItem(Constants.HPWSAS_REFRESH_TOKEN)
        // window.location.href = process.env.NEXT_PUBLIC_HPID_LOGOUT_CALLBACK
        Router.push({ pathname: Constants.PageRoutes.INDEX })
        break
      case Constants.BroadcastType.REFRESH_TOKEN:
        setAccessToken(msg.access_token)
        localStorage.setItem(Constants.HPWSAS_REFRESH_TOKEN, msg.refresh_token)
        break
    }
  }

  console.log('=== BROADCAST CHANNEL CREATED ===')
}

createChannel()

export function useBroadcastChannel() {
  return { channel }
}