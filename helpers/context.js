import React, { useContext, createContext, useEffect, useState } from 'react'


export const AppContext = createContext()

export function ContextWrapper({ children }) {
  const [screenWidth, setScreenWidth] = useState(1920)
  const [screenHeight, setScreenHeight] = useState(1080)

  useEffect(() => {
    let mounted = true
    setScreenWidth(window.innerWidth)
    setScreenHeight(window.innerHeight)

    window.addEventListener('resize', () => {
      if (mounted) {
        setScreenWidth(window.innerWidth)
        setScreenHeight(window.innerHeight)
      }
    })

    return () => mounted = false
  }, [setScreenWidth, setScreenHeight])

  return (
    <AppContext.Provider value={{ screenWidth, screenHeight }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}