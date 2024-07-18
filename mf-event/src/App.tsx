import 'react-toastify/dist/ReactToastify.css';
import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.scss'
import { ToastContainer } from 'react-toastify'
import MyRoutes from './routes/routes'

const rootElement = document.getElementById('app')
if (!rootElement) throw new Error('Failed to find the root element')

const root = ReactDOM.createRoot(rootElement as HTMLElement)

root.render(
  <>
    <MyRoutes />
    <ToastContainer autoClose={2000} theme="colored" />
  </>
)
