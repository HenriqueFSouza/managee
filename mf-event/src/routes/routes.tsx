import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import MyEvents from '../pages/MyEvents'
import CreateEvent from '../pages/CreateEvent'
import EditEvent from '../pages/EditEvent'
import EventDetails from '../pages/EventDetails'
import EventSubscribe from '../pages/EventSubscribe'
import { useUser } from 'hooks/UserContext'
import { api } from '../services/api'


function MyRoutes() {
  const { userData } = useUser()

  if (userData) {
    api.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MyEvents />} />
        <Route path="/criar-evento" element={<CreateEvent />} />
        <Route path="/editar-evento" element={<EditEvent />} />
        <Route path="/detalhes-evento" element={<EventDetails />} />
        <Route path="/eventos/inscricao/:id" element={<EventSubscribe />} />
      </Routes>
    </Router>
  )
}

export default MyRoutes