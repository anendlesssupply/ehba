'use client'

import React, {createContext, useContext, useMemo, useState} from 'react'

interface AppStateProps {
  isNavOpen: boolean
  setIsNavOpen: (isNavOpen: any) => void
}

const initialAppState = {
  isNavOpen: false,
  setIsNavOpen: () => {},
}

export const AppContext = createContext<AppStateProps>(initialAppState)

export function AppProvider({children}: {children: React.ReactNode}) {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false)

  const appState = useMemo(
    () => ({
      isNavOpen,
      setIsNavOpen,
    }),
    [isNavOpen],
  )
  return <AppContext.Provider value={appState}>{children}</AppContext.Provider>
}

export function useAppContext(): AppStateProps {
  return useContext(AppContext)
}
