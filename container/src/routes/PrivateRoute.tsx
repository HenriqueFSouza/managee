import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { useUser } from 'hooks/UserContext'
import { api } from '../services/api'


function PrivateRoute({ isAdmin }: { isAdmin?: boolean }) {
  const { logout } = useUser();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAdmin) return
    const user = localStorage.getItem('managee:userData');
    const parsedUser = user ? JSON.parse(user) : null;

    async function checkAuth() {
      try {
        if (parsedUser && parsedUser.token) {
          // Set the token in the api instance for the subsequent request
          api.defaults.headers.common['Authorization'] = `Bearer ${parsedUser.token}`;
          await api.get('/auth');
        } else {
          throw new Error('No token found');
        }
      } catch (err) {
        logout();
        navigate('/', { replace: true });
      }
    }

    checkAuth();
  }, [logout]);

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