import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


import Login from '../pages/Login'
import Register from '../pages/Register'

import PrivateRoute from './PrivateRoute'

import Dashboard from 'dashboard/Dashboard'
import MyEvents from 'meus_eventos/MyEvents'
import CreateEvent from 'meus_eventos/CreateEvent'
import EditEvent from 'meus_eventos/EditEvent'
import EventDetails from 'meus_eventos/EventDetails'
import EventSubscribe from 'inscricao_evento/EventSubscribe'
import SubscribeConfirmation from 'inscricao_evento/SubscribeConfirmation'

function MyRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />

        <Route element={<PrivateRoute />}>
          <Route path="/eventos/inscricao/:id" element={<EventSubscribe />} />
          <Route path="/eventos/confirmar-inscricao" element={<SubscribeConfirmation />} />
        </Route>

        <Route element={<PrivateRoute isAdmin />}>

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/eventos" element={<MyEvents />} />
          <Route path="/eventos/criar-evento" element={<CreateEvent />} />
          <Route path="/eventos/editar-evento/:id" element={<EditEvent />} />
          <Route path="/eventos/detalhes-evento/:id" element={<EventDetails />} />
        </Route>

      </Routes>
    </Router>
  )
}

export default MyRoutes