"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

interface AppStateProps {
  isNavOpen: boolean;
  setIsNavOpen: (isNavOpen: any) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (isSearchOpen: any) => void;
  isMobileNavOpen: boolean;
  setIsMobileNavOpen: (isMobileNavOpen: any) => void;
  isMobileSearchOpen: boolean;
  setIsMobileSearchOpen: (isMobileSearchOpen: any) => void;
  isScrollUpButtonVisible: boolean;
  setIsScrollUpButtonVisible: (isScrollUpButtonVisible: any) => void;
  breadcrumbs: any;
  setBreadcrumbs: (breadcrumbs: any) => void;
}

const initialAppState = {
  isNavOpen: false,
  setIsNavOpen: () => {},
  isSearchOpen: false,
  setIsSearchOpen: () => {},
  isMobileNavOpen: false,
  setIsMobileNavOpen: () => {},
  isMobileSearchOpen: false,
  setIsMobileSearchOpen: () => {},
  isScrollUpButtonVisible: false,
  setIsScrollUpButtonVisible: () => {},
  breadcrumbs: null,
  setBreadcrumbs: () => {},
};

export const AppContext = createContext<AppStateProps>(initialAppState);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState<boolean>(false);
  const [isScrollUpButtonVisible, setIsScrollUpButtonVisible] =
    useState<boolean>(false);
  const [breadcrumbs, setBreadcrumbs] = useState<any>(false);

  const appState = useMemo(
    () => ({
      isNavOpen,
      setIsNavOpen,
      isSearchOpen,
      setIsSearchOpen,
      isMobileNavOpen,
      setIsMobileNavOpen,
      isMobileSearchOpen,
      setIsMobileSearchOpen,
      isScrollUpButtonVisible,
      setIsScrollUpButtonVisible,
      breadcrumbs,
      setBreadcrumbs,
    }),
    [
      isNavOpen,
      isSearchOpen,
      isMobileNavOpen,
      isMobileSearchOpen,
      isScrollUpButtonVisible,
      breadcrumbs,
    ]
  );
  return <AppContext.Provider value={appState}>{children}</AppContext.Provider>;
}

export function useAppContext(): AppStateProps {
  return useContext(AppContext);
}
