import React, { createContext, useContext, useEffect, useState } from 'react'

type Props = {
  children: React.ReactNode;
}
type UserData = {
  username: string;
  email: string;
  token: string;
}
interface ContextProps {
  login: (data: UserData) => void;
  userData: UserData | {};
  logout: () => void;
}

const UserContext = createContext({} as ContextProps)

export const UserProvider = ({ children }: Props) => {
  const [userData, setUserData] = useState<UserData | {}>({})

  const login = async (data: UserData) => {
    setUserData(data)

    await localStorage.setItem('managee:userData', JSON.stringify(data))
  }

  const logout = async () => {
    await localStorage.removeItem('managee:userData')
  }

  useEffect(() => {
    const loadUserData = async () => {
      const clientInfo = await localStorage.getItem('managee:userData')

      if (clientInfo) {
        setUserData(JSON.parse(clientInfo))
      }
    }

    loadUserData()
  }, [])

  return (
    <UserContext.Provider value={{ login, userData, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error('useUser must be used withuSERcONTEXT')
  }

  return context
}
