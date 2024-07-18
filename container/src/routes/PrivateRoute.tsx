import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { useUser } from 'hooks/UserContext'
import { api } from '../services/api'


function PrivateRoute({ isAdmin }: { isAdmin?: boolean }) {
  const { logout } = useUser()
  const navigate = useNavigate()



  React.useEffect(() => {
    const user = localStorage.getItem('managee:userData')

    async function checkAuth() {
      try {
        await api.get('/auth')
      } catch (err) {
        logout()
        navigate('/')
      }
    }

    if (user) checkAuth()
    if (!user) navigate('/')

  }, [])

  return (
    <div className="flex flex-col h-screen w-full">
      {/* Barra superior */}
      <Header isAdmin={isAdmin} />

      {/* Conteúdo principal */}
      <main className="flex justify-center">
        <div className="p-1 flex-grow overflow-y-auto max-w-[1200px]">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default PrivateRoute