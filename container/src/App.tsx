import 'tailwindcss/tailwind.css'
import 'react-toastify/dist/ReactToastify.css';
import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.scss'
import { UserProvider } from 'hooks/UserContext'
import MyRoutes from './routes/routes'
import { ToastContainer } from 'react-toastify'


const rootElement = document.getElementById('app')
if (!rootElement) throw new Error('Failed to find the root element')

const root = ReactDOM.createRoot(rootElement as HTMLElement)

root.render(
  <>
    <UserProvider>
      <MyRoutes />
    </UserProvider>
    <ToastContainer autoClose={2000} theme="colored" />
  </>
)
