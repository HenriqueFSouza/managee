import 'tailwindcss/tailwind.css'
import 'react-toastify/dist/ReactToastify.css';
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './index.scss'

import Dashboard from './pages/Dashboard'
import { ToastContainer } from 'react-toastify'

const App = () => (
  <div className="text-3xl mx-auto max-w-6xl">
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  </div>
)
const rootElement = document.getElementById('app')
if (!rootElement) throw new Error('Failed to find the root element')

const root = ReactDOM.createRoot(rootElement as HTMLElement)

root.render(
  <>
    <App />
    <ToastContainer theme='colored' autoClose={2000} />
  </>
)
